import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import StyledView from '../../../components/styled/View';
import StyledText from '../../../components/styled/Text';
import { Icon, useTheme, Modal, Portal } from 'react-native-paper';
import StyledButton from '../../../components/styled/Button';
import StyledTextInput from '../../../components/styled/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setDescription, setName, } from '../../../store/slice/createTrainingSlice';
import ModalInput from '../../../components/PlaceHolderInput/PlaceHolderInput';
import HeaderSubPage from '../../../components/headerSubPage/HeaderSubPage';
import IconSelector from './_components/IconSelector';
import PresetInput from './_components/PresetInput';
import DayOfWeekInput from './_components/DayOfWeek';
import RemembersInput from './_components/RemembersInput';
import StartEndPicker from './_components/StartAndEndPicker';
import ModalAddTrainingContent from './_components/ModalAddTrainingContent';

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