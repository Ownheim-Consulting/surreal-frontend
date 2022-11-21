import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ImageBackground } from "react-native";
import Screen from "../components/Screen";
import CollabsibleInfoCard from "../components/InfoCard";
import colors from "../config/colors";

import { ChartApi } from "../apis/ChartApi";
import ChartModel from "../models/ChartModel";

interface ListingsScreenProps {
    handleChartSelectionChange: (id: number, isPresent: boolean) => void;
}

function ListingsScreen({ handleChartSelectionChange }: ListingsScreenProps) {
    const [charts, setCharts] = useState<Array<ChartModel>>();

    useEffect(() => {
        async function getCharts() {
            let charts = await ChartApi.getCharts();
            charts!.forEach((chart) => {
                chart = ChartModel.mapResponse(chart);
            });

            setCharts(charts);
        }

        if (!charts) {
            getCharts();
        }
    }, [charts]);

    return (
        <Screen style={styles.screen}>
            <ImageBackground
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
