import React from 'react';
import Text from '../../../../../components/styled/Text';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Training, Exercise } from '../../../../../components/type/types';
import StateIndicator from './StateIndicator';

export default function ModalContent({activity}: {activity: Training}) {
    const theme = useTheme();
    const modalStyles = StyleSheet.create({
        Exercise: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 15,
        },
    });

    return (
        <View style={{width: '100%', paddingLeft: 15}}>
            {activity.trainingExercises.map((exercise: Exercise, index: number) => {
                const isLast = index === activity.trainingExercises.length - 1;

                return (
                    <View key={index}>
                        <View key={index} style={modalStyles.Exercise}>
                            <StateIndicator id={index + 1} status={exercise.exerciseState} />
                            <Text variant='bodyLarge'>{exercise.exerciseName}</Text>
                        </View>
                        {isLast ? null : <View style={{height: 15, width: 1, backgroundColor: theme.colors.onSurface, marginLeft: 11, marginTop: 3, marginBottom: 3}} />}
                    </View>
                )
            })}
        </View>
    )
}