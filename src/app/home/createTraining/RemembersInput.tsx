import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import Chip from '../../../components/styled/Chip';
import { useDispatch, useSelector } from 'react-redux';
import { setHasStretching, setHasWarmUp } from '../../../store/slice/createTrainingSlice';

export default function RemembersInput() {
    const { colors } = useTheme();
    const hasWarmUp = useSelector((state: any) => state.createTraining.hasWarmUp);
    const hasStretching = useSelector((state: any) => state.createTraining.hasStretching);
    const dispatch = useDispatch();

    return (
        <View style={{display: 'flex', gap: 13}}>
            <Text variant="titleMedium">Rappel pendant la séance</Text>
            
            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                
                    <Chip 
                        selected={hasWarmUp}
                        icon={hasWarmUp ? 'check' : undefined}
                        onPress={() => {
                            dispatch(setHasWarmUp(!hasWarmUp));
                        }}
                    >
                        Échauffement
                    </Chip>

                    <Chip 
                        selected={hasStretching}
                        icon={hasStretching ? 'check' : undefined}
                        onPress={() => {
                            dispatch(setHasStretching(!hasStretching));
                        }}
                    >
                        Étirement
                    </Chip>
            </View>

        </View>
    )
}