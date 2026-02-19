import { PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import AnimatedRN, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// --- ASSETS & CONSTANTS ---
const wedImg = require('../../../../assets/images/wed.jpg');
const honeyImg = require('../../../../assets/images/honey.jpg');

const PRIMARY_COLOR = '#CC0E0E';
const ACCENT_COLOR = '#F29502';
const BG_COLOR = '#FFFFF0'; // Ivory/Cream

const COLORS = {
    primary: PRIMARY_COLOR,
    secondary: ACCENT_COLOR,
    background: BG_COLOR,
    white: '#FFFFFF',
};

const POPULAR_SEARCHES = ['Maldives', 'Santorini', 'Bali', 'Switzerland', 'Udaipur', 'Dubai'];

const OUR_VENDORS = [
    {
        id: 'v101',
        name: 'Royal Heritage Trips',
        tagLine: 'Experience Indian Royalty',
        image: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc0b29?q=80&w=2000&auto=format&fit=crop',
        rating: 4.8,
        reviews: 156,
        type: 'Domestic',
        locations: [
            { name: 'Udaipur', price: '₹85K', duration: '4 Nights' },
            { name: 'Jaipur', price: '₹75K', duration: '3 Nights' }
        ],
        startPrice: '₹75K',
        verified: true
    },
    {
        id: 'v102',
        name: 'Coastal Charms',
        tagLine: 'Bespoke Beach Holidays',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop',
        rating: 4.7,
        reviews: 92,
        type: 'Domestic',
        locations: [
            { name: 'Goa', price: '₹60K', duration: '5 Nights' },
            { name: 'Andaman', price: '₹1.1L', duration: '6 Nights' }
        ],
        startPrice: '₹60K',
        verified: true
    }
];

const RECENT_POSTS = [
    {
        id: '1',
        vendorId: 'v1',
        vendorName: 'Luxe Escapes',
        images: [
            { uri: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' }
        ],
        rating: 4.9,
        description: 'Breathtaking overwater villas in the heart of the Maldives. A true paradise for couples.',
        eventType: 'Luxury Beach',
        city: 'Maldives',
        locationDetail: 'North Male Atoll',
        likes: 1240,
        imageHeight: 280
    },
    {
        id: '2',
        vendorId: 'v2',
        vendorName: 'Amour Travels',
        images: [
            { uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2066&auto=format&fit=crop' }
        ],
        rating: 4.8,
        description: 'Sunset dinners by the Eiffle Tower. Romantic Parisian escapes tailored for you.',
        eventType: 'European Romance',
        city: 'Paris',
        locationDetail: '7th Arrondissement',
        likes: 856,
        imageHeight: 320
    },
    {
        id: '3',
        vendorId: 'v3',
        vendorName: 'Everlasting Journeys',
        images: [
            { uri: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc0b29?q=80&w=2000&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop' }
        ],
        rating: 4.7,
        description: 'Experience royalty in the City of Lakes. Luxurious palace stays in Udaipur.',
        eventType: 'Palatial Luxury',
        city: 'Udaipur',
        locationDetail: 'Lake Pichola',
        likes: 2100,
        imageHeight: 290
    },
    {
        id: '4',
        vendorId: 'v4',
        vendorName: 'Alpine Love',
        images: [
            { uri: 'https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=2000&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1520699918507-3c3e01c7690d?q=80&w=2000&auto=format&fit=crop' }
        ],
        rating: 4.9,
        description: 'Cozy cabin stays in the Swiss Alps. Snowcapped peaks and warm fireplaces.',
        eventType: 'Mountain Escape',
        city: 'Zermatt',
        locationDetail: 'Matterhorn Region',
        likes: 1540,
        imageHeight: 300
    }
];

// --- COMPONENTS ---

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

const VendorCard = ({ vendor, onPress }) => {
    return (
        <TouchableOpacity style={styles.standardCard} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: vendor.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
            <View style={styles.priceTag}>
                <Text style={styles.priceText}>From {vendor.startPrice}</Text>
            </View>
            <BlurView intensity={Platform.OS === 'ios' ? 80 : 100} tint="light" style={styles.glassInfo}>
                <View style={styles.vendorHeader}>
                    <Text style={styles.vendorNameSerif} numberOfLines={1}>{vendor.name}</Text>
                    {vendor.verified && (
                        <Ionicons name="shield-checkmark" size={16} color="#4CAF50" style={{ marginLeft: 4 }} />
                    )}
                </View>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#F29502" />
                    <Text style={styles.ratingText}>{vendor.rating} ({vendor.reviews})</Text>
                </View>
                <View style={styles.destList}>
                    {vendor.locations.slice(0, 2).map((loc, idx) => (
                        <View key={idx} style={styles.miniDestChip}>
                            <Ionicons name="location-sharp" size={10} color="#CC0E0E" />
                            <Text style={styles.miniDestText}>{loc.name}</Text>
                        </View>
                    ))}
                </View>
            </BlurView>
        </TouchableOpacity>
    );
};

const Honeymoon = ({ navigation }) => {
    const [fontsLoaded] = useFonts({ PlayfairDisplay_700Bold });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [selectedCity, setSelectedCity] = useState('Global');

    const scrollRef = useRef(null);
    const dragX = useSharedValue(0);

    const pan = Gesture.Pan()
        .onChange((event) => {
            dragX.value += event.changeX;
        })
        .onFinalize(() => {
            dragX.value = withSpring(0);
        });

    const heroTextStyle = useAnimatedStyle(() => ({
        opacity: interpolate(Math.abs(dragX.value), [0, 100], [1, 0.5], Extrapolation.CLAMP),
    }));

    const rightImageStyle = useAnimatedStyle(() => ({
        width: interpolate(dragX.value, [-width / 2, width / 2], [width, 0], Extrapolation.CLAMP),
    }));

    const handlePostClick = (post) => {
        // Find corresponding vendor or create dummy
        const vendor = OUR_VENDORS.find(v => v.name === post.vendorName) || {
            name: post.vendorName,
            image: post.images[0],
            rating: post.rating,
            location: post.city
        };
        navigation.navigate('HoneymoonVendorDetails', { vendor });
    };

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <GestureDetector gesture={pan}>
                <View style={styles.splitScreen}>
                    <View style={[styles.splitSide, styles.leftSide]}>
                        <Image source={wedImg} style={styles.heroImage} />
                        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill} />
                    </View>
                    <AnimatedRN.View style={[styles.splitSide, styles.rightSide, rightImageStyle]}>
                        <Image source={honeyImg} style={[styles.heroImage, { right: 0, left: undefined }]} />
                        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill} />
                    </AnimatedRN.View>
                    <AnimatedRN.View style={[styles.dragHandle, { transform: [{ translateX: dragX }] }]}>
                        <View style={styles.dragLine} />
                    </AnimatedRN.View>
                    <View style={styles.heroTextContainer}>
                        <AnimatedRN.Text style={[styles.heroTitle, heroTextStyle]}>From "I Do"</AnimatedRN.Text>
                        <AnimatedRN.Text style={[styles.heroSubtitle, heroTextStyle]}>To "Just Us Two"</AnimatedRN.Text>
                    </View>
                </View>
            </GestureDetector>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderSearchBar = () => (
        <View style={styles.searchSectionWrapper}>
            <View style={[styles.premiumSearchContainer, isSearchFocused && styles.premiumSearchActive]}>
                <TouchableOpacity style={styles.locationSelector}>
                    <Text style={styles.locationTextPin} numberOfLines={1}>📍 {selectedCity}</Text>
                    <Ionicons name="chevron-down" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
                <View style={styles.searchDivider} />
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.premiumInput}
                        placeholder="Search destinations, planners…"
                        placeholderTextColor="#999"
                        onFocus={() => setSearchFocused(true)}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
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
                            placeholder="Search escapes, locations…"
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
                        {['Maldives', 'Goa', 'Udaipur'].map((item, idx) => (
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

    const renderActionHero = () => (
        <View>
            {renderHero()}
            {renderSearchBar()}
        </View>
    );

    const renderRhythmicPattern = () => {
        const pattern = [];
        let i = 0;
        const posts = RECENT_POSTS;

        while (i < posts.length) {
            // Full Width Post
            pattern.push(
                <View key={`full-${posts[i].id}`} style={{ paddingHorizontal: 10 }}>
                    <PostCard
                        post={posts[i]}
                        onPostPress={handlePostClick}
                        onVendorPress={handlePostClick}
                        isFullWidth={true}
                    />
                </View>
            );
            i++;
            if (i >= posts.length) break;

            // Two Half Width Posts
            const pair = [];
            if (i < posts.length) {
                pair.push(
                    <PostCard
                        key={`half-${posts[i].id}`}
                        post={posts[i]}
                        onPostPress={handlePostClick}
                        onVendorPress={handlePostClick}
                        isFullWidth={false}
                    />
                );
                i++;
            }
            if (i < posts.length) {
                pair.push(
                    <PostCard
                        key={`half-${posts[i].id}`}
                        post={posts[i]}
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
                <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    {renderActionHero()}

                    <View style={styles.mainContent}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Our Vendors</Text>
                            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filmstripContainer}>
                            {OUR_VENDORS.map((vendor) => (
                                <VendorCard
                                    key={vendor.id}
                                    vendor={vendor}
                                    onPress={() => navigation.navigate('HoneymoonVendorDetails', { vendor })}
                                />
                            ))}
                        </ScrollView>

                        <View style={styles.sectionContainer}>
                            <View style={[styles.sectionHeader, { marginBottom: 25 }]}>
                                <Text style={styles.sectionTitle}>Recent Posts</Text>
                            </View>
                            {renderRhythmicPattern()}
                        </View>
                    </View>
                </ScrollView>

                {renderSearchOverlay()}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BG_COLOR },
    heroContainer: { height: height * 0.7, width: '100%' },
    splitScreen: { flexDirection: 'row', width: '100%', height: '100%' },
    splitSide: { position: 'absolute', top: 0, bottom: 0, height: '100%', width: '100%', overflow: 'hidden' },
    leftSide: { left: 0 },
    rightSide: { right: 0 },
    heroImage: { width: width, height: '100%', resizeMode: 'cover' },
    dragHandle: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: 40, marginLeft: -20, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
    dragLine: { width: 3, height: '100%', backgroundColor: 'rgba(255,255,255,0.7)' },
    heroTextContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' },
    heroTitle: { fontFamily: 'Outfit_700Bold', fontSize: 36, color: PRIMARY_COLOR, textShadowColor: 'rgba(255,255,255,0.3)', textShadowRadius: 10 },
    heroSubtitle: { fontFamily: 'Outfit_500Medium', fontSize: 24, color: '#FFEB3B', fontStyle: 'italic', textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 10 },
    backButton: { position: 'absolute', top: 50, left: 20, zIndex: 20, backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },

    searchSectionWrapper: { paddingHorizontal: 20, marginTop: -30, zIndex: 30 },
    premiumSearchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 60,
        borderRadius: 24,
        alignItems: 'center',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        paddingHorizontal: 18,
    },
    premiumSearchActive: { borderWidth: 1.5, borderColor: ACCENT_COLOR },
    locationSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 100 },
    locationTextPin: { fontFamily: 'Outfit_600SemiBold', fontSize: 13, color: '#333' },
    searchDivider: { width: 1.5, height: 28, backgroundColor: '#EEE', marginHorizontal: 12 },
    searchInputWrapper: { flex: 1 },
    premiumInput: { flex: 1, fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#333' },

    mainContent: { marginTop: 40 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
    sectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: PRIMARY_COLOR },
    seeAllText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: ACCENT_COLOR },

    filmstripContainer: { paddingLeft: 20, paddingRight: 20, gap: 15 },

    standardCard: { width: 260, height: 380, backgroundColor: '#FFF', borderRadius: 25, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, borderWidth: 1, borderColor: '#FFF0E0' },
    priceTag: { position: 'absolute', top: 15, right: 15, backgroundColor: 'rgba(255, 255, 255, 0.9)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10 },
    priceText: { fontFamily: 'Outfit_700Bold', fontSize: 12, color: PRIMARY_COLOR },
    glassInfo: { position: 'absolute', bottom: 10, left: 10, right: 10, borderRadius: 20, padding: 12, backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)' },
    vendorHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    vendorNameSerif: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 18, color: PRIMARY_COLOR, flex: 1 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
    ratingText: { color: ACCENT_COLOR, fontFamily: 'Outfit_600SemiBold', fontSize: 12, marginLeft: 4 },
    destList: { flexDirection: 'row', marginTop: 8, gap: 5 },
    miniDestChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
    miniDestText: { fontSize: 10, fontFamily: 'Outfit_600SemiBold', color: '#555', marginLeft: 3 },

    // PostCard styles
    postCardCompact: { borderRadius: 24, backgroundColor: '#FFF', overflow: 'hidden', borderWidth: 1.5, borderColor: ACCENT_COLOR, elevation: 3 },
    dotContainerCompact: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
    dotActiveSmall: { width: 12, backgroundColor: '#FFF' },
    likeBtnSmall: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },
    infoPanelCompact: { paddingVertical: 14, paddingHorizontal: 15 },
    panelHeaderCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNameCompact: { fontFamily: 'Outfit_700Bold', fontSize: 13, color: '#111', flex: 1 },
    ratingCompact: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#F5F5F5', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
    ratingTextCompact: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#333' },
    eventTypeCompact: { fontFamily: 'Outfit_600SemiBold', fontSize: 10, color: PRIMARY_COLOR, marginBottom: 1 },
    locationCompact: { fontFamily: 'Outfit_400Regular', fontSize: 9, color: '#777', marginBottom: 10 },
    metaRowCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#EEE', paddingTop: 8 },
    metaLikesCompact: { fontFamily: 'Outfit_500Medium', fontSize: 10, color: '#999' },
    postDescriptionFull: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },
    editorialRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10, alignItems: 'flex-start' },
    sectionContainer: { marginTop: 40 },

    // Overlay styles
    overlayContainer: { flex: 1, backgroundColor: '#FFF' },
    overlayHeader: { paddingTop: 60, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F5F5F5', paddingBottom: 20 },
    overlaySearchBox: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    overlayInput: { flex: 1, height: 48, backgroundColor: '#F8F8F8', borderRadius: 16, paddingHorizontal: 18, fontFamily: 'Outfit_400Regular', fontSize: 16 },
    cancelText: { color: PRIMARY_COLOR, fontFamily: 'Outfit_600SemiBold', fontSize: 15 },
    overlayContent: { padding: 25 },
    overlaySectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#333', marginBottom: 18, marginTop: 15 },
    recentList: { gap: 15, marginBottom: 25 },
    recentItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    recentText: { fontFamily: 'Outfit_400Regular', color: '#555', fontSize: 15 },
    popularRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
    popularTag: { backgroundColor: '#FFF9F0', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: '#FFECB3' },
    popularTagText: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#D48806' },
});

export default Honeymoon;
