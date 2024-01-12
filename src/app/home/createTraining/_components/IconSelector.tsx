import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Icon, useTheme, Text, Modal, Portal, Surface, Button } from 'react-native-paper';
import StyledButton from '../../../../components/styled/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setIconHexadecimalColor, setIconName } from '../../../../store/slice/createTrainingSlice';
import ModalInput from '../../../../components/PlaceHolderInput/PlaceHolderInput';

export default function IconSelector() {
    const [showModal, setShowModal] = React.useState(false);
    const { colors } = useTheme();
    const icon = useSelector((state: any) => state.createTraining.iconName);
    const iconHexadecimalColor = useSelector((state: any) => state.createTraining.iconHexadecimalColor);
    const dispatch = useDispatch();
    const icons = [
        'baguette',
        'karate',
        'dumbbell',
        'kayaking',
        'run-fast',
        'yoga',
        'heart-pulse',
        'boxing-glove',
        'bike-fast',
        'swim',
        'tennis',
        'table-tennis',
        'basketball',
        'baseball-bat',
        'dance-ballroom',
        'diving',
        'hiking',
        'horse',
        'kitesurfing',
        'rowing',
        'paragliding',
        'skate',
        'skateboarding',
        'ski',
    ]
    const colorsList = [
        '#0072DB',
        '#930000',
        '#936A00',
        '#00930F',
        '#009379',
        '#93002C',
    ]

    const styles = StyleSheet.create({
        modal: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: '100%',
        },
        container: {
            backgroundColor: colors.surface,
            borderRadius: 15,
            padding: 10,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        iconDisplay: {
            padding: 10,
            gap: 12,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        colorList: {
            padding: 10,
            gap: 12,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
    });


    return (
        <View>
            <Portal>
                <Modal style={styles.modal} visible={showModal} onDismiss={() => setShowModal(false)}>
                    <Surface style={styles.container}>

                        <View style={styles.header}>
                            <Text variant="titleMedium">Sélectionner un icône et une couleur</Text>
                            <IconButton icon='close' onPress={() => setShowModal(false)} />
                        </View>

                        <View>
                            <Text variant="bodyMedium" style={{color: colors.primary}}>Icône</Text>
                            <ScrollView horizontal={false} style={{height: 150, width: '100%'}}>

                                <View style={styles.iconDisplay}>
                                    {icons.map((iconName) => (
                                        <TouchableOpacity key={iconName} onPress={() => dispatch(setIconName(iconName))}>
                                            <Icon
                                                source={iconName}
                                                size={38}
                                                color={icon === iconName ? colors.primary : iconHexadecimalColor !== '' ? iconHexadecimalColor : colors.onSurface}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>

                        <View>
                            <Text variant="bodyMedium" style={{color: colors.primary}}>Couleur</Text>
                            <View style={styles.colorList}>
                                {colorsList.map((color) =>
                                    <TouchableOpacity key={color} onPress={() => dispatch(setIconHexadecimalColor(color))}>
                                        <Icon
                                            source="circle"
                                            size={iconHexadecimalColor === color ? 35 : 30}
                                            color={color}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: 10}}>
                            <Button mode="text" onPress={() => {
                                dispatch(setIconName(''))
                                dispatch(setIconHexadecimalColor(''))
                                setShowModal(false)
                            }}>Supprimer</Button>
                            <StyledButton onPress={() => setShowModal(false)}>Valider</StyledButton>
                        </View>

                    </Surface>
                </Modal>
            </Portal>
    
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <ModalInput value={icon ? <Icon source={icon} size={25} color={iconHexadecimalColor ? iconHexadecimalColor : colors.onSurface} /> : "❔"} style={{width: 80}} center/>
            </TouchableOpacity>
        </View>
    )
}