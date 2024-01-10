import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { StyledIconButton } from '../styled/IconButton';
import StyledView from '../styled/View';

export default function HeaderSubPage({ navigation, route }: { navigation: any, route: any}) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            width: '100%',
        }
    });

    return (
        <StyledView
            style={styles.container}
        >
            <StyledIconButton 
                icon="chevron-left"
                size={30}
                onPress={() => navigation.goBack()}
            />
        </StyledView>
    )
}