import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme, Text, Surface, Button } from 'react-native-paper';
import StyledButton from '../../../../components/styled/Button';
import { useDispatch, useSelector } from 'react-redux';
import { resetTraining } from '../../../../store/slice/createTrainingSlice';
import { postCreateTraining } from '../../../../adapters/training/createTraining';

export default function ModalAddTrainingContent({ navigation, route, setShowModal }: { navigation: any, route: any, setShowModal: Function}) {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const createTraining = useSelector((state: any) => state.createTraining);

    const styles = StyleSheet.create({
        modal: {
            display: 'flex',
            backgroundColor: colors.surface,
            padding: 10,
            borderRadius: 15,
        },
    });

    return (
    <Surface style={styles.modal}>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text variant="titleLarge" style={{color: colors.primary}}>Séance ajoutée</Text>
            <IconButton icon='close' onPress={() => setShowModal(false)} />
        </View>

        <View style={{marginTop: -15}}>
            <Text variant="headlineSmall">Ajouter des exercises ?</Text>
            <Text variant="bodyMedium" style={{marginTop: 15, marginBottom: 25}}>Vous pouvez dès à présent ajouter des exercices à votre séance nouvellement crée.</Text>
        </View>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>

            <Button mode="text" textColor={colors.onSurface} 
                onPress={() => {
                    postCreateTraining(createTraining).then((res) => {
                        dispatch(resetTraining());
                        setShowModal(false);
                        navigation.goBack();
                    }).catch((err) => {
                        console.log(err.response.data);
                    });
                }}
            >
                    Ajouter plus tard
            </Button>

            <StyledButton 
                onPress={() => {
                    postCreateTraining(createTraining).then((res) => {
                        dispatch(resetTraining());
                        setShowModal(false);
                        navigation.navigate('AddTrainingSessionExercise', {id: res.data.id});
                    }).catch((err) => {
                        console.log(err.response.data);
                    });
                }}
            >
                Ajouter
            </StyledButton>

        </View>

    </Surface>
    )
}