import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledView from '../../../components/styled/View';
import StyledText from '../../../components/styled/Text';
import { IconButton, Icon, useTheme, Text, Modal, Portal } from 'react-native-paper';
import { StyledIconButton } from '../../../components/styled/IconButton';
import Button from '../../../components/styled/Button';
import StyledTextInput from '../../../components/styled/TextInput';
import { DAYS } from '../../../components/type/types';
import Chip from '../../../components/styled/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { resetTraining, setDescription, setEndDate, setName, setStartDate } from '../../../store/slice/createTrainingSlice';
import DatePicker from './DatePicker';

function HeaderReturn({ navigation, route }: { navigation: any, route: any}) {
    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            paddingLeft: 0,
            padding: 10,
        },
    });
    const dispatch = useDispatch();

    return (
        <StyledView style={styles.header}>
            <StyledIconButton
                icon="chevron-left"
                size={30}
                onPress={() => {navigation.goBack(); dispatch(resetTraining())}}
            />
        </StyledView>
    )

}

function ModalInput({value, label, placeholder, right, style, center, ...props}: {value: string, label?: string, placeholder?: string, right?: React.ReactNode, style?: any, props?: any, center?: boolean}) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            minHeight: 50,
            backgroundColor: colors.surface,
            padding: 15,
            borderRadius: 15,
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: (center ? 'center' : 'space-between'),
        },
    });
    
    return (
        <View style={{...styles.container, ...style}} {...props}>

            <View style={styles.content}>

                <View>
                    {label && <Text style={{color: colors.primary}}>{label}</Text>}
                    <Text variant='titleMedium' style={{color: colors.onSurface}}>{value}</Text>
                </View>

                {right && right}

            </View>

        </View>
    )
}

function PresetInput() {
    const { colors } = useTheme();

    return (
        <ModalInput 
            value="Musculation"
            label="Pré-réglage"
            right={
                <Icon
                    source="menu-down"
                    size={30}
                />
            }
        />
    )
}

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
    const [selectedDays, setSelectedDays] = React.useState<DAYS[]>([]);
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
                                setSelectedDays(selectedDays.filter((d) => d !== day.value));
                            } else {
                                setSelectedDays([...selectedDays, day.value]);
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
    const [selectedRemembers, setSelectedRemembers] = React.useState<string[]>([]);

    const chip = [
        {label: 'Échauffement', value: 'warmup'},
        {label: 'Étirement', value: 'stretch'},
    ]

    return (
        <View style={{display: 'flex', gap: 13}}>
            <Text variant="titleMedium">Rappel pendant la séance</Text>
            
            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                {chip.map((c) =>
                    <Chip 
                        key={c.value}
                        selected={selectedRemembers.includes(c.value)}
                        icon={selectedRemembers.includes(c.value) ? 'check' : undefined}
                        onPress={() => {
                            if (selectedRemembers.includes(c.value)) {
                                setSelectedRemembers(selectedRemembers.filter((r) => r !== c.value));
                            } else {
                                setSelectedRemembers([...selectedRemembers, c.value]);
                            }
                        }}
                    >
                        {c.label}
                    </Chip>
                )}
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

    console.log(startDate, endDate)

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
    });

  return (
    <ScrollView
        style={{flex: 1}}
        StickyHeaderComponent={() => <HeaderReturn navigation={navigation} route={route} />} //TODO: Fix sticky header
    >
        <StyledView style={styles.container}>
            <HeaderReturn navigation={navigation} route={route} />
            <StyledText variant="headlineSmall">Programmer une séance</StyledText>

            <PresetInput />

            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                <ModalInput value="🦾" style={{width: 80}} center/>
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
    
            <Button icon='play' style={{padding: 5}}>Ajouter la séance</Button>
        </StyledView>
    </ScrollView>
  );
}