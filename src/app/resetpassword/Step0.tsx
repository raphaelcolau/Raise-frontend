import React from 'react'
import { StyleSheet } from 'react-native'
import { useTheme, Text, Icon} from 'react-native-paper';
import StyledView from '../../components/styled/View';
import TextInput from '../../components/styled/TextInput';
import StyledButton from '../../components/styled/Button';
import { forgotPassword } from '../../adapters/forgotPassword';
import { useDispatch, } from 'react-redux';
import { setRetryDelay, setEmail as setEmailStore, setPwdToken } from '../../store/slice/forgotPwdSlice';

export default function Step0({ styles, changeStep }: { styles: any, changeStep: any }) {
    const [email, setEmail] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const { colors } = useTheme();
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');
    const dispatch = useDispatch();

    const handleNextStep = () => {
        if (email === '') {
            setError('Veuillez saisir votre adresse e-mail');
        } else if (!emailRegex.test(email))  {
            setError('Veuillez saisir une adresse e-mail valide');
        } else {
            setLoading(true);
            forgotPassword(email).then((res) => {
                setLoading(false);
                const futureDate = new Date();
                futureDate.setSeconds(futureDate.getSeconds() + 90);
                dispatch(setEmailStore(email));
                dispatch(setRetryDelay(Number(futureDate)));
                setError(null);
                changeStep(1);
            }).catch((err) => {
                setLoading(false);
                console.log(err.response)
                console.log(err.response.data.message);
                setError(err.response.data.message);
            });
        }
    }

    const errorStyle = StyleSheet.create({
        error: {
            color: colors.error,
        }
    });

    return (
        <StyledView style={styles.content}>
                
                <Text variant="titleLarge">Mot de passe oublié ?</Text>
                
                <Text variant="bodyMedium">Veuillez saisir votre adresse e-mail pour réinitialiser votre mot de passe.</Text>

                {error ? <Text style={errorStyle.error} variant="titleMedium">{error}</Text> : null}

                <TextInput
                    value={email}
                    label="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    onChangeText={(text) => setEmail(text)}
                    placeholder="john@foo.com"
                    style={{marginTop: 45}}
                    error={error ? true : false}
                />
                <StyledButton
                    onPress={() => handleNextStep()}
                    loading={loading}
                    disabled={loading}
                >
                    <Icon source="send" size={20} color='black'/>
                    Envoyer l'email
                </StyledButton>

            </StyledView>
    )
}