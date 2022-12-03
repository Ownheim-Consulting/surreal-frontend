import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";

import AppText from "./AppText";

interface CardProps {
    title: string;
    subtitle?: string;
    children?: any;
}

function Card({ title, subtitle, children }: CardProps) {
    return (
        <View key={"cardOuterView"} style={styles.card}>
            <AppText style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>
                {title}
            </AppText>
            <AppText style={styles.subtitle} numberOfLines={2} adjustsFontSizeToFit={true}>
                {subtitle}
            </AppText>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: colors.lightGray,
        overflow: "hidden",
    },
    subtitle: {
        color: colors.secondary,
        textAlign: "center",
        marginBottom: 5,
        marginHorizontal: 15,
    },
    title: {
        marginBottom: 5,
        marginHorizontal: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.dark,
    },
});

export default Card;
