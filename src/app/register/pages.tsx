import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import View from '../../components/styled/View';
import Text from '../../components/styled/Text';
import Button from '../../components/styled/Button';
import Chip from '../../components/styled/Chip';
import StyledTextInput from '../../components/styled/TextInput';
import { GENDER, SignUpPropsRes } from '../../components/type/types';
import { postSignUp } from '../../adapters/signup';

export default function Register({ navigation }: { navigation: any}) {
    const theme = useTheme();
    const [secureText, setSecureText] = React.useState(true);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [gender, setGender] = React.useState<GENDER>(GENDER.NOT_SPECIFIED);
    const [error, setError] = React.useState<string | null>(null);
    const [inputError, setInputError] = React.useState<string | null>(null);
    const regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');

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
        bold: {
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
    });

    const handleSecureText = () => {
        setSecureText(!secureText);
    }

    const validForm = () => {
        if (username === '') {
            setError('Le nom d\'utilisateur est obligatoire');
            setInputError('username');
            return;
        } else if (email === '') {
            setError('L\'e-mail est obligatoire');
            setInputError('email');
            return;
        } else if (email !== '' && !regexEmail.test(email)) {
            setError('L\'e-mail n\'est pas valide');
            setInputError('email');
            return;
        } else if (password !== '' && password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            setInputError('password');
            return;
        } else {
            setError(null);
            setInputError(null);
            postSignUp({
                username,
                email,
                password,
                gender,
            }).then((res) => {
                const data = res.data as SignUpPropsRes;
                if (data.success) {
                    navigation.navigate('Login');
                } else {
                    setError(String(data.message));
                }
            })
        }
    }
    
    return (
        <View style={styles.container}>

            <View>
                <Text variant="displaySmall" style={styles.bold}>Bienvenue!</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>Dites-nous qui vous êtes avant de commencer</Text>
            </View>

            {error ? <Text type="error">{error}</Text> : null}

            <View>
                <Text variant="titleSmall" style={styles.bold}>Vous êtes</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 10,
                        marginTop: 10,
                    }}
                >
                    <Chip 
                        icon="gender-male" 
                        selected={gender === GENDER.MAN}
                        onPress={() => setGender(GENDER.MAN)}
                    >
                        Homme
                    </Chip>
                    <Chip 
                        icon="gender-female" 
                        selected={gender === GENDER.WOMAN}
                        onPress={() => setGender(GENDER.WOMAN)}
                    >
                        Femme
                    </Chip>
                    <Chip 
                        icon="helicopter" 
                        selected={gender === GENDER.NOT_SPECIFIED}
                        onPress={() => setGender(GENDER.NOT_SPECIFIED)}
                    >
                        Autres
                    </Chip>
                </View>
            </View>

            <View style={styles.formInput}>
                <StyledTextInput 
                    label="Nom d'utilisateur"
                    placeholder="Entrez votre nom d'utilisateur"
                    autoComplete='username'
                    error={inputError === 'username'}
                    onChangeText={(text) => setUsername(text)}
                />
                <StyledTextInput 
                    label="E-mail"
                    placeholder="Entrez votre e-mail"
                    autoComplete='email'
                    error={inputError === 'email'}
                    onChangeText={(text) => setEmail(text)}
                />

                <StyledTextInput 
                    label="Mot de passe"
                    placeholder="Entrez votre mot de passe"
                    autoComplete='password'
                    error={inputError === 'password'}
                    secureTextEntry={secureText}
                    onChangeText={(text) => setPassword(text)}
                    right={<TextInput.Icon icon={secureText ? "eye" : "eye-off"} onPress={() => handleSecureText()} />}
                />
            </View>

            <View>
                <Button onPress={() => validForm()}>
                    S'inscrire
                </Button>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Ou </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text 
                        style={{ textDecorationLine: 'underline', fontWeight: "bold" }}
                    >
                        se connecter
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}