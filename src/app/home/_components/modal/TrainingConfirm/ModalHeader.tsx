import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  IconButton, Icon } from 'react-native-paper';
import Text from '../../../../../components/styled/Text';
import { Training } from '../../../../../components/type/types';


export default function ModalConfirmHeader({dismiss, activity}: {dismiss: Function, activity: Training}) {
    const styles = StyleSheet.create({
        Header: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: -10,
        },
        subtitle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 8,
        },
    });

    return (
        <View style={styles.container}>

            <View style={styles.Header}>
                <Text variant="headlineSmall">Valider la séance</Text>
                <IconButton icon="close" onPress={() => dismiss(false)} />
            </View>

            <View style={styles.subtitle}>
                <Icon source={activity.trainingIconName.replace('icon_', '')} size={18} color={activity.trainingIconHexadecimalColor} />
                <Text variant="titleMedium">{activity.trainingName}</Text>
            </View>
        </View>
    )
} 