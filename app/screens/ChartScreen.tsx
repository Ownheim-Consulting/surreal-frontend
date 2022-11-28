import React, { ReactElement, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import InsetShadow from "react-native-inset-shadow";

import Card from "../components/Card";
import { Chart } from "../components/Chart";
import { ChartApi } from "../apis/ChartApi";
import * as Model from "../models/Chart";
import colors from "../config/colors";
import Screen from "../components/Screen";

interface ChartScreenProps {
    chartIds: Array<number>;
}

function ChartScreen({ chartIds }: ChartScreenProps): ReactElement {
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
            for await (const chartId of chartIds) {
                let response: Model.Chart | undefined = await ChartApi.getChart(chartId);
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
    }, [chartIds]);

    return (
        <Screen style={styles.screen}>
            <FlatList
                data={charts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
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
});

export default ChartScreen;
