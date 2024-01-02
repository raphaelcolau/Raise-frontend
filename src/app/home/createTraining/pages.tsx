import React from 'react';
import { StyleSheet } from 'react-native';
import StyledView from '../../../components/styled/View';
import Text from '../../../components/styled/Text';
import { IconButton } from 'react-native-paper';
import { StyledIconButton } from '../../../components/styled/IconButton';
import Button from '../../../components/styled/Button';

function HeaderReturn({ navigation, route }: { navigation: any, route: any}) {
    const styles = StyleSheet.create({
        header: {
            display: 'flex',
            paddingLeft: 0,
            padding: 10,
        },
    });

    return (
        <StyledView style={styles.header}>
            <StyledIconButton
                icon="chevron-left"
                size={30}
                onPress={() => navigation.goBack()}
            />
        </StyledView>
    )

}

export function CreateTrainingPage({ navigation, route }: { navigation: any, route: any}) {
    const styles = StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 13,
            padding: 10,
        },
    });

  return (
    <StyledView style={styles.container}>
        <HeaderReturn navigation={navigation} route={route} />
        <Text variant="headlineSmall">Programmer une séance</Text>
        <Button icon='play' style={{padding: 5}}>Ajouter la séance</Button>
    </StyledView>
  );
}