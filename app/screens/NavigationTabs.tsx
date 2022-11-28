import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ChartScreen from "../screens/ChartScreen";
import { ChartSelection } from "../models/ChartSelection";
import { defaultStyles } from "../config/styles";
import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";
import Screen from "../components/Screen";

const Tab = createBottomTabNavigator();

function NavigationTabs({}): ReactElement {
    const [chartSelections, setChartSelections] = useState<Array<ChartSelection>>([]);
    const [recentCharts, setRecentCharts] = useState<Array<ChartSelection>>([]);

    useEffect(() => {
        async function updateRecentCharts(): Promise<void> {
            try {
                // Get storedRecentCharts from store and init storedRecentChartsJson
                // based on if we got anything from store or not
                let storedRecentCharts: string | null = await AsyncStorage.getItem("@recent-charts");
                let storedRecentChartsJson: Array<ChartSelection>;
                if (storedRecentCharts !== null) {
                    storedRecentChartsJson = JSON.parse(storedRecentCharts);
                } else {
                    storedRecentChartsJson = new Array<ChartSelection>();
                }

                // Remove duplicates in storedRecentChartsJson
                storedRecentChartsJson = storedRecentChartsJson.reduce((acc: Array<ChartSelection>, cur: ChartSelection) => {
                    if (!acc.some((element) => element.id === cur.id)) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);

                // Add any missing charts in recentCharts to storedRecentChartsJson
                recentCharts.forEach((chart) => {
                    if (storedRecentChartsJson.some((element) => element.id === chart.id)) {
                        storedRecentChartsJson = storedRecentChartsJson.map(element => element.id === chart.id ? {...element, selected: chart.selected} : element)
                    } else {
                        storedRecentChartsJson.push(chart);
                    }
                });

                // Only want to have maximum recent chart list length of 7
                while (storedRecentChartsJson.length > 7) {
                    storedRecentChartsJson.shift();
                }
                await AsyncStorage.setItem("@recent-charts", JSON.stringify(storedRecentChartsJson));
            } catch (e) {
                console.error("Could not set recent charts in store: " + e);
            }
        };

        updateRecentCharts();
    }, [recentCharts]);

    function handleChartSelectionsChange(chartSelection: ChartSelection): void {
        let cpyChartSelections = [...chartSelections];
        if (!cpyChartSelections.some((element) => element.id === chartSelection.id) && chartSelection.selected) {
            cpyChartSelections.push(chartSelection)
        } else {
            cpyChartSelections = cpyChartSelections.filter((element) => element.id !== chartSelection.id);
        }
        setChartSelections(cpyChartSelections);

        let cpyRecentCharts = [...recentCharts]
        if (cpyRecentCharts.some((element) => element.id === chartSelection.id)) {
            cpyRecentCharts = cpyRecentCharts.map(element => element.id === chartSelection.id ? {...element, selected: chartSelection.selected} : element)
        } else {
            cpyRecentCharts.push(chartSelection);
        }
        setRecentCharts(cpyRecentCharts);
    }

    return (
        <Screen style={[defaultStyles.screen, styles.screen]}>
            <NavigationContainer theme={defaultTheme}>
                <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
                    <Tab.Screen
                        name="Select Data"
                        options={{
                            tabBarIcon: (tabInfo) => (
                                <MaterialCommunityIcons
                                    name="plus-box-outline"
                                    size={30}
                                    color={tabInfo.color}
                                />
                            ),
                        }}
                    >
                        {() => (
                            <ListingsScreen
                                selectedCharts={chartSelections}
                                handleChartSelectionChange={
                                    handleChartSelectionsChange
                                }
                            />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Home"
                        options={{
                            tabBarIcon: (tabInfo) => (
                                <MaterialCommunityIcons
                                    name="home"
                                    size={30}
                                    color={tabInfo.color}
                                />
                            ),
                        }}
                    >
                        {() => <HomeScreen selectedCharts={chartSelections} handleChartSelectionChange={handleChartSelectionsChange} />}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Charts"
                        options={{
                            tabBarIcon: (tabInfo) => (
                                <MaterialCommunityIcons
                                    name="chart-line"
                                    size={30}
                                    color={tabInfo.color}
                                />
                            ),
                        }}
                    >
                        {() => <ChartScreen selectedCharts={chartSelections} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </Screen>
    );
}

const defaultTheme = {
    dark: true,
    colors: {
        primary: colors.light,
        background: colors.dark,
        text: colors.light,
        border: colors.dark,
        notification: colors.light,
        card: colors.dark,
    },
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.dark,
    },
});

export default NavigationTabs;
