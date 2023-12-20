import React from "react";
import { StyleSheet } from "react-native";
import { ButtonProps, withTheme, Button } from "react-native-paper";

interface ButtonWithThemeProps extends ButtonProps {
    theme: any;
    style?: any;
}

const ButtonWithTheme = ({ theme, style, ...props }: ButtonWithThemeProps) => {
    const { colors } = theme;

    const styles = StyleSheet.create({
            ...style,
            backgroundColor: colors.primary,
            borderRadius: 15,
    });

    return (
        <Button 
            style={styles}
            {...props}
            mode="contained"
            textColor="white"
        >
            {props.children}
        </Button>
    )
} 

export default withTheme(ButtonWithTheme);