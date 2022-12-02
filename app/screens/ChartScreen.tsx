import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableHighlight, View } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";

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
    const pagerView = useRef<PagerView>();
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const width = Dimensions.get("window").width;
    const inputRange = [0, charts.length];
    const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
        inputRange,
        outputRange: [0, charts.length * width],
    });

    function mapChartResponseToModel(chartResponse: any): Model.Chart | undefined {
        switch (chartResponse.type) {
            case "choropleth_map":
                return Model.ChoroplethMap.mapResponse(chartResponse);
            default:
                console.error("Could not find valid type to map response type to.");
                return undefined;
        }
    }

    const onPageScroll = React.useMemo(
        () =>
            Animated.event<PagerViewOnPageScrollEventData>(
                [
                    {
                        nativeEvent: {
                            offset: scrollOffsetAnimatedValue,
                            position: positionAnimatedValue,
                        },
                    },
                ],
                {
                    useNativeDriver: false,
                }
            ),
        []
    );

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
                ref={pagerView}
                style={styles.pagerView}
                initialPage={activePage}
                scrollEnabled={false}
                onPageScroll={onPageScroll}
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
            <View style={styles.buttonView}>
                <TouchableHighlight
                    onPress={() => {
                        pagerView.current?.setPage(activePage - 1);
                        if (activePage > 0) {
                            setActivePage(activePage - 1);
                        }
                    }}
                    style={styles.button}
                >
                    <MaterialCommunityIcons name="arrow-left-bold" size={30} color={colors.dark} />
                </TouchableHighlight>
                <View style={styles.dotsContainer}>
                    <View style={styles.dotContainer}>
                        <ScalingDot
                            data={charts}
                            //@ts-ignore
                            scrollX={scrollX}
                            activeDotColor={colors.black}
                            inActiveDotColor={colors.black}
                            //containerStyle={{ alignContent: "center" }}
                        />
                    </View>
                </View>
                <TouchableHighlight
                    onPress={() => {
                        pagerView.current?.setPage(activePage + 1);
                        if (activePage < charts.length - 1) {
                            setActivePage(activePage + 1);
                        }
                    }}
                    style={styles.button}
                >
                    <MaterialCommunityIcons name="arrow-right-bold" size={30} color={colors.dark} />
                </TouchableHighlight>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    pagerView: {
        flex: 1,
    },
    chartView: {
        borderRadius: 10,
        overflow: "hidden",
        width: "90%",
        height: "80%",
    },
    listView: {
        margin: 15,
    },
    buttonView: {
        flexDirection: "row",
        height: "10%",
        justifyContent: "space-between",
    },
    button: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        backgroundColor: colors.light,
        borderRadius: 50,
        width: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    dotContainer: {
        justifyContent: "center",
        alignSelf: "center",
    },
    dotsContainer: {
        height: "80%",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colors.danger,
    },
});

export default ChartScreen;
