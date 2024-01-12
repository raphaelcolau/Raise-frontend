import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Touchable, View } from "react-native";
import { Text, useTheme, Icon } from "react-native-paper";
import HeaderSubPage from "../../components/headerSubPage/HeaderSubPage";
import ModalInput from '../../components/PlaceHolderInput/PlaceHolderInput';
import { getTrainingByID } from "../../adapters/training/getTrainingByID";
import { Series, TrainingProps } from '../../components/type/types';
import StyledButton from "../../components/styled/Button";
import TextInput from "../../components/styled/TextInput";
import { DraxProvider, DraxView } from 'react-native-drax';


function SerieComponent({ serie }: { serie: Series }) {
    const [active, setActive] = useState<boolean>(false);
    const theme = useTheme();
    const { colors } = theme;
    const serieName = [
        'Série de chauffe',
        'Première série',
        'Deuxième série',
        'Troisième série',
        'Quatrième série',
        'Cinquième série',
        'Sixième série',
        'Septième série',
        'Huitième série',
        'Neuvième série',
        'Dixième série',
        'Onzième série',
        'Douzième série',
        'Treizième série',
        'Quatorzième série',
        'Quinzième série',
        'Seizième série',
        'Dix-septième série',
        'Dix-huitième série',
        'Dix-neuvième série',
        'Vingtième série',
        'Vingt-et-unième série',
        'Vingt-deuxième série',
        'Vingt-troisième série',
        'Vingt-quatrième série',
        'Vingt-cinquième série',
        'Vingt-sixième série',
        'Vingt-septième série',
        'Vingt-huitième série',
        'Vingt-neuvième série',
        'Trentième série',
        'Trente-et-unième série',
        'Trente-deuxième série',
        'Trente-troisième série',
        'Trente-quatrième série',
        'Trente-cinquième série',
        'Trente-sixième série',
        'Trente-septième série',
        'Trente-huitième série',
        'Trente-neuvième série',
        'Quarantième série',
        'Quarante-et-unième série',
        'Quarante-deuxième série',
        'Quarante-troisième série',
        'Quarante-quatrième série',
        'Quarante-cinquième série',
        'Quarante-sixième série',
        'Quarante-septième série',
        'Quarante-huitième série',
        'Quarante-neuvième série',
        'Cinquantième série',
    ]

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 80,
            backgroundColor: active ? colors.outline + '80' : colors.background,
            borderRadius: 10,
            padding: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 3,
        },
        inputContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    });

    const Field = ({children}: {children: React.ReactNode}) => {
        return (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5,
                    backgroundColor: colors.surface,
                    padding: 12,
                    minWidth: 50,
                    borderRadius: 10,
                }}
            >
                <Text variant="titleSmall" style={{
                }}> 
                    {children}
                </Text>
                <Icon source="menu-down" size={25} />
            </View>
        )
    }


    return (
        <Pressable
            onPressIn={() => setActive(true)}
            onPressOut={() => setActive(false)}
        >
            <View style={styles.container}>
                <Text variant="bodySmall" style={{color: colors.onSurface, marginTop: -5}}>{serieName[serie.positionIndex]}</Text>
                <View style={styles.inputContainer}>
                    <Field>{serie.repsCount}</Field>
                    <Field>1:0:1</Field>
                    <Field>{serie.restTime}</Field>
                    <Field>{serie.weight} kg</Field>
                </View>
            </View>
        </Pressable>
    )
}

function SeriesManagement({ series, setSeries }: { series: Series[], setSeries: Function}) {
    const theme = useTheme();
    const { colors } = theme;

    const styles = StyleSheet.create({
        titleGrid: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 10,
        },
        listView: {
            width: '100%',
            height: 200,
            borderWidth: 1,
            borderColor: colors.primary,
        },
        listContent: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
    });



    return (
        <DraxProvider>
            <View>
                <Text variant="titleMedium">Series de l'exercice</Text>

                <View style={styles.titleGrid}>
                    <Text variant="titleSmall" style={{color: colors.primary}}>RÉPÉTITIONS</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>TEMPO</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>REPOS</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>CHARGE</Text>
                </View>

                <View style={styles.listView}>

                    <FlatList
                        data={series}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <SerieComponent serie={item} />
                            )
                        }}
                    />
                    
                </View>

            </View>
        </DraxProvider>
    )
}

export default function AddTrainingSessionExercise({ navigation, route, id }: { navigation: any, route: any, id?: number}) {
    const theme = useTheme();
    const { colors } = theme;
    const [training, setTraining] = useState<TrainingProps | null>(null);
    const trainingID = id ? id : route.params.id;
    const [series, setSeries] = useState<Series[]>([
        {completed: false, repsCount: 12, restTime: '2m30', weight: 20, id: 1, positionIndex: 0},
        {completed: false, repsCount: 12, restTime: '2m30', weight: 20, id: 1, positionIndex: 1},
        {completed: false, repsCount: 12, restTime: '2m30', weight: 20, id: 1, positionIndex: 2},
        {completed: false, repsCount: 12, restTime: '2m30', weight: 20, id: 1, positionIndex: 3},
    ]);

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
            padding: 10,
            backgroundColor: colors.background,
        },
    });

    useEffect(() => {
        getTrainingByID(trainingID).then((res) => {
            setTraining(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [trainingID])

    return (
        <View style={styles.container}>
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

            {/* <SeriesManagement series={series} setSeries={setSeries} /> */}
            <TestDrax />

            <TextInput
                label="Notes"
                multiline={true}
                placeholder="Ajouter des notes"
            />

            <StyledButton
                style={{marginTop: 10}}
                icon='play'
            >
                Ajouter l'exercice
            </StyledButton>

        </View>
    )
}

function TestDrax() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        draggable: {
            width: 100,
            height: 100,
            backgroundColor: 'blue',
        },
        receiver: {
            width: 100,
            height: 100,
            backgroundColor: 'green',
        },
    });

    return (
        <DraxProvider>
            <View style={styles.container}>
                
                <DraxView
                    style={styles.draggable}
                    onDragStart={() => {
                        console.log('start drag');
                    }}
                    payload="world"
                />

                <DraxView
                    style={styles.receiver}
                    onReceiveDragEnter={({ dragged: { payload } }) => {
                        console.log(`hello ${payload}`);
                    }}
                    onReceiveDragExit={({ dragged: { payload } }) => {
                        console.log(`goodbye ${payload}`);
                    }}
                    onReceiveDragDrop={({ dragged: { payload } }) => {
                        console.log(`received ${payload}`);
                    }}
                />

            </View>
        </DraxProvider>
    )
}