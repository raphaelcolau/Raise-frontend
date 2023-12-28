import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default function Day({date, selected}: {date: Date, selected?: boolean}) {
    const theme = useTheme();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const weekDay = date.toLocaleString('fr-FR', { weekday: 'short'}).substring(0, 3);
    const today = new Date().getDate();
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    let weAreInCurrentDay = false;

    if (day === today && month === todayMonth && year === todayYear) {
        weAreInCurrentDay = true;
    }

    const styles = StyleSheet.create({
        container: {
            width: 39,
            height: 51,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            backgroundColor: weAreInCurrentDay ? theme.colors.primary : 'transparent',
            borderColor: selected ? theme.colors.primary : 'transparent',
            borderWidth: selected ? 1 : 0,
        },
        text: {
            color: weAreInCurrentDay ? '#000000' : '#FFFFFF',
            textTransform: 'capitalize',
        }
    });

    return (
        <View style={styles.container}>
            <Text variant="bodyMedium" style={styles.text}>{weekDay}</Text>
            <Text variant="bodyLarge" style={{...styles.text, fontWeight: 'bold'}}>{day}</Text>
        </View>
    )
}