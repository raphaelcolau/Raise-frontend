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
    type?: 'error' | 'success' | 'warning' | 'info' | 'default';
}

const TextWithTheme = ({ theme, children, style, variant, type, ...props }: TextWithThemeProps) => {
    const { colors } = theme;

    return (
        <Text 
            style={{
                ...style,
                color: type ? colors[type] : colors.text,
            }}
            variant={variant}
        >
            {children}
        </Text>
    )
} 

export default withTheme(TextWithTheme);