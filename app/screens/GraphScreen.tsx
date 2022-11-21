import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    ImageBackground,
} from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import Chart from "../components/Chart";
import { ChartApi } from "../apis/ChartApi";
import ChoroplethMapModel from "../models/ChoroplethMapModel";
import ChartModel from "../models/ChartModel";

interface GraphScreenProps {
    chartIds: Array<number>;
}

function GraphScreen({ chartIds }: GraphScreenProps) {
    const [charts, setCharts] = useState<Array<ChartModel>>([]);

    function mapChartResponseToModel(
        chartResponse: any
    ): ChartModel | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return ChoroplethMapModel.mapResponse(chartResponse);
            default:
                console.error(
                    "Could not find valid type to map response type to."
                );
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts() {
            let chartsFromApi: Array<ChartModel> = [];
            for await (const chartId of chartIds) {
                let response: ChartModel = await ChartApi.getChart(chartId);

                let chart = mapChartResponseToModel(response!);
                if (chart && !chartsFromApi.includes(chart)) {
                    chartsFromApi.push(chart);
                }
            }
            setCharts(chartsFromApi);
        }

        getCharts();
    }, [chartIds]);

    return (
        <Screen style={styles.screen}>
            <ImageBackground
                source={require("../assets/background.png")}
                style={styles.image}
            >
                <TouchableWithoutFeedback>
                    <FlatList
                        data={charts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            let graph = <Chart type={item.type} obj={item} />;
                            return (
                                <Card
                                    title={item.title}
                                    subTitle={item.subtitle}
                                    graph={graph}
                                />
                            );
                        }}
                    />
                </TouchableWithoutFeedback>
            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.primary,
    },
    image: {
        flex: 1,
        justifyContent: "flex-end",
    },
    chartRow: {
        flex: 1,
        width: "100%",
    },
    container: {
        paddingTop: 30,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default GraphScreen;
