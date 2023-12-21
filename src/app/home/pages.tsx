import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, IconButton, Surface, useTheme, Text } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import Header from './_components/Header';
import StyledText from '../../components/styled/Text';



function Day({date, selected}: {date: Date, selected?: boolean}) {
    const theme = useTheme();
    const day = date.getDate();
    const weekDay = date.toLocaleString('fr-FR', { weekday: 'short'}).substring(0, 3);

    const styles = StyleSheet.create({
        container: {
            width: 39,
            height: 51,
            borderRadius: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            backgroundColor: selected ? theme.colors.primary : 'transparent',
        },
        text: {
            color: selected ? '#000000' : '#FFFFFF',
            textTransform: 'capitalize',
        }
    });

    return (
        <View style={styles.container}>
            <Text variant="bodyMedium" style={styles.text}>{weekDay}</Text>
            <Text variant="bodyLarge" style={{...styles.text, fontWeight: 'bold'}}>{day}</Text>
        </View>
    )

}

function WeeklyCalendar() {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            with: '100%',
            height: 100,
            borderRadius: 10,
            overflow: 'hidden',
        },
        surfaceContainer: {
            width: '100%',
            height: '100%',
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 5,
            gap: -3,
            backgroundColor: theme.colors.surface,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        topContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttons: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        dateContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    });

    function currentMonthAndYear() {
        const date = new Date();
        const month = date.toLocaleString('fr-FR', { month: 'long' });
        const year = date.getFullYear();

        return `${month} ${year}`;
    }

    const StyledIconButton = (props: any) => <IconButton 
        size={24}
        {...props}
        style={{
            padding: 0,
            margin: 0,
        }}
    />;

    return (
        <View style={styles.container}>
            <Surface elevation={1} style={styles.surfaceContainer}>
                
                <View style={styles.topContainer}>

                    <StyledText style={{textTransform: 'capitalize', color: theme.colors.onSurface}} >{currentMonthAndYear()}</StyledText>

                    <View style={styles.buttons}>
                        <StyledIconButton icon="chevron-left" onPress={() => console.log('chevron gauche')}/>
                        <StyledIconButton icon="chevron-right" onPress={() => console.log('chevron droit')}/>
                    </View>

                </View>

                <View style={styles.dateContainer}>
                    <Day selected date={new Date()} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 1))} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 2))} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 3))} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 4))} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 5))} />
                    <Day date={new Date(new Date().setDate(new Date().getDate() + 6))} />
                </View>

            </Surface>
        </View>
    )
}

export default function Home({navigation, route}: {navigation: any, route: any}) {
    
    const styles = {
        container: {
            flex: 1,
            gap: 15,
            padding: 15,
        },
    };

    return (
        <StyledView style={styles.container}>
            <Header />
            <WeeklyCalendar />
            {/* <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button> */}
        </StyledView>
    )
}