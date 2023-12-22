import React from 'react'
import * as SecureStore from 'expo-secure-store';


export default function RequireAuth({children, navigation}: {children: React.ReactNode, navigation: any}) {

    React.useEffect(() => {
        SecureStore.getItemAsync('accessToken').then((accessToken) => {
            if (!accessToken) {
                navigation.navigate('Login');
            }
        })
    }, []);

    return (
        <>
            {children}
        </>
    )
}