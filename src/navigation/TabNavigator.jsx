import { Ionicons } from '@expo/vector-icons'; // Use vector icons for premium look
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Footer from '../components/Footer/Footer';
import HomeScreen from '../screens/home/HomeScreen';
import MatchListScreen from '../screens/matchmaking/MatchListScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import VendorListScreen from '../screens/vendor/VendorListScreen';
import EventServicesScreen from '../screens/wedding/EventServicesScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <Footer {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Services') {
                        return (
                            <Image
                                source={require('../../assets/images/image icon.png')}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: colors.secondary, // Dark Red to contrast with Gold circle
                                    resizeMode: 'contain'
                                }}
                            />
                        );
                    }

                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Matches') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    } else if (route.name === 'Vendors') {
                        iconName = focused ? 'storefront' : 'storefront-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Matches" component={MatchListScreen} options={{ tabBarLabel: 'Match' }} />
            <Tab.Screen name="Vendors" component={VendorListScreen} options={{ tabBarLabel: 'Vendor' }} />
            <Tab.Screen name="Services" component={EventServicesScreen} options={{ tabBarLabel: 'Service' }} />
            <Tab.Screen name="Profile" component={UserProfileScreen} options={{ tabBarLabel: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
