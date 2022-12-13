import React, { ReactElement } from "react";
import { SafeAreaView, View } from "react-native";

interface ScreenProps {
    id?: string;
    children?: any;
    style?: any;
}

function Screen({ id = "", children, style }: ScreenProps): ReactElement {
    return (
        <SafeAreaView key={id + "-screenSafeAreaView"} style={[{ flex: 1 }, style]}>
            <View key={id + "-screenView"} style={{ flex: 1 }}>
                {children}
            </View>
        </SafeAreaView>
    );
}

export default Screen;
