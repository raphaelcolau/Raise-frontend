import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, Icon} from "react-native-paper";
import { Series } from '../../../components/type/types';
import TextInput from "../../../components/styled/TextInput";

export default function SerieComponent({ serie, isActive, setSerieValues }: { serie: Series, isActive?: boolean, setSerieValues: Function }) {
    const [active, setActive] = useState<boolean>(isActive ? isActive : false);
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
        },
        input: {
            paddingHorizontal: 10,
            paddingRight: 15,
            paddingVertical: 10,
            paddingStart: 0,
            margin: 0,
            width: 50,
            height: 20,
        }
    });

    useEffect(() => {
        setActive(isActive ? isActive : false)
    }, [isActive])

    const Field = ({serie, value, keyS, setSerieValues}: {serie: Series, value: string | number, keyS?: keyof Series, setSerieValues: Function}) => {
        return (
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 3,
                    backgroundColor: colors.surface,
                    minWidth: 50,
                    borderRadius: 10,
                }}
            >
                <TextInput
                    style={styles.input}
                    value={String(value)}
                    keyboardType="numeric"
                    onChangeText={(text) => keyS && setSerieValues(serie.id, keyS, text)}
                />
                <Icon source="menu-down" size={25} />
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <Text variant="bodySmall" style={{color: colors.onSurface, marginTop: -5}}>{serieName[serie.positionIndex]}</Text>
            <View style={styles.inputContainer}>
                <Field serie={serie} keyS='repsCount' value={serie.repsCount} setSerieValues={setSerieValues} />
                <Field serie={serie} value={'1:0:1'} setSerieValues={setSerieValues} />
                <Field serie={serie} keyS='restTime' value={serie.restTime} setSerieValues={setSerieValues} />
                <Field serie={serie} keyS='weight' value={serie.weight} setSerieValues={setSerieValues} />
            </View>
        </View>
    )
}