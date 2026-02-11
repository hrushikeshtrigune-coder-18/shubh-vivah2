import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
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
    TouchableWithoutFeedback,
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
    darkHaldi: '#f29502',    // Dark Accent / Icons / Circles
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

const HeroImg1 = require('../../../../assets/EventMimg/Jewelary/Djewellery.jpg');
const HeroImg2 = require('../../../../assets/EventMimg/Jewelary/Djewellery1.jpg');
const HeroImg3 = require('../../../../assets/EventMimg/Jewelary/Djewellery2.jpg');

const HERO_IMAGES = [
    { id: 'local-1', source: HeroImg1 },
    { id: 'local-2', source: HeroImg2 },
    { id: 'local-3', source: HeroImg3 },
];

const JewelleryDetails = ({ route, navigation }) => {
    const { item } = route.params || {};
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('PORTFOLIO');
    const [isBookmark, setIsBookmark] = useState(false);
    const [bookModalVisible, setBookModalVisible] = useState(false);

    // Hero Carousel Logic
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const heroImages = HERO_IMAGES;

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % heroImages.length;
                flatListRef.current?.scrollTo({
                    x: nextIndex * width,
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



    return (
        <View style={styles.mainContainer}>
            {Platform.OS !== 'web' && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}

            {/* Fixed Background Hero Slider */}
            <View style={styles.heroBackground}>
                <ScrollView
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    scrollEnabled={true}
                    style={StyleSheet.absoluteFill}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(newIndex);
                    }}
                >
                    {HERO_IMAGES.map((item) => (
                        <Image
                            key={item.id}
                            source={item.source}
                            style={{ width, height: 450 }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
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

                    {/* CTA Buttons */}
                    <View style={styles.ctaRow}>
                        <TouchableOpacity style={[styles.contactBtn, styles.bookBtn]} onPress={() => setBookModalVisible(true)}>
                            <Text style={styles.contactBtnText}>Book Visit</Text>
                            <Ionicons name="calendar-outline" size={18} color={COLORS.white} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.contactBtn, styles.viewPhotosBtn]}>
                            <Text style={[styles.contactBtnText, { color: COLORS.textDark }]}>View Photos</Text>
                            <Ionicons name="images-outline" size={18} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.ScrollView>

            {/* Book Visit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={bookModalVisible}
                onRequestClose={() => setBookModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setBookModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Book a Visit</Text>
                                    <TouchableOpacity onPress={() => setBookModalVisible(false)} style={styles.closeBtn}>
                                        <Ionicons name="close" size={20} color={COLORS.darkHaldi} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalSubtitle}>Schedule a tour of {item?.name || 'Royal Orchid Palace'}</Text>

                                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                                    <View style={styles.formCard}>
                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Full Name</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="person-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput placeholder="Enter your full name" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                            </View>
                                        </View>

                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Mobile Number (OTP optional)</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="call-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput placeholder="Enter mobile number" keyboardType="phone-pad" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                            </View>
                                        </View>

                                        <View style={styles.rowInputs}>
                                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                                <Text style={styles.label}>Preferred Date</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="calendar-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput placeholder="DD/MM/YYYY" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                                </View>
                                            </View>
                                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                                <Text style={styles.label}>Time Slot</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="time-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput placeholder="e.g. 2:00 PM" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                                </View>
                                            </View>
                                        </View>

                                        <Text style={styles.disclaimer}>* Our relationship manager will call you to confirm the appointment.</Text>

                                        <View style={styles.modalFooter}>
                                            <TouchableOpacity style={styles.backBtnModal} onPress={() => setBookModalVisible(false)}>
                                                <Text style={styles.backBtnText}>Back</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmBtn}>
                                                <Text style={styles.confirmBtnText}>Confirm Visit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    ctaRow: { marginTop: 30, flexDirection: 'row', gap: 15 },
    contactBtn: {
        flex: 1, paddingVertical: 15, borderRadius: 30,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
        ...Platform.select({
            web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' },
            default: { elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }
        }),
    },
    bookBtn: { backgroundColor: COLORS.kumkum },
    viewPhotosBtn: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#eee' },
    contactBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 24,
        maxHeight: '85%'
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.kumkum },
    closeBtn: { padding: 5, backgroundColor: '#f0f0f0', borderRadius: 20 },
    modalSubtitle: { fontSize: 13, color: COLORS.darkHaldi, marginBottom: 25 },
    formContainer: {},
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        ...Platform.select({
            web: { boxShadow: '0px 6px 20px rgba(0,0,0,0.06)' },
            default: { elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10 }
        })
    },
    inputGroup: { marginBottom: 18 },
    label: { fontSize: 14, fontWeight: '600', color: COLORS.textGray, marginBottom: 8 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderColor: COLORS.haldi, borderRadius: 12,
        paddingHorizontal: 15, height: 50, backgroundColor: '#F9F9F9'
    },
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1, color: '#2B2B2B', fontSize: 15,
        ...Platform.select({
            web: { outlineStyle: 'none' }
        })
    },
    rowInputs: { flexDirection: 'row' },
    disclaimer: { fontSize: 11, color: COLORS.darkHaldi, fontStyle: 'italic', marginBottom: 25, lineHeight: 16 },
    modalFooter: { flexDirection: 'row', gap: 15, marginTop: 10 },
    backBtnModal: {
        flex: 0.4, backgroundColor: 'transparent', borderRadius: 12, borderWidth: 1, borderColor: COLORS.darkHaldi,
        justifyContent: 'center', alignItems: 'center', paddingVertical: 14
    },
    backBtnText: { color: COLORS.darkHaldi, fontWeight: '600', fontSize: 16 },
    confirmBtn: {
        flex: 1, backgroundColor: COLORS.kumkum, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', paddingVertical: 14,
        ...Platform.select({
            default: { elevation: 3 }
        })
    },
    confirmBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 }
});

export default JewelleryDetails;
