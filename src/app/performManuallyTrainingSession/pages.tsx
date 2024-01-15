import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';

export default function PerformManuallyTrainingSession({ navigation, route }: { navigation: any, route: any }) {
    const theme = useTheme();
    const { colors } = theme;

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: colors.background,
        },
    });

    return (
        <View style={styles.container}>
            <HeaderSubPage navigation={navigation} route={route} />
            <Text>PerformManuallyTrainingSession</Text>
        </View>
    )
}