import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext, useAuth } from '../context1/AuthContext';
import Services2 from '../screens1/wedding/Services2';

// Screens
import AuthNavigator from './AuthNavigator';
import DAngencies from '../screens1/wedding/services1/DAngencies';
import DecorationFloralScreen from '../screens1/wedding/services1/DecorationFloral';
import EInvite from '../screens1/wedding/services1/EInvite';
import EventMangment from '../screens1/wedding/services1/EventMangment';
import Food from '../screens1/wedding/services1/food';
import FoodV from '../screens1/wedding/services1/FoodV';
import HaldiInviteScreen from '../screens1/wedding/services1/HaldiInviteScreen';
import Honeymoon from '../screens1/wedding/services1/Honeymoon';
import HoneymoonVendorDetails from '../screens1/wedding/services1/HoneymoonVendorDetails';
import InviteStudioScreen from '../screens1/wedding/services1/InviteStudioScreen';
import Jewellery from '../screens1/wedding/services1/Jewellery';
import JewelleryDetails from '../screens1/wedding/services1/JewelleryDetails';
import MakeupArtistDetails from '../screens1/wedding/services1/MakeupArtistDetails';
import MakeupScreen from '../screens1/wedding/services1/makeup';
import MehandiScreen from '../screens1/wedding/services1/mehandi';
import MehndiInviteScreen from '../screens1/wedding/services1/MehndiInviteScreen';
import PhotographerPortfolio from '../screens1/wedding/services1/photop';
import Photography from '../screens1/wedding/services1/photography';
import ReceptionInviteScreen from '../screens1/wedding/services1/ReceptionInviteScreen';
import SangitInviteScreen from '../screens1/wedding/services1/SangitInviteScreen';
import VendorDetailScreen from '../screens1/wedding/services1/VendorDetailScreen';
import VendorListScreen from '../screens1/wedding/services1/VendorListScreen';
import VenuePortfolio from '../screens1/wedding/services1/venuep';
import WAgencies from '../screens1/wedding/services1/WAgencies';
import WeddingInviteScreen from '../screens1/wedding/services1/WeddingInviteScreen';
import WeddingVenue from '../screens1/wedding/services1/WeddingVenue';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { user, isLoading } = useAuth();




    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Services2} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="WeddingVenue" component={WeddingVenue} />
            <Stack.Screen name="Photography" component={Photography} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Honeymoon" component={Honeymoon} />
            <Stack.Screen name="HoneymoonVendorDetails" component={HoneymoonVendorDetails} />
            <Stack.Screen name="EInviteScreen" component={EInvite} />
            <Stack.Screen name="InviteStudioScreen" component={InviteStudioScreen} />
            <Stack.Screen name="EventManagementScreen" component={EventMangment} />
            <Stack.Screen name="VendorListScreen" component={VendorListScreen} />
            <Stack.Screen name="VendorDetailScreen" component={VendorDetailScreen} />
            <Stack.Screen name="JewelleryScreen" component={Jewellery} />
            <Stack.Screen name="HaldiInviteScreen" component={HaldiInviteScreen} />
            <Stack.Screen name="SangitInviteScreen" component={SangitInviteScreen} />
            <Stack.Screen name="MehndiInviteScreen" component={MehndiInviteScreen} />
            <Stack.Screen name="WeddingInviteScreen" component={WeddingInviteScreen} />
            <Stack.Screen name="ReceptionInviteScreen" component={ReceptionInviteScreen} />
            <Stack.Screen name="MehandiScreen" component={MehandiScreen} />
            <Stack.Screen name="FoodV" component={FoodV} />
            <Stack.Screen name="PhotographerPortfolio" component={PhotographerPortfolio} />
            <Stack.Screen name="VenuePortfolio" component={VenuePortfolio} />
            <Stack.Screen name="WAgenciesScreen" component={WAgencies} />
            <Stack.Screen name="DAngenciesScreen" component={DAngencies} />
            <Stack.Screen name="MakeupScreen" component={MakeupScreen} />
            <Stack.Screen name="MakeupArtistDetailsScreen" component={MakeupArtistDetails} />
            <Stack.Screen name="DecorationFloral" component={DecorationFloralScreen} />
            <Stack.Screen name="JewelleryDetailsScreen" component={JewelleryDetails} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

