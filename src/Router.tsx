import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./app/home/pages";
import Login from "./app/login/pages";
import Register from "./app/register/pages";
import { useSelector } from 'react-redux';

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
                {isAuthenticated ? false : <Stack.Screen name="Login" component={Login} />}
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
