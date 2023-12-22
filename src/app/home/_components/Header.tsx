import { Avatar, IconButton, withTheme, TouchableRipple } from 'react-native-paper';
import View from '../../../components/styled/View';
import { Image } from 'react-native';
import * as Updates from 'expo-updates';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../store/slice/authSlice';
import { setIsAuthenticated } from '../../../store/slice/authSlice';
import { useNavigation } from '@react-navigation/native';


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
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const StyledIconButton = withTheme(({ theme, ...props }: any) => <IconButton style={{backgroundColor: theme.colors.card}} {...props} theme={theme} />)


    return (
        <View style={styles.container}>
            <StyledIconButton icon="dots-horizontal" />
            <Image style={styles.imageLogo} source={require('../../../assets/images/logo.png')} />
            <TouchableRipple onPress={() => {
                dispatch(setToken(''));
                dispatch(setIsAuthenticated(false));
                SecureStore.deleteItemAsync('refreshToken');
                SecureStore.deleteItemAsync('accessToken')
                navigation.navigate('Login' as never);
            }}>
                <Avatar.Image size={37} source={{ uri: 'https://i.pravatar.cc/300' }} />
            </TouchableRipple>
        </View>
    )
}