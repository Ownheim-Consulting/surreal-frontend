import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "@app/components/Screen";

import colors from "@app/config/colors";
import { defaultStyles } from "@app/config/styles";

import { ChartSelection } from "@app/models/ChartSelection";

import ChartScreen from "@app/screens/ChartScreen";
import HomeScreen from "@app/screens/HomeScreen";
import ListingsScreen from "@app/screens/ListingsScreen";

const Tab = createBottomTabNavigator();

function NavigationTabs({}): ReactElement {
    const [chartSelections, setChartSelections] = useState<Array<ChartSelection>>([]);
    const [recentCharts, setRecentCharts] = useState<Array<ChartSelection>>([]);

    useEffect(() => {
        // Get recent chart ids from AsyncStorage on initial app load
        async function getRecentChartsOnAppLoad(): Promise<void> {
            try {
                let recentChartSelections: string | null = await AsyncStorage.getItem(
                    "@recent-charts"
                );
                if (recentChartSelections !== null) {
                    let jsonRecentChartSelections: Array<ChartSelection> =
                        JSON.parse(recentChartSelections);
                    // Default all of the selections from AsyncStorage to false
                    // so that the charts don't start off checked
                    jsonRecentChartSelections.forEach((selection) => {
                        selection.selected = false;
                    });
                    setRecentCharts(jsonRecentChartSelections);
                }
            } catch (e) {
                console.error("Could not retrieve recent charts from store: " + e);
            }
        }

        getRecentChartsOnAppLoad();
    }, []);

    useEffect(() => {
        // Update the stored recent charts value to keep it up to date between app
        // launches
        async function updateRecentChartsStore(): Promise<void> {
            try {
                await AsyncStorage.setItem("@recent-charts", JSON.stringify(recentCharts));
            } catch (e) {
                console.error("Could not set recent charts in store: " + e);
            }
        }

        updateRecentChartsStore();
    }, [recentCharts]);

    function updateRecentCharts(chartSelection: ChartSelection): void {
        let cpyRecentCharts = [...recentCharts];
        // Update if existing entry is present
        if (cpyRecentCharts.some((element) => element.id === chartSelection.id)) {
            cpyRecentCharts = cpyRecentCharts.map((element) =>
                element.id === chartSelection.id
                    ? { ...element, selected: chartSelection.selected }
                    : element
            );
        } else {
            // Push new entry if no existing entry
            cpyRecentCharts.push(chartSelection);
        }

        // Only want to have maximum recent chart list length of 6
        while (cpyRecentCharts.length > 6) {
            cpyRecentCharts.shift();
        }
        setRecentCharts(cpyRecentCharts);
    }

    function handleChartSelectionsChange(chartSelection: ChartSelection): void {
        updateRecentCharts(chartSelection);

        let cpyChartSelections = [...chartSelections];
        if (
            !cpyChartSelections.some((element) => element.id === chartSelection.id) &&
            chartSelection.selected
        ) {
            cpyChartSelections.push(chartSelection);
        } else {
            cpyChartSelections = cpyChartSelections.filter(
                (element) => element.id !== chartSelection.id
            );
        }
        setChartSelections(cpyChartSelections);
    }

    return (
        <Screen style={[defaultStyles.screen, styles.screen]}>
            <NavigationContainer theme={defaultTheme}>
                <Tab.Navigator screenOptions={{ tabBarShowLabel: false }} initialRouteName="Home">
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
                                handleChartSelectionChange={handleChartSelectionsChange}
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
                        {() => (
                            <HomeScreen
                                selectedCharts={chartSelections}
                                recentChartSelections={recentCharts}
                                handleChartSelectionChange={handleChartSelectionsChange}
                            />
                        )}
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
