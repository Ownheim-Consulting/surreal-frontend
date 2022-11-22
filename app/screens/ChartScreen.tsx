import React, { useEffect, useState } from "react";
import {
    FlatList,
    TouchableWithoutFeedback,
    ImageBackground,
    StyleSheet,
} from "react-native";

import Card from "../components/Card";
import { Chart } from "../components/Chart";
import { ChartApi } from "../apis/ChartApi";
import * as Model from "../models/Chart";
import colors from "../config/colors";
import Screen from "../components/Screen";

interface ChartScreenProps {
    chartIds: Array<number>;
}

export function ChartScreen({ chartIds }: ChartScreenProps) {
    const [charts, setCharts] = useState<Array<Model.Chart>>([]);

    function mapChartResponseToModel(
        chartResponse: any
    ): Model.Chart | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return Model.ChoroplethMap.mapResponse(chartResponse);
            default:
                console.error(
                    "Could not find valid type to map response type to."
                );
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts(): Promise<void> {
            let chartsFromApi: Array<Model.Chart> = [];
            for await (const chartId of chartIds) {
                let response: Model.Chart = await ChartApi.getChart(chartId);

                let chart = mapChartResponseToModel(response!);
                if (chart && !chartsFromApi.includes(chart)) {
                    chartsFromApi.push(chart);
                }
            }
            setCharts(chartsFromApi);
        }

        getCharts();
    }, [chartIds]);

    return (
        <Screen style={styles.screen}>
            <FlatList
                data={charts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    let chart = <Chart type={item.type} obj={item} />;
                    return (
                        <Card
                            title={item.title}
                            subtitle={item.subtitle}
                            inner={chart}
                        />
                    );
                }}
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
    chartRow: {
        flex: 1,
        width: "100%",
    },
});

export default ChartScreen;
