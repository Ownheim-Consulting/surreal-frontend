import React, { ReactElement } from "react";
import { Text, TextProps } from "react-native";

import { defaultStyles } from "../config/styles";

interface AppTextProps extends TextProps {
    children: any;
    style: any;
    otherProps?: Array<TextProps>;
}

function AppText({ children, style, otherProps }: AppTextProps): ReactElement {
    return (
        <Text style={[defaultStyles.text, style]} {...otherProps}>
            {children}
        </Text>
    );
}

export default AppText;
