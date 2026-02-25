import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens1/auth1/LoginScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />

        </Stack.Navigator>
    );
};

export default AuthNavigator;
