import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../components/AppText";
import { Chart as ChartModel } from "../models/Chart";
import { ChartApi } from "../apis/ChartApi";
import colors from "../config/colors";
import InfoCard from "../components/InfoCard";
import Screen from "../components/Screen";

function HomeScreen(): ReactElement {
    const [recentChartIds, setRecentChartIds] = useState<Array<number>>([]);
    const [recentCharts, setRecentCharts] = useState<Array<ChartModel>>([]);

    useEffect(() => {
        // Get recent chart ids from AsyncStorage
        async function getRecentCharts(): Promise<void> {
            try {
                let jsonRecentChartIds = await AsyncStorage.getItem("@recent-charts");
                if (jsonRecentChartIds !== null) {
                    setRecentChartIds(JSON.parse(jsonRecentChartIds));
                }
            } catch (e) {
                console.error("Could not retrieve recent charts from store: " + e);
            }
        }

        getRecentCharts();
    }, []);

    useEffect(() => {
        // Fetch recent charts from API using recent chart ids
        async function getRecentChartsFromApi(): Promise<void> {
            let chartsFromApi: Array<ChartModel> = new Array<ChartModel>();
            for await (const chartId of recentChartIds) {
                let response: ChartModel | undefined = await ChartApi.getChart(chartId);
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
    }, [recentChartIds]);

    return (
        <Screen style={styles.screen}>
            <AppText style={styles.text}>Recent Charts</AppText>
            <FlatList
                data={recentCharts}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listView}>
                        <InfoCard
                            id={item.id}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
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
    }
});

export default HomeScreen;
