import React from "react";
import { withTheme } from "react-native-paper";
import { WithThemeProps } from "../type/types";
import { Text } from 'react-native-paper';
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";
import { TextProps } from "react-native";

interface TextWithThemeProps extends TextProps {
    theme: any;
    style?: any;
    children?: any;
    variant?: VariantProp<any>;
}

const TextWithTheme = ({ theme, children, style, variant, ...props }: TextWithThemeProps) => {
    const { colors } = theme;

    return (
        <Text 
            style={{
                ...style,
                color: colors.text,
            }}
            variant={variant}
        >
            {children}
        </Text>
    )
} 

export default withTheme(TextWithTheme);