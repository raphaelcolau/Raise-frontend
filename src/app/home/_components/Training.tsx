import React from 'react';
import { StyleSheet, TouchableHighlight , View } from 'react-native';
import {  Surface, useTheme, Modal, Portal } from 'react-native-paper';
import { Training } from '../../../components/type/types';
import BasicContent from './modal/TrainingSesseionDetails/BasicContent';
import ModalHeader from './modal/TrainingSesseionDetails/ModalHeader';
import ModalFooter from './modal/TrainingSesseionDetails/ModalFooter';
import ModalContent from './modal/TrainingSesseionDetails/ModalContent';

export default function Activity({activity}: {activity: Training}) {
    const theme = useTheme();
    const [isVisible, setIsVisible] = React.useState(false);

    const modalStyles = StyleSheet.create({
        Modal: {
            backgroundColor: theme.colors.surface,
            borderRadius: 15,
            width: '100%',
            padding: 10,
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

        <Portal>
            <Modal 
                visible={isVisible}
                onDismiss={() => setIsVisible(false)}
                contentContainerStyle={modalStyles.ModalContainer}
                theme={{ colors: { backdrop: '#000000B9'}}}
            >
                <Surface elevation={0} style={modalStyles.Modal}>
                    <ModalHeader activity={activity} setIsVisible={setIsVisible}/>
                    <ModalContent activity={activity} />
                    <ModalFooter />
                </Surface>
            </Modal>
        </Portal>

        <TouchableHighlight  onPress={() => setIsVisible(true)}>
            <BasicContent activity={activity} />
        </TouchableHighlight >

        </View>
    )
}