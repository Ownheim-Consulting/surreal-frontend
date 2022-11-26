import React, { ReactElement } from "react";
import { SafeAreaView, View } from "react-native";

import { defaultStyles } from "../config/styles";

interface ScreenProps {
    children?: any;
    style?: any;
}

function Screen({ children, style }: ScreenProps): ReactElement {
    return (
        <SafeAreaView style={[defaultStyles.screen, style]}>
            <View style={{flex: 1}}>{children}</View>
        </SafeAreaView>
    );
}

export default Screen;
