// Version 7.1 - ISOLATED HERO FIX & Full Bleed Video
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import React, { memo, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const { width } = Dimensions.get('window');

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#f29502',
    gold: '#D4AF37',
    ivory: '#FFFFF0',
    white: '#FFFFFF',
    textDark: '#333333',
    textLight: '#666666',
};

// Isolated Hero Component for DOM Stability on Web
const VideoHero = memo(({ insets, onSearchPress, navigation }) => {
    const videoRef = useRef(null);
    return (
        <View style={styles.heroContainer}>
            <View style={StyleSheet.absoluteFill}>
                <Video
                    key="stable-hero-video"
                    ref={videoRef}
                    source={require('../../../../assets/EventMimg/Jewelary/jewelaryV (2).mp4')}
                    style={styles.heroVideo}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay
                    isLooping
                    isMuted
                />
            </View>
            <View style={styles.heroOverlay} />

            <View style={[styles.headerIconsRow, { top: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
                <Text style={styles.heroHeadline}>We Don't Just Sell Jewellery — {"\n"}We Create Legacies✨</Text>
                <Text style={styles.heroSubtext}>Traditional • Modern • Destination Experiences</Text>

                <TouchableOpacity style={styles.heroCTA} onPress={onSearchPress}>
                    <Ionicons name="sparkles" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.heroCTAText}>Explore Collections</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.trustStrip}>
                <View style={styles.trustItem}>
                    <View style={styles.trustIconCircle}>
                        <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.textRed} />
                    </View>
                    <Text style={styles.trustText}>Hallmarked</Text>
                </View>
                <View style={styles.trustItem}>
                    <View style={styles.trustIconCircle}>
                        <Ionicons name="ribbon-outline" size={20} color={COLORS.textRed} />
                    </View>
                    <Text style={styles.trustText}>Certified</Text>
                </View>
                <View style={styles.trustItem}>
                    <View style={styles.trustIconCircle}>
                        <Ionicons name="diamond-outline" size={20} color={COLORS.textRed} />
                    </View>
                    <Text style={styles.trustText}>Premium</Text>
                </View>
            </View>
        </View>
    );
});

const jewelleryData = [
    { id: '1', name: 'Royal Kundan Set', location: 'Jaipur, RJ', locality: 'Pimpri Chinchwad', rating: '4.8', ratingValue: 4.8, reviews: 45, guests: 'Bridal Set, Gemstone', type: 'Gold, Kundan', wmgAward: true, price: '₹ 1.5L', image: { uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '12', name: 'Diamond Choker', location: 'Mumbai, MH', locality: 'Chinchwad', rating: '4.9', ratingValue: 4.9, reviews: 120, guests: 'Necklace', type: 'Diamond', wmgAward: true, price: '₹ 2.25L', image: { uri: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '3', name: 'Temple Gold Set', location: 'Chennai, TN', locality: 'Pimpri', rating: '4.7', ratingValue: 4.7, reviews: 25, guests: 'Traditional', type: 'Gold', wmgAward: false, price: '₹ 3.0L', image: { uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '4', name: 'Polki Earrings', location: 'Hyderabad, TS', locality: 'Kothrud', rating: '4.6', ratingValue: 4.6, reviews: 8, guests: 'Earrings', type: 'Artificial', wmgAward: false, price: '₹ 75k', image: { uri: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop' }, category: 'Accessories' },
    { id: '15', name: 'Antique Bangles', location: 'Kolkata, WB', locality: 'Alephata', rating: '4.8', ratingValue: 4.8, reviews: 60, guests: 'Bangles', type: 'Gold', wmgAward: true, price: '₹ 1.2L', image: { uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '6', name: 'Floral Hathphool', location: 'Delhi, DL', locality: 'Ashok Nagar', rating: '4.5', ratingValue: 4.5, reviews: 12, guests: 'Floral', type: 'Flower Jewellery', wmgAward: false, price: '₹ 15k', image: { uri: 'https://images.unsplash.com/photo-1588661845173-982163b2255e?q=80&w=1974&auto=format&fit=crop' }, category: 'Flower Jewellery' },
    { id: '7', name: 'Rent: Kundan Set', location: 'Pune, MH', locality: 'Pimpri Chinchwad', rating: '4.2', ratingValue: 4.2, reviews: 35, guests: 'Rental, Gemstone', type: 'Bridal Jewellery on Rent', wmgAward: false, price: '₹ 25k', image: { uri: 'https://images.unsplash.com/photo-1589139169229-87588019685a?q=80&w=1974&auto=format&fit=crop' }, category: 'Bridal Jewellery on Rent' },
    { id: '8', name: 'Ruby Gemstone Ring', location: 'Mumbai, MH', locality: 'Kothrud', rating: '4.9', ratingValue: 4.9, reviews: 50, guests: 'Gemstone', type: 'Gold, Diamond', wmgAward: true, price: '₹ 85k', image: { uri: 'https://images.unsplash.com/photo-1605100804763-ebea243bc612?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '9', name: 'Emerald Necklace', location: 'Delhi, DL', locality: 'Ashok Nagar', rating: '4.7', ratingValue: 4.7, reviews: 22, guests: 'Necklace, Gemstone', type: 'Gold', wmgAward: false, price: '₹ 1.8L', image: { uri: 'https://images.unsplash.com/photo-1599643477877-53135311f9ae?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
    { id: '10', name: 'Pearl Drop Earrings', location: 'Jaipur, RJ', locality: 'Chinchwad', rating: '4.5', ratingValue: 4.5, reviews: 18, guests: 'Earrings', type: 'Artificial', wmgAward: false, price: '₹ 12k', image: { uri: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop' }, category: 'Accessories' },
    { id: '11', name: 'Diamond Bangle Set', location: 'Surat, GJ', locality: 'Pimpri', rating: '4.8', ratingValue: 4.8, reviews: 42, guests: 'Bangles, Diamond', type: 'Diamond', wmgAward: true, price: '₹ 3.5L', image: { uri: 'https://images.unsplash.com/photo-1602752250015-4726425c3459?q=80&w=2070&auto=format&fit=crop' }, category: 'Jewellery' },
];

const DETAILED_FILTERS = [
    { id: 'Locality', name: 'Locality', options: ['Pimpri Chinchwad', 'Chinchwad', 'Pimpri', 'Kothrud', 'Alephata', 'Ashok Nagar'] },
    { id: 'Type', name: 'Type', options: ['Gold', 'Diamond', 'Artificial', 'Flower Jewellery', 'Bridal Jewellery on Rent'] },
    { id: 'WMG Award', name: 'WMG Award', options: ['Users\' Choice Awards Winner'] },
    { id: 'Review count', name: 'Review count', options: ['<5 reviews', '5+ reviews', '15+ reviews', '30+ reviews'] },
    { id: 'Rating', name: 'Rating', options: ['All Ratings', 'Rated <4', 'Rated 4+', 'Rated 4.5+', 'Rated 4.8+'] }
];

const FEATURED_COLLECTIONS = [
    { id: '1', name: 'Temple Jewellery', image: { uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' }, subtitle: 'Divine • Traditional • Gold', filterKey: 'Temple' },
    { id: '2', name: 'Kundan Sets', image: { uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' }, subtitle: 'Royal • Polki • Heritage', filterKey: 'Kundan' },
    { id: '3', name: 'Diamond Love', image: { uri: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop' }, subtitle: 'Modern • Classy • Shine', filterKey: 'Diamond' },
];

const VIBE_DATA = [
    { id: 'Diamond', name: 'Diamond', icon: 'diamond-stone', lib: 'MCI' },
    { id: 'Necklace', name: 'Necklace', icon: 'necklace', lib: 'MCI' },
    { id: 'Gemstone', name: 'Gemstone', icon: 'octagram-outline', lib: 'MCI' },
    { id: 'Earrings', name: 'Earrings', icon: 'star-four-points-outline', lib: 'MCI' },
    { id: 'Bangles', name: 'Bangles', icon: 'circle-multiple-outline', lib: 'MCI' },
];

const JewelleryScreen = ({ navigation }) => {
    const safeInsets = useSafeAreaInsets();
    const insets = useMemo(() => ({
        top: safeInsets?.top || 0,
        bottom: safeInsets?.bottom || 0,
        left: safeInsets?.left || 0,
        right: safeInsets?.right || 0
    }), [safeInsets]);

    const [likedItems, setLikedItems] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const scrollViewRef = useRef(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [activeFilterTab, setActiveFilterTab] = useState('Locality');
    const [selectedFilters, setSelectedFilters] = useState({ Locality: [], Type: [], 'WMG Award': [], 'Review count': [], 'Rating': [] });

    const toggleLike = (id) => {
        if (Platform.OS !== 'web') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleFilterOption = (category, option) => {
        setSelectedFilters(prev => {
            const currentOptions = prev[category] || [];
            return currentOptions.includes(option) ? { ...prev, [category]: currentOptions.filter(o => o !== option) } : { ...prev, [category]: [...currentOptions, option] };
        });
    };

    const clearFilters = () => setSelectedFilters({ Locality: [], Type: [], 'WMG Award': [], 'Review count': [], 'Rating': [] });

    const filteredData = jewelleryData.filter(item => {
        if (selectedCategory !== 'All') {
            const search = selectedCategory.toLowerCase();
            if (!(item.category.toLowerCase().includes(search) || item.type.toLowerCase().includes(search) || (item.guests && item.guests.toLowerCase().includes(search)) || item.name.toLowerCase().includes(search))) return false;
        }
        const { Locality, Type, 'WMG Award': wmg, 'Review count': reviews, Rating } = selectedFilters;
        if (Locality.length > 0 && !Locality.includes(item.locality)) return false;
        if (Type.length > 0 && !Type.includes(item.type)) return false;
        if (wmg.length > 0 && wmg.includes('Users\' Choice Awards Winner') && !item.wmgAward) return false;
        if (reviews.length > 0) {
            const reviewOption = reviews[0];
            if (reviewOption === '<5 reviews' && item.reviews >= 5) return false;
            if (reviewOption === '5+ reviews' && item.reviews < 5) return false;
        }
        if (Rating.length > 0 && Rating[0] === 'Rated 4+' && item.ratingValue < 4) return false;
        return true;
    });

    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                <VideoHero
                    insets={insets}
                    onSearchPress={() => setModalVisible(true)}
                    navigation={navigation}
                />

                <View style={[styles.sectionContainer, { marginTop: 40 }]}>
                    <Text style={styles.sectionTitle}>Featured Collections</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                        {FEATURED_COLLECTIONS.map(item => (
                            <TouchableOpacity key={item.id} style={styles.featuredCard} onPress={() => setSelectedCategory(item.filterKey)}>
                                <ImageBackground source={item.image} style={styles.featuredImage} imageStyle={{ borderRadius: 15 }}>
                                    <View style={styles.featuredOverlay}><Text style={styles.featuredName}>{item.name}</Text></View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>Choose Your Vibe</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vibeScroll}>
                        {VIBE_DATA.map((vibe) => {
                            const IconComponent = vibe.lib === 'MCI' ? MaterialCommunityIcons : Ionicons;
                            const isActive = selectedCategory === vibe.id;
                            return (
                                <View key={vibe.id} style={{ alignItems: 'center', marginRight: 15 }}>
                                    <TouchableOpacity style={[styles.vibeItem, isActive && styles.activeVibeItem]} onPress={() => setSelectedCategory(isActive ? 'All' : vibe.id)}>
                                        <IconComponent name={vibe.icon} size={32} color="#f29502" />
                                    </TouchableOpacity>
                                    <Text style={styles.vibeText}>{vibe.name}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Top Picks</Text>
                    {filteredData.map((item) => {
                        const isLiked = !!likedItems[item.id];
                        return (
                            <View key={item.id} style={styles.cardContainer}>
                                <ImageBackground source={item.image} style={styles.cardImage} resizeMode="cover">
                                    <View style={styles.ratingBadge}><Text style={styles.ratingText}>{item.ratingValue}</Text></View>
                                    <TouchableOpacity style={styles.heartBtn} onPress={() => toggleLike(item.id)}>
                                        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={22} color={isLiked ? "red" : COLORS.kumkum} />
                                    </TouchableOpacity>
                                    <View style={styles.floatingContent}>
                                        <Text style={styles.cardTitle}>{item.name}</Text>
                                        <Text style={styles.cardLocation}>{item.locality} • {item.type}</Text>
                                        <View style={styles.rowBetween}>
                                            <Text style={styles.cardPrice}>{item.price}</Text>
                                            <View style={styles.capacityBadge}><Text style={styles.capacityText}>Available Now</Text></View>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {modalVisible && (
                <View style={[styles.modalOverlay, { zIndex: 999 }]}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filters</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={24} color={COLORS.textDark} /></TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            <View style={styles.sidebar}>
                                {DETAILED_FILTERS.map(filter => (
                                    <TouchableOpacity key={filter.id} style={[styles.sidebarItem, activeFilterTab === filter.id && styles.activeSidebarItem]} onPress={() => setActiveFilterTab(filter.id)}>
                                        <Text style={[styles.sidebarText, activeFilterTab === filter.id && styles.activeSidebarText]}>{filter.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <ScrollView style={styles.optionsArea}>
                                {DETAILED_FILTERS.find(f => f.id === activeFilterTab)?.options.map(option => {
                                    const isSelected = selectedFilters[activeFilterTab].includes(option);
                                    return (
                                        <TouchableOpacity key={option} style={styles.optionItem} onPress={() => toggleFilterOption(activeFilterTab, option)}>
                                            <Ionicons name={isSelected ? 'checkbox' : 'square-outline'} size={20} color={isSelected ? COLORS.kumkum : '#888'} />
                                            <Text style={[styles.optionText, isSelected && styles.activeOptionText]}>{option}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                        <View style={styles.modalFooter}>
                            <TouchableOpacity onPress={clearFilters}><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFE4' },
    scrollContent: { paddingBottom: 100 },
    heroContainer: { height: 550, marginBottom: 20, position: 'relative', overflow: 'hidden' },
    heroVideo: { width: '100%', height: '100%' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
    headerIconsRow: { position: 'absolute', left: 20, zIndex: 30 },
    backBtnWrapper: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    heroContent: { position: 'absolute', bottom: 100, left: 25, right: 25, zIndex: 10 },
    heroHeadline: { color: '#fff', fontSize: 28, fontWeight: '800', lineHeight: 36, marginBottom: 10 },
    heroSubtext: { color: '#eee', fontSize: 13, fontWeight: '500', marginBottom: 25 },
    heroCTA: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.kumkum, alignSelf: 'flex-start', paddingVertical: 14, paddingHorizontal: 35, borderRadius: 30, elevation: 4 },
    heroCTAText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
    trustStrip: { position: 'absolute', bottom: -25, alignSelf: 'center', width: width * 0.92, backgroundColor: '#fff', borderRadius: 15, flexDirection: 'row', paddingVertical: 15, elevation: 8, zIndex: 40 },
    trustItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    trustIconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFF8E1', alignItems: 'center', justifyContent: 'center', marginBottom: 6, borderWidth: 1, borderColor: '#FFD700' },
    trustText: { fontSize: 10, fontWeight: '700', color: '#333' },
    sectionContainer: { marginTop: 30, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textRed, marginBottom: 10 },
    horizontalScroll: { paddingRight: 20 },
    featuredCard: { width: 140, height: 180, marginRight: 15 },
    featuredImage: { width: '100%', height: '100%', justifyContent: 'flex-end' },
    featuredOverlay: { padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
    featuredName: { color: '#fff', fontWeight: 'bold' },
    vibeScroll: { paddingRight: 20 },
    vibeItem: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#f29502', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    activeVibeItem: { backgroundColor: '#FFF8E1' },
    vibeText: { fontSize: 11, color: COLORS.textRed, marginTop: 5, fontWeight: '700', textAlign: 'center' },
    cardContainer: { marginBottom: 20, borderRadius: 20, overflow: 'hidden', height: 350, borderWidth: 1.5, borderColor: '#FFD700' },
    cardImage: { width: '100%', height: '100%' },
    ratingBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: '#F29502', width: 35, height: 35, borderRadius: 17.5, alignItems: 'center', justifyContent: 'center' },
    ratingText: { color: '#fff', fontWeight: 'bold' },
    heartBtn: { position: 'absolute', top: 15, right: 15, backgroundColor: '#fff', width: 35, height: 35, borderRadius: 17.5, alignItems: 'center', justifyContent: 'center' },
    floatingContent: { position: 'absolute', bottom: 15, left: 15, right: 15, backgroundColor: '#fff', borderRadius: 15, padding: 12, borderWidth: 1, borderColor: '#FFD700' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textRed },
    cardLocation: { fontSize: 12, color: '#F29502' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    cardPrice: { fontSize: 14, fontWeight: 'bold', color: COLORS.textRed },
    capacityBadge: { backgroundColor: '#FFF8E1', paddingHorizontal: 8, borderRadius: 10 },
    capacityText: { fontSize: 10, color: '#f29502' },
    modalOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContainer: { backgroundColor: '#fff', height: '65%', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    modalTitle: { fontWeight: 'bold', color: COLORS.textDark },
    modalBody: { flex: 1, flexDirection: 'row' },
    sidebar: { width: '30%', backgroundColor: '#f5f5f5' },
    sidebarItem: { padding: 15 },
    activeSidebarItem: { backgroundColor: '#fff' },
    sidebarText: { fontSize: 12, color: '#666' },
    activeSidebarText: { color: COLORS.kumkum, fontWeight: 'bold' },
    optionsArea: { flex: 1, padding: 15 },
    optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    optionText: { marginLeft: 10, color: '#444' },
    activeOptionText: { color: COLORS.kumkum, fontWeight: 'bold' },
    modalFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
    applyButton: { backgroundColor: COLORS.kumkum, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 },
    applyText: { color: '#fff', fontWeight: 'bold' },
    clearText: { color: '#666', fontWeight: '500' }
});

export default JewelleryScreen;
