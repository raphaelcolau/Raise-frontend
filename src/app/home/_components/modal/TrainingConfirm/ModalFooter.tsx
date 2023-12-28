import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  useTheme, Button } from 'react-native-paper';
import { Training } from '../../../../../components/type/types';
import StyledButton from '../../../../../components/styled/Button';
import { ValidateTrainingSessionProps, validateTrainingSession } from '../../../../../adapters/training/validateTrainingSession';
import { useSelector } from 'react-redux';

export default function ModalConfirmFooter({activity, dismiss}: {activity: Training, dismiss: Function}) {
    const theme = useTheme();
    const currentDay: string = useSelector((state: any) => state.currentDay.day);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 5,
        },
    });

    const handleValidate = () => {
        const props: ValidateTrainingSessionProps = {
            id: activity.trainingId,
            date: new Date(currentDay),
        };
        validateTrainingSession(props).then((res) => {
            console.log(res)
            dismiss(false);
        });
    }
    
    return (
        <View style={styles.container}>
            <Button mode="text" textColor={theme.colors.onSurface}>Modifier et valider</Button>
            <StyledButton onPress={handleValidate}>Valider</StyledButton>
        </View>
    )
}