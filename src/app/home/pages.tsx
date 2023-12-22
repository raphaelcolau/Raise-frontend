import React from 'react';
import StyledView from '../../components/styled/View';
import Header from './_components/Header';
import WeeklyCalendar from './_components/WeeklyCalendar';
import Text from '../../components/styled/Text';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Icon, Surface, useTheme } from 'react-native-paper';
import { ActivityProps } from '../../components/type/types';
import { getUserTrainings } from '../../adapters/userTrainings';
import BottomBar from '../../components/bottomBar/bottomBar';


function Activity({activity}: {activity: ActivityProps}) {
    const theme = useTheme();
    const isShorted = (activity.trainingStatus === 'IN_PROGRESS' || activity.trainingStatus === 'PLANNED' ? true : false)

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
        },
        Left: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: isShorted ? 'center' : 'flex-start',
            gap: 10,
        },
        Informations: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 5,
        }
    });

    return (
        <Surface style={styles.Surface} elevation={0}>
            
            <View style={styles.Left}>

                {isShorted ? <Icon source={activity.iconName} size={36} color={activity.iconHexadecimalColor} /> : null}

                <View style={styles.Informations}>
                    <Text variant="bodyLarge" style={{textTransform: 'capitalize'}}>{activity.name}</Text>
                </View>

            </View>


            {activity.trainingStatus === 'FINISHED' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#1B9820' onClose={() => {}} closeIcon="check-circle" >Réalisé</Chip> : null}
            {activity.trainingStatus === 'CANCELLED' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#D14E4E' onClose={() => {}} closeIcon="close-circle-outline" >Annulé</Chip> : null}
            {activity.trainingStatus === 'IN_PROGRESS' ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#FF7A00' onClose={() => {}} closeIcon="loading" >En cours</Chip> : null}
        
        </Surface>
    )
}

function DayProgram() {
    const theme = useTheme();

    const [activityList, setActivityList] = React.useState([]);


    React.useEffect(() => {
        getUserTrainings().then((trainings) => {
            setActivityList(trainings);
        });
    }, []);

    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            // maxHeight: 330,
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
                theme={{ colors: { primary: theme.colors.onBackground } }}
            >
                Programmer des séances
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
            <BottomBar />
        </StyledView>
    )
}