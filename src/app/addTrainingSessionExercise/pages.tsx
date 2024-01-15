import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme, Icon, Button, TextInput as TextInputPaper } from "react-native-paper";
import HeaderSubPage from "../../components/headerSubPage/HeaderSubPage";
import ModalInput from '../../components/PlaceHolderInput/PlaceHolderInput';
import { getTrainingByID } from "../../adapters/training/getTrainingByID";
import { Series, TrainingProps } from '../../components/type/types';
import StyledButton from "../../components/styled/Button";
import TextInput from "../../components/styled/TextInput";
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import SerieComponent from "./_component/SerieComponent";


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
            // height: 200,
        },
        listContent: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
        },
    });

    const changeValueBySerieID = (id: number, field: string, value: string | number) => {
        const newSeries = [...series];
        const serie: Series | undefined = newSeries.find((serie) => serie.id === id);
        if (serie) {
            if (field in serie) {
                serie[field as keyof Series] = value as never;
            }
        }
        setSeries(newSeries);
    }

    function renderItem(info: DragListRenderItemInfo<Series>) {
        const { item, isActive, onDragEnd, onDragStart } = info;

        return (
            <Pressable
                onLongPress={onDragStart}
                onPressOut={onDragEnd}
                disabled={isActive}
            >
                <SerieComponent serie={item} isActive={isActive} setSerieValues={changeValueBySerieID}  />
            </Pressable>
        )
    
    }

    async function orReorderItems(fromIndex: number, toIndex: number) {
        const newItems = [...series];
        const item = newItems.splice(fromIndex, 1)[0];
        newItems.splice(toIndex, 0, item);

        newItems.forEach((item, index) => {
            item.id = index + 1;
            item.positionIndex = index;
        })

        setSeries(newItems);
    }

    function keyExtractor(props: any) {
        return props.id
    }


    return (
            <View>
                <Text variant="titleMedium">Series de l'exercice</Text>

                <View style={styles.titleGrid}>
                    <Text variant="titleSmall" style={{color: colors.primary}}>RÉPÉTITIONS</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>TEMPO</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>REPOS</Text>
                    <Text variant="titleSmall" style={{color: colors.primary}}>CHARGE</Text>
                </View>

                <View style={styles.listView}>

                    <DragList
                        data={series}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                        onReordered={orReorderItems}
                    />

                    
                </View>

            </View>
    )
}

export default function AddTrainingSessionExercise({ navigation, route, id }: { navigation: any, route: any, id?: number}) {
    const theme = useTheme();
    const { colors } = theme;
    const [training, setTraining] = useState<TrainingProps | null>(null);
    const trainingID = id ? id : route.params.id;
    const [series, setSeries] = useState<Series[]>([
        {completed: false, repsCount: 12, restTime: '2:30', weight: 20, id: 1, positionIndex: 0},
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
                >
                    Ajouter l'exercice
                </StyledButton>
            </View>

        </ScrollView>
    )
}