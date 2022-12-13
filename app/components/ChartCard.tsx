import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";

import { ChartApi } from "@app/apis/ChartApi";

import Card from "@app/components/Card";
import { Chart as ChartComponent } from "@app/components/Chart";
import ErrorMessage from "@app/components/ErrorMessage";
import LoadingIndicator from "@app/components/LoadingIndicator";

import { Chart as ChartModel, ChoroplethMap as ChoroplethMapModel } from "@app/models/Chart";

interface ChartCardProps {
    id?: string;
    chartId: number;
}

function ChartCard({ id = "", chartId }: ChartCardProps): ReactElement {
    const { isLoading, error, data } = useQuery<ChartModel, Error>(
        ["chartCardChart", chartId, mapChartResponseToModel],
        async () => {
            let response: ChartModel = await ChartApi.getChart(chartId);
            let chart: ChartModel | undefined = mapChartResponseToModel(response);
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
        return <ErrorMessage id={"chartChartErrorMessage"} message={error.message} />;
    }

    if (isLoading) {
        return <LoadingIndicator id={"chartCardLoadingIndicator"} />;
    }

    return (
        <Card key={id + "-chartCardOuterCard"} title={data!.title} subtitle={data!.subtitle}>
            <View key={id + "-chartCardInnerView"} style={styles.chartView}>
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
