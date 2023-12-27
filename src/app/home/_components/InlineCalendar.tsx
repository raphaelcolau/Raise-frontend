import React, {useEffect} from 'react';
import StyledView from '../../../components/styled/View';
import Text from '../../../components/styled/Text';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Training } from '../../../components/type/types';
import { getUserTrainings } from '../../../adapters/userTrainings';
import { useSelector } from 'react-redux';
import Activity from './Training';

export default function DayProgram() {
    const theme = useTheme();

    const [activityList, setActivityList] = React.useState([]);
    const currentDay: string = useSelector((state: any) => state.currentDay.day);

    useEffect(() => {
        getUserTrainings(new Date(currentDay)).then((trainings) => {
            setActivityList(trainings);
        });
    }, [currentDay]);


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
            
            {activityList.map((activity: Training) => (<Activity key={activity.trainingId} activity={activity} />))}

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