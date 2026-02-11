import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Platform,
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

const VendorDetailScreen = ({ navigation, route }) => {
    const vendor = route.params?.vendor || {};
    const [activeTab, setActiveTab] = useState('Portfolio');
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

    const portfolioImages = vendor.portfolio || [
        require('../../../../assets/images/decor.jpg'),
        require('../../../../assets/images/Food.jpg'),
        require('../../../../assets/images/photo.jpg'),
        require('../../../../assets/images/entertenment.jpg'),
        require('../../../../assets/images/venue1.jpg'),
        require('../../../../assets/images/venue2.jpg'),
    ];

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

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Portfolio':
                return (
                    <View style={styles.portfolioGrid}>
                        {portfolioImages.map((img, index) => (
                            <View key={index} style={styles.portfolioItem}>
                                <Image
                                    source={typeof img === 'string' ? { uri: img } : img}
                                    style={styles.portfolioImage}
                                    resizeMode="cover"
                                />
                            </View>
                        ))}
                    </View>
                );
            case 'Albums':
                return (
                    <View style={styles.emptyState}>
                        <Ionicons name="images-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>Albums coming soon</Text>
                    </View>
                );
            case 'Videos':
                return (
                    <View style={styles.emptyState}>
                        <Ionicons name="videocam-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>Videos coming soon</Text>
                    </View>
                );
            default:
                return null;
        }
    };

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

                {/* Divider */}
                <View style={styles.divider} />

                {/* Tabs */}
                <View style={styles.tabContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab,
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText,
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                <View style={styles.tabContent}>
                    {renderTabContent()}
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

    // Divider
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 24,
    },

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 5,
        gap: 10,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    activeTab: {
        borderColor: COLORS.kumkum,
        backgroundColor: '#fff',
    },
    tabText: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    activeTabText: {
        color: COLORS.kumkum,
        fontWeight: '700',
    },

    // Tab Content
    tabContent: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },
    portfolioGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    portfolioItem: {
        width: (width - 50) / 2,
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    portfolioImage: {
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
