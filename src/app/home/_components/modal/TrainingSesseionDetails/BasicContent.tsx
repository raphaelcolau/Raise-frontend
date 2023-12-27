import React from 'react';
import Text from '../../../../../components/styled/Text';
import { StyleSheet, View } from 'react-native';
import { Chip, Icon, Surface, useTheme } from 'react-native-paper';
import { Training, TRAINING_STATUS } from '../../../../../components/type/types';

export default function BasicContent({activity}: {activity: Training}) {
    const theme = useTheme();
    const isShorted = ( (activity.trainingStatus === TRAINING_STATUS.PERFORMED || activity.trainingStatus === TRAINING_STATUS.CANCELLED || activity.trainingStatus === null) ? true : false)

    const styles = StyleSheet.create({
        Surface: {
            backgroundColor: theme.colors.surface,
            borderRadius: 15,
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
            gap: 1,
        },
        Subtiles: {
            fontFamily: 'sans-serif-light',
        },
    });

    return (
        <Surface style={styles.Surface} elevation={0}>

            
            <View style={styles.Left}>

                {isShorted ? <Icon source={activity.trainingIconName.replace('icon_', '')} size={36} color={activity.trainingIconHexadecimalColor} /> : null}

                <View style={styles.Informations}>
                    <Text variant="bodyLarge" style={{textTransform: 'capitalize'}}>{activity.trainingName}</Text>
                    <Text variant="bodyMedium" style={styles.Subtiles}>{activity.numberOfExercise} {activity.numberOfExercise > 1 ? 'exercices' : 'exercice'}</Text>
                </View>

            </View>


            {activity.trainingStatus === TRAINING_STATUS.PERFORMED ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#1B9820' onClose={() => {}} closeIcon="check-circle" >Réalisé</Chip> : null}
            {activity.trainingStatus === TRAINING_STATUS.CANCELLED ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#D14E4E' onClose={() => {}} closeIcon="close-circle-outline" >Annulé</Chip> : null}
            {activity.trainingStatus === TRAINING_STATUS.IN_PROGRESS ? <Chip mode="outlined" style={{borderColor: theme.colors.surface}} selectedColor='#FF7A00' onClose={() => {}} closeIcon="loading" >En cours</Chip> : null}
        
        </Surface>
    )
}