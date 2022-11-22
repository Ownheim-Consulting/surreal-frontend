import React from "react";
import { View, StyleSheet } from "react-native";
import InsetShadow from "react-native-inset-shadow";

import AppText from "./AppText";
import colors from "../config/colors";

function Card({ title, subtitle, inner }) {
    return (
        <View style={styles.card}>
            <AppText
                style={styles.title}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
            >
                {title}
            </AppText>
            <AppText
                style={styles.subtitle}
                numberOfLines={2}
                adjustsFontSizeToFit={true}
            >
                {subtitle}
            </AppText>
            <View style={styles.imageView}>
                <InsetShadow>{inner}</InsetShadow>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.lightGray,
        marginHorizontal: 20,
        overflow: "hidden",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        height: 500,
    },
    detailsContainer: {
        padding: 20,
    },
    subtitle: {
        color: colors.secondary,
        textAlign: "center",
    },
    title: {
        marginBottom: 5,
        align: "center",
        fontWeight: "bold",
        color: colors.dark,
    },
    imageView: {
        borderRadius: 10,
        overflow: "hidden",
        // padding: 10,
        //height: 250,
        flex: 1,
        width: "100%",
        height: "80%",
    },
    shadow: {},
});

export default Card;
