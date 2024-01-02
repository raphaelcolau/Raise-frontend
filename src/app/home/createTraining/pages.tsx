import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledView from '../../../components/styled/View';
import StyledText from '../../../components/styled/Text';
import { IconButton, Icon, useTheme, Text, Modal } from 'react-native-paper';
import { StyledIconButton } from '../../../components/styled/IconButton';
import Button from '../../../components/styled/Button';
import StyledTextInput from '../../../components/styled/TextInput';
import { DAYS } from '../../../components/type/types';

function HeaderReturn({ navigation, route }: { navigation: any, route: any}) {
    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            paddingLeft: 0,
            padding: 10,
        },
    });

    return (
        <StyledView style={styles.header}>
            <StyledIconButton
                icon="chevron-left"
                size={30}
                onPress={() => navigation.goBack()}
            />
        </StyledView>
    )

}

function ModalInput({value, label, placeholder, right, style, center, ...props}: {value: string, label?: string, placeholder?: string, right?: React.ReactNode, style?: any, props?: any, center?: boolean}) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
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
        <View style={{...styles.container, ...style}}>

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
            <Text variant="headlineSmall">Jour(s) de séance</Text>
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

export function CreateTrainingPage({ navigation, route }: { navigation: any, route: any}) {
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
        },
    });

  return (
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

        <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
            <ModalInput
                label="Débuter"
                value="Aujourd'hui"
                style={{flex: 1}}
            />
            <ModalInput
                label="Terminer"
                value="Jamais"
                style={{flex: 1}}
            />
        </View>
        
        <StyledTextInput
            label={'Notes'}
            placeholder={'Ex: 3 séries de 10 répétitions'}
            multiline={true}
            numberOfLines={2}
        />
   
        <Button icon='play' style={{padding: 5}}>Ajouter la séance</Button>
    </StyledView>
  );
}