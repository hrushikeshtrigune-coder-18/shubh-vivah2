import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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
];

// Mock data for venue photos
const VENUE_PHOTOS = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=1200',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200',
    'https://images.unsplash.com/photo-1522673607200-1645062cd95c?q=80&w=1200',
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200',
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

    const [activeTab, setActiveTab] = React.useState('likes'); // State for tabs
    const scrollY = useRef(new Animated.Value(0)).current;

    // Header Animation Values
    // When scrollY > 300, header fades in
    const headerOpacity = scrollY.interpolate({
        inputRange: [250, 350],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    // Profile on page fades out
    const profilePageOpacity = scrollY.interpolate({
        inputRange: [200, 300],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    // Auto-scroll logic for similar vendors
    const similarVendorsRef = useRef(null);
    React.useEffect(() => {
        let scrollValue = 0;
        const intervalId = setInterval(() => {
            if (similarVendorsRef.current) {
                scrollValue += 160;
                if (scrollValue > 160 * SIMILAR_VENDORS.length) {
                    scrollValue = 0;
                }
                const scrollToX = scrollValue;
                if (similarVendorsRef.current.scrollTo) {
                    similarVendorsRef.current.scrollTo({ x: scrollToX, animated: true });
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
        }, 4000); // 4 seconds per slide
        return () => clearInterval(intervalId);
    }, [heroIndex]);


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
                        source={{ uri: photo }}
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

    const renderStickyHeader = () => (
        <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.stickyBackButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>

            <View style={styles.stickyProfileContainer}>
                <Image
                    source={vendor.image ? vendor.image : { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200' }}
                    style={styles.stickyProfileImage}
                />
                <Text style={styles.stickyVendorName} numberOfLines={1}>{vendor.name}</Text>
            </View>

            <View style={styles.stickyActions}>
                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );


    const renderProfileSection = () => (
        <Animated.View style={[styles.profileSection, { opacity: profilePageOpacity }]}>
            <View style={styles.profileRow}>
                {/* Left: Image */}
                <View style={styles.profileImageContainer}>
                    <Image
                        source={vendor.image ? vendor.image : { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200' }}
                        style={styles.profileImage}
                    />
                </View>

                {/* Right: Info Column */}
                <View style={styles.profileInfoColumn}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>

                    <Text style={styles.descriptionTextHero} numberOfLines={3}>
                        Crafting timeless wedding celebrations in the heart of {vendor.location?.split(',')[0]} with royal architecture and curated luxury.
                    </Text>

                    {/* Stats Row below description */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="heart-outline" size={16} color="#333" />
                            <Text style={styles.statText}>2.5k</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="eye-outline" size={16} color="#333" />
                            <Text style={styles.statText}>15k</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#F29502" />
                            <Text style={styles.statText}>{vendor.rating} ({vendor.reviews})</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    const renderFloatingTabs = () => (
        <View style={styles.tabContainerWrapper}>
            <View style={styles.glassTabContainer}>
                {['likes', 'views', 'interest'].map((tab) => {
                    const isActive = activeTab === tab;
                    const iconName = tab === 'likes' ? 'heart' : tab === 'views' ? 'eye' : 'bookmark';
                    const count = tab === 'likes' ? '2.5k' : tab === 'views' ? '15k' : '850';

                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabItem, isActive && styles.activeTabItem]}
                            onPress={() => setActiveTab(tab)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isActive ? iconName : `${iconName}-outline`}
                                size={20}
                                color={isActive ? '#CC0E0E' : '#888'}
                            />
                            {isActive && (
                                <Text style={styles.tabText}>{count}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    const renderInfoSection = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.tagRow}>
                {vendor.amenities && vendor.amenities.map((amenity, index) => (
                    <View key={index} style={styles.tag}>
                        <Ionicons
                            name={amenity.includes('Alcohol') ? "wine-outline" : "leaf-outline"}
                            size={14}
                            color="#888"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.tagText}>{amenity}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.divider} />
        </View>
    );

    const renderSimilarVendors = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Similar Vendors</Text>
            <ScrollView
                ref={similarVendorsRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
                snapToInterval={180} // Card width + margin
                decelerationRate="fast"
            >
                {SIMILAR_VENDORS.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.similarCardEditorial}>
                        <Image source={{ uri: item.image }} style={styles.similarImageEditorial} />
                        <View style={styles.similarOverlay}>
                            <Text style={styles.similarNameEditorial}>{item.name}</Text>
                            <View style={styles.similarRating}>
                                <Ionicons name="star" size={12} color="#FFF" />
                                <Text style={styles.similarRatingTextEditorial}>{item.rating}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderGallery = () => (
        <View style={styles.sectionContainer}>
            {/* Organic Blob Background for Gallery */}
            <View style={styles.blobShape} />

            <Text style={styles.sectionTitle}>Venue Showcase</Text>
            <View style={styles.galleryGrid}>
                {VENUE_PHOTOS.slice(0, 1).map((photo, index) => (
                    <TouchableOpacity key={index} style={styles.galleryItemHero}>
                        <Image source={{ uri: photo }} style={styles.galleryImage} />
                    </TouchableOpacity>
                ))}
                <View style={styles.galleryRow}>
                    {VENUE_PHOTOS.slice(1, 3).map((photo, index) => (
                        <TouchableOpacity key={index} style={styles.galleryItemMedium}>
                            <Image source={{ uri: photo }} style={styles.galleryImage} />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.galleryRow}>
                    {VENUE_PHOTOS.slice(3, 6).map((photo, index) => (
                        <TouchableOpacity key={index} style={styles.galleryItemSmall}>
                            <Image source={{ uri: photo }} style={styles.galleryImage} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Floating Sticky Header (Initially Invisible) */}
            {renderStickyHeader()}

            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false } // Important for web
                )}
            >
                {renderHeroCarousel()}

                <View style={styles.contentContainer}>
                    {renderProfileSection()}
                    {renderFloatingTabs()}
                    {renderInfoSection()}
                    {renderSimilarVendors()}
                    {renderGallery()}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Floating Action Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.contactButtonOutline} onPress={() => { }}>
                    <Text style={styles.contactButtonTextOutline}>Contact Vendor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookButtonPremium} onPress={() => { }}>
                    <Text style={styles.bookButtonTextPremium}>Book a Visit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    contentContainer: {
        backgroundColor: '#FFFFF0',
        marginTop: 20,
        borderTopLeftRadius: 30, // Slight visual separation
        borderTopRightRadius: 30,
        top: -30, // Pull up over carousel
        paddingTop: 30,
    },
    // Hero Carousel
    heroCarouselContainer: {
        height: 400,
        width: width,
    },
    heroImage: {
        width: width,
        height: 400,
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
    // Sticky Header
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: '#FFFFF0',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 15,
        paddingHorizontal: 20,
        zIndex: 100, // Top of everything
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    stickyBackButton: {
        padding: 5,
    },
    stickyProfileContainer: {
        flex: 1,
        alignItems: 'center', // Center content in header
        justifyContent: 'center',
        flexDirection: 'row',
    },
    stickyVendorName: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '#222',
        marginLeft: 8,
    },
    stickyActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    profileSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
        zIndex: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: -50, // Floating overlap
    },
    profileImageContainer: {
        marginRight: 15,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#FFFFF0',
    },
    profileInfoColumn: {
        flex: 1,
        paddingTop: 55, // Push down to align with bottom of image roughly or just below overlap
    },
    vendorName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: '#222',
        marginBottom: 4,
    },
    descriptionTextHero: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
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
        marginBottom: 15,
        letterSpacing: 0.5,
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
        width: 160,
        height: 260,
        marginRight: 15,
        borderRadius: 16,
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
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.3)', // gradient effect
    },
    similarNameEditorial: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '#FFF',
        marginBottom: 4,
    },
    similarRatingTextEditorial: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: '#FFF',
        marginLeft: 4,
    },
    // Masonry Gallery
    galleryGrid: {
        gap: 10,
    },
    galleryRow: {
        flexDirection: 'row',
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
    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 24,
        backgroundColor: 'rgba(255,255,255,0.95)', // slight transparency
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'center',
        gap: 15,
        elevation: 20, // Stronger shadow for floating feel
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
