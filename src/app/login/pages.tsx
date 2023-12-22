import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import View from '../../components/styled/View';
import Text from '../../components/styled/Text';
import Button from '../../components/styled/Button';
import StyledTextInput from '../../components/styled/TextInput';
import { postSignIn } from '../../adapters/signin';
import { SignInPropsRes } from '../../components/type/types';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slice/authSlice';
import { setIsAuthenticated } from '../../store/slice/authSlice';

export default function Login({ navigation }: { navigation: any}) {
    const theme = useTheme();
    const [secureText, setSecureText] = React.useState(true);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [inputError, setInputError] = React.useState<string | null>(null);
    const dispatch = useDispatch();

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            gap: 30,
            padding: 24,
            height: '100%',
        },
        logo: {
            width: '100%',
            height: '20%',
            display: 'flex',
            justifyContent: 'center',
        },
        imageLogo: {
            width: 135,
            height: 52,
        },
        title: {
            fontWeight: 'bold',
        },
        subtitle: {
            fontWeight: 'normal',
            fontSize: 14,
            opacity: 0.7,
        },
        formInput: {
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
        },
        unableToConnect: {
            textAlign: 'right',
            textDecorationLine: 'underline',
        },
    });

    const handleSecureText = () => {
        setSecureText(!secureText);
    }

    const validForm = () => {
        if (username === '') {
            setInputError('username');
            setError('Veuillez saisir votre nom d\'utilisateur');
            return;
        } else if (password === '') {
            setInputError('password');
            setError('Veuillez saisir votre mot de passe');
            return;
        } else {
            setError(null);
            setInputError(null);
            postSignIn({username, password}).then((res) => {
                const data: SignInPropsRes = res;
                if (data.success) {

                    setUsername('');
                    setPassword('');
                    setError(null);
                    setInputError(null);
                    setSecureText(true);

                    dispatch(setToken(String(data.data?.refreshToken)));
                    dispatch(setIsAuthenticated(true));
                    navigation.navigate('Home');
                } else {
                    setError(String(data.message));
                }
            });
        
        }
    }
    
    return (
        <View style={styles.container}>
            
            <View id="Logo" style={styles.logo}>
                <Image style={styles.imageLogo} source={require('../../assets/images/logo.png')} />
            </View>

            <View>
                <Text variant="displaySmall" style={styles.title}>Vous revoilà!</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>Entrez votre nom d'utilisateur et mot de passe</Text>
            </View>

            {error ? <Text type="error">{error}</Text> : null}

            <View style={styles.formInput}>
                <StyledTextInput 
                    label="Nom d'utilisateur"
                    placeholder="Entrez votre nom d'utilisateur"
                    autoComplete='username'
                    error={inputError === 'username'}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <StyledTextInput 
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    autoComplete='password'
                    secureTextEntry={secureText}
                    error={inputError === 'password'}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    right={<TextInput.Icon icon={secureText ? "eye" : "eye-off"} onPress={() => handleSecureText()} />}
                />
                <Text style={styles.unableToConnect} variant="bodySmall">Je n'arrive pas à me connecter</Text>
            </View>

            <View>
                <Button onPress={() => validForm()}>
                    Se connecter
                </Button>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Ou </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text 
                        style={{ textDecorationLine: 'underline', fontWeight: "bold" }}
                    >
                        créer un compte
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}