import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledView from '../../../components/styled/View';
import StyledText from '../../../components/styled/Text';
import { IconButton, Icon, useTheme, Text, Modal, Portal, Surface, Button } from 'react-native-paper';
import StyledButton from '../../../components/styled/Button';
import StyledTextInput from '../../../components/styled/TextInput';
import { DAYS } from '../../../components/type/types';
import Chip from '../../../components/styled/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { resetTraining, setDescription, setEndDate, setHasStretching, setHasWarmUp, setName, setStartDate, setTrainingDays } from '../../../store/slice/createTrainingSlice';
import DatePicker from './DatePicker';
import { postCreateTraining } from '../../../adapters/training/createTraining';
import ModalInput from '../../../components/PlaceHolderInput/PlaceHolderInput';
import HeaderSubPage from '../../../components/headerSubPage/HeaderSubPage';
import IconSelector from './IconSelector';
import PresetInput from './PresetInput';


function StyledRoundSwitch({value, label, style, onPress, selected, ...props}: {value: boolean, label: string, style?: any, props?: any, onPress?: Function, selected?: boolean}) {
    const { colors } = useTheme();
    const color = selected ? colors.primary : colors.onSurface;
    const styles = StyleSheet.create({
        container: {
            width: 45,
            aspectRatio: 1,
            backgroundColor: colors.surface,
            borderColor: colors.primary,
            borderWidth: selected ? 1 : 0,
            borderRadius: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    });
    
    return (
        <TouchableOpacity onPress={() => onPress && onPress()}>
            <View style={{...styles.container, ...style}}>
                <Text style={{color: color}}>{label}</Text>
            </View>
        </TouchableOpacity>
    )

}

function DayOfWeekInput() {
    // const [selectedDays, setSelectedDays] = React.useState<DAYS[]>([]);
    const selectedDays = useSelector((state: any) => state.createTraining.trainingDays);
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const days = [
        {label: 'Lun', value: DAYS.MONDAY},
        {label: 'Mar', value: DAYS.TUESDAY},
        {label: 'Mer', value: DAYS.WEDNESDAY},
        {label: 'Jeu', value: DAYS.THURSDAY},
        {label: 'Ven', value: DAYS.FRIDAY},
        {label: 'Sam', value: DAYS.SATURDAY},
        {label: 'Dim', value: DAYS.SUNDAY},
    ]

    return (
        <View style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <Text variant="titleMedium">Jour(s) de séance</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                {days.map((day) => (
                    <StyledRoundSwitch
                        key={day.value}
                        value={selectedDays.includes(day.value)}
                        label={day.label}
                        selected={selectedDays.includes(day.value)}
                        onPress={() => {
                            if (selectedDays.includes(day.value)) {
                                dispatch(setTrainingDays(selectedDays.filter((d: DAYS) => d !== day.value)));
                            } else {
                                dispatch(setTrainingDays([...selectedDays, day.value]));
                            }
                        }}
                    />
                ))}
            </View>
        </View>
    )
}

function RemembersInput() {
    const { colors } = useTheme();
    const hasWarmUp = useSelector((state: any) => state.createTraining.hasWarmUp);
    const hasStretching = useSelector((state: any) => state.createTraining.hasStretching);
    const dispatch = useDispatch();

    return (
        <View style={{display: 'flex', gap: 13}}>
            <Text variant="titleMedium">Rappel pendant la séance</Text>
            
            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                
                    <Chip 
                        selected={hasWarmUp}
                        icon={hasWarmUp ? 'check' : undefined}
                        onPress={() => {
                            dispatch(setHasWarmUp(!hasWarmUp));
                        }}
                    >
                        Échauffement
                    </Chip>

                    <Chip 
                        selected={hasStretching}
                        icon={hasStretching ? 'check' : undefined}
                        onPress={() => {
                            dispatch(setHasStretching(!hasStretching));
                        }}
                    >
                        Étirement
                    </Chip>
            </View>

        </View>
    )
}

function StartEndPicker() {
    const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
    const dispatch = useDispatch();
    const startDate = useSelector((state: any) => state.createTraining.startDate);
    const endDate = useSelector((state: any) => state.createTraining.endDate);

    const openStartDatePicker = () => {
        setShowStartDatePicker(true);
    };

    const openEndDatePicker = () => {
        setShowEndDatePicker(true);
    };

    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', "Septembre", 'Octobre', 'Novembre', 'Décembre'];

    return (
        <View style={{display: 'flex', flexDirection: 'row', gap: 13, height: 70}}>
            <Portal>
                <Modal visible={showStartDatePicker} onDismiss={() => setShowStartDatePicker(false)}>
                    <DatePicker dismiss={() => setShowStartDatePicker(false)} mode='startDate' />
                </Modal>

                <Modal visible={showEndDatePicker} onDismiss={() => setShowEndDatePicker(false)}>
                    <DatePicker dismiss={() => setShowEndDatePicker(false)} mode='endDate' />
                </Modal>
            </Portal>

            <TouchableOpacity 
                style={{flex: 1}}
                onPress={openStartDatePicker}
                onLongPress={() => dispatch(setStartDate(''))}
            >
                <ModalInput
                    label="Débuter"
                    value={startDate ? `${new Date(startDate).getDate()} ${month[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()}` : "Aujourd'hui"}
                    style={{flex: 1}}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={{flex: 1}}
                onPress={openEndDatePicker}
                onLongPress={() => dispatch(setEndDate(''))}
            >
                <ModalInput
                    label="Terminer"
                    value={endDate ? `${new Date(endDate).getDate()} ${month[new Date(endDate).getMonth()]} ${new Date(endDate).getFullYear()}` : "Jamais"}
                    style={{flex: 1}}
                />
            </TouchableOpacity>
        </View>
    )
}

export function CreateTrainingPage({ navigation, route }: { navigation: any, route: any}) {
    const { colors } = useTheme();
    const createTraining = useSelector((state: any) => state.createTraining);
    const dispatch = useDispatch();
    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: Dimensions.get('window').height,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
            padding: 10,
            backgroundColor: colors.background,
        },
        modal: {
            display: 'flex',
            backgroundColor: colors.surface,
            padding: 10,
            borderRadius: 15,
        },
    });
    const [showModal, setShowModal] = React.useState(false);

  return (
    <ScrollView
        style={{flex: 1}}
        StickyHeaderComponent={() => <HeaderSubPage navigation={navigation} route={route} />} //TODO: Fix sticky header
    >
        <Portal>
            <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
                <Surface style={styles.modal}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text variant="titleLarge" style={{color: colors.primary}}>Séance ajoutée</Text>
                        <IconButton icon='close' onPress={() => setShowModal(false)} />
                    </View>

                    <View style={{marginTop: -15}}>
                        <Text variant="headlineSmall">Ajouter des exercises ?</Text>
                        <Text variant="bodyMedium" style={{marginTop: 15, marginBottom: 25}}>Vous pouvez dès à présent ajouter des exercices à votre séance nouvellement crée.</Text>
                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
                        <Button mode="text" textColor={colors.onSurface} onPress={() => setShowModal(false)}>Ajouter plus tard</Button>
                        <StyledButton onPress={() => {
                            postCreateTraining(createTraining).then((res) => {
                                dispatch(resetTraining());
                                setShowModal(false);
                                navigation.goBack();
                            }).catch((err) => {
                                console.log(err.response.data);
                            });
                        }}>
                            Ajouter
                        </StyledButton>
                    </View>

                </Surface>
            </Modal>
        </Portal>
        <StyledView style={styles.container}>
            <HeaderSubPage navigation={navigation} route={route} />
            <StyledText variant="headlineSmall">Programmer une séance</StyledText>

            <PresetInput />

            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                <IconSelector />
                <StyledTextInput
                    label={'Nom de la séance'}
                    placeholder={'Ex: Pectoraux'}
                    style={{flex: 1}}
                    value={createTraining.name}
                    onChangeText={(text) => dispatch(setName(text))}
                />
            </View>

            <DayOfWeekInput />

            <ModalInput
                label="Fréquence"
                value="Chaque semaine"
                right={
                    <Icon
                        source="menu-down"
                        size={30}
                    />
                }
            />

            <StartEndPicker />
            
            <StyledTextInput
                label={'Notes'}
                placeholder={'Ex: 3 séries de 10 répétitions'}
                multiline={true}
                numberOfLines={2}
                onChangeText={(text) => dispatch(setDescription(text))}
            />

            <RemembersInput />
    
            <StyledButton icon='play' style={{padding: 5}} onPress={() => setShowModal(true)}>Ajouter la séance</StyledButton>
        </StyledView>
    </ScrollView>
  );
}