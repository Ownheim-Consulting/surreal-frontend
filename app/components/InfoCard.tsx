import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";

import colors from "../config/colors";

interface InfoCardProps {
    id: number;
    title: string;
    subtitle?: string;
    children?: any;
    style?: any;
}

function InfoCard({
    id,
    title,
    subtitle,
    children,
    style,
}: InfoCardProps): ReactElement {
    return (
        <View key={id} style={[styles.container, style]}>
            <View style={[styles.textColumn]}>
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
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 10,
        marginHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        overflow: "hidden",
        backgroundColor: colors.lightGray,
    },
    textColumn: {
        width: "75%",
        alignItems: "flex-start",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
    },
    subtitle: {
        fontWeight: "normal",
        fontSize: 15,
        color: "black",
    },
});

export default InfoCard;
