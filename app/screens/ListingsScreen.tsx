import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ChartApi } from "../apis/ChartApi";
import { Chart } from "../models/Chart";
import CollabsibleInfoCard from "../components/InfoCard";
import colors from "../config/colors";
import Screen from "../components/Screen";

interface ListingsScreenProps {
    handleChartSelectionChange: (id: number, isPresent: boolean) => void;
}

function ListingsScreen({ handleChartSelectionChange }: ListingsScreenProps) {
    const [charts, setCharts] = useState<Array<Chart>>();

    useEffect(() => {
        async function getCharts(): Promise<void> {
            let apiCharts = await ChartApi.getCharts();

            if (!apiCharts) {
                console.error("Did not recieve any charts from API");
                return;
            }

            apiCharts.forEach((chart) => {
                chart = Chart.mapResponse(chart);
            });

            setCharts(apiCharts);
        }

        if (!charts) {
            getCharts();
        }
    }, [charts]);

    return (
        <Screen style={styles.screen}>
            <FlatList
                data={charts}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <CollabsibleInfoCard
                        id={item.id}
                        title={item.title}
                        subTitle={item.subtitle}
                        whenPressed={handleChartSelectionChange}
                    />
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
    },
});

export default ListingsScreen;
