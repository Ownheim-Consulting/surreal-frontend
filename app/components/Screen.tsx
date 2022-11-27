import React, { ReactElement } from "react";
import { SafeAreaView, View } from "react-native";

interface ScreenProps {
    children?: any;
    style?: any;
}

function Screen({ children, style }: ScreenProps): ReactElement {
    return (
        <SafeAreaView style={[{flex: 1}, style]}>
            <View style={{ flex: 1 }}>{children}</View>
        </SafeAreaView>
    );
}

export default Screen;
