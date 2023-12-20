import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";
import { TextInputProps } from "react-native-paper";
import { TextInput } from "react-native-paper";

interface TextInputWithThemeProps extends TextInputProps {
    theme: any;
    style?: any;
}

const TextInputWithTheme = ({ theme, style, ...props }: TextInputWithThemeProps) => {
    const { colors } = theme;

    return (
        <TextInput 
            style={{
                ...style,
                backgroundColor: colors.card,
                borderRadius: 15,
                overflow: 'hidden',
            }}
            theme={{ roundness: 15 }} 
            {...props}
            underlineColor="transparent"
            underlineStyle={{
                backgroundColor: colors.card,
            }}
        />
    )
} 

export default withTheme(TextInputWithTheme);