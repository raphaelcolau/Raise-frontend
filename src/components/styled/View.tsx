import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { WithThemeProps } from "../type/types";

const ViewWithTheme = ({ theme, children, style }: WithThemeProps) => {
    const { colors } = theme;

    return (
        <View 
            style={{
                ...style,
                backgroundColor: colors.background,
            }}
        >
            {children}
        </View>
    )
} 

export default withTheme(ViewWithTheme);