import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { DAYS } from '../../../components/type/types';
import { useDispatch, useSelector } from 'react-redux';
import { setTrainingDays } from '../../../store/slice/createTrainingSlice';
import StyledRoundSwitch from './StyledRoundSwitch';

export default function DayOfWeekInput() {
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