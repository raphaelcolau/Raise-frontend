import React from 'react';
import { Button } from 'react-native-paper';
import View from '../../components/styled/View';
import Header from './_components/Header';


export default function Home({navigation, route}: {navigation: any, route: any}) {
    
    const styles = {
        container: {
            flex: 1,
            padding: 15,
        },
    };

    return (
        <View style={styles.container}>
            <Header />
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button>
        </View>
    )
}