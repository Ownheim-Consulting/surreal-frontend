import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import { SearchBar } from "@rneui/themed";

import { ChartApi } from "../apis/ChartApi";
import { Chart as ChartModel } from "../models/Chart";
import colors from "../config/colors";
import InfoCard from "../components/InfoCard";
import Screen from "../components/Screen";

interface ListingsScreenProps {
    handleChartSelectionChange: (id: number) => void;
}

function ListingsScreen({ handleChartSelectionChange }: ListingsScreenProps): ReactElement {
    const [charts, setCharts] = useState<Array<ChartModel>>();
    const [fullCharts, setFullCharts] = useState<Array<ChartModel>>([]);
    const [checkboxToggle, setCheckboxToggle] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
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

    function onCheckboxToggle(id: number): void {
        handleChartSelectionChange(id);
        setCheckboxToggle(!checkboxToggle);
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
                        <InfoCard
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                        >
                            <View style={styles.checkboxColumn}>
                                <Checkbox
                                    value={checkboxToggle}
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
        borderRadius: 10,
    },
    listView: {
        marginBottom: 15,
    }
});

export default ListingsScreen;
