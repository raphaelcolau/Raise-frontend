import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, useTheme, Icon, Button } from "react-native-paper";
import HeaderSubPage from "../../components/headerSubPage/HeaderSubPage";
import ModalInput from '../../components/PlaceHolderInput/PlaceHolderInput';
import { getTrainingByID } from "../../adapters/training/getTrainingByID";
import { Series, TrainingProps } from '../../components/type/types';
import StyledButton from "../../components/styled/Button";
import TextInput from "../../components/styled/TextInput";
import SeriesManagement from './_component/SerieManagement';
import { addExerciseToTraining } from "../../adapters/training/addExerciceToTraining";



export default function AddTrainingSessionExercise({ navigation, route, id }: { navigation: any, route: any, id?: number}) {
    const theme = useTheme();
    const { colors } = theme;
    const [training, setTraining] = useState<TrainingProps | null>(null);
    const trainingID = id ? id : route.params.id;
    const [series, setSeries] = useState<Series[]>([
        {completed: false, repsCount: 8, restTime: '1:30', weight: 40, id: 1, positionIndex: 1},
    ]);
    const [note, setNote] = useState<string>('');

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            padding: 10,
            backgroundColor: colors.background,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
        },
    });

    useEffect(() => {
        getTrainingByID(trainingID).then((res) => {
            setTraining(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [trainingID])

    const duplicateLastSerie = () => {
        const lastSerie = series[series.length - 1];
        const newSerie = {...lastSerie, id: lastSerie.id + 1, positionIndex: lastSerie.positionIndex + 1}
        setSeries([...series, newSerie])
    }

    const handleCreateExercise = () => {
        addExerciseToTraining({
            trainingID: trainingID,
            exerciceID: 1,
            notes: note,
            series: series,
            numberOfWarmUpSeries: series.length,
        }).then((res) => {
            navigation.navigate("Home")
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>

                <HeaderSubPage navigation={navigation} route={route} />
                <Text variant="headlineSmall" >Ajouter des exercices</Text>
                <Text variant="titleMedium" style={{marginTop: -13, marginBottom: 15}}>Séance {training?.name}</Text>

                <ModalInput
                    value="Choisir un exercice"
                    label="Exercice"
                    right={
                        <Icon
                            source="menu-down"
                            size={30}
                        />
                    }
                />

                <ModalInput
                    value="Série dégressive"
                    label="Modèle"
                    right={
                        <Icon
                            source="menu-down"
                            size={30}
                        />
                    }
                />

                <SeriesManagement series={series} setSeries={setSeries} />

                <Button
                    onPress={duplicateLastSerie}
                    icon="plus"
                >
                    Ajouter une série
                </Button>

                <TextInput
                    label="Notes"
                    multiline={true}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Ajouter des notes"
                />

                <StyledButton
                    style={{marginTop: 10}}
                    icon='play'
                    onPress={handleCreateExercise}
                >
                    Ajouter l'exercice
                </StyledButton>
            </View>

        </ScrollView>
    )
}