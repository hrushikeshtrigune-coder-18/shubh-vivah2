import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    LayoutAnimation,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Enable LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SERIF_FONT = Platform.select({ ios: 'Georgia', android: 'serif' });

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
    inputBg: '#FFF5F5',
};

const VENUES_DATA = [
    {
        id: '1',
        name: 'Royal Orchid Palace',
        rating: 4.8,
        reviews: 320,
        city: 'Pune',
        location: 'Pune, MH',
        price: '₹2.5L',
        capacity: '500-1500',
        type: 'Palaces',
        amenities: ['Outdoor', 'Alcohol'],
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'The Grand Hyatt',
        rating: 4.9,
        reviews: 450,
        city: 'Mumbai',
        location: 'Mumbai, MH',
        price: '₹5.0L',
        capacity: '1000+',
        type: 'Banquets',
        amenities: ['Indoor', 'Decor'],
        image: 'https://images.unsplash.com/photo-1561589255-b46132924a4d?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Zuri White Sands',
        rating: 4.7,
        reviews: 210,
        city: 'Goa',
        location: 'Goa',
        price: '₹4.5L',
        capacity: '200-500',
        type: 'Beachside',
        amenities: ['Beach', 'Stay'],
        image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '5',
        name: 'Umaid Bhawan Palace',
        rating: 5.0,
        reviews: 900,
        city: 'Jaipur',
        location: 'Jaipur, RJ',
        price: '₹15L',
        capacity: '500-2000',
        type: 'Palaces',
        amenities: ['Royal', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '6',
        name: 'Oberoi Udaivilas',
        rating: 5.0,
        reviews: 600,
        city: 'Udaipur',
        location: 'Udaipur, RJ',
        price: '₹20L',
        capacity: '200-800',
        type: 'Palaces',
        amenities: ['Lake View', 'Royal'],
        image: 'https://images.unsplash.com/photo-1582234032535-6187b47b43f9?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '7',
        name: 'Taj Exotica',
        rating: 4.8,
        reviews: 350,
        city: 'Goa',
        location: 'Benaulim, Goa',
        price: '₹6.0L',
        capacity: '300-600',
        type: 'Beachside',
        amenities: ['Beach', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '8',
        name: 'Ritz Carlton',
        rating: 4.9,
        reviews: 280,
        city: 'Pune',
        location: 'Yerwada, Pune',
        price: '₹4.0L',
        capacity: '400-900',
        type: 'Banquets',
        amenities: ['Indoor', 'Golf'],
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
    },
];

const CITIES = [
    { id: '1', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1562283833-281b37494ce4?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: 'Pune', image: 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop' },
    { id: '5', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-18bd27909ddb?q=80&w=400&auto=format&fit=crop' },
];

const WeddingVenue = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    // States
    const [activeCityId, setActiveCityId] = useState('1');
    const [city, setCity] = useState('');
    const [guestCount, setGuestCount] = useState('');
    const [budget, setBudget] = useState('');

    const toggleCity = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveCityId(id === activeCityId ? null : id);
    };

    const renderActionHero = () => (
        <View style={styles.heroContainer}>
            {/* Background Layer with Overlay - Reduced Height */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop' }}
                style={styles.heroImage}
                imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
                    style={styles.heroGradient}
                >
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.heroHeadline}>
                        Verified Wedding Venues That Match{'\n'}Your Budget, Style & Guest List
                    </Text>
                </LinearGradient>
            </ImageBackground>

            {/* Trust Signals - Specific Proof */}
            <View style={styles.trustSignalsRow}>
                <View style={styles.trustSignalItem}>
                    <MaterialCommunityIcons name="check-decagram" size={16} color={COLORS.secondary} />
                    <Text style={styles.trustSignalText}>500+ Verified Listings</Text>
                </View>
                <View style={styles.trustSignalItem}>
                    <MaterialCommunityIcons name="currency-usd-off" size={16} color={COLORS.secondary} />
                    <Text style={styles.trustSignalText}>No Broker Calls</Text>
                </View>
                <View style={styles.trustSignalItem}>
                    <MaterialCommunityIcons name="image-multiple-outline" size={16} color={COLORS.secondary} />
                    <Text style={styles.trustSignalText}>Real Photos Only</Text>
                </View>
            </View>
        </View>
    );

    const renderEditorialCityGrid = () => (
        <View style={styles.sectionContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 15 }}>
                <Text style={styles.sectionTitle}>Curated Collections</Text>
                <Text style={{ color: COLORS.secondary, fontFamily: 'Outfit_400Regular' }}>Explore cities</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {CITIES.map((item) => {
                    const isActive = activeCityId === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.cityCard, isActive && styles.cityCardActive]}
                            onPress={() => toggleCity(item.id)}
                            activeOpacity={0.9}
                        >
                            <ImageBackground source={{ uri: item.image }} style={styles.cityBg}>
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.cityGradient}>
                                    <Text style={[styles.cityName, isActive && { fontSize: 24 }]}>{item.name}</Text>
                                    {isActive && <Text style={styles.cityExplore}>Explore 20+ Venues</Text>}
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    const renderVenueTypes = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 15, marginBottom: 15 }]}>Explore by Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {['Palace', 'Resort', 'Banquet', 'Farmhouse', 'Hotel'].map((type, i) => (
                    <TouchableOpacity key={i} style={styles.typeCard}>
                        <View style={styles.typeIcon}>
                            <MaterialCommunityIcons name={type === 'Palace' ? 'castle' : 'home'} size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.typeText}>{type}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderEditorialVenueCard = ({ item }) => (
        <TouchableOpacity style={styles.editorialCard} activeOpacity={0.9}>
            <Image source={{ uri: item.image }} style={styles.editorialImage} />
            <View style={styles.cardHeaderOverlay}>
                <View style={styles.ratingPill}>
                    <Text style={styles.ratingPillText}>{item.rating}</Text>
                </View>
                <View style={styles.heartCircle}>
                    <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
                </View>
            </View>
            {/* Floating Info Card */}
            <View style={styles.floatingInfoCard}>
                <Text style={styles.editorialVenueName}>{item.name}</Text>
                <Text style={styles.editorialVenueLoc}>{item.city}, MH</Text>
                <View style={styles.divider} />
                <View style={styles.editorialMetaRow}>
                    <Text style={styles.editorialPrice}>{item.price}</Text>
                    <Text style={styles.editorialCapacity}>{item.capacity} guests</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderActionHero()}
                {renderEditorialCityGrid()}
                {renderVenueTypes()}

                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { paddingHorizontal: 15, marginBottom: 20 }]}>Editor's Pick</Text>
                    {VENUES_DATA.map(item => (
                        <View key={item.id}>
                            {renderEditorialVenueCard({ item })}
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.stickyFooter}>
                <TouchableOpacity style={styles.stickyButton}>
                    <Text style={styles.stickyButtonText}>Shortlist Venues</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Ivory
    },
    // --- Hero Section Styles ---
    heroContainer: { marginBottom: 20 },
    heroImage: {
        width: width,
        height: 320,
        justifyContent: 'flex-end',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 80,
    },
    topBar: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    heroHeadline: {
        fontFamily: SERIF_FONT,
        fontSize: 28,
        color: COLORS.white,
        lineHeight: 36,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        marginTop: 40,
        textAlign: 'center',
    },
    searchCardWrapper: {
        marginTop: -60, // Overlap image
        paddingHorizontal: 15,
    },
    searchCard: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBg,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
    },
    mainInput: {
        flex: 1,
        fontFamily: 'Outfit_500Medium',
        fontSize: 16,
        color: COLORS.primary,
        marginLeft: 10,
    },
    subInput: {
        flex: 1,
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: COLORS.primary,
        marginLeft: 8,
    },
    secondaryInputsRow: {
        flexDirection: 'row',
        marginTop: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 0,
    },
    findVenuesButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 12,
        marginTop: 15,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    findVenuesText: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: COLORS.white,
        marginRight: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    shortcutsContainer: {
        marginTop: 15,
        paddingLeft: 5,
    },
    shortcutChip: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 5,
    },
    shortcutText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: COLORS.secondary,
    },
    trustSignalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    trustSignalItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trustSignalText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 11,
        color: '#666',
        marginLeft: 5,
    },
    // --- City Grid ---
    sectionContainer: {
        marginTop: 30,
    },
    sectionTitle: {
        fontFamily: SERIF_FONT,
        fontSize: 24,
        color: COLORS.primary,
    },
    cityCard: {
        marginRight: 15,
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
    },
    cityCardActive: {
        width: 200, // Expanded width
    },
    cityBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    cityGradient: {
        padding: 10,
        width: '100%',
    },
    cityName: {
        fontFamily: SERIF_FONT,
        fontSize: 16,
        color: COLORS.white,
    },
    cityExplore: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: COLORS.warning,
        marginTop: 4,
    },
    // --- Type Grid ---
    typeCard: {
        marginRight: 15,
        alignItems: 'center',
    },
    typeIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.secondary,
        marginBottom: 8,
        shadowColor: COLORS.secondary,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    typeText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: COLORS.primary,
    },
    // --- Editorial Venue Cards ---
    editorialCard: {
        marginHorizontal: 15,
        marginBottom: 40,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 32,
    },
    editorialImage: {
        width: '100%',
        height: 350,
        borderRadius: 32,
        resizeMode: 'cover',
    },
    cardHeaderOverlay: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingPill: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    ratingPillText: {
        color: COLORS.primary,
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
    },
    heartCircle: {
        backgroundColor: COLORS.white,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingInfoCard: {
        position: 'absolute',
        bottom: -20,
        left: 20,
        right: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    editorialVenueName: {
        fontFamily: SERIF_FONT,
        fontSize: 20,
        color: COLORS.primary,
        marginBottom: 4,
    },
    editorialVenueLoc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: COLORS.secondary,
        marginBottom: 10,
    },
    editorialMetaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editorialPrice: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: COLORS.primary,
    },
    editorialCapacity: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: COLORS.secondary,
        backgroundColor: '#FFF5F5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    stickyFooter: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        zIndex: 100,
    },
    stickyButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 30,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    stickyButtonText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 14,
        color: COLORS.white,
        marginRight: 10,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});

export default WeddingVenue;
