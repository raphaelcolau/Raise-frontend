import React, {useEffect, useState} from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { DAYS, Training } from '../../../../components/type/types';
import { setEndDate, setStartDate } from '../../../../store/slice/createTrainingSlice';

LocaleConfig.locales['fr'] = {
    monthNames: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    dayNamesShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

function CalendarHeader({ date, setDate, expand }: { date: Date, setDate: Function, expand: Function }) {
    const theme = useTheme();
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
        },
    });

    return (
        <View>

            {/*Display the header*/}
            <View style={styles.container}>
                <Text variant='bodyLarge' style={{paddingLeft: 10}}>{LocaleConfig.locales[LocaleConfig.defaultLocale].monthNames[date.getMonth()]} {date.getFullYear()}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: -10 }}>
                    <IconButton icon='chevron-left' onPress={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}/>
                    <IconButton icon='chevron-right' onPress={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}/>
                </View>

                <IconButton icon='arrow-collapse' onPress={() => expand(false)} />

            </View>
                
            {/*Display the line*/}
            <View style={{width: '100%', height: 1, backgroundColor: theme.colors.outline, marginBottom: 8}} />

            {/*Display all the day of week*/}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 5 }}>
                {LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort.map((day: string, index: number) => (
                    <Text key={index} variant='bodyMedium'>{day}</Text>
                ))}
            </View>

        </View>
    )
}


export default function DatePicker({dismiss, mode}: {dismiss: Function, mode: 'startDate' | 'endDate'}) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const styles = {
        calendar: {
            backgroundColor: theme.colors.surface,
            borderRadius: 15,
            width: '100%',
            height: '100%',
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
        },
    }
    const currentDay = useSelector((state: any) => state.currentDay.day);
    const allTrainings = useSelector((state: any) => state.trainings.saved);
    const currentDate = new Date(currentDay);
    const currentDateKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;


    return (
        <Calendar
            initialDate={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
            onMonthChange={(month) => setDate(new Date(month.dateString))}
            firstDay={1}
            enableSwipeMonths={true}
            style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 15,
                overflow: 'hidden',
                width: '100%',
            }}
            theme={{
                backgroundColor: theme.colors.surface,
                calendarBackground: theme.colors.surface,
                dayTextColor: theme.colors.onSurface,
                textDisabledColor: theme.colors.outline,
                selectedDayTextColor: theme.colors.onSurface,
                selectedDayBackgroundColor: theme.colors.primary,
                todayTextColor: theme.colors.primary,
            }}
            headerStyle={{ backgroundColor: theme.colors.surface }}
            customHeader={() => <CalendarHeader expand={dismiss} date={date} setDate={setDate} />}
            dayComponent={({date, state}) => {
                const styles = StyleSheet.create({
                    container: {
                        width: 31,
                        height: 31,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: state === 'today' ? theme.colors.primary : theme.colors.surface,
                        borderRadius: 5,
                        borderColor: currentDateKey == date?.dateString ? theme.colors.primary : 'none',
                        borderWidth: currentDateKey == date?.dateString ? 1 : 0,
                        position: 'relative',
                    },
                    text: {
                        textAlign: 'center',
                        color: state == 'disabled' ? theme.colors.outline : theme.colors.onSurface,
                    },
                    dotsContainer: {
                        position: 'absolute',
                        bottom: 2,
                        left: 0,
                        right: 0,
                        height: 4,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    },
                });

                return (
                    <TouchableOpacity onPress={() => {
                        if (date) {
                            if (mode == 'startDate') {
                                dispatch(setStartDate(new Date(date.timestamp).toISOString()));
                            } else if (mode == 'endDate') {
                                dispatch(setEndDate(new Date(date.timestamp).toISOString()));
                            }
                        }
                        dismiss(false);
                    }}>
                        <View style={styles.container}>
                            <Text style={styles.text}>{date?.day}</Text>
                            <View style={styles.dotsContainer}>
                                {allTrainings[String(date?.dateString)]?.map((training: Training, index: number) => {
                                    return (
                                        <View key={index} style={{width: 5, height: 5, borderRadius: 5, backgroundColor: training.trainingIconHexadecimalColor + (state == 'disabled' ? '80' : '')}} />
                                    )
                                })}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    )
}