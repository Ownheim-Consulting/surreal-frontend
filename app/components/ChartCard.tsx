import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";

import { ChartApi } from "@app/apis/ChartApi";

import { Chart as ChartModel, ChoroplethMap as ChoroplethMapModel } from "@app/models/Chart";

import Card from "./Card";
import { Chart as ChartComponent } from "./Chart";
import ErrorMessage from "./ErrorMessage";
import LoadingIndicator from "./LoadingIndicator";

interface ChartCardProps {
    chartId: number;
}

function ChartCard({ chartId }: ChartCardProps): ReactElement {
    const { isLoading, error, data } = useQuery<ChartModel, Error>(
        ["chartCardChart", chartId, mapChartResponseToModel],
        async () => {
            let response = await ChartApi.getChart(chartId);
            if (!response) {
                throw new Error(`Could not retrieve chart with chart id: ${chartId}`);
            }
            let chart = mapChartResponseToModel(response);
            if (!chart) {
                throw new Error(`Could not map chart type: ${response.type} to valid type`);
            }
            return chart;
        }
    );

    function mapChartResponseToModel(chartResponse: ChartModel): ChartModel | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return ChoroplethMapModel.mapResponse(chartResponse);
            default:
                return undefined;
        }
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <Card key={"chartCardOuterCard"} title={data!.title} subtitle={data!.subtitle}>
            <View key={"chartCardInnerView"} style={styles.chartView}>
                <ChartComponent type={data!.type} obj={data!} />
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    chartView: {
        borderRadius: 10,
        overflow: "hidden",
        width: "90%",
        height: "80%",
    },
});

export default ChartCard;
