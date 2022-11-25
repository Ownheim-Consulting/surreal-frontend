import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";

import { ChartApi } from "../apis/ChartApi";
import { Chart } from "../models/Chart";
import InfoCard from "../components/InfoCard";
import colors from "../config/colors";
import Screen from "../components/Screen";

interface ListingsScreenProps {
    handleChartSelectionChange: (id: number, isPresent: boolean) => void;
}

function ListingsScreen({ handleChartSelectionChange }: ListingsScreenProps) {
    const [charts, setCharts] = useState<Array<Chart>>();
    const [checkboxToggle, setCheckboxToggle] = useState<boolean>(false);

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

    function onCheckboxToggle(id: number) {
        handleChartSelectionChange(id, checkboxToggle);
        setCheckboxToggle(!checkboxToggle);
    }

    return (
        <Screen style={styles.screen}>
            <FlatList
                data={charts}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <InfoCard
                        id={item.id}
                        title={item.title}
                        subtitle={item.subtitle}
                    >
                        <View style={styles.checkboxColumn}>
                            <Checkbox
                                value={checkboxToggle}
                                onValueChange={() => onCheckboxToggle(item.id)}
                                color={colors.dark}
                            />
                        </View>
                    </InfoCard>
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
    checkboxColumn: {
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ListingsScreen;
