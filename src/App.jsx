import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AuthProvider>
                    <RoleProvider>
                        <NavigationContainer>
                            <AppNavigator />
                            <StatusBar style="auto" />
                        </NavigationContainer>
                    </RoleProvider>
                </AuthProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
