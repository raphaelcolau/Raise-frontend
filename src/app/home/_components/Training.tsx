import React from 'react';
import { StyleSheet, TouchableHighlight , View } from 'react-native';
import {  Surface, useTheme, Modal, Portal, IconButton, Icon, Button } from 'react-native-paper';
import Text from '../../../components/styled/Text';
import { Training } from '../../../components/type/types';
import BasicContent from './modal/TrainingSesseionDetails/BasicContent';
import ModalHeader from './modal/TrainingSesseionDetails/ModalHeader';
import ModalFooter from './modal/TrainingSesseionDetails/ModalFooter';
import ModalContent from './modal/TrainingSesseionDetails/ModalContent';
import StyledButton from '../../../components/styled/Button';
import { ValidateTrainingSessionProps, validateTrainingSession } from '../../../adapters/training/validateTrainingSession';
import { useSelector } from 'react-redux';

export default function Activity({activity}: {activity: Training}) {
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

    function ModalConfirmHeader({dismiss, activity}: {dismiss: Function, activity: Training}) {
        const styles = StyleSheet.create({
            Header: {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            container: {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: -10,
            },
            subtitle: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 8,
            },
        });

        return (
            <View style={styles.container}>

                <View style={styles.Header}>
                    <Text variant="headlineSmall">Valider la séance</Text>
                    <IconButton icon="close" onPress={() => dismiss(false)} />
                </View>

                <View style={styles.subtitle}>
                    <Icon source={activity.trainingIconName.replace('icon_', '')} size={18} color={activity.trainingIconHexadecimalColor} />
                    <Text variant="titleMedium">{activity.trainingName}</Text>
                </View>
            </View>
        )
    }

    function ModalConfirmFooter({activity, dismiss}: {activity: Training, dismiss: Function}) {
        const theme = useTheme();
        const currentDay: string = useSelector((state: any) => state.currentDay.day);
        const styles = StyleSheet.create({
            container: {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 5,
            },
        });

        const handleValidate = () => {
            const props: ValidateTrainingSessionProps = {
                id: activity.trainingId,
                date: new Date(currentDay),
            };
            validateTrainingSession(props).then((res) => {
                console.log(res)
                dismiss(false);
            });
        }
        
        return (
            <View style={styles.container}>
                <Button mode="text" textColor={theme.colors.onSurface}>Modifier et valider</Button>
                <StyledButton onPress={handleValidate}>Valider</StyledButton>
            </View>
        )
    }

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
                    <ModalConfirmFooter activity={activity} dismiss={setIsVisibleConfirm} />

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
                    <ModalFooter dismiss={setIsVisibleDetails} toOpen={setIsVisibleConfirm} />
                </Surface>
            </Modal>
        </Portal>

        <TouchableHighlight  onPress={() => setIsVisibleDetails(true)}>
            <BasicContent activity={activity} />
        </TouchableHighlight >

        </View>
    )
}