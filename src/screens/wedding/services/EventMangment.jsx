import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    LayoutAnimation,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import Reanimated, {
    FadeInDown,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



// Team Card Constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // Increased width for better visibility
const SPACING = 15;
const SIDECARD_LENGTH = (width - CARD_WIDTH) / 2;

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#f29502',
};

const EventManagement = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    // Force update for hero section visibility
    const [expandedService, setExpandedService] = useState(null);
    const [selectedService, setSelectedService] = useState(null); // For detailed card view

    // Video Player Setup
    const videoSource = require('../../../../assets/EventMimg/EventV.mp4');
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    // Services Grid converted to static grid - auto-scroll removed

    // Scroll Animation for Team Section
    const scrollX = useRef(new Animated.Value(0)).current;

    const scrollY = useSharedValue(0);
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll logic for Featured Vendors
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentIndex < allFeaturedVendors.length - 1) {
                flatListRef.current?.scrollToIndex({
                    index: currentIndex + 1,
                    animated: true,
                });
                setCurrentIndex(currentIndex + 1);
            } else {
                flatListRef.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                });
                setCurrentIndex(0);
            }
        }, 3000); // 3 seconds

        return () => clearInterval(intervalId);
    }, [currentIndex]);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const scrollViewRef = useAnimatedRef();
    const teamSectionY = useSharedValue(0);

    const scrollToTeam = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: teamSectionY.value, animated: true });
        }
    };

    const toggleService = (id) => {
        if (Platform.OS !== 'web') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        setExpandedService(expandedService === id ? null : id);
    };

    const renderScrollContent = () => (
        <>
            {/* 1. Hero Section */}
            <View style={styles.heroSection}>
                <VideoView
                    style={StyleSheet.absoluteFill}
                    player={player}
                    contentFit="cover"
                    nativeControls={false}
                />

                <View style={[styles.headerRow, { top: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.heroContent}>
                    <Text style={styles.heroHeadline}>We Don’t Just Plan Events — We Create Experiences ✨</Text>
                    <Text style={styles.heroSubtext}>Weddings • Social Events • Corporate Experiences • Destination Events</Text>

                    <TouchableOpacity style={styles.primaryCTA} onPress={scrollToTeam}>
                        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.ctaText}>Plan My Event</Text>
                    </TouchableOpacity>

                    {/* Search Bar - Replaces Trust Highlights */}
                    <View style={styles.searchBarContainer}>
                        <Ionicons name="search" size={20} color="#666" style={{ marginRight: 10 }} />
                        <Text style={{ color: '#999', fontSize: 16 }}>Search services, venues...</Text>
                        <View style={{ flex: 1 }} />
                        <View style={styles.searchFilterBtn}>
                            <Ionicons name="options-outline" size={18} color="#fff" />
                        </View>
                    </View>
                </View>

            </View>


            {/* 1.5 Quick Services Grid */}
            <View style={[styles.sectionContainer, { paddingTop: 60, paddingBottom: 10, backgroundColor: '#FFFBEA' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 10 }}>
                    <View style={{ width: 4, height: 40, backgroundColor: '#B8860B', marginRight: 15, borderRadius: 2 }} />
                    <View>
                        <Text style={[styles.sectionTitle, { color: '#A70002', fontSize: 28, marginBottom: 0, textAlign: 'left' }]}>Services</Text>
                        <Text style={{ fontSize: 14, color: '#555', fontStyle: 'italic', fontFamily: 'serif', marginTop: 2 }}>
                            Because every love story deserves perfection
                        </Text>
                    </View>
                </View>

                <View style={styles.servicesGridContainer}>
                    {servicesGridData.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.serviceGridItem}
                            onPress={() => setSelectedService(item)}
                        >
                            <View style={styles.serviceGridImageWrapper}>
                                <Image source={item.image} style={styles.serviceGridImage} resizeMode="cover" />
                            </View>
                            <Text style={styles.serviceGridLabel}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 1.6 Featured Vendors */}
            <View style={[styles.sectionContainer, { backgroundColor: '#FFFBEA', paddingBottom: 20 }]}>
                <Text style={[styles.sectionTitle, { color: '#A70002', marginBottom: 15 }]}>Featured Vendors</Text>
                <FlatList
                    ref={flatListRef}
                    data={allFeaturedVendors}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width * 0.75 + 20} // width + horizontal margin * 2
                    decelerationRate="fast"
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <FeaturedVendorCard vendor={item} navigation={navigation} />
                    )}
                    initialNumToRender={2}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    removeClippedSubviews={Platform.OS === 'android'}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                        });
                    }}
                />
            </View>

            <View style={{ height: 20 }} />
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.akshid} />

                {Platform.OS === 'web' ? (
                    <ScrollView
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        onScroll={(e) => {
                            scrollY.value = e.nativeEvent.contentOffset.y;
                        }}
                        scrollEventThrottle={16}
                    >
                        {renderScrollContent()}
                    </ScrollView>
                ) : (
                    <Reanimated.ScrollView
                        ref={scrollViewRef}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {renderScrollContent()}
                    </Reanimated.ScrollView>
                )}
            </View>
        </View>

    );
};

// --- Components ---



// Reused components from before...





// --- Data ---
const servicesData = [];

const vendorData = []; // Consolidating vendor data elsewhere or unused

const allFeaturedVendors = [
    {
        id: 'f1',
        name: 'Stories by Joseph',
        location: 'Goa',
        price: 'Starts ₹3,00,000 / day',
        rating: 4.9,
        reviews: 320,
        image: { uri: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1974&auto=format&fit=crop' },
        tags: ['Candid', 'Drone', 'Cinematic'],
        description: 'Award-winning wedding photography team specializing in capturing candid moments and cinematic films.',
        likes: '4.5k',
        views: '32k',
        portfolio: [
            { uri: 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop' },
        ]
    },
    {
        id: 'f2',
        name: 'Lens & Light',
        location: 'Mumbai',
        price: 'Starts ₹2,50,000 / day',
        rating: 4.8,
        reviews: 215,
        image: { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
        tags: ['Traditional', 'Pre-wedding', 'Albums'],
        description: 'Capturing the essence of your big day with a blend of traditional elegance and modern storytelling.',
        likes: '3.1k',
        views: '18k',
        portfolio: [
            { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1522673607200-1645062ac2d4?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop' },
        ]
    },
    // Merged from vendorData
    {
        id: 'v1',
        name: 'Royal Orchid Palace',
        location: 'Pune, MH',
        price: '₹2.5L',
        rating: '4.8',
        reviews: '45',
        image: require('../../../../assets/images/decor.jpg'),
        tags: ['Heritage', 'Luxury', 'Royal'],
        description: 'Premium wedding venue offering royal heritage ambiance with modern amenities and impeccable hospitality.',
        likes: '2.5k',
        views: '15k',
        portfolio: [
            require('../../../../assets/images/decor.jpg'),
            require('../../../../assets/images/venue1.jpg'),
            require('../../../../assets/images/venue2.jpg'),
            require('../../../../assets/images/venue3.jpg'),
            require('../../../../assets/images/venue4.jpg'),
            require('../../../../assets/images/venue5.jpg'),
        ]
    },
    {
        id: 'v2',
        name: 'Grand Celebration',
        location: 'Mumbai, MH',
        price: '₹3.2L',
        rating: '4.9',
        reviews: '68',
        image: require('../../../../assets/images/Food.jpg'),
        tags: ['Catering', 'Floral', 'Grand'],
        description: 'Exquisite event management with world-class catering and stunning floral arrangements.',
        likes: '3.1k',
        views: '22k',
        portfolio: [
            require('../../../../assets/images/Food.jpg'),
            require('../../../../assets/images/food1.jpg'),
            require('../../../../assets/images/food2.jpg'),
            require('../../../../assets/images/food3.jpg'),
            require('../../../../assets/images/food4.jpg'),
            require('../../../../assets/images/decor.jpg'),
        ]
    },
    {
        id: 'v3',
        name: 'Majestic Events',
        location: 'Nashik, MH',
        price: '₹1.8L',
        rating: '4.7',
        reviews: '32',
        image: require('../../../../assets/images/entertenment.jpg'),
        tags: ['Affordable', 'Creative', 'Themed'],
        description: 'Affordable yet elegant event planning with creative themes and seamless coordination.',
        likes: '1.8k',
        views: '10k',
        portfolio: [
            require('../../../../assets/images/entertenment.jpg'),
            require('../../../../assets/images/photo.jpg'),
            require('../../../../assets/images/venue6.jpg'),
            require('../../../../assets/images/venue7.jpg'),
            require('../../../../assets/images/venue8.jpg'),
            require('../../../../assets/images/decor.jpg'),
        ]
    },
    {
        id: 'v4',
        name: 'Dream Wedding Co.',
        location: 'Jaipur, RJ',
        price: '₹4.0L',
        rating: '4.9',
        reviews: '89',
        image: require('../../../../assets/images/photo.jpg'),
        tags: ['Destination', 'Royal', 'Fairytale'],
        description: 'Luxury destination wedding specialists creating fairytale celebrations in royal Rajasthani settings.',
        likes: '4.2k',
        views: '28k',
        portfolio: [
            require('../../../../assets/images/photo.jpg'),
            require('../../../../assets/images/ph2.jpg'),
        ]
    }
];

const FeaturedVendorCard = ({ vendor, navigation }) => (
    <Reanimated.View
        entering={FadeInDown.delay(100).duration(600).springify()}
        style={styles.featuredVendorCardContainer}
    >
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.featuredVendorCard}
            onPress={() => navigation.navigate('VendorDetailScreen', { vendor })}
        >
            {/* Header */}
            <View style={styles.fVendorHeader}>
                <Text style={styles.fVendorName}>{vendor.name}</Text>
                <View style={styles.fRatingBadge}>
                    <Ionicons name="star" size={12} color="#fff" style={{ marginRight: 4 }} />
                    <Text style={styles.fRatingText}>{vendor.rating} ({vendor.reviews})</Text>
                </View>
            </View>

            {/* Image Section */}
            <View style={styles.fImageContainer}>
                <Image source={vendor.image} style={styles.fVendorImage} resizeMode="cover" />
                <TouchableOpacity style={styles.fHeartIcon}>
                    <Ionicons name="heart-outline" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Info Section */}
            <View style={styles.fInfoSection}>
                <View style={styles.fRowSpace}>
                    <View style={styles.fLocationRow}>
                        <Ionicons name="location-outline" size={16} color="#ffa500" />
                        <Text style={styles.fLocationText}>{vendor.location}</Text>
                    </View>
                    <Text style={styles.fPriceText}>{vendor.price}</Text>
                </View>

                {/* Tags */}
                <View style={styles.fTagsRow}>
                    {(vendor.tags || []).map((tag, index) => (
                        <View key={index} style={styles.fTagBadge}>
                            <Text style={styles.fTagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    </Reanimated.View>
);

const servicesGridData = [
    { id: '1', title: 'E-Invites', image: require('../../../../assets/images/invite.jpg') },
    { id: '2', title: 'Event Management', image: require('../../../../assets/images/Gust Mangment.jpg') },
    { id: '3', title: 'Venues', image: require('../../../../assets/images/venue1.jpg') },
    { id: '4', title: 'Catering', image: require('../../../../assets/images/Food.jpg') },
    { id: '5', title: 'Photography', image: require('../../../../assets/images/photo.jpg') },
    { id: '6', title: 'Decor', image: require('../../../../assets/images/decor.jpg') },
    { id: '7', title: 'Jewellery', image: require('../../../../assets/images/Jewellery.jpg') },
    { id: '8', title: 'Mehandi', image: require('../../../../assets/images/mehandi.jpg') },
    { id: '9', title: 'Makeup', image: require('../../../../assets/images/makeup.jpg') },
    { id: '10', title: 'Honeymoon', image: require('../../../../assets/images/honeymoon planning.jpg') },
];


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.akshid,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    heroSection: {
        height: 500,
        justifyContent: 'flex-end',
        zIndex: 1, // Ensure trust items sit on top of the next section
    },
    heroContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerRow: {
        position: 'absolute',
        top: 20, // Adjusted top margin
        left: 20,
        zIndex: 10
    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    heroHeadline: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'serif',
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    heroSubtext: {
        fontSize: 14,
        color: '#f0f0f0',
        marginBottom: 20,
        fontWeight: '500',
    },
    primaryCTA: {
        backgroundColor: COLORS.kumkum,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 5,
        shadowColor: COLORS.kumkum,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        flexDirection: 'row', // align icon and text
        paddingHorizontal: 25,
    },
    ctaText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    searchBarContainer: {
        position: 'absolute',
        bottom: -25, // Overlap effect
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 30, // Rectangular with rounded corners
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        zIndex: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    searchFilterBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.kumkum,
        justifyContent: 'center',
        alignItems: 'center',
    },



    // Section Common
    sectionContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingTop: 80, // Increased space for the overlapping trust icons
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },

    // Process - Horizontal Redesign
    processStepContainer: {
        alignItems: 'center',
        width: 160,
        marginRight: 15,
    },
    processIconCenter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    // processTextTop removed
    // stepCircle, stepNum, stepLine removed
    processTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    processDesc: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
    },

    // Services
    serviceCard: {
        backgroundColor: COLORS.akshid,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    serviceBody: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
    },
    serviceDetail: {
        fontSize: 13,
        color: '#555',
        marginBottom: 5,
        paddingLeft: 10,
    },

    // Stories
    storiesScroll: {
        marginTop: 10,
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    storyCard: {
        width: 250,
        marginRight: 15,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    storyImage: {
        width: '100%',
        height: 140,
    },
    storyContent: {
        padding: 15,
    },
    storyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    storyQuote: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#666',
    },

    // TEAM SECTION - NEW STYLES
    sectionHeaderCentered: {
        alignItems: 'center',
        marginBottom: 25,
    },
    sectionTitleCenter: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 5,
        textAlign: 'center',
    },
    sectionSubtitleCenter: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
        marginBottom: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    dividerDivider: {
        width: 150,
        height: 20,
        tintColor: '#D4AF37', // Gold
        opacity: 0.8,
    },
    vendorCardContainer: {
        width: '100%',
        height: 380,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 2,
        borderColor: '#FFD700', // Gold Border
        overflow: 'hidden',
    },
    vendorImageBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    vendorImageWrapper: {
        width: '100%',
        height: '100%',
    },
    cardTopRow: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    ratingBadge: {
        backgroundColor: '#FF9800', // Orange/Gold
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    heartBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
    },
    vendorBottomOverlay: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
    },
    vendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    capacityBadge: {
        backgroundColor: '#FFF9C4', // Light Yellow
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FBC02D',
    },
    capacityText: {
        fontSize: 11,
        color: '#F57F17',
        fontWeight: '600',
    },
    vendorLocation: {
        fontSize: 13,
        color: COLORS.kumkum,
        fontWeight: '500',
    },
    vendorPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.kumkum,
    },

    // Emotional
    emotionalSection: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
    },
    emotionalText: {
        fontSize: 18,
        fontFamily: 'serif',
        color: '#333',
        textAlign: 'center',
        lineHeight: 28,
        fontStyle: 'italic',
    },

    // Sticky Bottom
    stickyBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    stickyBtnPrimary: {
        flex: 1,
        backgroundColor: '#A70002',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 10,
    },
    stickyTextPrimary: {
        color: '#fff',
        fontWeight: 'bold',
    },
    stickyBtnSecondary: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A70002',
    },
    // Services Grid Styles
    servicesGridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 5,
        justifyContent: 'flex-start', // Align start for clean grid
        paddingVertical: 10,
    },
    serviceGridItem: {
        width: '33.33%', // 3 columns
        alignItems: 'center',
        marginBottom: 20,
    },
    serviceGridImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40, // Circle
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    serviceGridImage: {
        width: '100%',
        height: '100%',
    },
    serviceGridLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#7B1F1F', // Deep red/maroon
        textAlign: 'center',
        paddingHorizontal: 2,
    },

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width * 0.85,
        height: width * 0.85, // Square-ish like the reference
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10,
        backgroundColor: '#fff',
    },
    modalImageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalDarkOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(139, 0, 0, 0.75)', // Deep red overlay like reference
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 10,
    },
    modalSubTitle: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        marginBottom: 5,
        fontFamily: 'serif',
    },
    modalTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'serif',
    },
    vipBadge: {
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#FFD700',
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    vipText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalFeaturesRow: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
    },
    featureText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        textAlign: 'center',
    },

    // Featured Vendor Card Styles
    featuredVendorCardContainer: {
        width: Dimensions.get('window').width * 0.75, // Reduced width (75%)
        marginHorizontal: 10, // Reduced margin
        marginBottom: 25,
    },
    featuredVendorCard: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#F3D870', // Gold border
        padding: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    fVendorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    fVendorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A70002',
    },
    fRatingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F29502', // Orange
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    fRatingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    fImageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
        position: 'relative',
    },
    fVendorImage: {
        width: '100%',
        height: '100%',
    },
    fHeartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 6,
    },
    fInfoSection: {
        marginTop: 5,
    },
    fRowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    fLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fLocationText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
        fontWeight: '600',
    },
    fPriceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#CC0E0E',
    },
    fTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    fTagBadge: {
        backgroundColor: '#FFF0F5', // Light pinkish
        borderWidth: 1,
        borderColor: '#FFC0CB',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 5,
    },
    fTagText: {
        color: '#D81B60',
        fontSize: 12,
    },



});

export default EventManagement;