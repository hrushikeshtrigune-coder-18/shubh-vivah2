import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    LayoutAnimation,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const honeymoon1 = require('../../../../assets/images/honeymoon1.jpg');
const honeymoon2 = require('../../../../assets/images/honeymoon2.jpg');
const honeymoon3 = require('../../../../assets/images/honeymoon3.jpg');

const COLORS = {
    background: '#FFFFF0',
    mainText: '#CC0E0E',
    subText: '#F29502',
};

const PACKAGES_DATA = [
    {
        id: '1',
        title: 'Bali',
        duration: '6 NIGHTS 7 DAYS',
        image: honeymoon1,
        inclusions: [
            'Stay',
            'Meals',
            'Sightseeing & Activities',
            'Local Transport',
            'Trip Assistance',
            'Flights',
        ],
        itinerary: 'Explore the beaches of Kuta, cultural heart of Ubud, and the stunning temples of Uluwatu. Includes sunset dinner cruise and water sports.',
        price: 'Starting from ₹45,000 / person',
    },
    {
        id: '2',
        title: 'Maldives',
        duration: '4 NIGHTS 5 DAYS',
        image: { uri: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop' },
        inclusions: [
            'Stay',
            'Meals',
            'Speedboat',
            'Snorkeling',
            'Flights',
        ],
        itinerary: 'Relax in a water villa, enjoy candlelight dinners by the ocean, and experience world-class snorkeling.',
        price: 'Starting from ₹75,000 / person',
    },
    {
        id: '3',
        title: 'Paris',
        duration: '5 NIGHTS 6 DAYS',
        image: { uri: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop' },
        inclusions: [
            'Stay',
            'Breakfast',
            'Seine Cruise',
            'Eiffel Tower',
            'Flights',
        ],
        itinerary: 'Romantic walks by the Seine, dinner at the Eiffel Tower, and a day trip to Versailles.',
        price: 'Starting from ₹1,20,000 / person',
    },
    {
        id: '4',
        title: 'Thailand',
        duration: '5 NIGHTS 6 DAYS',
        image: { uri: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' },
        inclusions: [
            'Stay',
            'Meals',
            'Island Tour',
            'Water Sports',
            'Flights',
        ],
        itinerary: 'Experience the nightlife of Bangkok and the pristine beaches of Phuket/Krabi.',
        price: 'Starting from ₹40,000 / person',
    },
    {
        id: '5',
        title: 'Vietnam',
        duration: '6 NIGHTS 7 DAYS',
        image: honeymoon2,
        inclusions: [
            'Stay',
            'Halong Bay Cruise',
            'Meals',
            'Transfers',
            'Flights',
        ],
        itinerary: 'Cruise through Halong Bay, explore Hanoi’s Old Quarter, and visit the lantern town of Hoi An.',
        price: 'Starting from ₹55,000 / person',
    },
    {
        id: '6',
        title: 'Turkey',
        duration: '7 NIGHTS 8 DAYS',
        image: honeymoon3,
        inclusions: [
            'Stay',
            'Cappadocia Balloon',
            'Meals',
            'Transfers',
            'Flights',
        ],
        itinerary: 'Hot air balloon over Cappadocia, historic tour of Istanbul, and thermal pools of Pamukkale.',
        price: 'Starting from ₹95,000 / person',
    },
];

const SUGGESTIONS = [
    { id: '1', name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: 'Thailand', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400&auto=format&fit=crop' },
    { id: '5', name: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127220161-1a1881fb3fc4?q=80&w=400&auto=format&fit=crop' },
    { id: '6', name: 'Turkey', image: 'https://images.unsplash.com/photo-1545167622-3a6ac156f427?q=80&w=400&auto=format&fit=crop' },
];

const Honeymoon = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItineraryId, setExpandedItineraryId] = useState(null);

    const toggleItinerary = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (expandedItineraryId === id) {
            setExpandedItineraryId(null);
        } else {
            setExpandedItineraryId(id);
        }
    };

    const renderPackage = ({ item, index }) => {
        const inputRange = [
            -1,
            0,
            (index * 400),
            (index + 2) * 400
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.95]
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.8],
        });

        const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 0, -10]
        });

        return (
            <Animated.View style={[
                styles.card,
                {
                    transform: [{ scale }, { translateY }],
                    opacity
                }
            ]}>
                <Image
                    source={item.image}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.durationContainer}>
                            <Ionicons name="time-outline" size={14} color={COLORS.background} />
                            <Text style={styles.durationText}>{item.duration}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionHeader}>Inclusions:</Text>
                    <View style={styles.inclusionsContainer}>
                        {item.inclusions.map((inc, idx) => (
                            <View key={idx} style={styles.inclusionBadge}>
                                <Ionicons name="checkmark-circle" size={12} color={COLORS.subText} />
                                <Text style={styles.inclusionText}>{inc}</Text>
                            </View>
                        ))}
                        <View style={styles.inclusionBadge}>
                            <Ionicons name="add-circle" size={12} color={COLORS.subText} />
                            <Text style={styles.inclusionText}>Additional</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => toggleItinerary(item.id)}>
                        <Text style={styles.sectionHeader}>Brief Itinerary {expandedItineraryId === item.id ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {expandedItineraryId === item.id && (
                        <Text style={styles.itineraryText}>{item.itinerary}</Text>
                    )}

                    <View style={styles.footerRow}>
                        <Text style={styles.priceText}>{item.price}</Text>
                        <TouchableOpacity style={styles.enquireButton} onPress={() => alert('Enquiry Sent!')}>
                            <Text style={styles.enquireButtonText}>Enquire Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Navbar & Search */}
            <View style={styles.navbarWrapper}>
                <View style={styles.navbar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={COLORS.mainText} />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={COLORS.subText} style={{ marginRight: 8 }} />
                        <TextInput
                            placeholder="Search destinations..."
                            placeholderTextColor={COLORS.subText}
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>
            </View>

            {/* Suggestions Scroll */}
            <View style={{ height: 100, marginBottom: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, alignItems: 'center' }}>
                    {SUGGESTIONS.map((sugg) => (
                        <TouchableOpacity key={sugg.id} style={{ marginRight: 15, alignItems: 'center' }}>
                            <ImageBackground
                                source={{ uri: sugg.image }}
                                style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.subText }}
                                imageStyle={{ borderRadius: 30 }}
                            >
                                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%' }} />
                            </ImageBackground>
                            <Text style={{ fontSize: 12, color: COLORS.mainText, marginTop: 5, fontFamily: 'Poppins_600SemiBold' }}>{sugg.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Animated.FlatList
                data={PACKAGES_DATA}
                renderItem={renderPackage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    navbarWrapper: {
        backgroundColor: 'rgba(255, 255, 240, 0.95)', // FFFFF0 with opacity
        zIndex: 10,
        paddingTop: StatusBar.currentHeight + 10,
        paddingBottom: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    backButton: {
        padding: 5,
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.subText,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.mainText,
    },
    listContainer: {
        padding: 15,
        paddingTop: 10,
    },
    card: {
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: COLORS.background, // FFFFF0
        borderWidth: 1,
        borderColor: '#F29502',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
    },
    cardImage: {
        width: width - 32,
        height: 220,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24, // Increased size
        fontWeight: 'bold',
        color: COLORS.mainText,
        fontFamily: 'Poppins_700Bold', // Changed to Poppins
        textTransform: 'uppercase',
    },
    durationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.mainText,
        paddingHorizontal: 8, // Reduced padding
        paddingVertical: 4,   // Reduced padding
        borderRadius: 20,
        elevation: 2,
    },
    durationText: {
        color: COLORS.background,
        fontSize: 10, // Reduced font size
        fontFamily: 'Poppins_700Bold', // Bold Poppins
        marginLeft: 4,
    },
    sectionHeader: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold', // Bold Poppins
        color: COLORS.mainText,
        marginBottom: 5,
        marginTop: 5,
    },
    inclusionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
    },
    inclusionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.subText,
    },
    inclusionText: {
        fontSize: 12, // Increased from 10
        color: COLORS.subText,
        marginLeft: 4,
        fontFamily: 'Poppins_500Medium', // Medium Poppins
    },
    itineraryText: {
        fontSize: 13,
        color: '#333', // Darker for readability
        lineHeight: 20,
        fontFamily: 'Poppins_400Regular', // Regular Poppins
        marginBottom: 15,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.background,
        paddingTop: 10,
    },
    priceText: {
        fontSize: 14,
        fontFamily: 'Poppins_700Bold',
        color: COLORS.mainText,
    },
    enquireButton: {
        backgroundColor: COLORS.mainText,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    enquireButtonText: {
        color: COLORS.background,
        fontFamily: 'Poppins_700Bold',
        fontSize: 12,
    },
});

export default Honeymoon;
