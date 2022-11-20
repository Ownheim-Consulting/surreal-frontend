import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListingsScreen from "../screens/ListingsScreen";
import colors from "../config/colors";
import GraphScreen from "../screens/GraphScreen";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function NaviagtionTabs() {
    const [chartSelections, setChartSelections] = useState([]);

    function handleChartSelectionsChange(id, remove) {
        if (!chartSelections.includes(id)) {
            setChartSelections([...chartSelections, id]);
            return;
        }

        if (remove) {
            setChartSelections(chartSelections.filter(item => item !== id));
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
            {() => <ListingsScreen handleChartSelectionChange={handleChartSelectionsChange} /> }
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
          name="Graphs"
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
            {() => <GraphScreen chartIds={chartSelections} /> }
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
