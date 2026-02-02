import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Honeymoon from '../screens/wedding/services/Honeymoon';
import WeddingVenue from '../screens/wedding/services/WeddingVenue';
import Food from '../screens/wedding/services/food';
import Photography from '../screens/wedding/services/photography';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';


// Mock Screens for loading
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen name="WeddingVenue" component={WeddingVenue} />
                    <Stack.Screen name="Photography" component={Photography} />
                    <Stack.Screen name="Food" component={Food} />
                    <Stack.Screen name="Honeymoon" component={Honeymoon} />
                </>
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;
