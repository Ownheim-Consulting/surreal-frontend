import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "@app/components/AppText";

type ErrorMessageProps = {
    id?: string;
    message: string;
};

function ErrorMessage({ id = "", message }: ErrorMessageProps) {
    return (
        <View key={id + "-errorMessageView"} style={styles.fill}>
            <AppText id={id + "-errorMessageAppText"}>{message}</AppText>
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
