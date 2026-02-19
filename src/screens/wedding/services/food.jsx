import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    PanResponder,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Dummy Data
const CUISINES = [
    { id: '1', name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: 'Jain', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: 'Gujarati', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format&fit=crop' },
    { id: '5', name: 'Mughlai', image: 'https://images.unsplash.com/photo-1631515243349-e06051a09871?q=80&w=400&auto=format&fit=crop' },
    { id: '6', name: 'Continental', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f959?q=80&w=400&auto=format&fit=crop' },
    { id: '7', name: 'Italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=400&auto=format&fit=crop' },
    { id: '8', name: 'Live Counters', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400&auto=format&fit=crop' },
    { id: '9', name: 'Desserts & Chaat', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
];

const CATERERS_DATA = [
    {
        id: '1',
        name: 'Royal Feast Catering',
        rating: 4.8,
        reviews: 124,
        location: 'Pune, MH',
        priceVeg: 800,
        priceNonVeg: 1100,
        capacity: '300-1500 guests',
        specialties: ['Live Counters', 'Custom Menu', 'Jain Friendly'],
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
        accentColor: '#2b1a0e', // Deep earthy brown for rustic feast
    },
    {
        id: '2',
        name: 'Gourmet Delights',
        rating: 4.5,
        reviews: 89,
        location: 'Mumbai, MH',
        priceVeg: 1200,
        priceNonVeg: 1500,
        capacity: '500-2000 guests',
        specialties: ['Multi-Cuisine', 'Luxury Presentation'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
        accentColor: '#0a1024', // Midnight blue for refined gourmet
    },
    {
        id: '3',
        name: 'Spice Symphony',
        rating: 4.9,
        reviews: 210,
        location: 'Delhi, NCR',
        priceVeg: 1500,
        priceNonVeg: 1800,
        capacity: '200-1000 guests',
        specialties: ['Mughlai', 'North Indian', 'Live Chaat'],
        image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
        accentColor: '#421a10', // Deep ochre/red for rich Indian spices
    },
];

const TESTIMONIALS = [
    {
        id: '1',
        couple: 'Aditi & Rohan',
        initials: 'AR',
        event: 'Wedding Reception',
        caterer: 'Royal Feast Catering',
        quote: '“Our guests are still talking about the food! The live counters were a hit.”',
        image: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=600&auto=format&fit=crop',
        tags: ['300 Guests', 'Live Counters', 'Pune'],
    },
    {
        id: '2',
        couple: 'Priya & Vikram',
        initials: 'PV',
        event: 'Sangeet Night',
        caterer: 'Spice Symphony',
        quote: '“Absolutely delicious spread and impeccable service. Highly recommended!”',
        image: 'https://images.unsplash.com/photo-1583939003579-73013917c9dd?q=80&w=600&auto=format&fit=crop',
        tags: ['500 Guests', 'Multi-Cuisine', 'Mumbai'],
    },
];

const SwipeButton = ({ onSwipeComplete }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const buttonWidth = width - 70; // Adjusted for padding
    const knobWidth = 44;
    const swipeThreshold = buttonWidth - knobWidth - 10;

    const shimmerAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dx >= 0 && gestureState.dx <= swipeThreshold) {
                    pan.setValue({ x: gestureState.dx, y: 0 });
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx >= swipeThreshold - 20) {
                    Animated.timing(pan, {
                        toValue: { x: swipeThreshold, y: 0 },
                        duration: 100,
                        useNativeDriver: false,
                    }).start(() => {
                        onSwipeComplete();
                        setTimeout(() => pan.setValue({ x: 0, y: 0 }), 500);
                    });
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    React.useEffect(() => {
        const startShimmer = () => {
            shimmerAnim.setValue(0);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnim, {
                        toValue: 1,
                        duration: 3500,
                        useNativeDriver: true,
                    }),
                    Animated.delay(1000),
                ])
            ).start();
        };
        startShimmer();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-buttonWidth, buttonWidth],
    });

    return (
        <View style={styles.swipeContainer}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(0, 0, 0, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    }
                ]}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
            <Text style={styles.swipeText}>Book now</Text>
            <Animated.View
                style={[
                    styles.swipeKnob,
                    { transform: pan.getTranslateTransform() }
                ]}
                {...panResponder.panHandlers}
            >
                <Ionicons name="airplane" size={18} color="#FFF" />
            </Animated.View>
        </View>
    );
};

const Food = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    // Filter Logic
    const filteredCuisines = CUISINES.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCaterers = CATERERS_DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop' }}
                style={styles.heroImage}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                    style={styles.heroGradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>Delight Your Guests with Unforgettable Flavours 🍽️</Text>
                        <Text style={styles.heroSubtitle}>Wedding Catering • Live Counters • Custom Menus • Luxury Presentation</Text>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Search by cuisine, city, or budget…"
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>

            {/* Quick Highlights */}
            <View style={styles.highlightsContainer}>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="chef-hat" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>300+ Verified{'\n'}Caterers</Text>
                </View>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="silverware-clean" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>Multi-Cuisine{'\n'}Experts</Text>
                </View>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>Quality &{'\n'}Hygiene Assured</Text>
                </View>
            </View>


        </View>
    );

    const renderCuisines = () => {
        if (filteredCuisines.length === 0) return null;

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                    {searchQuery ? 'Matching Cuisines' : 'Explore by Cuisine'}
                </Text>
                <FlatList
                    data={filteredCuisines}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.cuisineCard}>
                            <Image source={{ uri: item.image }} style={styles.cuisineImage} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.cuisineGradient}
                            >
                                <Text style={styles.cuisineName}>{item.name}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    };

    const renderCatererCard = ({ item }) => (
        <TouchableOpacity
            style={styles.newCardContainer}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('FoodV')}
        >
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.newCardBackground}
                imageStyle={{ borderRadius: 30 }}
            >
                <View style={styles.topRightActions}>
                    <TouchableOpacity style={styles.bookmarkButton}>
                        <Ionicons name="bookmark-outline" size={18} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <LinearGradient
                    colors={[
                        'transparent',
                        `${item.accentColor}33`,
                        `${item.accentColor}99`,
                        `${item.accentColor}E6`,
                        item.accentColor
                    ]}
                    style={styles.newCardGradient}
                >
                    <View style={styles.cardContentWrapper}>
                        <View style={styles.newCardHeader}>
                            <Text style={styles.newCardTitle} numberOfLines={1}>{item.name}</Text>
                            <View style={styles.ratingBadge}>
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                        </View>

                        <View style={styles.newCardInfoRow}>
                            <View style={styles.locationContainer}>
                                <Ionicons name="location-sharp" size={14} color="#F29502" />
                                <Text style={styles.locationText}>{item.location}</Text>
                            </View>
                            <Text style={styles.priceText}>Veg ₹{item.priceVeg}</Text>
                        </View>

                        <SwipeButton onSwipeComplete={() => navigation.navigate('FoodV')} />
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );

    const renderTestimonials = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Real Weddings, Real Flavours</Text>
            <FlatList
                data={TESTIMONIALS}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.snapshotCard}>
                        {/* Background Quote Icon */}
                        <MaterialCommunityIcons name="format-quote-close" size={100} color="rgba(204, 14, 14, 0.05)" style={styles.bgQuoteIcon} />

                        <View style={styles.snapshotHeader}>
                            <Image source={{ uri: item.image }} style={styles.snapshotAvatar} />
                            <View>
                                <Text style={styles.snapshotCouple}>{item.couple}</Text>
                                <Text style={styles.snapshotEvent}>{item.event}</Text>
                            </View>
                        </View>

                        <Text style={styles.snapshotQuote}>{item.quote}</Text>

                        <View style={styles.snapshotTags}>
                            {item.tags.map((tag, idx) => (
                                <View key={idx} style={styles.snapshotTag}>
                                    <Text style={styles.snapshotTagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
        </View>
    );

    const renderInteractiveTools = () => (
        <View style={styles.toolsContainer}>
            <Text style={styles.sectionTitle}>Plan Your Feast Smarter</Text>
            <View style={styles.toolsGrid}>
                {/* Menu Planner - Dominant Card */}
                <TouchableOpacity
                    style={[styles.toolCard, styles.menuPlannerCard]}
                    onPress={() => {
                        setModalContent('Menu Planner feature coming soon!');
                        setModalVisible(true);
                    }}
                >
                    <View style={styles.mostUsedBadge}>
                        <Text style={styles.mostUsedText}>Most Used by Couples 💍</Text>
                    </View>
                    <View style={[styles.toolIcon, { backgroundColor: '#FFF3E0' }]}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#E65100" />
                    </View>
                    <Text style={styles.toolTitleLarge}>Menu Planner</Text>
                    <Text style={styles.toolDesc}>Curate your perfect spread with our smart tool</Text>
                </TouchableOpacity>

                {/* Budget Calculator - Smaller Card */}
                <TouchableOpacity
                    style={[styles.toolCard, styles.budgetCard]}
                    onPress={() => {
                        setModalContent('Budget Calculator feature coming soon!');
                        setModalVisible(true);
                    }}
                >
                    <View style={[styles.toolIcon, { backgroundColor: '#E0F7FA' }]}>
                        <MaterialCommunityIcons name="calculator" size={24} color="#006064" />
                    </View>
                    <Text style={styles.toolTitle}>Budget{'\n'}Calculator</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderHeader()}
                {renderCuisines()}

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        {searchQuery ? 'Matching Caterers' : 'Top Rated Caterers'}
                    </Text>
                    {filteredCaterers.length > 0 ? (
                        filteredCaterers.map(item => (
                            <View key={item.id}>
                                {renderCatererCard({ item })}
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', color: '#888', marginTop: 20, fontFamily: 'Outfit_400Regular' }}>
                            {searchQuery && filteredCuisines.length === 0 ? 'No caterers found matching your search.' : ''}
                        </Text>
                    )}
                </View>

                {searchQuery && filteredCuisines.length === 0 && filteredCaterers.length === 0 && (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <MaterialCommunityIcons name="food-off" size={64} color="#ccc" />
                        <Text style={{ marginTop: 10, color: '#888', fontFamily: 'Outfit_500Medium' }}>
                            No results found for "{searchQuery}"
                        </Text>
                    </View>
                )}

                {renderTestimonials()}
                {renderInteractiveTools()}

                {/* Emotional Storytelling */}
                <View style={styles.storyContainer}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.storyImage}
                        imageStyle={{ borderRadius: 20 }}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
                            style={styles.storyOverlay}
                        >
                            <Text style={styles.storyText}>“Because great food turns celebrations into lifelong memories.”</Text>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Modal for Tools */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalContent}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0', // Updated Background
    },
    headerContainer: {
        marginBottom: 20,
    },
    heroImage: {
        width: width,
        height: 400,
        justifyContent: 'flex-end',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 40,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    heroContent: {
        marginTop: 60,
    },
    heroTitle: {
        fontFamily: 'Outfit_700Bold', // Ensuring it is Outfit_700Bold
        fontSize: 28,
        color: '#FFF',
        marginBottom: 10,
        lineHeight: 36,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: '#FFEB3B', // Updated to Bright Yellow
        marginBottom: 20,
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#CC0E0E',
    },
    highlightsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        marginTop: -30,
        marginHorizontal: 15,
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    highlightItem: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    highlightText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11, // Increased from 10
        color: '#CC0E0E',
        textAlign: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 15,
        gap: 10,
    },
    tag: {
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    tagText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13, // Increased from 12
        color: '#F29502',
    },
    sectionContainer: {
        marginTop: 25,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#CC0E0E', // Ensuring it is Red
        marginBottom: 15,
    },
    cuisineCard: {
        marginRight: 15,
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502',
    },
    cuisineImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cuisineGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 8,
    },
    cuisineName: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
    },
    newCardContainer: {
        marginHorizontal: 15,
        marginBottom: 25,
        borderRadius: 30,
        backgroundColor: '#FFF',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    newCardBackground: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    topRightActions: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    bookmarkButton: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    newCardGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        padding: 24,
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    cardContentWrapper: {
        width: '100%',
    },
    newCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    newCardTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 24,
        color: '#FFF',
        flex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        gap: 4,
        marginTop: 2,
    },
    ratingText: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
    },
    newCardInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        color: '#F29502',
        fontFamily: 'Outfit_500Medium',
        fontSize: 14,
    },
    priceText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15,
    },
    swipeContainer: {
        height: 48,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 4,
        borderWidth: 0.8,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        marginTop: 5,
        overflow: 'hidden',
    },
    swipeKnob: {
        width: 38,
        height: 38,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    swipeText: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.9,
    },
    snapshotCard: {
        width: width - 60,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#F29502',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    bgQuoteIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    snapshotHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    snapshotAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#F29502',
    },
    snapshotCouple: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
    },
    snapshotEvent: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#666',
    },
    snapshotQuote: {
        fontFamily: 'Outfit_400Regular', // Normal weight for readability
        fontSize: 15,
        fontStyle: 'italic',
        color: '#444',
        marginBottom: 15,
        lineHeight: 24,
    },
    snapshotTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    snapshotTag: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    snapshotTagText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11,
        color: '#E65100',
    },

    // Tools Section
    toolsContainer: {
        paddingHorizontal: 15,
        marginTop: 30,
    },
    toolsGrid: {
        flexDirection: 'row',
        gap: 15,
    },
    toolCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuPlannerCard: {
        flex: 2, // Larger card
        backgroundColor: '#FFF',
        paddingTop: 25, // Space for badge
    },
    budgetCard: {
        flex: 1, // Smaller card
    },
    mostUsedBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#CC0E0E',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    mostUsedText: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 9,
        color: '#FFF',
    },
    toolIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    toolTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#CC0E0E',
        textAlign: 'center',
    },
    toolTitleLarge: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
        textAlign: 'center',
        marginBottom: 4,
    },
    toolDesc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 11,
        color: '#888',
        textAlign: 'center',
        marginTop: 5,
    },

    // Story Section
    storyContainer: {
        margin: 15,
        marginTop: 30,
        borderRadius: 20,
        overflow: 'hidden',
        height: 180, // Reduced from 250
        borderWidth: 1,
        borderColor: '#F29502',
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    storyOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    storyText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16, // Slightly reduced
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFF0', // Updated Background
        padding: 25,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        elevation: 10,
        borderWidth: 1,
        borderColor: '#F29502', // Accent Border
    },
    modalText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 16,
        color: '#CC0E0E', // Main Text Color
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#CC0E0E', // Main Color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    modalButtonText: {
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFF',
        fontSize: 14,
    },
});

export default Food;