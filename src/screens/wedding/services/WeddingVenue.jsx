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
import venue1 from '../../../../assets/images/venue1.jpg';
import venue2 from '../../../../assets/images/venue2.jpg';
import venue3 from '../../../../assets/images/venue3.jpg';
import venue4 from '../../../../assets/images/venue4.jpg';
import venue5 from '../../../../assets/images/venue5.jpg';
import venue6 from '../../../../assets/images/venue6.jpg';
import venue7 from '../../../../assets/images/venue7.jpg';
import venue8 from '../../../../assets/images/venue8.jpg';

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
        type: 'Palace',
        amenities: ['Outdoor', 'Alcohol'],
        image: venue1,
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
        type: 'Banquet',
        amenities: ['Indoor', 'Decor'],
        image: venue2,
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
        type: 'Resort',
        amenities: ['Beach', 'Stay'],
        image: venue3,
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
        type: 'Palace',
        amenities: ['Royal', 'Luxury'],
        image: venue4,
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
        type: 'Palace',
        amenities: ['Lake View', 'Royal'],
        image: venue5,
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
        type: 'Resort',
        amenities: ['Beach', 'Luxury'],
        image: venue7,
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
        type: 'Banquet',
        amenities: ['Indoor', 'Golf'],
        image: venue8,
    },
];

const CITIES = [
    {
        id: '1',
        name: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1562283833-281b37494ce4?q=80&w=400&auto=format&fit=crop',
        vibe: 'Luxury • Sea View • Grand',
    },
    {
        id: '2',
        name: 'Pune',
        image: 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?q=80&w=400&auto=format&fit=crop',
        vibe: 'Budget-Friendly • Scenic',
    },
    {
        id: '3',
        name: 'Jaipur',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop',
        vibe: 'Royal • Palaces • Heritage',
    },
    {
        id: '4',
        name: 'Goa',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop',
        vibe: 'Beach • Party • Relaxed',
    },
    {
        id: '5',
        name: 'Udaipur',
        image: 'https://images.unsplash.com/photo-1582234032535-6187b47b43f9?q=80&w=400&auto=format&fit=crop',
        vibe: 'Lakes • Royal • Romance',
    },
];

const VENUE_TYPES = [
    { id: '1', name: 'Palace', icon: 'castle' },
    { id: '2', name: 'Resort', icon: 'island' },
    { id: '3', name: 'Banquet', icon: 'glass-wine' },
    { id: '4', name: 'Lawn', icon: 'grass' },
    { id: '5', name: 'Hotel', icon: 'office-building' },
];

const WeddingVenue = ({ navigation }) => {
    const scrollRef = useRef(null);
    const cityScrollRef = useRef(null);
    const [venueListY, setVenueListY] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    // Auto-scroll logic for cities
    React.useEffect(() => {
        let scrollValue = 0;
        let intervalId = null;

        if (isAutoScrolling) {
            intervalId = setInterval(() => {
                if (cityScrollRef.current) {
                    scrollValue += 120; // Approx card width + margin
                    if (scrollValue > 120 * CITIES.length) {
                        scrollValue = 0; // Reset to start
                    }
                    cityScrollRef.current.scrollTo({ x: scrollValue, animated: true });
                }
            }, 2500);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isAutoScrolling]);

    // States
    const [activeCityId, setActiveCityId] = useState(null); // Default to null (show all)
    const [activeTypeId, setActiveTypeId] = useState(null);

    const toggleCity = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveCityId(id === activeCityId ? null : id);
    };

    const toggleType = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveTypeId(id === activeTypeId ? null : id);
    };

    // Filter Logic
    const filteredVenues = VENUES_DATA.filter(venue => {
        const cityMatch = activeCityId
            ? venue.city === CITIES.find(c => c.id === activeCityId)?.name
            : true;

        const typeMatch = activeTypeId
            ? venue.type === VENUE_TYPES.find(t => t.id === activeTypeId)?.name
            : true;

        return cityMatch && typeMatch;
    });

    const renderActionHero = () => (
        <View style={styles.heroContainer}>
            {/* Background Layer with Overlay */}
            <ImageBackground
                source={venue6}
                style={styles.heroImage}
                imageStyle={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                    style={styles.heroGradient}
                >
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={{ opacity: 1, transform: [{ translateY: 0 }] }}>
                        <Text style={styles.heroHeadline}>
                            Find the one before the big day 💍
                        </Text>
                        <Text style={styles.heroSubhead}>
                            Hand-picked venues for every wedding dream
                        </Text>

                        <View style={styles.heroActionsRow}>
                            <TouchableOpacity
                                style={styles.heroPrimaryBtn}
                                onPress={() => scrollRef.current?.scrollTo({ y: venueListY, animated: true })}
                            >
                                <Ionicons name="search" size={18} color="#FFF" style={{ marginRight: 8 }} />
                                <Text style={styles.heroPrimaryBtnText}>Find Venues</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </LinearGradient>
            </ImageBackground>

            {/* Trust Signals - Pills */}
            <View style={styles.trustSignalsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trustSignalsScroll}>
                    <View style={styles.trustPill}>
                        <MaterialCommunityIcons name="check-decagram" size={16} color={COLORS.primary} />
                        <Text style={styles.trustPillText}>500+ Verified Venues</Text>
                    </View>
                    <View style={styles.trustPill}>
                        <MaterialCommunityIcons name="phone-off" size={16} color={COLORS.primary} />
                        <Text style={styles.trustPillText}>Zero Broker Spam</Text>
                    </View>
                    <View style={styles.trustPill}>
                        <MaterialCommunityIcons name="camera-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.trustPillText}>100% Real Photos</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );

    const renderEditorialCityGrid = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Destinations</Text>
                <Text style={styles.sectionSubtitle}>Explore cities</Text>
            </View>
            <ScrollView
                ref={cityScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                onScrollBeginDrag={() => setIsAutoScrolling(false)} // Stop auto-scroll on user interaction
            >
                {CITIES.map((item) => {
                    const isActive = activeCityId === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.cityCard, isActive && styles.cityCardActive]}
                            onPress={() => {
                                setIsAutoScrolling(false);
                                toggleCity(item.id);
                            }}
                            activeOpacity={0.9}
                        >
                            <ImageBackground source={{ uri: item.image }} style={styles.cityBg} imageStyle={{ borderRadius: 16 }}>
                                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.cityGradient}>
                                    <Text style={styles.cityName}>{item.name}</Text>
                                    <Text style={styles.cityVibe} numberOfLines={1}>{item.vibe}</Text>
                                    {isActive && (
                                        <View style={styles.cityExploreTag}>
                                            <Text style={styles.cityExploreText}>Top Picks</Text>
                                        </View>
                                    )}
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
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Choose Your Vibe</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {VENUE_TYPES.map((item) => {
                    const isActive = activeTypeId === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.glassTypeCard, isActive && styles.glassTypeCardActive]}
                            activeOpacity={0.8}
                            onPress={() => toggleType(item.id)}
                        >
                            <View style={[styles.glassIconContainer, isActive && { backgroundColor: COLORS.primary }]}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={28}
                                    color={isActive ? COLORS.white : COLORS.secondary}
                                />
                            </View>
                            <Text style={[styles.glassTypeText, isActive && { color: COLORS.primary, fontFamily: 'Outfit_600SemiBold' }]}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    const renderEditorialVenueCard = ({ item }) => (
        <TouchableOpacity style={styles.editorialCard} activeOpacity={0.9}>
            <Image source={item.image} style={styles.editorialImage} />
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
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderActionHero()}
                {renderEditorialCityGrid()}
                {renderVenueTypes()}

                <View
                    style={styles.sectionContainer}
                    onLayout={(event) => setVenueListY(event.nativeEvent.layout.y)}
                >
                    <Text style={[styles.sectionTitle, { paddingHorizontal: 15, marginBottom: 20 }]}>
                        {activeCityId || activeTypeId ? 'Suggested Venues' : "Top Picks"}
                    </Text>

                    {filteredVenues.length > 0 ? (
                        filteredVenues.map(item => (
                            <View key={item.id}>
                                {renderEditorialVenueCard({ item })}
                            </View>
                        ))
                    ) : (
                        <View style={styles.noResultsContainer}>
                            <Text style={styles.noResultsText}>No venues found for this selection.</Text>
                            <TouchableOpacity onPress={() => { setActiveCityId(null); setActiveTypeId(null); }}>
                                <Text style={styles.clearFilterText}>Show All Venues</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.stickyButton}>
                        <Text style={styles.stickyButtonText}>Shortlist Venues</Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Ivory
    },
    // --- Hero Section Styles ---
    heroContainer: { marginBottom: 10 },
    heroImage: {
        width: width,
        height: 380, // Taller image for impact
        justifyContent: 'flex-end',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 40,
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
        // backdropFilter: 'blur(10px)', // For web, might not work on native without library but harmless
    },
    heroHeadline: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 32,
        color: COLORS.white,
        lineHeight: 40,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
        marginBottom: 8,
    },
    heroSubhead: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: '#FFEB3B', // Updated to Bright Yellow
        marginBottom: 24,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    heroActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    heroPrimaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12, // Reduced height
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', // Increased width to cover hero section
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    heroPrimaryBtnText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15,
        color: COLORS.white,
    },
    heroSecondaryBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    heroSecondaryBtnText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15,
        color: COLORS.white,
    },

    // --- Trust Signals ---
    trustSignalsContainer: {
        marginTop: -25, // Overlap the image slightly
        marginBottom: 10,
    },
    trustSignalsScroll: {
        paddingHorizontal: 15,
        paddingVertical: 10, // Avoid clipping shadow
    },
    trustPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    trustPillText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        color: COLORS.textDark,
        marginLeft: 6,
    },

    // --- City Grid ---
    sectionContainer: {
        marginTop: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#CC0E0E',
    },
    sectionSubtitle: {
        color: COLORS.secondary,
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
    },
    cityCard: {
        marginRight: 10,
        width: 100, // Reduced from 120 (and 140 in previous refactor)
        height: 140, // Reduced from 180
        borderRadius: 12,
        overflow: 'hidden',
    },
    cityCardActive: {
        width: 140, // Reduced active width
    },
    cityBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    cityGradient: {
        padding: 8,
        width: '100%',
        height: '60%',
        justifyContent: 'flex-end',
    },
    cityName: {
        fontFamily: SERIF_FONT,
        fontSize: 14, // Reduced Text
        color: COLORS.white,
        marginBottom: 2,
    },
    cityVibe: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 9, // Reduced Text
        color: '#EEE',
        opacity: 0.9,
    },
    cityExploreTag: {
        marginTop: 4,
        backgroundColor: COLORS.secondary,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    cityExploreText: {
        color: COLORS.white,
        fontSize: 8,
        fontFamily: 'Outfit_600SemiBold',
    },

    // --- Glassmorphism Type Grid ---
    glassTypeCard: {
        marginRight: 15,
        alignItems: 'center',
        width: 80,
        height: 90,
        backgroundColor: 'rgba(255, 255, 240, 0.6)', // Pastel Ivory/Beige transparent
        borderRadius: 16,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(242, 149, 2, 0.2)', // Subtle Gold border
        shadowColor: '#D4AF37', // Gold shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    glassTypeCardActive: {
        backgroundColor: '#FFF',
        borderColor: COLORS.primary,
        transform: [{ scale: 1.05 }],
    },
    glassIconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        marginBottom: 8,
    },
    glassTypeText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11,
        color: COLORS.textDark,
        marginTop: 4,
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
        backgroundColor: '#f29502', // Updated color
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    ratingPillText: {
        color: '#FFFFFF', // White text
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
    footerContainer: {
        alignItems: 'center',
        marginVertical: 30,
        paddingBottom: 20,
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
    noResultsContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noResultsText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    clearFilterText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: COLORS.primary,
    },
});

export default WeddingVenue;