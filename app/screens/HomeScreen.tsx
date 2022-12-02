import React, { ReactElement, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useQuery } from "react-query";

import AppText from "@app/components/AppText";
import ChartListing from "@app/components/ChartListing";
import ErrorMessage from "@app/components/ErrorMessage";
import LoadingIndicator from "@app/components/LoadingIndicator";
import Screen from "@app/components/Screen";

import { ChartApi } from "@app/apis/ChartApi";

import { Chart as ChartModel } from "@app/models/Chart";
import { ChartSelection } from "@app/models/ChartSelection";

import colors from "@app/config/colors";

interface HomeScreenProps {
    selectedCharts: Array<ChartSelection>;
    recentChartSelections: Array<ChartSelection>;
    handleChartSelectionChange: (chartSelection: ChartSelection) => void;
}

function HomeScreen({
    selectedCharts,
    recentChartSelections,
    handleChartSelectionChange,
}: HomeScreenProps): ReactElement {
    const [checked, setChecked] = useState<Array<number>>([]);
    const { isLoading, error, data } = useQuery<Array<ChartModel>, Error>(
        ["recentChartListings", recentChartSelections],
        async () => {
            let chartsFromApi: Array<ChartModel> = new Array<ChartModel>();
            for await (const chartSelection of recentChartSelections) {
                let response: ChartModel = await ChartApi.getChart(chartSelection.id);
                if (!chartsFromApi.includes(response)) {
                    chartsFromApi.push(response);
                }
            }
            return chartsFromApi;
        }
    );

    // Update the recent charts list with the correct checkbox status
    // even if user checked chart in listing screen
    useMemo(() => {
        let newChecked = new Array<number>();
        selectedCharts.forEach((chartSelection) => {
            newChecked.push(chartSelection.id);
        });
        setChecked(newChecked);
    }, [selectedCharts]);

    function onCheckboxToggle(id: number): void {
        let cpyChecked = [...checked];
        if (!cpyChecked.includes(id)) {
            cpyChecked.push(id);
        } else {
            cpyChecked.filter((elementId) => elementId !== id);
        }
        setChecked(cpyChecked);

        let c = new ChartSelection(id, cpyChecked.includes(id));
        handleChartSelectionChange(c);
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Screen style={styles.screen}>
            <AppText style={styles.text}>Recent Charts</AppText>
            <FlatList
                data={data}
                keyExtractor={(chart) => chart.id.toString()}
                renderItem={({ item }) => (
                    <ChartListing
                        chart={item}
                        checkboxValue={checked.includes(item.id)}
                        onCheckboxToggle={onCheckboxToggle}
                    />
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
});

export default HomeScreen;
