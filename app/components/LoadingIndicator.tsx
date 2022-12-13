import React, { ReactElement } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import colors from "@app/config/colors";

interface LoadingIndicatorProps {
    id?: string;
}

function LoadingIndicator({ id = "" }: LoadingIndicatorProps): ReactElement {
    return (
        <View key={id + "-loadingIndicatorView"} style={styles.fill}>
            <ActivityIndicator
                key={id + "-loadingIndicatorActivityIndicator"}
                size="large"
                color={colors.white}
            />
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
