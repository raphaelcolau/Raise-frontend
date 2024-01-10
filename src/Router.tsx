import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./app/home/pages";
import Login from "./app/login/pages";
import Register from "./app/register/pages";
import { useSelector } from 'react-redux';
import * as React from 'react';
import { CreateTrainingPage } from './app/home/createTraining/pages';
import ResetPwd from './app/resetpassword/Resetpwd';


const Stack = createNativeStackNavigator();


export default function Router() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                {isAuthenticated ? <Stack.Screen name="Home" component={Home} /> : null}
                <Stack.Screen name="CreateTraining" component={CreateTrainingPage} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ResetPwd" component={ResetPwd} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
