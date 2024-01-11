import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text, Button} from 'react-native-paper';
import StyledView from '../../components/styled/View';
import TextInput from '../../components/styled/TextInput';
import StyledButton from '../../components/styled/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setPwdToken } from '../../store/slice/forgotPwdSlice';
import { verifyPwdToken } from '../../adapters/verifyPwdToken';

export default function Step2({ styles, changeStep }: { styles: any, changeStep: any }) {
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