import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@app/components/AppText";

type ErrorMessageProps = {
    message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <View style={styles.fill}>
            <AppText>{message}</AppText>
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

export default ErrorMessage;
