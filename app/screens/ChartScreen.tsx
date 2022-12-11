import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableHighlight, View } from "react-native";
import { ScalingDot } from "react-native-animated-pagination-dots";
import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";

import ChartCard from "@app/components/ChartCard";
import Screen from "@app/components/Screen";

import colors from "@app/config/colors";

import { ChartSelection } from "@app/models/ChartSelection";

interface ChartScreenProps {
    selectedCharts: Array<ChartSelection>;
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function ChartScreen({ selectedCharts }: ChartScreenProps): ReactElement {
    const [activePage, setActivePage] = useState<number>(0);
    const pagerView = useRef<PagerView>();

    // Animation state for pager dots
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const width = Dimensions.get("window").width;
    const inputRange = [0, selectedCharts.length];
    const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
        inputRange,
        outputRange: [0, selectedCharts.length * width],
    });

    // If selectedCharts list is shrunk below current activePage
    useEffect(() => {
        if (activePage > selectedCharts.length - 1) {
            setActivePage(selectedCharts.length - 1);
        }
    }, [selectedCharts]);

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

    return (
        <Screen style={styles.screen}>
            <AnimatedPagerView
                ref={pagerView}
                style={styles.pagerView}
                initialPage={activePage}
                scrollEnabled={false}
                onPageScroll={onPageScroll}
            >
                {selectedCharts.map((chart, index) => {
                    return (
                        <View
                            key={index + "-animatedPagerViewChartCardOuterView"}
                            style={styles.chartCardView}
                            collapsable={false}
                        >
                            <ChartCard key={index.toString()} chartId={chart.id} />
                        </View>
                    );
                })}
            </AnimatedPagerView>
            <View style={styles.buttonView}>
                <TouchableHighlight
                    onPress={() => {
                        pagerView.current?.setPage(activePage - 1);
                        activePage > 0 ? setActivePage(activePage - 1) : activePage;
                    }}
                    style={styles.button}
                >
                    <MaterialCommunityIcons name="arrow-left-bold" size={30} color={colors.dark} />
                </TouchableHighlight>
                <View style={styles.dotsContainer}>
                    <View style={styles.dotContainer}>
                        <ScalingDot
                            data={selectedCharts}
                            //@ts-ignore
                            scrollX={scrollX}
                            activeDotColor={colors.black}
                            inActiveDotColor={colors.black}
                        />
                    </View>
                </View>
                <TouchableHighlight
                    onPress={() => {
                        pagerView.current?.setPage(activePage + 1);
                        activePage < selectedCharts.length - 1
                            ? setActivePage(activePage + 1)
                            : activePage;
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
    chartCardView: {
        marginBottom: 15,
    },
    pagerView: {
        flex: 1,
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
