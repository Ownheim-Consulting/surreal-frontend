import React from "react";
import { Image, StyleSheet } from "react-native";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

function HomeScreen() {
    return (
        <Screen style={styles.screen}>
            <AppText style={styles.text} numberOfLines={1}>
                Welcome to Surreal!
            </AppText>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
    },
    logo: {
        alignSelf: "center",
        margin: 50,
    },
});

export default HomeScreen;
