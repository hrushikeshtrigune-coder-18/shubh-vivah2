import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import MatchListScreen from '../screens/matchmaking/MatchListScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import VendorListScreen from '../screens/vendor/VendorListScreen';
import WeddingDashboardScreen from '../screens/wedding/WeddingDashboardScreen';
import { colors } from '../theme/colors';

// Placeholder icons (text for now or vector icons if available)
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = '🏠';
                    else if (route.name === 'Matches') iconName = '❤️';
                    else if (route.name === 'Vendors') iconName = '🏪';
                    else if (route.name === 'Wedding') iconName = '💍';
                    else if (route.name === 'Profile') iconName = '👤';

                    return <Text style={{ fontSize: size, color }}>{iconName}</Text>;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Matches" component={MatchListScreen} />
            <Tab.Screen name="Vendors" component={VendorListScreen} />
            <Tab.Screen name="Wedding" component={WeddingDashboardScreen} />
            <Tab.Screen name="Profile" component={UserProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
