import React from 'react';
import StyledView from '../../components/styled/View';
import Header from './_components/Header';
import WeeklyCalendar from './_components/WeeklyCalendar';
import Text from '../../components/styled/Text';
import { StyleSheet } from 'react-native';
import { Button, Chip, Icon, Surface, useTheme } from 'react-native-paper';
import { ActivityProps, DAYS } from '../../components/type/types';


function Activity({activity}: {activity: ActivityProps}) {
    const theme = useTheme();

    const styles = StyleSheet.create({
        Surface: {
            backgroundColor: theme.colors.surface,
            borderRadius: 15,
            width: '100%',
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    });

    return (
        <Surface style={styles.Surface} elevation={0}>
            
            <Text variant="bodyLarge" style={{textTransform: 'capitalize'}}>{activity.name}</Text>

            {activity.trainingStatus === 'FINISHED' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#1B9820' onClose={() => {}} closeIcon="check-circle" >Réalisé</Chip> : null}
            {activity.trainingStatus === 'CANCELLED' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#D14E4E' onClose={() => {}} closeIcon="close-circle-outline" >Annulé</Chip> : null}
            {activity.trainingStatus === 'IN_PROGRESS' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#FF7A00' onClose={() => {}} closeIcon="loading" >En cours</Chip> : null}
        
        </Surface>
    )
}

function DayProgram() {
    const theme = useTheme();

    const activityList: ActivityProps[] = [
        {
            id: 1,
            createdBy: 1,
            lastUpdatedBy: 1,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            isActive: true,
            name: 'Kung Fu',
            description: 'description',
            sportPreset: null,
            trainingDays: [
                DAYS.FRIDAY,
            ],
            hasWarmUp: false,
            hasStretching: false,
            trainingStatus: 'FINISHED',
            iconName: "temp",
            iconHexadecimalColor: "#FFFFFF",
        },
        {
            id: 2,
            createdBy: 1,
            lastUpdatedBy: 1,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            isActive: true,
            name: 'bas du corps',
            description: 'description',
            sportPreset: null,
            trainingDays: [
                DAYS.FRIDAY,
            ],
            hasWarmUp: false,
            hasStretching: false,
            trainingStatus: 'CANCELLED',
            iconName: "temp",
            iconHexadecimalColor: "#FFFFFF",
        },
        {
            id: 3,
            createdBy: 1,
            lastUpdatedBy: 1,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            isActive: true,
            name: 'haut du corps',
            description: 'description',
            sportPreset: null,
            trainingDays: [
                DAYS.FRIDAY,
            ],
            hasWarmUp: false,
            hasStretching: false,
            trainingStatus: 'IN_PROGRESS',
            iconName: "temp",
            iconHexadecimalColor: "#FFFFFF",
        },
        {
            id: 4,
            createdBy: 1,
            lastUpdatedBy: 1,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            isActive: true,
            name: 'cardio',
            description: 'description',
            sportPreset: null,
            trainingDays: [
                DAYS.FRIDAY,
            ],
            hasWarmUp: false,
            hasStretching: false,
            trainingStatus: 'PLANNED',
            iconName: "temp",
            iconHexadecimalColor: "#FFFFFF",
        },
    ];

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            maxHeight: 330,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
        },
    });

    return (
        <StyledView style={styles.container}>
            <Text variant="titleMedium">Au programme aujourd'hui</Text>
            
            {activityList.map((activity: ActivityProps) => (<Activity key={activity.id} activity={activity} />))}

            <Button
                icon='plus'
                mode="text"
                onPress={() => console.log('Pressed')}
                theme={{ colors: { primary: theme.colors.onBackground } }}
            >
                Ajouter une activité
            </Button>

        </StyledView>
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
            <DayProgram />
            {/* <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button> */}
        </StyledView>
    )
}