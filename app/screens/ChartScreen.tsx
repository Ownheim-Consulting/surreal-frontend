import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import InsetShadow from "react-native-inset-shadow";

import Card from "../components/Card";
import { Chart } from "../components/Chart";
import Screen from "../components/Screen";

import * as Model from "../models/Chart";
import { ChartSelection } from "../models/ChartSelection";

import { ChartApi } from "../apis/ChartApi";
import colors from "../config/colors";

interface ChartScreenProps {
    selectedCharts: Array<ChartSelection>;
}

function ChartScreen({ selectedCharts }: ChartScreenProps): ReactElement {
    const [charts, setCharts] = useState<Array<Model.Chart>>([]);

    function mapChartResponseToModel(
        chartResponse: any
    ): Model.Chart | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return Model.ChoroplethMap.mapResponse(chartResponse);
            default:
                console.error(
                    "Could not find valid type to map response type to."
                );
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts(): Promise<void> {
            let chartsFromApi: Array<Model.Chart> = [];
            for await (const chartSelection of selectedCharts) {
                let response: Model.Chart | undefined = await ChartApi.getChart(
                    chartSelection.id
                );
                if (response !== undefined) {
                    let chart = mapChartResponseToModel(response!);
                    if (chart && !chartsFromApi.includes(chart)) {
                        chartsFromApi.push(chart);
                    }
                }
            }
            setCharts(chartsFromApi);
        }

        getCharts();
    }, [selectedCharts]);

    return (
        <Screen style={styles.screen}>
            <FlatList
                data={charts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listView}>
                            <Card
                                id={item.id}
                                title={item.title}
                                subtitle={item.subtitle}
                            >
                                <View style={styles.chartView}>
                                    <InsetShadow>
                                        <Chart type={item.type} obj={item} />
                                    </InsetShadow>
                                </View>
                            </Card>
                        </View>
                    );
                }}
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
    chartView: {
        borderRadius: 10,
        overflow: "hidden",
        width: "100%",
        height: "80%",
    },
    listView: {
        marginBottom: 15,
    },
});

export default ChartScreen;
