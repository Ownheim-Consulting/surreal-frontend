import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import InfoCard from "../components/InfoCard";
import Screen from "../components/Screen";

import { Chart as ChartModel } from "../models/Chart";
import { ChartSelection } from "../models/ChartSelection";

import { ChartApi } from "../apis/ChartApi";
import colors from "../config/colors";

interface HomeScreenProps {
    selectedCharts: Array<ChartSelection>;
    recentChartSelections: Array<ChartSelection>;
    handleChartSelectionChange: (chartSelection: ChartSelection) => void;
}

function HomeScreen({
    selectedCharts,
    recentChartSelections,
    handleChartSelectionChange,
}: HomeScreenProps): ReactElement {
    // const [recentChartSelections, setRecentChartSelections] = useState<Array<ChartSelection>>([]);
    const [recentCharts, setRecentCharts] = useState<Array<ChartModel>>([]);
    const [checked, setChecked] = useState<Array<number>>([]);

    useEffect(() => {
        // Fetch recent charts from API using recent chart ids
        async function getRecentChartsFromApi(): Promise<void> {
            let chartsFromApi: Array<ChartModel> = new Array<ChartModel>();
            for await (const chartSelection of recentChartSelections) {
                let response: ChartModel | undefined = await ChartApi.getChart(chartSelection.id);
                if (response !== undefined) {
                    let chart = ChartModel.mapResponse(response);
                    if (chart && !chartsFromApi.includes(chart)) {
                        chartsFromApi.push(chart);
                    }
                }
            }

            setRecentCharts(chartsFromApi);
        }

        getRecentChartsFromApi();
    }, [recentChartSelections]);

    useEffect(() => {
        // Update the recent charts list with the correct checkbox status
        // even if user checked chart in listing screen
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
            cpyChecked.filter((elementId) => elementId !== id);
        }
        setChecked(cpyChecked);

        let c = new ChartSelection(id, cpyChecked.includes(id));
        handleChartSelectionChange(c);
    }

    return (
        <Screen style={styles.screen}>
            <AppText style={styles.text}>Recent Charts</AppText>
            <FlatList
                data={recentCharts}
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    text: {
        paddingTop: 15,
        paddingLeft: 20,
        fontWeight: "bold",
    },
    listView: {
        marginBottom: 15,
    },
    checkboxColumn: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default HomeScreen;
