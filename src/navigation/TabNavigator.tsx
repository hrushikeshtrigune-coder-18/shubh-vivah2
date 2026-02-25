import { Ionicons } from '@expo/vector-icons'; // Use vector icons for premium look
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Footer from '../components1/Footer/Footer';

import Services2 from '../screens/wedding/Services2';
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
                                source={require('../../assets1/images/image icon.png')}
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

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
            })}
        >

            <Tab.Screen name="Services" component={Services2} options={{ tabBarLabel: 'Service' }} />

        </Tab.Navigator>
    );
};

export default TabNavigator;
