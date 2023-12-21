import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default function Day({date, selected}: {date: Date, selected?: boolean}) {
    const theme = useTheme();
    const day = date.getDate();
    const weekDay = date.toLocaleString('fr-FR', { weekday: 'short'}).substring(0, 3);

    const styles = StyleSheet.create({
        container: {
            width: 39,
            height: 51,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            backgroundColor: selected ? theme.colors.primary : 'transparent',
        },
        text: {
            color: selected ? '#000000' : '#FFFFFF',
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