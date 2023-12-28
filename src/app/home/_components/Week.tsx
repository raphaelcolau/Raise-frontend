import React from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import Day from './Day';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDay } from '../../../store/slice/currentDaySlice';

export default function Week({week}: {week: number}) {
    const dayOfTheWeek = new Date().getDay() - 1;
    const styles = StyleSheet.create({
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 344,
            justifyContent: 'space-between',
        },
    });
    const dispatch = useDispatch();
    const daySelected = new Date(useSelector((state: any) => state.currentDay.day));

    return (
        <View>
            <View style={styles.dateContainer}>
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPressIn={() => dispatch(
                            setCurrentDay( String(new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7)))) )
                        )}
                    >
                        <Day
                            selected={daySelected?.getDate() === new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7))).getDate()}
                            date={new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7)))}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}