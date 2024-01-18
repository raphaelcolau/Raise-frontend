import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import MainButton from '../../../../../components/styled/Button';
import { cancelTrainingSessionDay } from '../../../../../adapters/training/cancelTrainingSessionDay';
import { TRAINING_STATUS, Training } from '../../../../../components/type/types';
import { useSelector } from 'react-redux';

export default function ModalFooter({dismiss, toOpen, activity, navigation}: {dismiss: Function, toOpen: Function, activity: Training, navigation: Function}) {
    const theme = useTheme();
    const currentDay = useSelector((state: any) => state.currentDay.day);
    const currentDayDate = new Date(currentDay);

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

    const handleGiveUp = () => {
        cancelTrainingSessionDay({id: activity.trainingId, date: currentDayDate});
        dismiss(false);
    }

    const hanldleResume = () => {
        dismiss(false);
        navigation('PerformTraining', {training: activity});
    }

    return (
        <View style={modalStyles.ModalFooter}>

            {activity.trainingStatus === TRAINING_STATUS.PERFORMED ? 
                <Button 
                    style={{...modalStyles.ModalButton, borderColor: theme.colors.error}}
                    textColor={theme.colors.error}
                    mode='outlined'
                    onPress={() => handleGiveUp()}
                >
                    Annuler
                </Button>
            : null}

            <Button 
                style={{...modalStyles.ModalButton, borderColor: theme.colors.tertiary}}
                textColor={theme.colors.tertiary}
                mode='outlined'
                onPress={() => handleValidate()}
            >
                Valider
            </Button>

            <MainButton
                onPress={() => hanldleResume()}
            >
                Reprendre
            </MainButton>
        </View>
    )
}