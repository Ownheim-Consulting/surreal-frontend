import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChartScreen from "../screens/ChartScreen";
import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";

const Tab = createBottomTabNavigator();

function NavigationTabs() {
    const [chartSelections, setChartSelections] = useState([]);

    function handleChartSelectionsChange(id, remove) {
        if (!chartSelections.includes(id)) {
            setChartSelections([...chartSelections, id]);
            return;
        }

        if (remove) {
            setChartSelections(chartSelections.filter((item) => item !== id));
        }
        return;
    }
    return (
        <NavigationContainer theme={myTheme}>
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
                    component={HomeScreen}
                    options={{
                        tabBarIcon: (tabInfo) => (
                            <MaterialCommunityIcons
                                name="home"
                                size={30}
                                color={tabInfo.color}
                            />
                        ),
                    }}
                />
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
    );
}

const myTheme = {
    colors: {
        primary: colors.danger,
        background: colors.dark_blue,
        text: colors.light,
        border: colors.dark_blue,
        notification: colors.danger,
        card: colors.dark_blue,
    },
};

export default NavigationTabs;
