import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text, Chip } from 'react-native-paper';
import { Training, Exercise, EXERCISE_STATUS, Series } from '../../../components/type/types';

export default function ExerciseMenu({ exercise, currentSerieID }: { exercise: Exercise, currentSerieID: number }) {
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

                </View>

                {exercise.exerciseState === EXERCISE_STATUS.STARTED && 
                    <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}> </Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Reps</Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Charge</Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Repo</Text>
                        </View>

                        {exercise.series.map((serie) => {
                            const color = serie.id === currentSerieID ? colors.primary : colors.onSurface;

                            return (
                                <View key={serie.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>

                                    {serie.id === currentSerieID &&
                    
                                        <View style={{
                                            width: 20,
                                            height: 14,
                                            backgroundColor: color,
                                            borderRadius: 2,
                                            borderTopRightRadius: 10,
                                            borderBottomRightRadius: 10,
                                            position: 'absolute',
                                            left: -20,
                                            top: 7,
                                        
                                        }} />    
                                    }
                                    
                                
                                    <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center', color: color}}> ● Série {serie.id < 10 ? `0${serie.id}` : serie.id}</Text>
                                    <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center', color: color}}>{serie.repsCount}</Text>
                                    <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center', color: color}}>{serie.weight} kg</Text>
                                    <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center', color: color}}>{serie.restTime}</Text>
                                </View>
                            )
                        })}
                    
                </View>
                }

            </View>
        </View>
    )
}