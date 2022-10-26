import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NaviagtionTabs from "./app/components/NavigationTabs";
import Screen from "./app/components/Screen";
import colors from "./app/config/colors";

export default function App() {
  return (
    <Screen style={styles.screen}>
      <NaviagtionTabs />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.dark_blue,
  },
});
