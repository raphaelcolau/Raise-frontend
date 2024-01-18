import React from 'react';
import { StyleSheet, TouchableHighlight , View } from 'react-native';
import {  Surface, useTheme, Modal, Portal } from 'react-native-paper';
import Text from '../../../components/styled/Text';
import { Training } from '../../../components/type/types';
import BasicContent from './modal/TrainingSessionDetails/BasicContent';
import ModalHeader from './modal/TrainingSessionDetails/ModalHeader';
import ModalFooter from './modal/TrainingSessionDetails/ModalFooter';
import ModalContent from './modal/TrainingSessionDetails/ModalContent';
import ModalConfirmHeader from './modal/TrainingConfirm/ModalHeader';
import ModalConfirmFooter from './modal/TrainingConfirm/ModalFooter';

export default function Activity({activity, navigation}: {activity: Training, navigation: any}) {
    const theme = useTheme();
    const [isVisibleDetails, setIsVisibleDetails] = React.useState(false);
    const [isVisibleConfirm, setIsVisibleConfirm] = React.useState(false);

    const modalStyles = StyleSheet.create({
        Modal: {
            backgroundColor: theme.colors.surface,
            borderRadius: 15,
            width: '100%',
            padding: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
        },
        ModalContainer: {
            paddingLeft: 15,
            paddingRight: 15,
        },
    });

    return (
        <View>

        {/* Modal for confirm cancel  */}
        <Portal>
            <Modal
                visible={isVisibleConfirm}
                onDismiss={() => setIsVisibleConfirm(false)}
                contentContainerStyle={modalStyles.ModalContainer}
                theme={{ colors: { backdrop: '#000000B9'}}}
            >
                <Surface style={modalStyles.Modal} elevation={0}>

                    <ModalConfirmHeader activity={activity} dismiss={setIsVisibleConfirm} />
                    <Text variant="bodyLarge" style={{fontFamily: 'sans-serif-light'}}>Vous vous apprêtez à valider votre séance en cliquant sur l’un des boutons ci-dessous</Text>
                    <ModalConfirmFooter activity={activity} dismiss={setIsVisibleConfirm} navigation={navigation} />

                </Surface>
            </Modal>
        </Portal>

        {/* Modal for details  */}
        <Portal>
            <Modal 
                visible={isVisibleDetails}
                onDismiss={() => setIsVisibleDetails(false)}
                contentContainerStyle={modalStyles.ModalContainer}
                theme={{ colors: { backdrop: '#000000B9'}}}
            >
                <Surface elevation={0} style={modalStyles.Modal}>
                    <ModalHeader activity={activity} setIsVisible={setIsVisibleDetails}/>
                    <ModalContent activity={activity} />
                    <ModalFooter dismiss={setIsVisibleDetails} toOpen={setIsVisibleConfirm} activity={activity} navigation={navigation} />
                </Surface>
            </Modal>
        </Portal>


        {/* Activity */}
        <TouchableHighlight  onPress={() => setIsVisibleDetails(true)}>
            <BasicContent activity={activity} />
        </TouchableHighlight >



        </View>
    )
}