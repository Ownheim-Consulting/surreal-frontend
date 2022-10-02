import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListingsScreen from "../screens/ListingsScreen";
import colors from "../config/colors";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function NaviagtionTabs() {
  return (
    <NavigationContainer theme={myTheme}>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen
          name="Select Data"
          component={ListingsScreen}
          options={{
            tabBarIcon: (tabInfo) => (
              <MaterialCommunityIcons
                name="plus-box-outline"
                size={30}
                color={tabInfo.color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={SettingsScreen}
          options={{
            tabBarIcon: (tabInfo) => (
              <MaterialCommunityIcons
                name="chart-line"
                size={30}
                color={tabInfo.color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    activeTintColor: colors.danger,
  },
});

const myTheme = {
  colors: {
    primary: colors.danger,
    background: colors.light,
    text: colors.light,
    border: colors.dark_blue,
    notification: colors.danger,
    card: colors.dark_blue,
  },
};
