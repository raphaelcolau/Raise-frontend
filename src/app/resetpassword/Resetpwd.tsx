import React, { useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { useTheme, Text, Icon, Button } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import TextInput from '../../components/styled/TextInput';
import StyledButton from '../../components/styled/Button';
import { forgotPassword } from '../../adapters/forgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import { setRetryDelay } from '../../store/slice/forgotPwdSlice';
import { current } from '@reduxjs/toolkit';


function Step0({ styles, changeStep }: { styles: any, changeStep: any }) {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const { colors } = useTheme();
    const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$');
    const dispatch = useDispatch();

    const handleNextStep = () => {
        if (email === '') {
            setError('Veuillez saisir votre adresse e-mail');
        } else if (!emailRegex.test(email))  {
            setError('Veuillez saisir une adresse e-mail valide');
        } else {
            console.log(email)
            forgotPassword(email).then((res) => {
                const futureDate = new Date();
                futureDate.setSeconds(futureDate.getSeconds() + 90);

                dispatch(setRetryDelay(Number(futureDate)));
                setError(null);
                changeStep(1);
            }).catch((err) => {
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
    const dispatch = useDispatch();
    const [step, setStep] = React.useState(0);
    const inputRefs = useRef<Array<any | null>>([]);

    const handleNextStep = () => {
        console.log("next step")
        changeStep(3);
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
                {Array.from(Array(6).keys()).map((i) => 
                    <TextInput
                        key={i}
                        value={code[i] ? code[i].toString() : ''}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const newCode = [...code];
                            if (text.length > 1) {
                                text = text[text.length - 1];
                            } else {
                                newCode[i] = text;
                                setCode(newCode.join(''));
                                if (inputRefs.current[i + 1]) {
                                    inputRefs.current[i + 1].focus();
                                }
                            }
                        }}
                        error={error ? true : false}
                        style={{flex: 1, fontSize: 25, textAlign: 'center', padding: 0, margin: 0, borderRadius: 15}}
                        ref={ref => inputRefs.current[i] = ref}
                    />
                )}
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
            
        </StyledView>
    )
}