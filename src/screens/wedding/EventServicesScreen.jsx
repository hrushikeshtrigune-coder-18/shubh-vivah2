import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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
        image: { uri: 'https://images.unsplash.com/photo-1540206395-688085723adb?q=80&w=2000&auto=format&fit=crop' },
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
                        blurRadius={20}
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
            id: 's1',
            title: 'Guest Management',
            subtitle: 'Hospitality & Logistics',
            image: { uri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop' },
            description: 'Seamless guest hospitality, logistics, and accommodation management.',
            features: ['RSVP Management', 'Transport Logistics'],
            icon: 'users'
        },
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
            title: 'Lighting & Stage',
            subtitle: 'Visual & Audio',
            image: { uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop' },
            description: 'Illuminate your events with spectacular lighting and stage setups.',
            features: ['LED Walls', 'Spotlights'],
            icon: 'lightbulb'
        },
        {
            id: 's6',
            title: 'Jewellery',
            subtitle: 'Bridal & Gold',
            image: { uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' },
            description: 'Exquisite bridal and wedding jewellery collections.',
            features: ['Gold & Diamond', 'Custom Designs'],
            icon: 'gem'
        },
        {
            id: 's7',
            title: 'Videography',
            subtitle: 'Cinematic Films',
            image: { uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
            description: 'Cinematic wedding films to cherish forever.',
            features: ['4K Films', 'Drone Shoots'],
            icon: 'video'
        },
        {
            id: 's8',
            title: 'Entertainment',
            subtitle: 'Music & Dance',
            image: require('../../../assets/images/entertenment.jpg'), // existing asset
            description: 'Live bands, DJs, and celebrity performances.',
            features: ['Live DJ', 'Dancers'],
            icon: 'music'
        },
        {
            id: 's9',
            title: 'Makeup Artists',
            subtitle: 'Bridal & Party',
            image: { uri: 'https://images.unsplash.com/photo-1487412947132-28a5d7071f8e?q=80&w=2070&auto=format&fit=crop' },
            description: 'Professional makeup artists for your special day to make you look stunning.',
            features: ['Bridal Makeup', 'Guest Makeup'],
            icon: 'brush'
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
    }, [ITEM_WIDTH, ITEM_HEIGHT, navigation]);

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
    });

    const onMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        setCurrentIndex(index);
        setIsUserScrolling(false); // Resume auto-scroll
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle="dark-content" backgroundColor="#FFFFE4" />

            {/* Dynamic Background */}
            <Backdrop scrollX={scrollX} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wedding Services</Text>
                <View style={{ zIndex: 100 }}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#A70002" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder="Find a service..."
                            value={searchText}
                            onChangeText={setSearchText}
                            placeholderTextColor="rgba(167, 0, 2, 0.6)" // Kumkum transparent
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            underlineColorAndroid="transparent"
                            selectionColor="#A70002"
                            cursorColor="#A70002"
                            autoCorrect={false} // Prevent suggestion box
                            spellCheck={false}
                            style={[
                                styles.searchInput,
                                { backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent' },
                                Platform.OS === 'web' && { outlineStyle: 'none' }
                            ]}
                        />
                    </View>

                    {/* Search Suggestions Dropdown - Glass Effect */}
                    {showSuggestions && (
                        <BlurView intensity={80} tint="light" style={styles.suggestionsDropdown}>
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
                        </BlurView>
                    )}
                </View>
            </View>

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
                                                if (s.id === '2') {
                                                    navigation.navigate('EventManagementScreen');
                                                } else if (s.id === 's6') {
                                                    navigation.navigate('JewelleryScreen');
                                                } else if (s.id === 's6') {
                                                    navigation.navigate('JewelleryScreen');
                                                } else if (s.id === 's9') {
                                                    navigation.navigate('MakeupScreen');
                                                } else {
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
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        zIndex: 100,
        backgroundColor: '#FFFFE0', // Light Ivory
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#A70002', // Maroon
        marginBottom: 20,
        fontFamily: 'serif',
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF', // White Background as per image
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 48,
        borderWidth: 1,
        borderColor: '#D4AF37', // Gold Border
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#A70002', // Kumkum Text
        fontWeight: '600',
    },
    // Matches the chips/pills glass effect requested
    suggestionsDropdown: {
        position: 'absolute',
        top: 60,
        left: 20,
        right: 20,
        borderRadius: 20,
        overflow: 'hidden',
        zIndex: 1000,
        padding: 15,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.4)', // Gold tint border for glass
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    suggestionChip: {
        backgroundColor: '#FFFFFF', // White Background
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D4AF37', // Gold Border
    },
    suggestionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#A70002', // Kumkum Text
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
