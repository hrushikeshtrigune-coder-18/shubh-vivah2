import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext, useAuth } from '../context/AuthContext';
import Services2 from '../screens/wedding/Services2';

// Screens
import AuthNavigator from './AuthNavigator';
import DAngencies from '../screens/wedding/services/DAngencies';
import DecorationFloralScreen from '../screens/wedding/services/DecorationFloral';
import EInvite from '../screens/wedding/services/EInvite';
import EventMangment from '../screens/wedding/services/EventMangment';
import Food from '../screens/wedding/services/food';
import FoodV from '../screens/wedding/services/FoodV';
import HaldiInviteScreen from '../screens/wedding/services/HaldiInviteScreen';
import Honeymoon from '../screens/wedding/services/Honeymoon';
import HoneymoonVendorDetails from '../screens/wedding/services/HoneymoonVendorDetails';
import InviteStudioScreen from '../screens/wedding/services/InviteStudioScreen';
import Jewellery from '../screens/wedding/services/Jewellery';
import JewelleryDetails from '../screens/wedding/services/JewelleryDetails';
import MakeupArtistDetails from '../screens/wedding/services/MakeupArtistDetails';
import MakeupScreen from '../screens/wedding/services/makeup';
import MehandiScreen from '../screens/wedding/services/mehandi';
import MehndiInviteScreen from '../screens/wedding/services/MehndiInviteScreen';
import PhotographerPortfolio from '../screens/wedding/services/photop';
import Photography from '../screens/wedding/services/photography';
import ReceptionInviteScreen from '../screens/wedding/services/ReceptionInviteScreen';
import SangitInviteScreen from '../screens/wedding/services/SangitInviteScreen';
import VendorDetailScreen from '../screens/wedding/services/VendorDetailScreen';
import VendorListScreen from '../screens/wedding/services/VendorListScreen';
import VenuePortfolio from '../screens/wedding/services/venuep';
import WAgencies from '../screens/wedding/services/WAgencies';
import WeddingInviteScreen from '../screens/wedding/services/WeddingInviteScreen';
import WeddingVenue from '../screens/wedding/services/WeddingVenue';


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

