import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Local Image Imports
const venue1 = require('../../../../assets/images/venue1.jpg');
const venue2 = require('../../../../assets/images/venue2.jpg');
const venue3 = require('../../../../assets/images/venue3.jpg');

const { width } = Dimensions.get('window');

// Mock data for similar vendors
const SIMILAR_VENDORS = [
    {
        id: '1',
        name: 'Royal Heritage',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&auto=format&fit=crop',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'Grand Bloom',
        image: 'https://images.unsplash.com/photo-1561026483-edab5b0eee37?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Elite Gardens',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=400&auto=format&fit=crop',
        rating: 4.9,
    },
    {
        id: '4',
        name: 'The Grandeur',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop',
        rating: 4.6,
    },
    {
        id: '5',
        name: 'Sapphire Inn',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop',
        rating: 4.5,
    },
    {
        id: '6',
        name: 'Crystal Ballroom',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
    },
];

// Local assets for venue photos
const VENUE_PHOTOS = [
    { id: '1', source: venue1 },
    { id: '2', source: venue2 },
    { id: '3', source: venue3 },
];

// Mock data for Previous Events (reusing same images for demo, but logically distinct)
const PREVIOUS_EVENTS = [
    { id: '1', source: venue3 },
    { id: '2', source: venue1 },
    { id: '3', source: venue2 },
    { id: '4', source: venue1 },
];

const VENDOR_PLANS = [
    {
        id: '1',
        name: 'Pearl Plan',
        price: '₹25,000',
        features: ['Basic Decoration', 'Sound System', 'Standard Lighting'],
        icon: 'diamond-outline',
        color: '#95afc0'
    },
    {
        id: '2',
        name: 'Ruby Plan',
        price: '₹50,000',
        features: ['Premium Decoration', 'DJ System', 'Stage Lighting', 'Photography'],
        icon: 'diamond',
        color: '#eb4d4b'
    },
    {
        id: '3',
        name: 'Diamond Plan',
        price: '₹1,00,000',
        features: ['Luxury Decoration', 'Live Band', 'Cinematography', 'Catering Support'],
        icon: 'sparkles',
        color: '#f0932b'
    }
];

const VenuePortfolio = ({ navigation, route }) => {
    // Default data if no params provided
    const params = route.params || {};
    const vendor = params.vendor || {
        name: 'Royal Orchid Palace',
        type: 'Venue',
        image: null,
        amenities: ['Outdoor', 'Alcohol'],
        rating: 4.8,
        reviews: 320,
        location: 'Pune, MH',
    };

    const [activeShowcaseTab, setActiveShowcaseTab] = React.useState('venue');

    // Auto-scroll logic for similar vendors (Suggested)
    const suggestedVendorsRef = useRef(null);
    React.useEffect(() => {
        let scrollValue = 0;
        const intervalId = setInterval(() => {
            if (suggestedVendorsRef.current) {
                scrollValue += 95; // 80 card width + 15 gap
                if (scrollValue > 95 * SIMILAR_VENDORS.length - width) {
                    scrollValue = 0;
                }
                if (suggestedVendorsRef.current.scrollTo) {
                    suggestedVendorsRef.current.scrollTo({ x: scrollValue, animated: true });
                }
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    // Auto-scroll logic for Hero Carousel
    const heroCarouselRef = useRef(null);
    const [heroIndex, setHeroIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (heroCarouselRef.current) {
                let nextIndex = heroIndex + 1;
                if (nextIndex >= VENUE_PHOTOS.length) {
                    nextIndex = 0; // Loop back
                }
                setHeroIndex(nextIndex);
                if (heroCarouselRef.current.scrollTo) {
                    heroCarouselRef.current.scrollTo({ x: nextIndex * width, animated: true });
                }
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [heroIndex]);

    // --- ANIMATION INTERPOLATIONS ---

    // --- ANIMATION REVERTED ---

    const renderHeroCarousel = () => (
        <View style={styles.heroCarouselContainer}>
            <ScrollView
                ref={heroCarouselRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setHeroIndex(newIndex);
                }}
            >
                {VENUE_PHOTOS.map((photo, index) => (
                    <Image
                        key={index}
                        source={photo.source}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            {/* Simple Pagination Dots */}
            <View style={styles.paginationContainer}>
                {VENUE_PHOTOS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === heroIndex && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookmarkButton}>
                <Ionicons name="bookmark-outline" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderSuggestedVendors = () => (
        <View style={styles.suggestedContainer}>
            <Text style={styles.suggestedTitle}>Suggested Vendors</Text>
            <ScrollView
                ref={suggestedVendorsRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestedScrollContent}
            >
                {SIMILAR_VENDORS.map((v) => (
                    <TouchableOpacity key={v.id} style={styles.suggestedCard}>
                        <Image source={{ uri: v.image }} style={styles.suggestedImage} />
                        <View style={styles.suggestedInfo}>
                            <Text style={styles.suggestedName} numberOfLines={1}>{v.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderProfileSection = () => (
        <View style={styles.profileSection}>
            <View style={styles.profileRow}>
                <View style={[styles.profileImageContainer, { zIndex: 100 }]}>
                    <Image
                        source={vendor.image ? vendor.image : { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200' }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.profileInfoColumn}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <Text style={styles.locationText} numberOfLines={1}>
                        <Ionicons name="location-outline" size={12} color="#666" /> Udaipur, Rajasthan
                    </Text>
                    <Text style={styles.descriptionTextHero} numberOfLines={2}>
                        Offering a royal experience with curated luxury events.
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#F29502" />
                            <Text style={styles.statText}>{vendor.rating} ({vendor.reviews})</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Suggested Vendors Carousel */}
            {renderSuggestedVendors()}
        </View>
    );


    const renderVendorPlans = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Plans & Pricing</Text>
            <Text style={styles.sectionSubtitle}>Choose a plan that fits your dream wedding</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.plansScrollContent}
            >
                {VENDOR_PLANS.map((plan) => (
                    <TouchableOpacity key={plan.id} style={styles.planCard}>
                        <View style={[styles.planIconCircleVertical, { backgroundColor: plan.color + '15' }]}>
                            <Ionicons name={plan.icon} size={32} color={plan.color} />
                        </View>

                        <Text style={styles.planNameVertical}>{plan.name}</Text>
                        <Text style={styles.planPriceVertical}>{plan.price}</Text>
                        <Text style={styles.planPerEvent}>Per Event</Text>

                        <View style={styles.featuresListVertical}>
                            {plan.features.map((feature, idx) => (
                                <View key={idx} style={styles.featureItemVertical}>
                                    <Ionicons name="checkmark-circle" size={14} color={plan.color} />
                                    <Text style={styles.featureTextVertical}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={[styles.selectPlanBtn, { borderColor: plan.color }]}>
                            <Text style={[styles.selectPlanText, { color: plan.color }]}>Select Plan</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderGallery = () => {
        const imagesToShow = activeShowcaseTab === 'venue' ? VENUE_PHOTOS : PREVIOUS_EVENTS;

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.blobShape} />

                <View style={styles.showcaseHeader}>
                    <Text style={styles.sectionTitle}>Venue Showcase</Text>

                    <View style={styles.showcaseTabs}>
                        <TouchableOpacity
                            style={[styles.showcaseTabItem, activeShowcaseTab === 'venue' && styles.activeShowcaseTab]}
                            onPress={() => setActiveShowcaseTab('venue')}
                        >
                            <Text style={[styles.showcaseTabText, activeShowcaseTab === 'venue' && styles.activeShowcaseTabText]}>
                                Venue Images
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.showcaseTabItem, activeShowcaseTab === 'events' && styles.activeShowcaseTab]}
                            onPress={() => setActiveShowcaseTab('events')}
                        >
                            <Text style={[styles.showcaseTabText, activeShowcaseTab === 'events' && styles.activeShowcaseTabText]}>
                                Previous Events
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.galleryGrid}>
                    {activeShowcaseTab === 'venue' ? (
                        <>
                            {VENUE_PHOTOS.slice(0, 1).map((photo, index) => (
                                <TouchableOpacity key={index} style={styles.galleryItemHero}>
                                    <Image source={photo.source} style={styles.galleryImage} />
                                </TouchableOpacity>
                            ))}
                            <View style={styles.galleryRow}>
                                {VENUE_PHOTOS.slice(1, 3).map((photo, index) => (
                                    <TouchableOpacity key={index} style={styles.galleryItemMedium}>
                                        <Image source={photo.source} style={styles.galleryImage} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    ) : (
                        <View style={styles.eventsGrid}>
                            {PREVIOUS_EVENTS.map((photo, index) => (
                                <TouchableOpacity key={index} style={styles.galleryItemMedium}>
                                    <Image source={photo.source} style={styles.galleryImage} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {renderHeroCarousel()}

                <View style={styles.mainContentWrapper}>
                    {renderProfileSection()}
                    {renderGallery()}
                    {renderVendorPlans()}

                    {/* Buttons at the end of the page */}
                    <View style={styles.footerActions}>
                        <TouchableOpacity style={styles.contactButtonOutline} onPress={() => { }}>
                            <Text style={styles.contactButtonTextOutline}>Contact Vendor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookButtonPremium} onPress={() => { }}>
                            <Text style={styles.bookButtonTextPremium}>Book a Visit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    mainContentWrapper: {
        backgroundColor: '#FFFFF0',
        zIndex: 1,
        paddingTop: 10, // Small gap to show the floating effect
    },
    // Hero Carousel
    heroCarouselContainer: {
        height: 280, // Reduced height (was 400)
        width: width,
    },
    heroImage: {
        width: width,
        height: 280, // Reduced height
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#FFF',
        width: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    bookmarkButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        zIndex: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    profileImageContainer: {
        marginRight: 15,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        marginTop: 15, // Push image down specifically
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#FFFFF0',
    },
    suggestedContainer: {
        marginTop: 20,
    },
    suggestedTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#222',
        marginBottom: 10,
    },
    suggestedScrollContent: {
        gap: 15,
        paddingRight: 20,
    },
    suggestedCard: {
        width: 80,
        height: 112,
        borderRadius: 12,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#EFEFEF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    suggestedImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    suggestedInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    suggestedName: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 10,
        color: '#FFF',
        textAlign: 'center',
    },
    profileInfoColumn: {
        flex: 1,
        paddingTop: 35, // Shifted upper (was 55)
        justifyContent: 'center',
    },
    vendorName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: '#222',
        marginBottom: 2,
    },
    locationText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: '#555',
        marginBottom: 4,
    },
    descriptionTextHero: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#777',
        lineHeight: 16,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: '#444',
    },
    // Stats Removed
    professionText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11,
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    descriptionTextHero: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#EEE',
        alignSelf: 'flex-start',
    },
    ratingText: {
        fontFamily: 'Outfit_500Medium',
        color: '#333',
        marginLeft: 6,
        fontSize: 12,
    },

    // Tabs (Same as before)
    tabContainerWrapper: {
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 20,
        zIndex: 30,
    },
    glassTabContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 30,
        padding: 4,
        borderWidth: 1,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 25,
    },
    activeTabItem: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    tabText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#333',
        marginLeft: 6,
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#1a1a1a',
        letterSpacing: 0.5,
    },
    // Showcase Tabs
    showcaseHeader: {
        flexDirection: 'column', // Changed from row to stack vertically
        alignItems: 'flex-start',
        marginBottom: 15,
        gap: 10,
    },
    showcaseTabs: {
        flexDirection: 'row',
        gap: 12, // Gap between buttons
        backgroundColor: 'transparent', // No background container
        padding: 0,
    },
    showcaseTabItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        elevation: 1,
    },
    activeShowcaseTab: {
        backgroundColor: '#333', // Dark active button
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    showcaseTabText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        color: '#666',
    },
    activeShowcaseTabText: {
        color: '#FFF', // White text on active
        fontFamily: 'Outfit_600SemiBold',
    },

    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    tagText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#EFEFEF',
        marginTop: 20,
        width: '100%',
    },
    // Editorial Similar Vendors
    similarCardEditorial: {
        width: 80, // Micro-sized (was 100)
        height: 110, // Micro-sized (was 140)
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    similarImageEditorial: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    similarOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    similarRatingAbsolute: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    similarNameEditorial: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 8, // Kept small
        color: '#FFF',
    },
    similarRatingTextEditorial: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 8,
        color: '#FFF',
    },
    // Masonry Gallery
    galleryGrid: {
        gap: 10,
    },
    galleryRow: {
        flexDirection: 'row',
        gap: 10,
    },
    eventsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    galleryItemHero: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 10,
    },
    galleryItemMedium: {
        flex: 1,
        height: 160,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 10,
    },
    galleryItemSmall: {
        flex: 1,
        height: 100,
        borderRadius: 12, // Softer corners
        overflow: 'hidden',
    },
    blobShape: {
        position: 'absolute',
        top: -20,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(212, 175, 55, 0.05)', // Subtle gold blob
        zIndex: -1,
    },
    sectionSubtitle: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: '#666',
        marginTop: 4,
        marginBottom: 15,
    },
    plansScrollContent: {
        paddingVertical: 10,
        paddingRight: 20,
        gap: 20,
    },
    planCard: {
        width: 220,
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    planIconCircleVertical: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    planNameVertical: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#222',
        marginBottom: 8,
    },
    planPriceVertical: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 28,
        color: '#1A1A1A',
    },
    planPerEvent: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#888',
        marginBottom: 20,
    },
    featuresListVertical: {
        width: '100%',
        marginBottom: 25,
        gap: 10,
    },
    featureItemVertical: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    featureTextVertical: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#555',
        flex: 1,
    },
    selectPlanBtn: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 15,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    selectPlanText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
    },
    footerActions: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    contactButtonOutline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 14,
        borderRadius: 30, // Pill
        borderWidth: 1,
        borderColor: '#444',
    },
    contactButtonTextOutline: {
        color: '#444',
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    bookButtonPremium: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F3D3E', // Deep Green ("Luxury" safe color) or Gold '#D4AF37'
        paddingVertical: 14,
        borderRadius: 30, // Pill
        shadowColor: '#0F3D3E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    bookButtonTextPremium: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default VenuePortfolio;
