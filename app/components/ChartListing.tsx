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
    id?: string;
    chartId: number;
    checkboxValue: boolean;
    onCheckboxToggle: (value: boolean) => void | undefined;
}

function ChartListing({
    id = "",
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
        <View key={id + "-chartListingView"} style={styles.listingView}>
            <InfoCard
                id={id + "-chartListingInfoCard"}
                title={data!.title}
                subtitle={data!.subtitle}
            >
                <View key={id + "-chartListingViewCheckboxColumn"} style={styles.checkboxColumn}>
                    <Checkbox
                        value={checkboxValue}
                        onValueChange={onCheckboxToggle}
                        color={colors.dark}
                    />
                </View>
            </InfoCard>
        </View>
    );
}

const styles = StyleSheet.create({
    listingView: {
        marginBottom: 15,
    },
    checkboxColumn: {
        alignCharts: "center",
        justifyContent: "center",
    },
});
export default ChartListing;
