import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Icon, Text, useTheme } from 'react-native-paper';
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { Training, Exercise } from '../../components/type/types';
import StyledButton from '../../components/styled/Button';

function ExerciseMenu({isActive, exercise, setSelected}: {isActive: boolean, exercise: Exercise, setSelected: Function}) {
    const theme = useTheme();
    const { colors } = theme;

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            padding: 10,
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
        <Pressable onPress={() => setSelected(exercise.exerciseId)}>
            <View style={styles.container}>

                <View style={styles.header}>
                    <View style={{padding: 7}}>

                        <View style={{display: 'flex', flexDirection: 'row', gap: 6}}>
                            <Text variant='titleMedium'>{exercise.exerciseName}</Text>
                            <Text variant='titleMedium' style={{color: colors.primary}}>#{exercise.exerciseId}</Text>
                        </View>

                        <Text variant='bodyMedium'>{exercise.series.length} série{exercise.series.length > 1 && 's'}</Text>

                    </View>

                    <Icon source={ isActive ? 'menu-up' : 'menu-down'} size={30} color={colors.onSurface} />
                </View>

                {isActive &&
                    <View style={{padding: 5, display: 'flex', flexDirection: 'column', gap: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}> </Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Reps</Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Charge</Text>
                            <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>Repo</Text>
                        </View>

                        {exercise.series.map((serie) => (
                            <View key={serie.id} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}> ● Série {serie.id < 10 ? `0${serie.id}` : serie.id}</Text>
                                <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>{serie.repsCount}</Text>
                                <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>{serie.weight}</Text>
                                <Text variant='bodyLarge' style={{flex: 1, textAlign: 'center'}}>{serie.restTime}</Text>
                            </View>
                        ))}
                        
                    </View>
                }

                {isActive &&
                    <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                        <StyledButton>Modifier</StyledButton>
                        <Button textColor={colors.onSurface}>Passer l'exercice</Button>
                    </View>
                }

            </View>
        </Pressable>
    )
}

export default function PerformManuallyTrainingSession({ navigation, route }: { navigation: any, route: any }) {
    const theme = useTheme();
    const { colors } = theme;
    const training: Training = route.params.training;
    const [selected, setSelected] = React.useState<number | null>(null);

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: colors.background,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            gap: 13,
        },
    });

    const handleSetSelected = (exerciseId: number) => {
        if (selected === exerciseId) {
            setSelected(null);
        } else {
            setSelected(exerciseId);
        }
    }

    return (
        <View style={styles.container}>
            
            <HeaderSubPage navigation={navigation} route={route} />
            
            <View style={styles.content}>
                
                <View>
                    <Text variant='headlineSmall'>Modifier session avant validation</Text>
                    <Text variant='titleMedium'>Séance {training.trainingName}</Text>
                </View>

                <View style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 15}}>
                    {training.trainingExercises.map((exercise: Exercise) => (<ExerciseMenu key={exercise.exerciseId} isActive={selected === exercise.exerciseId} setSelected={handleSetSelected} exercise={exercise} />))}
                </View>

                <StyledButton
                    icon='play'
                >
                    Valider la séance
                </StyledButton>
            
            </View>

        </View>
    )
}