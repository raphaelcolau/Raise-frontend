import { Avatar, IconButton, withTheme, TouchableRipple } from 'react-native-paper';
import View from '../../../components/styled/View';
import { Image } from 'react-native';
import * as Updates from 'expo-updates';
import * as SecureStore from 'expo-secure-store';


export default function Header() {
    const styles = {
        container: {
            width: '100%',
            height: '10%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        imageLogo: {
            width: 91,
            height: 35,
        },
    }

    const StyledIconButton = withTheme(({ theme, ...props }: any) => <IconButton style={{backgroundColor: theme.colors.card}} {...props} theme={theme} />)

    const reloadExpo = () => {
        Updates.reloadAsync()
    }

    return (
        <View style={styles.container}>
            <StyledIconButton icon="dots-horizontal" onPress={reloadExpo} />
            <Image style={styles.imageLogo} source={require('../../../assets/images/logo.png')} />
            <TouchableRipple onPress={() => {
                SecureStore.deleteItemAsync('refreshToken');
                SecureStore.deleteItemAsync('accessToken').then(() => {
                    Updates.reloadAsync();
                });
            }}>
                <Avatar.Image size={37} source={{ uri: 'https://i.pravatar.cc/300' }} />
            </TouchableRipple>
        </View>
    )
}