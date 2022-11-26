import React, { ReactElement, useState } from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChartScreen from "../screens/ChartScreen";
import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";
import Screen from "../components/Screen";

const Tab = createBottomTabNavigator();

function NavigationTabs({}): ReactElement {
    const [chartSelections, setChartSelections] = useState<Array<number>>([]);

    function handleChartSelectionsChange(chartId: number): void {
        if (!chartSelections.includes(chartId)) {
            setChartSelections([...chartSelections, chartId]);
        } else {
            setChartSelections(chartSelections.filter((id) => id !== chartId));
        }
    }

    return (
        <Screen style={styles.screen}>
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
