import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { useTheme, Text, Icon, Button, TextInput as PaperTextInput } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import TextInput from '../../components/styled/TextInput';
import StyledButton from '../../components/styled/Button';
import { forgotPassword } from '../../adapters/forgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { setRetryDelay, setEmail as setEmailStore, setPwdToken } from '../../store/slice/forgotPwdSlice';
import { verifyPwdToken } from '../../adapters/verifyPwdToken';
import { resetPassword } from '../../adapters/resetPassword';


function Step0({ styles, changeStep }: { styles: any, changeStep: any }) {
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
                >
                    <Icon source="send" size={20} color='black'/>
                    Envoyer l'email
                </StyledButton>

            </StyledView>
    )
}

function Step1({ styles, changeStep }: { styles: any, changeStep: any }) {
    const { colors } = useTheme();
    const retryDelay: number = useSelector((state: any) => state.forgotPwd.retryDelay);
    const [currentDelay, setCurrentDelay] = React.useState(retryDelay - Number(Date.now()));

    const handleNextStep = () => {
        changeStep(2);
    }

    const handlePreviousStep = () => {
        changeStep(0);
    }

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

    return (
        <StyledView style={styles.content}>
            <Text variant="titleLarge">Email de changement de mot de passe envoyé !</Text>
            <Text variant="bodyMedium">Un email de confirmation contenant un code de validation à quatre chiffres vient de vous être envoyé.</Text>

            <StyledButton
                style={{marginTop: 45}}
                onPress={() => handleNextStep()}
            >
                J'ai reçu le mail avec le code
            </StyledButton>

            <Button 
                mode='outlined'
                textColor={colors.onBackground}
                style={{borderRadius: 15, borderWidth: 1.5, borderColor: colors.onBackground}}
                {...(currentDelay < 0 && {onPress: () => handlePreviousStep()})}
            >
                {currentDelay < 0 && 'Renvoyer un email'}
                {currentDelay >= 0 && 'Renvoyer un email dans ' + Math.floor(currentDelay / 1000) + ' secondes'}
            </Button>

        </StyledView>
    )
}

function Step2({ styles, changeStep }: { styles: any, changeStep: any }) {
    const { colors } = useTheme();
    const [error, setError] = React.useState<string | null>(null);
    const [code, setCode] = React.useState<string>('');
    const retryDelay: number = useSelector((state: any) => state.forgotPwd.retryDelay);
    const [currentDelay, setCurrentDelay] = React.useState(retryDelay - Number(Date.now()));
    const email: string = useSelector((state: any) => state.forgotPwd.email);
    const dispatch = useDispatch();

    const handleNextStep = () => {
        verifyPwdToken(email, code).then((res) => {
            dispatch(setPwdToken(code))
            changeStep(3);
        }).catch((err) => {
            setError("Le code de validation est incorrect");
        });
    }

    const handlePreviousStep = () => {
        changeStep(0);
    }

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


    useEffect(() => {
        console.log(code)
    }, [code]);


    return (
        <StyledView style={styles.content}>
                
            <Text variant="titleLarge">Vérification de l’email</Text>
            
            <Text variant="bodyMedium">Vous pouvez saisir le code à 4 chiffres présent dans l’email de confirmation que vous venez de recevoir sur votre boite mail.</Text>

            {error ? <Text style={errorStyle.error} variant="titleMedium">{error}</Text> : null}

            <View style={{display: 'flex', flexDirection: 'row', gap: 5, overflow: 'hidden', marginTop: 50}}>
                <TextInput
                    value={code}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        if (text.length <= 6) {
                            setCode(text);
                        }
                    }}
                    error={error ? true : false}
                    style={{flex: 1, fontSize: 25, textAlign: 'center', padding: 0, margin: 0, borderRadius: 15}}
                />
            </View>

            <StyledButton
                style={{marginTop: 45}}
                onPress={() => handleNextStep()}
            >
                Continuer
            </StyledButton>

            <Button 
                mode='outlined'
                textColor={colors.onBackground}
                style={{borderRadius: 15, borderWidth: 1.5, borderColor: colors.onBackground}}
                {...(currentDelay < 0 && {onPress: () => handlePreviousStep()})}
            >
                {currentDelay < 0 && 'Renvoyer un email'}
                {currentDelay >= 0 && 'Renvoyer un email dans ' + Math.floor(currentDelay / 1000) + ' secondes'}
            </Button>
        </StyledView>
    )
}


function Step3({ styles, changeStep, navigation }: { styles: any, changeStep: any, navigation: any }) {
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

export default function ResetPwd({ navigation, route }: { navigation: any, route: any}) {
    const [step, setStep] = React.useState(0);
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            width: '100%',
            height: '100%',
            color: colors.onBackground,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            gap: 15,
            padding: 15,
        },
    });

    return (
        <StyledView style={styles.container}>
            <HeaderSubPage navigation={navigation} route={route} />
            {step === 0 && <Step0 styles={styles} changeStep={setStep}/> }
            {step === 1 && <Step1 styles={styles} changeStep={setStep}/> }
            {step === 2 && <Step2 styles={styles} changeStep={setStep}/> }
            {step === 3 && <Step3 styles={styles} changeStep={setStep} navigation={navigation}/> }
            
        </StyledView>
    )
}