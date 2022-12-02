import Checkbox from "expo-checkbox";
import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import InfoCard from "@app/components/InfoCard";

import { Chart as ChartModel } from "@app/models/Chart";

import colors from "@app/config/colors";

interface ChartListingProps {
    chart: ChartModel;
    checkboxValue: boolean;
    onCheckboxToggle: (id: number) => void;
}

function ChartListing({ chart, checkboxValue, onCheckboxToggle }: ChartListingProps): ReactElement {
    return (
        <View style={styles.listView}>
            <InfoCard id={chart.id} title={chart.title} subtitle={chart.subtitle}>
                <View style={styles.checkboxColumn}>
                    <Checkbox
                        value={checkboxValue}
                        onValueChange={() => onCheckboxToggle(chart.id)}
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
