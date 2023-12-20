import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import View from '../../components/styled/View';
import Text from '../../components/styled/Text';


export default function Login() {
    const theme = useTheme();
    
    return (
        <View style={styles.container}>
            
            <View>
                <Text variant="displayLarge">Raise</Text>
            </View>

            <View>
                <Text variant="displaySmall">Vous revoilà!</Text>
                <Text variant="bodyLarge">Entrez votre nom d'utilisateur et mot de passe</Text>
            </View>


            <View>
                <TextInput 
                    label="Nom d'utilisateur"
                    placeholder="Entrez votre nom d'utilisateur"
                    mode="outlined"
                    autoComplete='username'
                />
                <TextInput 
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    mode="outlined"
                    autoComplete='password'
                    secureTextEntry={true}
                />
                <Text variant="bodySmall">Je n'arrive pas à me connecter</Text>
            </View>

            <View>
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Se connecter
                </Button>
            </View>

            <Text>Ou créer un compte</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        padding: 24,
        height: '100%',
    }
});