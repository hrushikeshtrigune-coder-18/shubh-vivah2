import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import Card from '../../components/Card/Card';



const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = height * 0.5;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const services = [
    {
        id: '1',
        title: 'E-Invites',
        subtitle: 'Digital & Animated',
        image: require('../../../assets/images/invite.jpg'),
        description: 'Eco-friendly and animated digital invitations to impress your guests instantly.',
        features: ['Video Invites', 'RSVP Tracking'],
        icon: 'envelope-open-text'
    },
    {
        id: '2',
        title: 'Event Management',
        subtitle: 'Planning & Execution',
        image: { uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop' },
        description: 'Flawless execution of your dream wedding with our expert planners.',
        features: ['Full Planning', 'Vendor Management'],
        icon: 'clipboard-list'
    },
    {
        id: '3',
        title: 'Wedding Venue',
        subtitle: 'Heritage & Luxury',
        image: require('../../../assets/images/decor.jpg'),
        description: 'Experience royalty with our curated selection of heritage palaces and luxury banquet halls.',
        features: ['500-2000 Pax', 'Royal Stay'],
        icon: 'archway'
    },
    {
        id: '4',
        title: 'Food & Catering',
        subtitle: 'Gourmet Feasts',
        image: require('../../../assets/images/Food.jpg'),
        description: 'Exquisite culinary experiences with multi-cuisine menus from top chefs.',
        features: ['Live Counters', 'Global Cuisine'],
        icon: 'utensils'
    },
    {
        id: '5',
        title: 'Photography',
        subtitle: 'Drone & Candid',
        image: require('../../../assets/images/photo.jpg'),
        description: 'Capture every emotion with our cinematic storytelling and expert drone shots.',
        features: ['4K Drone', 'Same Day Edit'],
        icon: 'camera'
    },
    {
        id: '6',
        title: 'Honeymoon Planning',
        subtitle: 'Romantic Getaways',
        image: require('../../../assets/images/honeymoon planning.jpg'),
        description: 'Romantic getaways to the world\'s most beautiful destinations.',
        features: ['Custom Packages', 'Luxury Stays'],
        icon: 'plane'
    }
];

// Backdrop Component
const Backdrop = ({ scrollX }) => {
    const { width, height } = useWindowDimensions();
    const ITEM_WIDTH = width * 0.75;

    return (
        <View style={{ position: 'absolute', width, height }}>
            {services.map((item, index) => {
                const inputRange = [
                    (index - 1) * ITEM_WIDTH,
                    index * ITEM_WIDTH,
                    (index + 1) * ITEM_WIDTH,
                ];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.Image
                        key={index}
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={{
                            width: width,
                            height: height,
                            position: 'absolute',
                            opacity,
                        }}
                        blurRadius={5}
                    />
                );
            })}
        </View>
    );
};

const EventServicesScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Search Suggestions Data
    const searchSuggestions = [

        {
            id: 's2',
            title: 'Decoration & Floral',
            subtitle: 'Styling & Ambience',
            image: require('../../../assets/images/decor.jpg'),
            description: 'Transform your venue with bespoke floral arrangements and immersive themes.',
            features: ['Theme Decor', 'Floral Styling'],
            icon: 'holly-berry'
        },
        {
            id: 's3',
            title: 'Return Gifts',
            subtitle: 'Favors & Hampers',
            image: { uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop' },
            description: 'Exclusive gift hampers and return favors to thank your guests.',
            features: ['Custom Packing', 'Eco-friendly'],
            icon: 'gift'
        },
        {
            id: 's4',
            title: 'Mehandi',
            subtitle: 'Art & Tradition',
            image: { uri: 'https://images.unsplash.com/photo-1615966650071-855a15507753?q=80&w=2000&auto=format&fit=crop' },
            description: 'Intricate henna designs and professional artists for your Mehandi ceremony.',
            features: ['Bridal Mehandi', 'Guest Packages'],
            icon: 'paint-brush'
        },
        {
            id: 's5',
            title: 'Bridal Makeup',
            subtitle: 'Professional Artists',
            image: require('../../../assets/images/makeup.jpg'),
            description: 'Get the perfect bridal look with our certified makeup artists.',
            features: ['HD Makeup', 'Trial Included'],
            icon: 'magic'
        },

        {
            id: 's6',
            title: 'Jewellery',
            subtitle: 'Bridal & Gold',
            image: require('../../../assets/images/Jewellery.jpg'),
            description: 'Exquisite bridal and wedding jewellery collections.',
            features: ['Gold & Diamond', 'Custom Designs'],
            icon: 'gem'
        },

        {
            id: 's8',
            title: 'Entertainment',
            subtitle: 'Music & Dance',
            image: require('../../../assets/images/entertenment.jpg'), // existing asset
            description: 'Live bands, DJs, and celebrity performances.',
            features: ['Live DJ', 'Dancers'],
            icon: 'music'
        }
    ];

    // Filter suggestions based on searchText
    // Logic: If text is empty, show specific default suggestions (Guest, Decor, Gifts, Mehandi).
    // If text is NOT empty, search across ALL suggestions (including Lighting, Jewellery, etc.).
    const defaultSuggestionIds = ['s1', 's2', 's3', 's4']; // IDs of default visible items

    const filteredSuggestions = searchText.trim() === ''
        ? searchSuggestions.filter(item => defaultSuggestionIds.includes(item.id))
        : searchSuggestions.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

    // Auto-scroll Carousel Logic
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isUserScrolling, setIsUserScrolling] = useState(false);

    useEffect(() => {
        if (isUserScrolling) return; // Pause if user is scrolling

        const interval = setInterval(() => {
            if (services.length > 0) {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= services.length) {
                    nextIndex = 0;
                }
                setCurrentIndex(nextIndex);
                flatListRef.current?.scrollToOffset({
                    offset: nextIndex * ITEM_WIDTH,
                    animated: true
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, isUserScrolling]);

    const renderItem = React.useCallback(({ item, index }) => {
        return (
            <Card
                item={item}
                index={index}
                scrollX={scrollX}
                itemWidth={ITEM_WIDTH}
                itemHeight={ITEM_HEIGHT}
                onPress={() => {
                    if (item.id === '1') {
                        navigation.navigate('EInviteScreen');
                    } else {
                        setSelectedService(item);
                    }
                }}
            />
        );
    }, [ITEM_WIDTH, ITEM_HEIGHT]);

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
    });

    const onMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
        setIsUserScrolling(false); // Resume auto-scroll
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle="dark-content" backgroundColor="#FFFFE4" />

            {/* Dynamic Background */}
            <Backdrop scrollX={scrollX} />

            {/* Hero Image Header */}
            <View style={styles.heroContainer}>
                <Image
                    source={require('../../../assets/images/venue1.jpg')} // Using venue1 for a grand look (Palace/Decor)
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                    style={styles.heroGradient}
                >
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>Wedding Services</Text>
                        <Text style={styles.heroSubtitle}>Find decorators, florists, and more...</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.searchBar}>
                                <Ionicons name="search" size={20} color="#CC0E0E" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Search for services..."
                                    value={searchText}
                                    onChangeText={setSearchText}
                                    placeholderTextColor="#666"
                                    onFocus={() => setShowSuggestions(true)}
                                    // onBlur handled by touchable overlay if needed
                                    underlineColorAndroid="transparent"
                                    style={styles.searchInput}
                                />
                                {searchText.length > 0 && (
                                    <TouchableOpacity onPress={() => setSearchText('')}>
                                        <Ionicons name="close-circle" size={20} color="#CC0E0E" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Search Suggestions (Absolute on top) */}
            {showSuggestions && (
                <View style={[styles.suggestionsDropdown, { top: 280 }]}>
                    <View style={styles.chipsContainer}>
                        {filteredSuggestions.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.suggestionChip}
                                onPress={() => {
                                    setSelectedService(item);
                                    setShowSuggestions(false);
                                    setSearchText(item.title);
                                }}
                            >
                                <Text style={styles.suggestionText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 10, padding: 5 }}
                        onPress={() => setShowSuggestions(false)}
                    >
                        <Text style={{ color: '#666', fontSize: 12 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 20, zIndex: 1 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_WIDTH}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingHorizontal: EMPTY_ITEM_SIZE
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    onScrollBeginDrag={() => setIsUserScrolling(true)}
                    onScrollEndDrag={() => setIsUserScrolling(false)}
                    getItemLayout={getItemLayout}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={selectedService !== null}
                onRequestClose={() => setSelectedService(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalCard, { maxHeight: '80%', width: '90%' }]}>
                        {selectedService && (
                            <View style={{ flexShrink: 1 }}>
                                <ScrollView bounces={false} contentContainerStyle={{ flexGrow: 1 }}>
                                    <Image
                                        source={selectedService.image}
                                        style={styles.modalImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.modalContent}>
                                        <Text style={styles.modalTitle}>{selectedService.title}</Text>
                                        <Text style={styles.modalSub}>{selectedService.subtitle}</Text>
                                        <View style={styles.divider} />

                                        <Text style={styles.modalDesc}>{selectedService.description}</Text>

                                        <View style={styles.modalFeatures}>
                                            {selectedService.features.map((feature, idx) => (
                                                <View key={idx} style={styles.modalBadge}>
                                                    <Text style={styles.modalBadgeText}>{feature}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        <TouchableOpacity
                                            style={styles.modalCta}
                                            onPress={() => {
                                                const s = selectedService;
                                                setSelectedService(null);

                                                // Special case for Search Suggestions
                                                if (s.title === 'Decoration & Floral') {
                                                    navigation.navigate('DecorationFloral');
                                                    return;
                                                }

                                                // Conditional Navigation based on Service ID
                                                switch (s.id) {
                                                    case 's5': // Bridal Makeup
                                                        // navigation.navigate('BridalMakeup');
                                                        break;
                                                    case 's4': // Mehandi
                                                        navigation.navigate('MehandiScreen');
                                                        break;
                                                    case '2': // Event Management
                                                        navigation.navigate('EventManagementScreen');
                                                        break;
                                                    case '3': // Wedding Venue
                                                        navigation.navigate('WeddingVenue');
                                                        break;
                                                    case '4': // Food & Catering
                                                        navigation.navigate('Food');
                                                        break;
                                                    case '5': // Photography
                                                        navigation.navigate('Photography');
                                                        break;
                                                    case '6': // Honeymoon Planning
                                                        navigation.navigate('Honeymoon');
                                                        break;
                                                    default:
                                                        // Default: Vendor List (Gifts, etc.)
                                                        navigation.navigate('VendorListScreen', { serviceName: s.title, serviceId: s.id });
                                                }
                                            }}
                                        >
                                            <Text style={styles.modalCtaText}>Book Now</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                                <TouchableOpacity
                                    style={styles.closeBtn}
                                    onPress={() => setSelectedService(null)}
                                >
                                    <Ionicons name="close" size={24} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Ivory
    },
    heroContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
        marginBottom: -20, // Negative margin to overlap with list slightly if needed, or just 0
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        elevation: 10,
        zIndex: 100,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0, top: 0,
        justifyContent: 'flex-end',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    heroContent: {
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'serif',
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#E0E0E0',
        fontFamily: 'serif',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    searchContainer: {
        width: '100%',
        maxWidth: 400,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingHorizontal: 15,
        height: 50,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#333',
    },
    suggestionsDropdown: {
        position: 'absolute',
        left: 20,
        right: 20,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        elevation: 20,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    suggestionChip: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    suggestionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        width: '85%',
        backgroundColor: '#FFFFE4', // Ivory
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 20,
        borderWidth: 2,
        borderColor: '#F29502', // Gold
    },
    modalImage: {
        width: '100%',
        height: 150, // Reduced from 180
        // resizeMode: 'cover', // Moved to component prop
    },
    closeBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 6,
    },
    modalContent: {
        padding: 20, // Reduced from 25
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22, // Reduced from 24
        fontWeight: 'bold',
        color: '#A70002', // Maroon
        fontFamily: 'serif',
        textAlign: 'center',
        marginBottom: 5,
    },
    modalSub: {
        fontSize: 14,
        color: '#F29502', // Gold
        fontWeight: '600',
        marginBottom: 15,
        fontFamily: 'serif',
        display: 'none',
    },
    // Actually, looking at the image: Title is Red Serif. Desc is Yellow/Gold. 
    // I will adjust modalSub to be hidden or merged if the user wants EXACT match, 
    // but the reference image has "Food n Catering" (Title) and then "Multi-cuisine..." (Desc). 
    // There is no subtitle "Gourmet Feasts" visible in the reference.
    // I will set modalSub display to none to match the clean Title + Desc look.

    modalDesc: {
        fontSize: 14,
        color: '#D4AF37', // Gold (per reference image style of golden desc)
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
        fontWeight: '500',
        fontFamily: 'serif',
        marginBottom: 10, // Reduced margin
        fontSize: 13, // Slightly reduced font size
    },
    modalFeatures: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
        justifyContent: 'center', // Center features
        display: 'none', // Reference image doesn't show feature chips, just text. Hiding for exact match.
    },
    modalCta: {
        marginTop: 5,
        backgroundColor: '#A70002', // Maroon
        paddingVertical: 12, // Reduced from 14
        paddingHorizontal: 30, // Reduced from 40
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        elevation: 3,
    },
    modalCtaText: {
        color: '#FFF', // Ivory
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
});

export default EventServicesScreen;