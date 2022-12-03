import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import colors from "@app/config/colors";

function LoadingIndicator() {
    return (
        <View style={styles.fill}>
            <ActivityIndicator size="large" color={colors.white} />
        </View>
    );
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default LoadingIndicator;
