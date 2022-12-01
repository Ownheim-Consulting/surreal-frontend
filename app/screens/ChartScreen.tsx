import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import PagerView from "react-native-pager-view";

import AppText from "../components/AppText";
import Card from "../components/Card";
import { Chart } from "../components/Chart";
import Screen from "../components/Screen";

import * as Model from "../models/Chart";
import { ChartSelection } from "../models/ChartSelection";

import { ChartApi } from "../apis/ChartApi";
import colors from "../config/colors";

interface ChartScreenProps {
    selectedCharts: Array<ChartSelection>;
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function ChartScreen({ selectedCharts }: ChartScreenProps): ReactElement {
    const [charts, setCharts] = useState<Array<Model.Chart>>([]);
    const [activePage, setActivePage] = useState<number>(0);
    const ref = useRef<PagerView>();

    function mapChartResponseToModel(chartResponse: any): Model.Chart | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return Model.ChoroplethMap.mapResponse(chartResponse);
            default:
                console.error("Could not find valid type to map response type to.");
                return undefined;
        }
    }

    useEffect(() => {
        async function getCharts(): Promise<void> {
            let chartsFromApi: Array<Model.Chart> = [];
            for await (const chartSelection of selectedCharts) {
                let response: Model.Chart | undefined = await ChartApi.getChart(chartSelection.id);
                if (response !== undefined) {
                    let chart = mapChartResponseToModel(response!);
                    if (chart && !chartsFromApi.includes(chart)) {
                        chartsFromApi.push(chart);
                    }
                }
            }
            setCharts(chartsFromApi);
        }

        getCharts();
    }, [selectedCharts]);

    return (
        <Screen style={styles.screen}>
            <AnimatedPagerView
                ref={ref}
                style={styles.pagerView}
                initialPage={activePage}
                scrollEnabled={false}
            >
                {useMemo(
                    () =>
                        charts.map((item) => (
                            <View key={item.id} style={styles.listView} collapsable={false}>
                                <Card id={item.id} title={item.title} subtitle={item.subtitle}>
                                    <View style={styles.chartView}>
                                        <Chart type={item.type} obj={item} />
                                    </View>
                                </Card>
                            </View>
                        )),
                    [charts]
                )}
            </AnimatedPagerView>
            <TouchableHighlight
                onPress={() => {
                    ref.current?.setPage(activePage - 1);
                    if (activePage > 0) {
                        setActivePage(activePage - 1);
                    }
                }}
            >
                <View>
                    <AppText>Back</AppText>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => {
                    ref.current?.setPage(activePage + 1);
                    if (activePage < charts.length - 1) {
                        setActivePage(activePage + 1);
                    }
                }}
            >
                <View>
                    <AppText>Forward</AppText>
                </View>
            </TouchableHighlight>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingTop: 15,
    },
    pagerView: {
        flex: 1,
    },
    chartView: {
        borderRadius: 10,
        overflow: "hidden",
        width: "100%",
        height: "80%",
    },
    listView: {
        marginBottom: 15,
    },
});

export default ChartScreen;
