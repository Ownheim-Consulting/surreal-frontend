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
import ChartApi from "../apis/ChartApi";
import ChoroplethMapModel from "../models/ChoroplethMapModel";

function GraphScreen({ chartIds }) {
    const [charts, setCharts] = useState([]);

    function mapChartResponseToModel(response) {
        switch (response.data.type) {
            case "choropleth_map":
                return ChoroplethMapModel.mapResponse(response.data);
            default:
                console.error(
                    "Could not find valid type to map response type to."
                );
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts() {
            let chartsFromApi = [];
            for await (const chartId of chartIds) {
                let response = await ChartApi.getChart(chartId);
                if (response === undefined) {
                    console.error("Got undefined from getChart() response");
                    return;
                }

                let chart = mapChartResponseToModel(response);
                if (chart.type !== undefined
                    && !chartsFromApi.includes(chart)) {
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
                styles={styles.background}
                source={require("../assets/background.png")}
                style={styles.image}
            >
                <TouchableWithoutFeedback>
                    <FlatList
                        data={charts}
                        keyExtractor={(item) => item.id}
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
