import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ImageBackground, View } from "react-native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import CollabsibleInfoCard from "../components/InfoCard";
import colors from "../config/colors";
import listings from "../config/listing";

import ChoroplethMap from "../components/ChoroplethMap";
import ChartApi from "../apis/chartApi";

class ChartSelection {
    constructor(id, title, subtitle, type) {
        this.id = id;
        this.title = title;
        this.subTitle = subtitle;
        this.type = this.mapResponseTypeToType(type);
    }

    mapResponseTypeToType(type) {
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
}

function ListingsScreen({ handleChartSelectionChange }) {
    const [charts, setCharts] = useState();

    useEffect(() => {
        async function getCharts() {
            let chartApi = new ChartApi();
            let chartResponses = await chartApi.getCharts();

            if (chartResponses === undefined) {
                console.error("Got undefined from getCharts response");
                return undefined;
            }

            chartResponses.forEach((chartResponse) => {
                chartResponse = new ChartSelection(
                    chartResponse.id,
                    chartResponse.title,
                    chartResponse.subtitle,
                    chartResponse.type
                );
            });
            setCharts(chartResponses);
            return undefined;
        }

        if (!charts) {
            getCharts();
        }
    }, [charts]);

    return (
        <Screen style={styles.screen}>
            <ImageBackground
                styles={styles.background}
                source={require("../assets/background.png")}
                style={styles.image}
            >
                <FlatList
                    data={charts}
                    keyExtractor={(chart) => chart.id.toString()}
                    renderItem={({ item }) => (
                        <CollabsibleInfoCard
                            id={item.id}
                            title={item.title}
                            subTitle={item.subtitle}
                            whenPressed={handleChartSelectionChange}
                            width={"100%"}
                        />
                    )}
                />
            </ImageBackground>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.primary,
    },
    image: {
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default ListingsScreen;
