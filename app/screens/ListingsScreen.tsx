import { SearchBar } from "@rneui/themed";
import Checkbox from "expo-checkbox";
import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import InfoCard from "../components/InfoCard";
import Screen from "../components/Screen";

import { Chart as ChartModel } from "../models/Chart";
import { ChartSelection } from "../models/ChartSelection";

import { ChartApi } from "../apis/ChartApi";
import colors from "../config/colors";

interface ListingsScreenProps {
    selectedCharts: Array<ChartSelection>;
    handleChartSelectionChange: (chartSelection: ChartSelection) => void;
}

function ListingsScreen({
    selectedCharts,
    handleChartSelectionChange,
}: ListingsScreenProps): ReactElement {
    const [charts, setCharts] = useState<Array<ChartModel>>();
    const [fullCharts, setFullCharts] = useState<Array<ChartModel>>([]);
    const [checked, setChecked] = useState<Array<number>>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        // Get a list of all of the available charts from the ChartApi
        async function getCharts(): Promise<void> {
            let apiCharts: Array<ChartModel> | undefined = await ChartApi.getCharts();
            if (apiCharts === undefined) {
                console.error("Did not recieve any charts from API");
                return;
            }

            apiCharts.forEach((chart) => {
                chart = ChartModel.mapResponse(chart);
            });

            setCharts(apiCharts);
            setFullCharts(apiCharts);
        }

        if (!charts) {
            getCharts();
        }
    }, []);

    useEffect(() => {
        // Update the recent charts list with the correct checkbox status
        // even if user checked chart in home screen
        async function updateSelectedCharts(): Promise<void> {
            let newChecked = new Array<number>();
            selectedCharts.forEach((chartSelection) => {
                newChecked.push(chartSelection.id);
            });
            setChecked(newChecked);
        }

        updateSelectedCharts();
    }, [selectedCharts]);

    function onCheckboxToggle(id: number): void {
        let cpyChecked = [...checked];
        if (!cpyChecked.includes(id)) {
            cpyChecked.push(id);
        } else {
            cpyChecked = cpyChecked.filter((elementId) => elementId !== id);
        }
        setChecked(cpyChecked);

        let c = new ChartSelection(id, cpyChecked.includes(id));
        handleChartSelectionChange(c);
    }

    function updateSearch(searchText: string): void {
        let newCharts = fullCharts.filter((chart) => {
            let chartTitle = chart.title.toUpperCase();
            let search = searchText.toUpperCase();
            return chartTitle.indexOf(search) > -1;
        });

        setCharts(newCharts);
        setSearch(searchText);
    }

    return (
        <Screen style={styles.screen}>
            <SearchBar
                placeholder="Search"
                platform={"android"}
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarInnerContainer}
                onChangeText={updateSearch}
                value={search}
            />
            <FlatList
                data={charts}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listView}>
                        <InfoCard id={item.id} title={item.title} subtitle={item.subtitle}>
                            <View style={styles.checkboxColumn}>
                                <Checkbox
                                    value={checked.includes(item.id)}
                                    onValueChange={() => onCheckboxToggle(item.id)}
                                    color={colors.dark}
                                />
                            </View>
                        </InfoCard>
                    </View>
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingTop: 15,
    },
    checkboxColumn: {
        alignItems: "center",
        justifyContent: "center",
    },
    searchBarContainer: {
        padding: 20,
    },
    searchBarInnerContainer: {
        backgroundColor: colors.lightGray,
        borderRadius: 50,
    },
    listView: {
        marginBottom: 15,
    },
});

export default ListingsScreen;
