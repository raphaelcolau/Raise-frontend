import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

export default function TextInput({value, label, placeholder, right, style, center, ...props}: {value: string | React.ReactNode, label?: string, placeholder?: string, right?: React.ReactNode, style?: any, props?: any, center?: boolean}) {
    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            minHeight: 50,
            backgroundColor: colors.surface,
            padding: 15,
            borderRadius: 15,
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: (center ? 'center' : 'space-between'),
        },
    });
    
    return (
        <View style={{...styles.container, ...style}} {...props}>

            <View style={styles.content}>

                <View>
                    {label && <Text style={{color: colors.primary}}>{label}</Text>}
                    <Text variant='titleMedium' style={{color: colors.onSurface}}>{value}</Text>
                </View>

                {right && right}

            </View>

        </View>
    )
}