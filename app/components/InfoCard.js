import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import AppText from "./AppText";
import colors from "../config/colors";

function InfoCard({ id, title, subTitle, whenPressed }) {
    const [isCheckboxToggled, setCheckboxToggled] = useState(false);

    function onCheckboxToggle() {
        whenPressed(id, isCheckboxToggled);
        setCheckboxToggled(!isCheckboxToggled);
    }

    return (
        <View style={[styles.container]}>
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
                    {subTitle}
                </AppText>
            </View>
            <View style={styles.checkboxColumn}>
                <Checkbox
                    style={styles.checkbox}
                    value={isCheckboxToggled}
                    onValueChange={onCheckboxToggle}
                    color={colors.dark}
                />
            </View>
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
    checkboxColumn: {
        alignItems: "center",
        justifyContent: "center",
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
