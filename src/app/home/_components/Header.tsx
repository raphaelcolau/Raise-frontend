import { Avatar, IconButton, withTheme, TouchableRipple } from 'react-native-paper';
import View from '../../../components/styled/View';
import { Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../../store/slice/authSlice';
import { setRefreshToken } from '../../../store/slice/authSlice';
import { setIsAuthenticated } from '../../../store/slice/authSlice';
import { useNavigation } from '@react-navigation/native';
import { StyledIconButton } from '../../../components/styled/IconButton';


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

    return (
        <View style={styles.container}>
            <StyledIconButton icon="dots-horizontal" />
            <Image style={styles.imageLogo} source={require('../../../assets/images/logo.png')} />
            <TouchableRipple onPress={() => {
                dispatch(setAccessToken(''));
                dispatch(setRefreshToken(''));
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