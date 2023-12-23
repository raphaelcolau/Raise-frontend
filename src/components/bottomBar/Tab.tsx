import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon, useTheme, Text } from 'react-native-paper';

export const Tab = ({name, title, icon, selected}: {name: string, title: string, icon: string, selected?: boolean}) => {
    const theme = useTheme();
    
    const color = selected ? theme.colors.primary : theme.colors.onBackground;

    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            margin: 15,
        }
    });

    return (
        <TouchableOpacity onPress={() => {}}>
            <View style={styles.container}>
                <Icon source={icon} size={35} color={color} />
                <Text variant="titleMedium" style={{color: color, fontFamily: 'sans-serif-light'}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
};