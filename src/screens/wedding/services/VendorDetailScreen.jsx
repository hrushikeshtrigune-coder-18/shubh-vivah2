import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.42;
const PROFILE_SIZE = 100;

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#f29502',
    maroon: '#800000',
};

const SUB_CATEGORIES = ['Photos', 'Videos', 'Media'];
const SUB_FILTERS = [
    { id: 'floral', name: 'Floral', icon: 'flower-outline' },
    { id: 'theme', name: 'Theme', icon: 'color-palette-outline' },
    { id: 'traditional', name: 'Traditional', icon: 'layers-outline' },
];

const VendorDetailScreen = ({ navigation, route }) => {
    const vendor = route.params?.vendor || {};
    const [activeTab, setActiveTab] = useState('Projects'); // Use sentence case to match tab labels
    const [activeSubTab, setActiveSubTab] = useState('Media');
    const [activeSubFilter, setActiveSubFilter] = useState('floral');
    const [bookmarked, setBookmarked] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;

    // Vendor info entrance animation
    const infoFadeAnim = useRef(new Animated.Value(0)).current;
    const infoSlideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(infoFadeAnim, {
                toValue: 1,
                duration: 800,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.spring(infoSlideAnim, {
                toValue: 0,
                friction: 6,
                tension: 40,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const animatedInfoStyle = {
        opacity: infoFadeAnim,
        transform: [{ translateY: infoSlideAnim }],
    };

    const tabs = ['Portfolio', 'Albums', 'Videos'];

    const portfolioImages = (vendor.portfolio || [
        require('../../../../assets/images/decor.jpg'),
        require('../../../../assets/images/Food.jpg'),
        require('../../../../assets/images/photo.jpg'),
        require('../../../../assets/images/entertenment.jpg'),
        require('../../../../assets/images/venue1.jpg'),
        require('../../../../assets/images/venue2.jpg'),
    ]).map((img, index) => ({
        id: `p-${index}`,
        source: typeof img === 'number' || typeof img === 'object' ? img : { uri: img },
        height: index % 3 === 0 ? 200 : index % 3 === 1 ? 280 : 240,
        label: `${(Math.random() * 5 + 1).toFixed(2)} ETH`
    }));

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${vendor.name} - ${vendor.location}. Great for events!`,
            });
        } catch (error) { }
    };

    // Scroll-based animations
    const heroScale = scrollY.interpolate({
        inputRange: [-100, 0, HERO_HEIGHT],
        outputRange: [1.3, 1, 0.8],
        extrapolate: 'clamp',
    });

    const heroOpacity = scrollY.interpolate({
        inputRange: [0, HERO_HEIGHT * 0.6],
        outputRange: [1, 0.3],
        extrapolate: 'clamp',
    });

    const profileScale = scrollY.interpolate({
        inputRange: [0, HERO_HEIGHT * 0.4],
        outputRange: [0.8, 1],
        extrapolate: 'clamp',
    });

    const profileOpacity = scrollY.interpolate({
        inputRange: [0, HERO_HEIGHT * 0.2],
        outputRange: [0.6, 1],
        extrapolate: 'clamp',
    });

    // Removed renderTabContent for inlined structural logic below

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* Hero Image */}
                <Animated.View style={[styles.heroContainer, {
                    transform: [{ scale: heroScale }],
                    opacity: heroOpacity,
                }]}>
                    <Image
                        source={vendor.image}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                </Animated.View>

                {/* Info Section with centered profile */}
                <View style={styles.infoSection}>
                    {/* Centered Profile Image - overlaps hero */}
                    <Animated.View style={[styles.profileImageContainer, {
                        transform: [{ scale: profileScale }],
                        opacity: profileOpacity,
                    }]}>
                        <Image
                            source={vendor.portfolio?.[1] || vendor.image}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                    </Animated.View>

                    {/* Vendor Info - Animated */}
                    <Animated.View style={[styles.vendorInfoSection, animatedInfoStyle]}>
                        <Text style={styles.vendorName}>{vendor.name}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={15} color={COLORS.darkHaldi} />
                            <Text style={styles.locationText}>{vendor.location}</Text>
                        </View>
                        <Text style={styles.description}>
                            {vendor.description || 'Offering a royal experience with curated luxury events.'}
                        </Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="heart-outline" size={16} color={COLORS.kumkum} />
                                <Text style={styles.statText}>{vendor.likes || '2.5k'}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="eye-outline" size={16} color="#666" />
                                <Text style={styles.statText}>{vendor.views || '15k'}</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="star" size={16} color={COLORS.darkHaldi} />
                                <Text style={styles.statText}>{vendor.rating} ({vendor.reviews || '45'})</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                {/* Content Section */}
                <View style={styles.mainContent}>
                    {/* Debug Marker */}
                    <Text style={{ position: 'absolute', top: -10, right: 10, color: 'transparent', fontSize: 10 }}>v2.0</Text>

                    {/* Main Tabs */}
                    <View style={styles.mainTabsWrapper}>
                        {['Projects', 'Pricing', 'About', 'Reviews'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                style={[styles.mainTabItem, activeTab === tab && styles.activeMainTabItem]}
                            >
                                <Text style={[styles.mainTabText, activeTab === tab && styles.activeMainTabText]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Portfolio Content */}
                    {activeTab === 'Projects' && (
                        <View style={styles.portfolioSection}>
                            <View style={styles.portfolioHeaderRow}>
                                <Text style={styles.portfolioTitle}>Portfolio</Text>
                                <View style={styles.subCategoryTabs}>
                                    {SUB_CATEGORIES.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            onPress={() => setActiveSubTab(cat)}
                                            style={[styles.subTabItem, activeSubTab === cat && styles.activeSubTabItem]}
                                        >
                                            <Text style={[styles.subTabText, activeSubTab === cat && styles.activeSubTabText]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subFilterPills}>
                                {SUB_FILTERS.map((filter) => (
                                    <TouchableOpacity
                                        key={filter.id}
                                        onPress={() => setActiveSubFilter(filter.id)}
                                        style={[styles.subFilterPill, activeSubFilter === filter.id && styles.activeSubFilterPill]}
                                    >
                                        <Ionicons
                                            name={filter.icon}
                                            size={18}
                                            color={activeSubFilter === filter.id ? '#fff' : '#666'}
                                        />
                                        <Text style={[styles.subFilterText, activeSubFilter === filter.id && styles.activeSubFilterText]}>
                                            {filter.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Symmetric 2-Column Grid */}
                            <View style={styles.symmetricGrid}>
                                {portfolioImages.map((img) => (
                                    <View key={img.id} style={styles.gridCardWrapper}>
                                        <Image source={img.source} style={styles.squareGridImage} resizeMode="cover" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {(activeTab !== 'Projects') && (
                        <View style={styles.emptyState}>
                            <Ionicons name="construct-outline" size={48} color="#ccc" />
                            <Text style={styles.emptyText}>{activeTab} coming soon</Text>
                        </View>
                    )}
                </View>

                {/* Bottom spacing */}
                <View style={{ height: 100 }} />
            </Animated.ScrollView>

            {/* Fixed Header Buttons */}
            <View style={styles.headerOverlay}>
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={() => setBookmarked(!bookmarked)}
                    >
                        <Ionicons
                            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={handleShare}
                    >
                        <Ionicons name="share-social-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Sticky Bottom CTA */}
            <View style={styles.bottomCTA}>
                <TouchableOpacity style={styles.callBtn}>
                    <Ionicons name="call-outline" size={20} color={COLORS.kumkum} />
                    <Text style={styles.callBtnText}>Call Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookBtn}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.akshid,
    },

    // Hero
    heroContainer: {
        width: '100%',
        height: HERO_HEIGHT,
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },

    // Fixed Header
    headerOverlay: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 40 : 55,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 100,
    },
    headerBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Info Section - Centered layout
    infoSection: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -25,
        paddingHorizontal: 24,
        paddingTop: PROFILE_SIZE / 2 + 15,
        paddingBottom: 10,
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'absolute',
        top: -(PROFILE_SIZE / 2),
        alignSelf: 'center',
        width: PROFILE_SIZE,
        height: PROFILE_SIZE,
        borderRadius: PROFILE_SIZE / 2,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#fff',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        backgroundColor: '#fff',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    vendorName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 6,
        textAlign: 'center',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationText: {
        fontSize: 14,
        color: COLORS.kumkum,
        fontWeight: '500',
        marginLeft: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    vendorInfoSection: {
        alignItems: 'center',
        width: '100%',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        gap: 22,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    statText: {
        fontSize: 13,
        color: '#444',
        fontWeight: '500',
    },

    // Updated Content Section
    mainContent: {
        backgroundColor: COLORS.akshid,
        paddingTop: 10,
    },
    mainTabsWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    mainTabItem: {
        paddingVertical: 12,
        marginRight: 25,
        position: 'relative',
    },
    activeMainTabItem: {
        borderBottomWidth: 3,
        borderBottomColor: COLORS.darkHaldi,
    },
    mainTabText: {
        fontSize: 15,
        color: '#888',
        fontWeight: '600',
    },
    activeMainTabText: {
        color: COLORS.darkHaldi,
        fontWeight: 'bold',
    },

    // Portfolio Section
    portfolioSection: {
        paddingHorizontal: 20,
    },
    portfolioHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    portfolioTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
    },
    subCategoryTabs: {
        flexDirection: 'row',
        gap: 15,
    },
    subTabItem: {
        paddingVertical: 4,
    },
    activeSubTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.darkHaldi,
    },
    subTabText: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    activeSubTabText: {
        color: COLORS.darkHaldi,
        fontWeight: 'bold',
    },
    subFilterPills: {
        marginBottom: 25,
        flexDirection: 'row',
    },
    subFilterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#f5f5f5',
        marginRight: 10,
        gap: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    activeSubFilterPill: {
        backgroundColor: COLORS.darkHaldi,
        borderColor: COLORS.darkHaldi,
    },
    subFilterText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    activeSubFilterText: {
        color: '#fff',
    },

    // Symmetric Grid (2-Column)
    symmetricGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    gridCardWrapper: {
        width: (width - 55) / 2, // 2 columns with spacing
        height: 180,
        borderRadius: 18, // Rounded rectangle, not oval
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    squareGridImage: {
        width: '100%',
        height: '100%',
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: '#999',
        fontWeight: '500',
    },

    // Bottom CTA
    bottomCTA: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -5 },
        gap: 12,
    },
    callBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.kumkum,
        backgroundColor: '#fff',
        gap: 8,
    },
    callBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.kumkum,
    },
    bookBtn: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 30,
        backgroundColor: COLORS.kumkum,
        elevation: 4,
        shadowColor: COLORS.kumkum,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    bookBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default VendorDetailScreen;
