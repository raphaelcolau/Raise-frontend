import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { useTheme, Text, Button, Chip, Icon } from 'react-native-paper';
import { Training, Exercise, EXERCISE_STATUS, Series } from '../../components/type/types';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import ExerciseMenu from './_component/ExerciceMenu';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrainings } from '../../store/slice/trainingsSlice';

interface TrainingButtonProps {
    currentExercise: Exercise;
    setCurrentExercise: React.Dispatch<React.SetStateAction<Exercise>>;
    currentSerie: Series;
    setCurrentSerie: Function;
    changeExerciceInTraining: Function;
}

function TrainingButton({ currentExercise, setCurrentExercise, currentSerie, setCurrentSerie, changeExerciceInTraining }: TrainingButtonProps) {
        enum BUTTON_STATE {
        START = 'START',
        PAUSED = 'PAUSED',
        COMPLETED = 'COMPLETED',
        RESTART = 'RESTART',
    }
    const theme = useTheme();
    const { colors } = theme;
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [buttonState, setButtonState] = useState<BUTTON_STATE>(BUTTON_STATE.PAUSED);

    useEffect(() => {
        if (currentExercise.exerciseState === EXERCISE_STATUS.NOT_STARTED) {
            setButtonState(BUTTON_STATE.START);
        } else if (currentExercise.exerciseState === EXERCISE_STATUS.STARTED) {
            setButtonState(BUTTON_STATE.PAUSED);
        } else if (currentExercise.exerciseState === EXERCISE_STATUS.COMPLETED) {
            setButtonState(BUTTON_STATE.COMPLETED);
        }
    }, [currentExercise, currentSerie])

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
    });

    const handlePress = () => {

        if (buttonState === BUTTON_STATE.START) {
            changeExerciceInTraining(currentExercise.exerciseId, {exerciseState: EXERCISE_STATUS.STARTED});
            setCurrentSerie(currentExercise.series[0]);
        } else if (buttonState === BUTTON_STATE.PAUSED) {
            changeExerciceInTraining(currentExercise.exerciseId, {exerciseState: EXERCISE_STATUS.COMPLETED});
            setCurrentSerie(currentExercise.series[0]);
        } else if (buttonState === BUTTON_STATE.COMPLETED) {
            changeExerciceInTraining(currentExercise.exerciseId, {exerciseState: EXERCISE_STATUS.NOT_STARTED});
            setCurrentSerie(currentExercise.series[0]);
        }

    }

    const ButtonSuccess = ({action}: {action: string}) => {
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                padding: 10,
                backgroundColor: '#1B9820',
                borderRadius: 15,
                height: 63,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            action: {
                borderWidth: 1,
                borderRadius: 15,
                borderColor: colors.onSurface,
                textAlign: 'center',
                textAlignVertical: 'center',
                padding: 13,
                paddingTop: 7,
            }
        });

        return (
            <View
                style={styles.container}
            >
                <Text variant='titleLarge'> Faite votre série </Text>
                <Text variant='titleLarge' style={styles.action}> {action} </Text>
            </View>
        )
    }

    const ButtonPause = () => {
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                padding: 10,
                backgroundColor: colors.primary,
                borderRadius: 15,
                height: 63,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 15,
            },
            textContainer: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
            },
        });

        return (
            <View
                style={styles.container}
            >
                <AnimatedProgressWheel
                    size={40}
                    width={25}
                    color={colors.onSurface}
                    backgroundColor={colors.primary}
                    rotation={'-90deg'}
                    progress={90}
                />

                <View style={styles.textContainer}>
                    <Text variant='titleSmall'> Vous êtes en repos </Text>
                    <Text variant='titleLarge'> Patienter 2 min 12 </Text>
                </View>

                <View style={{height: '100%'}}>
                    <Icon source='menu-up' size={30} color={colors.onSurface} />
                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
           
           <TouchableOpacity
                onPress={() => handlePress()}
                disabled={isDisable}
           >
                {buttonState === BUTTON_STATE.START && <ButtonSuccess action='Démarrer' />}
                {buttonState === BUTTON_STATE.COMPLETED && <ButtonSuccess action="J'ai terminé" />}
                {buttonState === BUTTON_STATE.PAUSED && <ButtonPause />}
           </TouchableOpacity>

        </View>
    )

}



export default function PerformTrainingPage({ navigation, route }: { navigation: any, route: any }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { colors } = theme;
    const selectedTraining: Training = route.params.training;
    const [currentExercise, setCurrentExercise] = useState<Exercise>(selectedTraining.trainingExercises[0]);
    const [currentSerie, setCurrentSerie] = useState<Series>(selectedTraining.trainingExercises[0].series[0]);
    
    const currentDay = new Date(useSelector((state: any) => state.currentDay.day));
    const formatedDate = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;
    const savedTraining = useSelector((state: any) => state.trainings.saved);
    const [training, setTraining] = useState<Training>(savedTraining[formatedDate].find((training: Training) => training.trainingId === selectedTraining.trainingId));
    
    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: colors.background,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        content: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            gap: 13,
        },
    });
    
    const changeExerciceInTraining = (exerciseID: number, props: any) => {
        let newTraining = {...training};
        const currentExercise = newTraining.trainingExercises.find((exercise: Exercise) => exercise.exerciseId === exerciseID);
        const newExercise = {...currentExercise, ...props};
        newTraining.trainingExercises = newTraining.trainingExercises.map((exercise: Exercise) => {
            if (exercise.exerciseId === exerciseID) {
                return newExercise;
            }
            return exercise;
        });

        const toSavedTraining = {
            ...savedTraining,
            [formatedDate]: savedTraining[formatedDate].map((training: Training) => {
                if (training.trainingId === newTraining.trainingId) {
                    return newTraining;
                }
                return training;
            })
        }

        dispatch(updateTrainings(toSavedTraining));
        setTraining(newTraining);
        setCurrentExercise(newExercise);
    }

    return (
        <View style={styles.container}>

            <HeaderSubPage navigation={navigation} route={route} />

            <View style={styles.content}>
                
                <View>
                    <Text variant='headlineMedium'>Séance de sport</Text>
                    <Text variant='titleSmall'>{training.trainingName}</Text>
                </View>

                {training.trainingExercises.map((exercise: Exercise) => (
                    <ExerciseMenu
                        key={exercise.exerciseId}
                        currentSerieID={currentSerie.id}
                        exercise={exercise}
                    />
                ))}

            </View>

            <TrainingButton       
                currentExercise={currentExercise}
                setCurrentExercise={setCurrentExercise}
                currentSerie={currentSerie}
                setCurrentSerie={setCurrentSerie}
                changeExerciceInTraining={changeExerciceInTraining}
            />

        </View>
    )
}