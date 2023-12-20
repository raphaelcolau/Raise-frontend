import React from "react";
import { withTheme } from "react-native-paper";
import { WithThemeProps } from "../type/types";
import { Text } from 'react-native-paper';
import { VariantProp } from "react-native-paper/lib/typescript/components/Typography/types";

interface TextWithThemeProps extends WithThemeProps {
    variant?: VariantProp<never>;
}

const TextWithTheme = ({ theme, children, variant, style }: TextWithThemeProps) => {
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