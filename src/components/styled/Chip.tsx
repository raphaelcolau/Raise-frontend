import React from "react";
import { withTheme } from "react-native-paper";
import { Chip, Icon } from "react-native-paper";

interface ChipWithThemeProps extends React.ComponentProps<typeof Chip> {
    children: React.ReactNode;
    theme: any;
    selected?: boolean;
    icon?: string;
    style?: any;
}

const ChipWithTheme = ({ theme, style, children, selected, icon, ...props }: ChipWithThemeProps) => {
    const { colors } = theme;

    return (
        <Chip 
            style={{
                ...style,
                backgroundColor: colors.card,
                borderRadius: 12,
                borderColor: selected ? colors.primary : colors.card,
            }}
            mode="outlined"
            showSelectedCheck={false}
            selectedColor={selected ? colors.primary : colors.text}
            icon={() => icon ? <Icon source={icon} size={19} color={selected ? colors.primary : colors.text} /> : null }
            theme={{
                colors: {
                    ...colors,
                    text: colors.text,
                },
            }}
            {...props}
        >
            {children}
        </Chip>
    )
}

export default withTheme(ChipWithTheme);