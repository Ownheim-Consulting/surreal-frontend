import React, { ReactElement } from "react";
import { Text, TextProps } from "react-native";

import { defaultStyles } from "../config/styles";

interface AppTextProps extends TextProps {
    id?: string;
    children: any;
    style?: any;
    otherProps?: Array<TextProps>;
}

function AppText({ id = "", children, style, ...otherProps }: AppTextProps): ReactElement {
    return (
        <Text key={id + "-appTextText"} style={[defaultStyles.text, style]} {...otherProps}>
            {children}
        </Text>
    );
}

export default AppText;
