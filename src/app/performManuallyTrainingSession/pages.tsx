import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
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
            height: 70,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: colors.surface,
            borderRadius: 15,
        },
    });

    return (
        <Pressable onPress={() => setSelected(exercise.exerciseId)}>
            <View style={styles.container}>
                <Text variant='titleSmall'>{exercise.exerciseName}</Text>
                <Icon source={ isActive ? 'menu-up' : 'menu-down'} size={30} color={colors.onSurface} />
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

                <View style={{flex: 1}}>
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