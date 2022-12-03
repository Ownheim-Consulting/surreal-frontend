import Checkbox from "expo-checkbox";
import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";

import ErrorMessage from "@app/components/ErrorMessage";
import InfoCard from "@app/components/InfoCard";
import LoadingIndicator from "@app/components/LoadingIndicator";

import { ChartApi } from "@app/apis/ChartApi";

import { Chart as ChartModel } from "@app/models/Chart";

import colors from "@app/config/colors";

interface ChartListingProps {
    key: string;
    chartId: number;
    checkboxValue: boolean;
    onCheckboxToggle: (id: number) => void;
}

function ChartListing({
    key,
    chartId,
    checkboxValue,
    onCheckboxToggle,
}: ChartListingProps): ReactElement {
    const { isLoading, error, data } = useQuery<ChartModel, Error>(
        ["chartListingChart", chartId],
        () => ChartApi.getChart(chartId)
    );

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <View key={key + "chartListingView"} style={styles.listView}>
            <InfoCard key={key} title={data!.title} subtitle={data!.subtitle}>
                <View key={key + "-chartListingViewCheckboxColumn"} style={styles.checkboxColumn}>
                    <Checkbox
                        value={checkboxValue}
                        onValueChange={() => onCheckboxToggle(data!.id)}
                        color={colors.dark}
                    />
                </View>
            </InfoCard>
        </View>
    );
}

const styles = StyleSheet.create({
    listView: {
        marginBottom: 15,
    },
    checkboxColumn: {
        alignCharts: "center",
        justifyContent: "center",
    },
});
export default ChartListing;
