import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

interface CardProps {
    id: number;
    title: string;
    subtitle?: string;
    children?: any;
}

function Card({ title, subtitle, children }: CardProps) {
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
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: colors.lightGray,
        marginHorizontal: 20,
        paddingLeft: 10,
        paddingRight: 10,
        overflow: "hidden",
        height: 500,
    },
    subtitle: {
        color: colors.secondary,
        textAlign: "center",
    },
    title: {
        marginBottom: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: colors.dark,
    },
});

export default Card;
