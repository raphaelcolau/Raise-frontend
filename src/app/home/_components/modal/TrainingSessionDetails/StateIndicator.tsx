import React from 'react';
import Text from '../../../../../components/styled/Text';
import { StyleSheet, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { EXERCISE_STATUS } from '../../../../../components/type/types';

export default function StateIndicator({id, status}: {id: number, status: EXERCISE_STATUS}) {
    const theme = useTheme();
    const styles = StyleSheet.create({
        completed: {
            backgroundColor: 'green',
            borderRadius: 15,
        },
        started: {
            borderRadius: 50,
            borderWidth: 1,
            borderColor: '#FF7A00',
            backgroundColor: '#FF7A00',
            aspectRatio: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 13,
            width: 20,
            marginLeft: 1,
        },
        notStarted: {
            borderRadius: 50,
            borderWidth: 1,
            borderColor: theme.colors.onSurface,
            aspectRatio: 1,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 13,
            width: 20,
            marginLeft: 1,
        },
    });

    if (status === EXERCISE_STATUS.COMPLETED) return <View style={styles.completed}><Icon source="check" size={20} color='white' /></View>
    else if (status === EXERCISE_STATUS.STARTED) return <Text adjustsFontSizeToFit={true} variant="bodySmall" style={styles.started}>{id}</Text>
    else return <Text adjustsFontSizeToFit={true} variant="bodySmall" style={styles.notStarted}>{id}</Text>
}