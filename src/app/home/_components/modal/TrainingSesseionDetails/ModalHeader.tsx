import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Training } from '../../../../../components/type/types';
import BasicContent from './BasicContent';

export default function ModalHeader({activity, setIsVisible}: {activity: Training, setIsVisible: Function}) {
    const modalStyles = StyleSheet.create({
        ModalHeader: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    });

    return (
        <View style={modalStyles.ModalHeader}>
            <BasicContent activity={activity}/>
            <IconButton icon="close" onPress={() => setIsVisible(false)} />
        </View>
    )
}