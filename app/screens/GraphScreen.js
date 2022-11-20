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
import Graph from "../components/Graph";
import ChoroplethMap from "../components/ChoroplethMap";
import ChartApi from "../apis/chartApi";

function GraphScreen({ chartIds }) {
    const [charts, setCharts] = useState([]);

    function mapChartResponseTypeToType(type) {
        switch (type) {
            case "choropleth_map":
                return ChoroplethMap;
            default:
                console.error(
                    "Could not find valid type to map response type to."
                );
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts() {
            let chartApi = new ChartApi();
            let chartsFromApi = [];
            for await (const chartId of chartIds) {
                let chart = await chartApi.getChart(chartId);
                chart.type = mapChartResponseTypeToType(chart.type);

                if (!chartsFromApi.includes(chart)) {
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
                        //showVerticalScrollIndicator={false}
                        data={charts}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            let graph = <Graph type={item.type} obj={item} />;
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
