import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Day from './Day';

export default function Week({week, daySelected, setSelectedDay}: {week: number, daySelected?: Date, setSelectedDay: Function}) {
    const dayOfTheWeek = new Date().getDay() - 1;
    const styles = StyleSheet.create({
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: 344,
            justifyContent: 'space-between',
        },
    });

    return (
        <View>
            <View style={styles.dateContainer}>
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedDay(new Date(new Date().setDate(new Date().getDate() + (index - dayOfTheWeek) - (-week * 7))))}
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