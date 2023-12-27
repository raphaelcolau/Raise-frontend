import React, {useEffect} from 'react';
import StyledView from '../../../components/styled/View';
import Text from '../../../components/styled/Text';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Training } from '../../../components/type/types';
import { getUserTrainings } from '../../../adapters/userTrainings';
import { useSelector, useDispatch } from 'react-redux';
import { updateTrainings } from '../../../store/slice/trainingsSlice';
import Activity from './Training';

export default function InlineCalendar() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [activityList, setActivityList] = React.useState([]);
    const currentDay: string = useSelector((state: any) => state.currentDay.day);
    const savedTrainings = useSelector((state: any) => state.trainings.saved);
    const toSave = {...savedTrainings};

    useEffect(() => {
        getUserTrainings(new Date(currentDay)).then((trainings) => {
            toSave[new Date(currentDay).toLocaleDateString()] = trainings;
            dispatch(updateTrainings(toSave));
            setActivityList(trainings ? trainings : []);
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