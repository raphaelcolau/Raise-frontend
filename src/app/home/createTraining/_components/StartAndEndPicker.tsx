import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal, Portal} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate, } from '../../../../store/slice/createTrainingSlice';
import DatePicker from './DatePicker';
import ModalInput from '../../../../components/PlaceHolderInput/PlaceHolderInput';

export default function StartEndPicker() {
    const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
    const dispatch = useDispatch();
    const startDate = useSelector((state: any) => state.createTraining.startDate);
    const endDate = useSelector((state: any) => state.createTraining.endDate);

    const openStartDatePicker = () => {
        setShowStartDatePicker(true);
    };

    const openEndDatePicker = () => {
        setShowEndDatePicker(true);
    };

    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', "Septembre", 'Octobre', 'Novembre', 'Décembre'];

    return (
        <View style={{display: 'flex', flexDirection: 'row', gap: 13, height: 70}}>
            <Portal>
                <Modal visible={showStartDatePicker} onDismiss={() => setShowStartDatePicker(false)}>
                    <DatePicker dismiss={() => setShowStartDatePicker(false)} mode='startDate' />
                </Modal>

                <Modal visible={showEndDatePicker} onDismiss={() => setShowEndDatePicker(false)}>
                    <DatePicker dismiss={() => setShowEndDatePicker(false)} mode='endDate' />
                </Modal>
            </Portal>

            <TouchableOpacity 
                style={{flex: 1}}
                onPress={openStartDatePicker}
                onLongPress={() => dispatch(setStartDate(''))}
            >
                <ModalInput
                    label="Débuter"
                    value={startDate ? `${new Date(startDate).getDate()} ${month[new Date(startDate).getMonth()]} ${new Date(startDate).getFullYear()}` : "Aujourd'hui"}
                    style={{flex: 1}}
                />
            </TouchableOpacity>

            <TouchableOpacity 
                style={{flex: 1}}
                onPress={openEndDatePicker}
                onLongPress={() => dispatch(setEndDate(''))}
            >
                <ModalInput
                    label="Terminer"
                    value={endDate ? `${new Date(endDate).getDate()} ${month[new Date(endDate).getMonth()]} ${new Date(endDate).getFullYear()}` : "Jamais"}
                    style={{flex: 1}}
                />
            </TouchableOpacity>
        </View>
    )
}