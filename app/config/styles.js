import Constants from "expo-constants";
import { Platform, StyleSheet } from "react-native";

import colors from "./colors";

export const defaultStyles = StyleSheet.create({
    colors,
    text: {
        color: colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
    screen: {
        paddingTop: Constants.statusBarHeight,
    },
});
