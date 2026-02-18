import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import food1 from '../../../../assets/images/food1.jpg';
import food2 from '../../../../assets/images/food2.jpg';
import food3 from '../../../../assets/images/food3.jpg';
import food4 from '../../../../assets/images/food4.jpg';
import venue1 from '../../../../assets/images/venue1.jpg';
import venue2 from '../../../../assets/images/venue2.jpg';
import venue5 from '../../../../assets/images/venue5.jpg';
import venue6 from '../../../../assets/images/venue6.jpg';

const { width } = Dimensions.get('window');

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
    inputBg: '#FFF5F5',
};

const FEATURED_VENDORS = [
    {
        id: 'v1',
        name: 'Royal Feast Catering',
        rating: 4.8,
        tag: 'Luxury Catering',
        location: 'Pune, MH',
        city: 'Pune',
        image: food1,
        previews: [food2, food3, food4]
    },
    {
        id: 'v2',
        name: 'Gourmet Delights',
        rating: 4.5,
        tag: 'Premium',
        location: 'Mumbai, MH',
        city: 'Mumbai',
        image: food2,
        previews: [food4, food1, food3]
    },
    {
        id: 'v3',
        name: 'Spice Symphony',
        rating: 4.9,
        tag: 'Authentic',
        location: 'Delhi, NCR',
        city: 'Delhi',
        image: food3,
        previews: [food1, food2, food4]
    },
    {
        id: 'v4',
        name: 'Maharaja Catering',
        rating: 4.9,
        tag: 'Royal Experience',
        location: 'Mumbai, MH',
        city: 'Mumbai',
        image: food4,
        previews: [food2, food3, food1]
    },
];

const POSTS_DATA = [
    {
        id: 'p1',
        vendorName: 'Royal Feast Catering',
        vendorLogo: food1,
        images: [food2, food3, food4],
        likes: 1200,
        city: 'Pune',
        description: 'Traditional North Indian spread with live tandoor and signature dal makhani.',
        rating: 4.8,
        eventType: 'Wedding Reception',
        locationDetail: 'Lawn Residency',
        imageHeight: 220
    },
    {
        id: 'p2',
        vendorName: 'Gourmet Delights',
        vendorLogo: food2,
        images: [food1, food4, food3],
        likes: 850,
        city: 'Mumbai',
        description: 'Exquisite Continental buffet with live pasta station and gourmet desserts.',
        rating: 4.5,
        eventType: 'Sangeet Night',
        locationDetail: 'Taj Lands End',
        imageHeight: 180
    },
    {
        id: 'p3',
        vendorName: 'Spice Symphony',
        vendorLogo: food3,
        images: [food4, food1, food2],
        likes: 640,
        city: 'Delhi',
        description: 'Authentic Mughlai feast featuring royal biryanis and succulent kebabs.',
        rating: 4.9,
        eventType: 'Mehendi',
        locationDetail: 'Farmhouse Delhi',
        imageHeight: 250
    },
    {
        id: 'p4',
        vendorName: 'Maharaja Catering',
        vendorLogo: food4,
        images: [food3, food2, food1],
        likes: 2100,
        city: 'Mumbai',
        description: 'Grand Royal Thali experience with 24 signature dishes.',
        rating: 4.9,
        eventType: 'Wedding',
        locationDetail: 'Conrad Hotel',
        imageHeight: 160
    },
];

const POPULAR_SEARCHES = ['Veg Caterers in Pune', 'Luxury Buffets', 'Live Chaat Mumbai', 'Jain Friendly Catering'];
const TRENDING_TAGS = ['Live Counters', 'Gourmet', 'Traditional', 'Fusion'];

// Post Component (Dynamic Widths for Editorial Layout)
const PostCard = ({ post, onPostPress, onVendorPress, isFullWidth }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);

    const cardWidth = isFullWidth ? (width - 20) : (width - 28) / 2;
    const imageHeight = isFullWidth ? 200 : (post.imageHeight * 0.75);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % post.images.length;
            setActiveIndex(nextIndex);
            scrollRef.current?.scrollTo({ x: nextIndex * cardWidth, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, post.images.length, cardWidth]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false, listener: (event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
                if (index !== activeIndex) {
                    setActiveIndex(index);
                }
            }
        }
    );

    return (
        <TouchableOpacity
            style={[styles.postCardCompact, { width: cardWidth, marginBottom: 20 }]}
            onPress={() => onPostPress(post)}
            activeOpacity={0.95}
        >
            <View style={{ height: imageHeight, width: '100%', overflow: 'hidden' }}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={cardWidth}
                >
                    {post.images.map((img, index) => (
                        <Image key={index} source={img} style={{ width: cardWidth, height: imageHeight }} resizeMode="cover" />
                    ))}
                </ScrollView>

                <View style={styles.dotContainerCompact}>
                    {post.images.map((_, index) => (
                        <View key={index} style={[styles.dotSmall, activeIndex === index && styles.dotActiveSmall]} />
                    ))}
                </View>

                <TouchableOpacity style={styles.likeBtnSmall}>
                    <Ionicons name="heart-outline" size={15} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={[styles.infoPanelCompact, isFullWidth && { paddingHorizontal: 15, paddingVertical: 18 }]}>
                <View style={styles.panelHeaderCompact}>
                    <TouchableOpacity onPress={() => onVendorPress && onVendorPress(post)}>
                        <Text style={[styles.vendorNameCompact, isFullWidth && { fontSize: 16 }]} numberOfLines={1}>{post.vendorName}</Text>
                    </TouchableOpacity>
                    <View style={styles.ratingCompact}>
                        <Ionicons name="star" size={10} color={COLORS.secondary} />
                        <Text style={styles.ratingTextCompact}>{post.rating}</Text>
                    </View>
                </View>

                {isFullWidth && <Text style={styles.postDescriptionFull} numberOfLines={2}>{post.description}</Text>}

                <Text style={styles.eventTypeCompact}>{post.eventType} • {post.city}</Text>
                <Text style={styles.locationCompact} numberOfLines={1}>{post.locationDetail}</Text>

                <View style={styles.metaRowCompact}>
                    <Text style={styles.metaLikesCompact}>{post.likes} likes</Text>
                    <Ionicons name="bookmark-outline" size={13} color="#AAA" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const Food = ({ navigation }) => {
    const scrollRef = useRef(null);
    const featuredScrollRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    const [isSearchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [featuredIndex, setFeaturedIndex] = useState(0);

    // Auto-scroll logic for Featured Collections
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSearchFocused) {
                const nextIndex = (featuredIndex + 1) % FEATURED_VENDORS.length;
                setFeaturedIndex(nextIndex);
                featuredScrollRef.current?.scrollTo({
                    x: nextIndex * (width * 0.82 + 24), // card width + margin
                    animated: true,
                });
            }
        }, 4000); // 4 seconds delay

        return () => clearInterval(interval);
    }, [featuredIndex, isSearchFocused]);

    // Filtering Logic
    const getFilteredVendors = () => {
        const query = searchQuery.toLowerCase();
        return FEATURED_VENDORS.filter(v =>
            v.city.toLowerCase().includes(query) ||
            v.name.toLowerCase().includes(query) ||
            v.location.toLowerCase().includes(query)
        );
    };

    const getFilteredPosts = () => {
        const query = searchQuery.toLowerCase();
        return POSTS_DATA.filter(p =>
            p.city.toLowerCase().includes(query) ||
            p.vendorName.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.eventType.toLowerCase().includes(query)
        );
    };

    const renderActionHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground source={food4} style={styles.heroImage} imageStyle={{ borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.heroGradient}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.utilityBtn}><Ionicons name="notifications-outline" size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 60, paddingHorizontal: 5 }}>
                        <Text style={styles.heroHeadline}>Finding Your{"\n"}Perfect Feast 🍽️</Text>
                        <Text style={styles.heroSubhead}>Explore exclusive catering & multi-cuisine experts</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>

            <View style={[styles.premiumSearchContainer, isSearchFocused && styles.premiumSearchActive]}>
                <TouchableOpacity style={styles.locationSelector}>
                    <Text style={styles.locationTextPin}>📍 {selectedCity}</Text>
                    <Ionicons name="chevron-down" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
                <View style={styles.searchDivider} />
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.premiumInput}
                        placeholder="Search caterers, cuisines…"
                        placeholderTextColor="#999"
                        onFocus={() => setSearchFocused(true)}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
            </View>

            <View style={styles.trustIndicatorRow}>
                <View style={styles.trustBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.primary} /><Text style={styles.trustBadgeText}>Verified</Text></View>
                <View style={styles.trustBadge}><Ionicons name="sparkles" size={14} color={COLORS.primary} /><Text style={styles.trustBadgeText}>Premium Quality</Text></View>
            </View>
        </View>
    );

    const renderSearchOverlay = () => (
        <Modal visible={isSearchFocused} animationType="fade" transparent onRequestClose={() => setSearchFocused(false)}>
            <View style={styles.overlayContainer}>
                <View style={styles.overlayHeader}>
                    <View style={styles.overlaySearchBox}>
                        <TextInput
                            style={styles.overlayInput}
                            autoFocus
                            placeholder="Search caterers, cuisines…"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                        <TouchableOpacity onPress={() => { setSearchFocused(false); }}>
                            <Text style={styles.cancelText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.overlayContent}>
                    <Text style={styles.overlaySectionTitle}>Recent Discoveries</Text>
                    <View style={styles.recentList}>
                        {['Mumbai', 'Pune', 'Delhi'].map((item, idx) => (
                            <TouchableOpacity key={idx} style={styles.recentItem} onPress={() => { setSearchQuery(item); setSearchFocused(false); setSelectedCity(item); }}>
                                <Ionicons name="search-outline" size={18} color="#999" />
                                <Text style={styles.recentText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.overlaySectionTitle}>Popular Collections</Text>
                    <View style={styles.popularRow}>
                        {POPULAR_SEARCHES.map((item, idx) => (
                            <TouchableOpacity key={idx} style={styles.popularTag} onPress={() => { setSearchQuery(item); setSearchFocused(false); }}>
                                <Text style={styles.popularTagText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );

    const renderLargePremiumVendorCards = () => {
        const filteredVendors = getFilteredVendors();
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Our Caterers</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>Browse More</Text></TouchableOpacity>
                </View>
                {filteredVendors.length > 0 ? (
                    <ScrollView
                        ref={featuredScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        decelerationRate="fast"
                        snapToInterval={width * 0.82 + 24}
                    >
                        {filteredVendors.map((vendor) => (
                            <TouchableOpacity
                                key={vendor.id}
                                style={styles.premiumVendorCard}
                                activeOpacity={0.9}
                                onPress={() => {
                                    navigation.navigate('FoodV', { vendor: vendor });
                                }}
                            >
                                <ImageBackground source={vendor.image} style={styles.vendorMainImg} imageStyle={{ borderRadius: 20 }}>
                                    <View style={styles.premiumTag}>
                                        <Text style={styles.premiumTagText}>{vendor.tag}</Text>
                                    </View>
                                </ImageBackground>
                                <View style={styles.vendorDetails}>
                                    <View style={styles.detailsTop}>
                                        <Text style={styles.vendorNamePremium}>{vendor.name}</Text>
                                        <View style={styles.ratingBadgePremium}>
                                            <Ionicons name="star" size={12} color="#FFF" />
                                            <Text style={styles.ratingTextPremium}>{vendor.rating}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.locationContainerPremium}>
                                        <Ionicons name="location-outline" size={14} color="#666" />
                                        <Text style={styles.locationTextPremium}>{vendor.location}</Text>
                                    </View>
                                    <View style={styles.previewsRow}>
                                        {vendor.previews.map((img, idx) => (
                                            <Image key={idx} source={img} style={styles.miniThumb} />
                                        ))}
                                        <TouchableOpacity style={styles.followBtnGold}>
                                            <Text style={styles.followTextGold}>Follow</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.noResults}><Text style={styles.noResultsText}>No caterers found</Text></View>
                )}
            </View>
        );
    };

    const renderVendorPostsFeed = () => {
        const filteredPosts = getFilteredPosts();

        const handlePostClick = (post) => {
            const vendor = FEATURED_VENDORS.find(v => v.name === post.vendorName);
            if (vendor) {
                navigation.navigate('FoodV', { vendor: vendor });
            }
        };

        const renderRhythmicPattern = () => {
            const pattern = [];
            let i = 0;
            while (i < filteredPosts.length) {
                // Full Width Post
                pattern.push(
                    <View key={`full-${filteredPosts[i].id}`} style={{ paddingHorizontal: 10 }}>
                        <PostCard
                            post={filteredPosts[i]}
                            onPostPress={handlePostClick}
                            onVendorPress={handlePostClick}
                            isFullWidth={true}
                        />
                    </View>
                );
                i++;
                if (i >= filteredPosts.length) break;

                // Two Half Width Posts
                const pair = [];
                if (i < filteredPosts.length) {
                    pair.push(
                        <PostCard
                            key={`half-${filteredPosts[i].id}`}
                            post={filteredPosts[i]}
                            onPostPress={handlePostClick}
                            onVendorPress={handlePostClick}
                            isFullWidth={false}
                        />
                    );
                    i++;
                }
                if (i < filteredPosts.length) {
                    pair.push(
                        <PostCard
                            key={`half-${filteredPosts[i].id}`}
                            post={filteredPosts[i]}
                            onPostPress={handlePostClick}
                            onVendorPress={handlePostClick}
                            isFullWidth={false}
                        />
                    );
                    i++;
                }

                pattern.push(
                    <View key={`pair-${i}`} style={styles.editorialRow}>
                        {pair}
                    </View>
                );
            }
            return pattern;
        };

        return (
            <View style={styles.sectionContainer}>
                <View style={[styles.sectionHeader, { marginBottom: 25, paddingHorizontal: 10 }]}>
                    <Text style={styles.sectionTitle}>Recent Posts</Text>
                </View>
                {renderRhythmicPattern()}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
                {renderActionHero()}
                {renderLargePremiumVendorCards()}
                {renderVendorPostsFeed()}

                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.stickyButton}>
                        <Text style={styles.stickyButtonText}>Shortlist Caterers</Text>
                        <Ionicons name="arrow-forward" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {renderSearchOverlay()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    heroContainer: { marginBottom: 50 },
    heroImage: { width: width, height: 460, justifyContent: 'flex-end' },
    heroGradient: { flex: 1, justifyContent: 'flex-end', padding: 25, paddingBottom: 100 },
    topBar: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    backButton: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    utilityBtn: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    heroHeadline: { fontFamily: 'Outfit_700Bold', fontSize: 36, color: COLORS.white, lineHeight: 44, marginBottom: 12 },
    heroSubhead: { fontFamily: 'Outfit_400Regular', fontSize: 16, color: '#FFEB3B', marginBottom: 24, opacity: 0.95 },

    premiumSearchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        height: 60,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: -30,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        paddingHorizontal: 18,
    },
    premiumSearchActive: { borderWidth: 1.5, borderColor: COLORS.secondary },
    locationSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 110 },
    locationTextPin: { fontFamily: 'Outfit_600SemiBold', fontSize: 15, color: '#333' },
    searchDivider: { width: 1.5, height: 28, backgroundColor: '#EEE', marginHorizontal: 12 },
    searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    premiumInput: { flex: 1, fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#333' },

    trustIndicatorRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 25 },
    trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 14, elevation: 1 },
    trustBadgeText: { fontFamily: 'Outfit_500Medium', fontSize: 12, color: COLORS.primary },

    overlayContainer: { flex: 1, backgroundColor: '#FFF' },
    overlayHeader: { paddingTop: 60, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F5F5F5', paddingBottom: 20 },
    overlaySearchBox: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    overlayInput: { flex: 1, height: 48, backgroundColor: '#F8F8F8', borderRadius: 16, paddingHorizontal: 18, fontFamily: 'Outfit_400Regular', fontSize: 16 },
    cancelText: { color: COLORS.primary, fontFamily: 'Outfit_600SemiBold', fontSize: 15 },
    overlayContent: { padding: 25 },
    overlaySectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#333', marginBottom: 18, marginTop: 15 },
    recentList: { gap: 15, marginBottom: 25 },
    recentItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    recentText: { fontFamily: 'Outfit_400Regular', color: '#555', fontSize: 15 },
    popularRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
    popularTag: { backgroundColor: '#FFF9F0', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: '#FFECB3' },
    popularTagText: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#D48806' },

    // Premium Vendor Card (Full-Bleed)
    premiumVendorCard: { width: width * 0.82, marginRight: 24, backgroundColor: '#FFF', borderRadius: 32, elevation: 6, overflow: 'hidden' },
    vendorMainImg: { width: '100%', height: 180, justifyContent: 'flex-start', padding: 15 },
    premiumTag: { backgroundColor: 'rgba(255,255,255,0.92)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    premiumTagText: { color: COLORS.primary, fontSize: 11, fontFamily: 'Outfit_700Bold', letterSpacing: 0.5 },
    vendorDetails: { padding: 20, paddingTop: 15 },
    detailsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNamePremium: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#222' },
    ratingBadgePremium: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, gap: 4 },
    ratingTextPremium: { color: '#FFF', fontSize: 12, fontFamily: 'Outfit_700Bold' },
    locationContainerPremium: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
    locationTextPremium: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666' },
    previewsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    miniThumb: { width: 44, height: 44, backgroundColor: '#F0F0F0', borderRadius: 10 },
    followBtnGold: { marginLeft: 'auto', borderWidth: 1.5, borderColor: COLORS.secondary, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 14 },
    followTextGold: { color: COLORS.secondary, fontFamily: 'Outfit_600SemiBold', fontSize: 13 },

    // Discovery Feed (Staggered Pinterest-style)
    sectionContainer: { marginTop: 40 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#CC0E0E' },

    postCardCompact: {
        borderRadius: 24,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: COLORS.secondary, // Yellow/Gold border
        elevation: 3,
    },

    dotContainerCompact: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
    dotActiveSmall: { width: 12, backgroundColor: '#FFF' },
    likeBtnSmall: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },

    // Info Panel Compact
    infoPanelCompact: { paddingVertical: 14, paddingHorizontal: 15 },
    panelHeaderCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNameCompact: { fontFamily: 'Outfit_700Bold', fontSize: 13, color: '#111', flex: 1 },
    ratingCompact: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#F5F5F5', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
    ratingTextCompact: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#333' },
    eventTypeCompact: { fontFamily: 'Outfit_600SemiBold', fontSize: 10, color: COLORS.primary, marginBottom: 1 },
    locationCompact: { fontFamily: 'Outfit_400Regular', fontSize: 9, color: '#777', marginBottom: 10 },
    metaRowCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#EEE', paddingTop: 8 },
    metaLikesCompact: { fontFamily: 'Outfit_500Medium', fontSize: 10, color: '#999' },
    postDescriptionFull: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },

    editorialRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10, alignItems: 'flex-start' },

    seeAllText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: COLORS.secondary },
    footerContainer: { alignItems: 'center', marginVertical: 40, paddingBottom: 40 },
    stickyButton: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 36, elevation: 12 },
    stickyButtonText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: COLORS.white, marginRight: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
    noResults: { padding: 60, alignItems: 'center' },
    noResultsText: { fontFamily: 'Outfit_400Regular', color: '#999', fontSize: 15 },
});

export default Food;