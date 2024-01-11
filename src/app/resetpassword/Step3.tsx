import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme, Text, TextInput as PaperTextInput } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import TextInput from '../../components/styled/TextInput';
import StyledButton from '../../components/styled/Button';
import {  useSelector } from 'react-redux';
import { resetPassword } from '../../adapters/resetPassword';

export default function Step3({ styles, changeStep, navigation }: { styles: any, changeStep: any, navigation: any }) {
    const { colors } = useTheme();
    const [error, setError] = React.useState<string | null>(null);
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>('');
    const [secureText, setSecureText] = React.useState<boolean>(true);
    const [secureTextConfirm, setSecureTextConfirm] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [code, setCode] = React.useState<string>('');
    const retryDelay: number = useSelector((state: any) => state.forgotPwd.retryDelay);
    const [currentDelay, setCurrentDelay] = React.useState(retryDelay - Number(Date.now()));
    const token: string = useSelector((state: any) => state.forgotPwd.token);
    const email: string = useSelector((state: any) => state.forgotPwd.email);

    const errorStyle = StyleSheet.create({
        error: {
            color: colors.error,
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentDelay >= 0) {
                setCurrentDelay(retryDelay - Number(Date.now()));
            } else {
                clearInterval(interval);
            }
        }, 1000);
        
        return () => clearInterval(interval);

    }, [currentDelay]);

    const handleSecureText = () => {
        setSecureText(!secureText);
    }

    const handleSecureTextConfirm = () => {
        setSecureTextConfirm(!secureTextConfirm);
    }

    const validForm = () => {
        if (password === '') {
            setError('Veuillez saisir votre mot de passe');
        } else if (passwordConfirm === '') {
            setError('Veuillez confirmer votre mot de passe');
        } else if (password !== passwordConfirm) {
            setError('Les mots de passe ne correspondent pas');
        } else {
            setError(null);
            setLoading(true);
            resetPassword(email, token, password).then((res) => {
                setLoading(false);
                setSuccess(true);
                changeStep(0);
                navigation.goBack();
            }).catch((err) => {
                setLoading(false);
                console.log(err.response.data);
                setError(err.response.data.newPassword);
            });
        }
    }

    return (
        <StyledView style={styles.content}>
                
            <Text variant="titleLarge">Nouveau mot de passe</Text>
            
            <Text variant="bodyMedium">
                Veuillez saisir votre nouveau mot de passe.
            </Text>

            {error ? <Text style={errorStyle.error} variant="titleMedium">{error}</Text> : null}
            
            <TextInput
                value={password}
                label="Mot de passe"
                textContentType="password"
                secureTextEntry={secureText}
                onChangeText={(text) => setPassword(text)}
                placeholder="********"
                style={{marginTop: 45}}
                error={error ? true : false}
                right={
                    <PaperTextInput.Icon 
                        icon={secureText ? 'eye' : 'eye-off'}
                        onPress={() => handleSecureText()}
                    />
                }
            />

            <TextInput
                value={passwordConfirm}
                label="Confirmation du mot de passe"
                textContentType="password"
                secureTextEntry={secureTextConfirm}
                onChangeText={(text) => setPasswordConfirm(text)}
                placeholder="********"
                style={{marginTop: 5}}
                error={error ? true : false}
                right={
                    <PaperTextInput.Icon 
                        icon={secureTextConfirm ? 'eye' : 'eye-off'}
                        onPress={() => handleSecureTextConfirm()}
                    />
                }
            />
            
            <StyledButton
                style={{marginTop: 45}}
                onPress={() => validForm()}
                loading={loading}
                disabled={loading}
            >
                Valider
            </StyledButton>

        </StyledView>
    )
}