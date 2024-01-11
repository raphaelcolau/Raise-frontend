import React from 'react'
import { StyleSheet } from 'react-native'
import HeaderSubPage from '../../components/headerSubPage/HeaderSubPage';
import { useTheme } from 'react-native-paper';
import StyledView from '../../components/styled/View';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

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