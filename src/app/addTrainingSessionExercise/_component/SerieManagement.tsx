import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Series } from '../../../components/type/types';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import SerieComponent from "./SerieComponent";

export default function SeriesManagement({ series, setSeries }: { series: Series[], setSeries: Function}) {
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
            item.positionIndex = index + 1;
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