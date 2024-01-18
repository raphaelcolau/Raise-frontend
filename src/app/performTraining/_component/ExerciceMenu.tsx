import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, Chip } from 'react-native-paper';
import { Training, Exercise, EXERCISE_STATUS, Series } from '../../../components/type/types';

export default function ExerciseMenu({ isActive, exercise, setSelected, training }: { isActive: boolean, exercise: Exercise, setSelected: Function, training: Training }) {
    const theme = useTheme();
    const { colors } = theme;

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            padding: 15,
            backgroundColor: colors.surface,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 15,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        }
    });

    return (
        <View>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{width: '100%' }}>

                        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>

                            <Text variant='titleMedium'>{exercise.exerciseName}</Text>
                            
                            {exercise.exerciseState === EXERCISE_STATUS.COMPLETED ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#1B9820' onClose={() => {}} closeIcon="check-circle" >Réalisé</Chip> : null}
                            {exercise.exerciseState === EXERCISE_STATUS.STARTED ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#FF7A00' onClose={() => {}} closeIcon="loading" >En cours</Chip> : null}
                            {exercise.exerciseState === EXERCISE_STATUS.NOT_STARTED ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor={colors.onSurface}>Prochain exercice</Chip> : null}

                        </View>

                        <Text variant='bodyMedium' style={{marginTop: -12}}>{exercise.series.length} série{exercise.series.length > 1 && 's'}</Text>
                    </View>

                    {exercise.exerciseState === EXERCISE_STATUS.STARTED && 
                        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                            <Text>Serie</Text>
                        </View>
                    }

                </View>

            </View>
        </View>
    )
}