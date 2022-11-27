import React, { ReactElement, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ChartScreen from "../screens/ChartScreen";
import { defaultStyles } from "../config/styles";
import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";
import Screen from "../components/Screen";

const Tab = createBottomTabNavigator();

function NavigationTabs({}): ReactElement {
    const [chartSelections, setChartSelections] = useState<Array<number>>([]);
    const [recentCharts, setRecentCharts] = useState<Array<number>>([]);

    useEffect(() => {
        async function updateRecentCharts(): Promise<void> {
            try {
                let storedRecentCharts = await AsyncStorage.getItem("@recent-charts");
                if (storedRecentCharts === null) {
                    return;
                }

                let storedRecentChartsJson: Array<number> = JSON.parse(storedRecentCharts);
                recentCharts.forEach((id) => {
                    if (!storedRecentChartsJson.includes(id)) {
                        storedRecentChartsJson.push(id);
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

    function handleChartSelectionsChange(chartId: number): void {
        if (!chartSelections.includes(chartId)) {
            setChartSelections([...chartSelections, chartId]);
        } else {
            setChartSelections(chartSelections.filter((id) => id !== chartId));
        }

        if (!recentCharts.includes(chartId)) {
            setRecentCharts([...recentCharts, chartId]);
        }
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
                        {() => <HomeScreen />}
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
                        {() => <ChartScreen chartIds={chartSelections} />}
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
