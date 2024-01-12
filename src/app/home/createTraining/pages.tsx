import React from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import StyledView from '../../../components/styled/View';
import StyledText from '../../../components/styled/Text';
import { IconButton, Icon, useTheme, Text, Modal, Portal, Surface, Button } from 'react-native-paper';
import StyledButton from '../../../components/styled/Button';
import StyledTextInput from '../../../components/styled/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { resetTraining, setDescription, setName, } from '../../../store/slice/createTrainingSlice';
import { postCreateTraining } from '../../../adapters/training/createTraining';
import ModalInput from '../../../components/PlaceHolderInput/PlaceHolderInput';
import HeaderSubPage from '../../../components/headerSubPage/HeaderSubPage';
import IconSelector from './IconSelector';
import PresetInput from './PresetInput';
import DayOfWeekInput from './DayOfWeek';
import RemembersInput from './RemembersInput';
import StartEndPicker from './StartAndEndPicker';


function ModalAddTrainingContent({ navigation, route, setShowModal }: { navigation: any, route: any, setShowModal: Function}) {
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
                onPress={() => setShowModal(false)}
            >
                Ajouter
            </StyledButton>

        </View>

    </Surface>
    )
}

export function CreateTrainingPage({ navigation, route }: { navigation: any, route: any}) {
    const { colors } = useTheme();
    const createTraining = useSelector((state: any) => state.createTraining);
    const dispatch = useDispatch();
    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: Dimensions.get('window').height,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
            padding: 10,
            backgroundColor: colors.background,
        },
    });
    const [showModal, setShowModal] = React.useState(false);

  return (
    <ScrollView
        style={{flex: 1}}
        StickyHeaderComponent={() => <HeaderSubPage navigation={navigation} route={route} />} //TODO: Fix sticky header
    >

        <Portal>
            <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
                <ModalAddTrainingContent navigation={navigation} route={route} setShowModal={setShowModal} />
            </Modal>
        </Portal>

        <StyledView style={styles.container}>
            <HeaderSubPage navigation={navigation} route={route} />
            <StyledText variant="headlineSmall">Programmer une séance</StyledText>

            <PresetInput />

            <View style={{display: 'flex', flexDirection: 'row', gap: 13}}>
                <IconSelector />
                <StyledTextInput
                    label={'Nom de la séance'}
                    placeholder={'Ex: Pectoraux'}
                    style={{flex: 1}}
                    value={createTraining.name}
                    onChangeText={(text) => dispatch(setName(text))}
                />
            </View>

            <DayOfWeekInput />

            <ModalInput
                label="Fréquence"
                value="Chaque semaine"
                right={
                    <Icon
                        source="menu-down"
                        size={30}
                    />
                }
            />

            <StartEndPicker />
            
            <StyledTextInput
                label={'Notes'}
                placeholder={'Ex: 3 séries de 10 répétitions'}
                multiline={true}
                numberOfLines={2}
                onChangeText={(text) => dispatch(setDescription(text))}
            />

            <RemembersInput />
    
            <StyledButton icon='play' style={{padding: 5}} onPress={() => setShowModal(true)}>Ajouter la séance</StyledButton>
        </StyledView>
    </ScrollView>
  );
}