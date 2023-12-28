import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import MainButton from '../../../../../components/styled/Button';

export default function ModalFooter({dismiss, toOpen}: {dismiss: Function, toOpen: Function}) {
    const theme = useTheme();

    const modalStyles = StyleSheet.create({
        ModalFooter: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 5,
        },
        ModalButton: {
            borderRadius: 15,
        },
    });

    const handleValidate = () => {
        dismiss(false);
        toOpen(true);
    }

    return (
        <View style={modalStyles.ModalFooter}>

            <Button style={{...modalStyles.ModalButton, borderColor: theme.colors.error}} textColor={theme.colors.error} mode='outlined'>
                Annuler
            </Button>

            <Button 
                style={{...modalStyles.ModalButton, borderColor: theme.colors.tertiary}}
                textColor={theme.colors.tertiary}
                mode='outlined'
                onPress={() => handleValidate()}
            >
                Valider
            </Button>

            <MainButton>Reprendre</MainButton>
        </View>
    )
}