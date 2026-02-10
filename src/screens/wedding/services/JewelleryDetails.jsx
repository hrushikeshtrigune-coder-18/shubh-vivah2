import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// STRICT Color Palette
const COLORS = {
    kumkum: '#A70002',       // Primary Accent
    akshid: '#FFFFE4',       // Background / Soft sections
    textRed: '#CC0E0E',      // Text Highlight / Alerts
    haldi: '#F3D870',        // Secondary Accent
    darkHaldi: '#F29502',    // Dark Accent / Icons / Circles
    white: '#FFFFFF',
    textDark: '#1A1A1A',     // Deep black for contrast
    textGray: '#666666',
    cardShadow: 'rgba(167, 0, 2, 0.1)', // Kumkum tinted shadow
};

const PORTFOLIO_IMAGES = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' },
    { id: '5', uri: 'https://images.unsplash.com/photo-1588661845173-982163b2255e?q=80&w=1974&auto=format&fit=crop' },
    { id: '6', uri: 'https://images.unsplash.com/photo-1589139169229-87588019685a?q=80&w=1974&auto=format&fit=crop' },
    { id: '7', uri: 'https://images.unsplash.com/photo-1605100804763-ebea243bc612?q=80&w=2070&auto=format&fit=crop' },
    { id: '8', uri: 'https://images.unsplash.com/photo-1599643477877-53135311f9ae?q=80&w=2070&auto=format&fit=crop' }
];

const JewelleryDetails = ({ route, navigation }) => {
    const { item } = route.params || {};
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('PORTFOLIO');
    const [isBookmark, setIsBookmark] = useState(false);

    // Hero Carousel Logic
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const heroImages = React.useMemo(() => {
        return [
            { id: 'local-1', source: require('../../../../assets/EventMimg/Jewelary/Djewellery.jpg') },
            { id: 'local-2', source: require('../../../../assets/EventMimg/Jewelary/Djewellery1.jpg') },
            { id: 'local-3', source: require('../../../../assets/EventMimg/Jewelary/Djewellery2.jpg') },
        ];
    }, []);

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % heroImages.length;
                flatListRef.current?.scrollToIndex({
                    index: nextIndex,
                    animated: true,
                });
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    // Animate Avatar
    const animatedAvatarStyle = useAnimatedStyle(() => {
        const left = interpolate(
            scrollY.value,
            [0, 200],
            [20, width / 2 - 40],
            Extrapolation.CLAMP
        );
        const top = interpolate(
            scrollY.value,
            [0, 200],
            [50, -40],
            Extrapolation.CLAMP
        );
        const scale = interpolate(
            scrollY.value,
            [0, 200],
            [1, 1.2],
            Extrapolation.CLAMP
        );

        return {
            left,
            top,
            transform: [{ scale }]
        };
    });

    // Animate Info
    const animatedInfoStyle = useAnimatedStyle(() => {
        const marginLeft = interpolate(
            scrollY.value,
            [0, 200],
            [115, 0],
            Extrapolation.CLAMP
        );
        const paddingTop = interpolate(
            scrollY.value,
            [0, 200],
            [0, 60],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            scrollY.value,
            [0, 100, 200],
            [1, 0.5, 1],
            Extrapolation.CLAMP
        );

        return {
            marginLeft,
            paddingTop,
            opacity,
            alignItems: scrollY.value > 100 ? 'center' : 'flex-start'
        };
    });

    // Dynamic Header that stays fixed
    const renderFixedHeader = () => (
        <View style={[styles.fixedHeader, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButtonBlur}>
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => setIsBookmark(!isBookmark)} style={styles.iconButtonBlur}>
                    <Ionicons name={isBookmark ? "bookmark" : "bookmark-outline"} size={22} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonBlur}>
                    <Ionicons name="share-social-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderHighlights = () => (
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.highlightsContainer}>
            <HighlightCard icon="diamond-stone" label="Diamond" color={COLORS.darkHaldi} />
            <HighlightCard icon="gold" label="Gold" color={COLORS.kumkum} />
            <HighlightCard icon="medal" label="Certified" color={COLORS.darkHaldi} />
            <HighlightCard icon="hand-heart" label="Handmade" color={COLORS.kumkum} />
        </Animated.ScrollView>
    );

    const HighlightCard = ({ icon, label, color }) => (
        <View style={styles.highlightCard}>
            <View style={[styles.highlightIconBox, { backgroundColor: color + '20' }]}>
                <MaterialCommunityIcons name={icon} size={24} color={color} />
            </View>
            <Text style={styles.highlightText}>{label}</Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {Platform.OS !== 'web' && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}

            {/* Fixed Background Hero Slider */}
            <View style={styles.heroBackground}>
                <FlatList
                    ref={flatListRef}
                    data={heroImages}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false} // Disable manual scroll to avoid conflict with auto-scroll? Or keep enabled? User said "auto scroll". Let's keep manual enabled but it might fight. User didn't ask to disable manual. Actually standard carousel allows manual.
                    // But if user scrolls manually, currentIndex state needs update.
                    // For simplicity and to match request exactly ("automatically after 3 sec"), let's stick to auto.
                    // I will enable manual scroll but simplistic auto logic might jump if index mismatches.
                    // Let's just implement auto scroll for now as requested.
                    renderItem={({ item }) => (
                        <Image source={item.source} style={{ width, height: '100%' }} resizeMode="cover" />
                    )}
                    getItemLayout={(data, index) => (
                        { length: width, offset: width * index, index }
                    )}
                />
                <View style={styles.heroOverlay} />
            </View>

            {renderFixedHeader()}

            <Animated.ScrollView
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Spacer to push sheet down */}
                <View style={{ height: 350 }} />

                {/* Profile Sheet */}
                <View style={styles.sheetContainer}>
                    {/* Floating Avatar - Animated */}
                    <Animated.View style={[styles.avatarContainer, animatedAvatarStyle]}>
                        <Image source={item?.image} style={styles.avatarImage} resizeMode="cover" />
                    </Animated.View>

                    {/* Vendor Info - Animated */}
                    <Animated.View style={[styles.vendorInfoSection, animatedInfoStyle]}>
                        <Text style={styles.vendorName}>{item?.name || 'Royal Orchid Palace'}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={16} color={COLORS.textGray} />
                            <Text style={styles.locationText}>{item?.location || 'Located in the beautiful city of Pune, MH.'}</Text>
                        </View>
                        <Text style={styles.tagline}>{item?.tagline || 'Offering a royal experience with curated luxury events.'}</Text>

                        {/* Highlights / Stats Row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="heart-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>2.5k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="eye-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>15k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="star" size={18} color={COLORS.darkHaldi} />
                                <Text style={styles.statValue}>{item?.ratingValue || 4.8} ({item?.reviews || 320})</Text>
                            </View>
                        </View>
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Highlights Scroll */}
                    {renderHighlights()}

                    {/* Tabs */}
                    <View style={styles.tabsWrapper}>
                        <TabPill title="Portfolio" active={activeTab === 'PORTFOLIO'} onPress={() => setActiveTab('PORTFOLIO')} />
                        <TabPill title="Albums" active={activeTab === 'ALBUMS'} onPress={() => setActiveTab('ALBUMS')} />
                        <TabPill title="Videos" active={activeTab === 'VIDEOS'} onPress={() => setActiveTab('VIDEOS')} />
                    </View>

                    {/* Portfolio Grid */}
                    {activeTab === 'PORTFOLIO' && (
                        <View style={styles.gridContainer}>
                            {PORTFOLIO_IMAGES.map((img) => (
                                <View key={img.id} style={styles.gridItem}>
                                    <Image source={{ uri: img.uri }} style={styles.gridImage} resizeMode="cover" />
                                </View>
                            ))}
                        </View>
                    )}

                    {/* CTA Button */}
                    <TouchableOpacity style={styles.contactBtn}>
                        <Text style={styles.contactBtnText}>Contact Vendor</Text>
                        <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
                    </TouchableOpacity>

                </View>
            </Animated.ScrollView>
        </View>
    );
};

const TabPill = ({ title, active, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.tabPill, active && styles.activeTabPill]}>
        <Text style={[styles.tabPillText, active && styles.activeTabPillText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLORS.akshid },

    // Fixed Hero
    heroBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 450 },
    heroImage: { width: '100%', height: '100%' }, // Kept for reference, replaced by FlatList items inline style
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }, // Ensure overlay doesn't block touches if we want manual scroll

    // Fixed Header
    fixedHeader: {
        position: 'absolute', left: 20, right: 20, zIndex: 50,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    iconButtonBlur: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center', alignItems: 'center',
    },

    // Sheet
    scrollContent: { paddingBottom: 40 },
    sheetContainer: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 20,
        paddingHorizontal: 20,
        minHeight: 600,
        ...Platform.select({
            web: { boxShadow: '0px -5px 15px rgba(0,0,0,0.1)' },
            default: {
                shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 15
            }
        })
    },

    // Avatar - Base styles, animated parts handled by reanimated
    avatarContainer: {
        position: 'absolute',
        // top: 50, // Handled by animation
        // left: 20, // Handled by animation
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: COLORS.akshid,
        padding: 4,
        zIndex: 10,
        ...Platform.select({
            default: { elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 5 }
        })
    },
    avatarImage: { width: '100%', height: '100%', borderRadius: 40 },

    // Vendor Info - Base styles
    vendorInfoSection: { marginBottom: 20 }, // marginLeft handled by animation
    vendorName: { fontSize: 20, fontWeight: '800', color: COLORS.textDark, marginBottom: 5 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 4 },
    locationText: { fontSize: 13, color: COLORS.textGray, fontWeight: '500' },
    tagline: { fontSize: 13, color: COLORS.textGray, marginBottom: 12, lineHeight: 18 },

    statsRow: { flexDirection: 'row', gap: 15, alignItems: 'center' },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statValue: { fontSize: 12, fontWeight: '600', color: COLORS.textDark },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginBottom: 20 },

    // Highlights
    highlightsContainer: { paddingBottom: 20, gap: 10 },
    highlightCard: {
        backgroundColor: COLORS.white, padding: 10, borderRadius: 14, width: 90, alignItems: 'center', marginRight: 8,
        ...Platform.select({
            web: { borderWidth: 1, borderColor: '#eee' },
            default: { elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3 }
        })
    },
    highlightIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
    highlightText: { fontSize: 11, fontWeight: '600', color: COLORS.textDark },

    // Tabs
    tabsWrapper: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    tabPill: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: COLORS.white, borderWidth: 1, borderColor: 'transparent' },
    activeTabPill: { backgroundColor: COLORS.white, borderColor: COLORS.kumkum, borderWidth: 1 },
    tabPillText: { fontSize: 13, color: COLORS.textGray, fontWeight: '600' },
    activeTabPillText: { color: COLORS.kumkum },

    // Grid
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    gridItem: {
        width: (width - 40 - 20) / 3,
        height: (width - 40 - 20) / 3,
        borderRadius: 12, overflow: 'hidden', backgroundColor: COLORS.haldi
    },
    gridImage: { width: '100%', height: '100%' },

    // Bottom CTA
    contactBtn: {
        marginTop: 30, backgroundColor: COLORS.kumkum, paddingVertical: 15, borderRadius: 30,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
        ...Platform.select({
            web: { boxShadow: '0px 4px 10px rgba(167,0,2,0.3)' },
            default: { elevation: 5, shadowColor: COLORS.kumkum, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }
        }),
    },
    contactBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' }
});

export default JewelleryDetails;
