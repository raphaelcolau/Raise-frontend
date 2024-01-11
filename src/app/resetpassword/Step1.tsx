import React, { useEffect } from 'react'
import { useTheme, Text, Button} from 'react-native-paper';
import StyledView from '../../components/styled/View';
import StyledButton from '../../components/styled/Button';
import {  useSelector } from 'react-redux';

export default function Step1({ styles, changeStep }: { styles: any, changeStep: any }) {
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