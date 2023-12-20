import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';


export default function Home({navigation, route}: {navigation: any, route: any}) {
    return (
        <View>
            <Text>Home</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
            </Button>
        </View>
    )
}