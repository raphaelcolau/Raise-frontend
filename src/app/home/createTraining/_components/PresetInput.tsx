import React from 'react';
import { Icon, useTheme } from 'react-native-paper';
import ModalInput from '../../../../components/PlaceHolderInput/PlaceHolderInput';

export default function PresetInput() {
    const { colors } = useTheme();

    return (
        <ModalInput 
            value="Musculation"
            label="Pré-réglage"
            right={
                <Icon
                    source="menu-down"
                    size={30}
                />
            }
        />
    )
}