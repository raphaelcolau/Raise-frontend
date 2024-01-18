import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { useTheme, Text, Button } from 'react-native-paper';
import { Training } from '../../components/type/types';

function TrainingButton() {
    const theme = useTheme();
    const { colors } = theme;

    const styles = StyleSheet.create({
        container: {
            width: '100%',
        },
        button: {
            width: '100%',
            height: 70,
            borderRadius: 15,
            backgroundColor: colors.primary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                textColor='white'
                style={styles.button}
            >
                Patienter 2 min 12
            </Button>
        </View>
    )

}

export default function PerformTrainingPage({ navigation, route }: { navigation: any, route: any }) {
    const theme = useTheme();
    const { colors } = theme;
    const training: Training = route.params.training;

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            padding: 10,
            backgroundColor: colors.background,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        content: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            gap: 13,
        },
    });

    return (
        <View style={styles.container}>

            <HeaderSubPage navigation={navigation} route={route} />

            <View style={styles.content}>
                
                <View>
                    <Text variant='headlineMedium'>Séance de sport</Text>
                    <Text variant='titleSmall'>{training.trainingName}</Text>
                </View>

            </View>

            <TrainingButton />

        </View>
    )
}