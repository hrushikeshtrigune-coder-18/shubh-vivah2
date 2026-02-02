import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../../theme/colors';



const venue1 = require('../../../../assets/images/venue1.jpg');
const venue2 = require('../../../../assets/images/venue2.jpg');
const venue3 = require('../../../../assets/images/venue3.jpg');
const venue4 = require('../../../../assets/images/venue4.jpg');
const venue5 = require('../../../../assets/images/venue5.jpg');
const venue6 = require('../../../../assets/images/venue6.jpg');
const venue7 = require('../../../../assets/images/venue7.jpg');
const venue8 = require('../../../../assets/images/venue8.jpg');

const COLORS = {
    background: '#FFFFF0',
    border: '#F29502',
    textMain: '#CC0E0E',
};

const LOCATIONS = [
    { id: '1', name: 'Pune', image: 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?q=80&w=200&auto=format&fit=crop' },
    { id: '2', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1562283833-281b37494ce4?q=80&w=200&auto=format&fit=crop' },
    { id: '3', name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=200&auto=format&fit=crop' },
    { id: '4', name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop' },
    { id: '5', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-18bd27909ddb?q=80&w=200&auto=format&fit=crop' },
    { id: '6', name: 'Udaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=200&auto=format&fit=crop' },
    { id: '7', name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596436889106-4e8932d8d388?q=80&w=200&auto=format&fit=crop' },
    { id: '8', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1549488391-7f8d68962803?q=80&w=200&auto=format&fit=crop' },
];


const VENUES = [
    // Pune Venues
    {
        id: '1',
        name: 'Royal Orchid Palace',
        location: 'Kothrud, Pune',
        city: 'Pune',
        area: 'Kothrud',
        type: 'Banquet',
        rating: 4.8,
        price: '₹2,50,000',
        guests: '500-1000',
        image: venue1,
    },
    {
        id: '4',
        name: 'Sunnys World Lawn',
        location: 'Baner, Pune',
        city: 'Pune',
        area: 'Baner',
        type: 'Lawn',
        rating: 4.5,
        price: '₹3,50,000',
        guests: '1000-2000',
        image: venue2,
    },
    {
        id: '8',
        name: 'PCMC Grand Hall',
        location: 'Pimpri Chinchwad, Pune',
        city: 'Pune',
        area: 'Pimpri Chinchwad',
        type: 'Banquet',
        rating: 4.2,
        price: '₹1,50,000',
        guests: '300-800',
        image: venue3,
    },
    {
        id: '9',
        name: 'Aundh Retreat',
        location: 'Aundh, Pune',
        city: 'Pune',
        area: 'Aundh',
        type: 'Lawn',
        rating: 4.6,
        price: '₹2,00,000',
        guests: '200-500',
        image: venue4,
    },

    // Mumbai Venues
    {
        id: '2',
        name: 'The Grand Hyatt',
        location: 'Mumbai, Maharashtra',
        city: 'Mumbai',
        type: 'Luxury',
        rating: 4.9,
        price: '₹5,00,000',
        guests: '1000+',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop',
    },

    // Jaipur Venues
    {
        id: '3',
        name: 'Umaid Bhawan Palace',
        location: 'Jaipur, Rajasthan',
        city: 'Jaipur',
        type: 'Royal',
        rating: 5.0,
        price: '₹15,00,000',
        guests: '500-2000',
        image: venue5,
    },
    {
        id: '5',
        name: 'Rambagh Palace',
        location: 'Jaipur, Rajasthan',
        city: 'Jaipur',
        type: 'Royal',
        rating: 5.0,
        price: '₹20,00,000',
        guests: '500+',
        image: venue6,
    },

    // Goa Venues
    {
        id: '6',
        name: 'Zuri White Sands',
        location: 'Goa, Beachside',
        city: 'Goa',
        type: 'Beach',
        rating: 4.7,
        price: '₹4,50,000',
        guests: '200-500',
        image: venue7,
    },
    {
        id: '7',
        name: 'Taj Exotica',
        location: 'Goa, Benaulim',
        city: 'Goa',
        type: 'Beach',
        rating: 4.9,
        price: '₹8,00,000',
        guests: '300-800',
        image: venue8,
    },
];

const WeddingVenue = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const locationListRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState('Pune');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Recommended');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Auto-scroll Locations
    // useEffect(() => {
    //     let scrollIndex = 0;
    //     const interval = setInterval(() => {
    //         if (locationListRef.current) {
    //             scrollIndex = (scrollIndex + 1) % LOCATIONS.length;
    //             locationListRef.current.scrollToIndex({
    //                 index: scrollIndex,
    //                 animated: true,
    //                 viewPosition: 0.5
    //             });
    //         }
    //     }, 2000); // Faster scrolling

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        let filtered = [...VENUES]; // Create a copy to sort

        // Filter by Location
        if (selectedLocation !== 'All') {
            filtered = filtered.filter(v => v.city === selectedLocation);
        }


        // Filter by Search Query
        if (searchQuery) {
            filtered = filtered.filter(v =>
                v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort Logic
        const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);

        switch (sortBy) {
            case 'Price: Low to High':
                filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
                break;
            case 'Price: High to Low':
                filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
                break;
            case 'Rating: Low to High':
                filtered.sort((a, b) => a.rating - b.rating);
                break;
            case 'Rating: High to Low':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Recommended (Default order or logic)
                break;
        }

        setFilteredVenues(filtered);
    }, [selectedLocation, searchQuery, sortBy]);

    const renderLocation = ({ item }) => {
        const isSelected = selectedLocation === item.name;
        return (
            <TouchableOpacity
                style={styles.locationContainer}
                onPress={() => {
                    setSelectedLocation(item.name);
                }}
            >
                <View style={[
                    styles.locationImageWrapper,
                    isSelected && styles.locationImageSelected
                ]}>
                    <Image source={{ uri: item.image }} style={styles.locationImage} />
                </View>
                <Text style={[
                    styles.locationText,
                    isSelected && { color: '#D32F2F', fontWeight: 'bold' }
                ]}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderVenue = ({ item, index }) => {
        const inputRange = [
            -1,
            0,
            (index * 260), // Adjusted for card height without previous work
            (index + 2) * 260
        ];

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.95]
        });

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0.5],
        });

        const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 0, -10]
        });

        return (
            <Animated.View style={[
                styles.venueCard,
                {
                    transform: [{ scale }, { translateY }],
                    opacity
                }
            ]}>
                <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.venueImage}
                />
                <View style={styles.venueTypeBadge}>
                    <Text style={styles.venueTypeText}>{item.type}</Text>
                </View>

                <View style={styles.venueInfo}>
                    <View style={styles.venueHeader}>
                        <Text style={styles.venueName}>{item.name}</Text>
                        <View style={styles.ratingBadge}>
                            <Ionicons name="star" size={12} color="#FFF" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <Ionicons name="location-outline" size={16} color={colors.haldi} />
                        <Text style={styles.venueLocation}>{item.location}</Text>
                    </View>

                    <View style={styles.detailsRow}>
                        <Text style={styles.detailText}>👥 {item.guests} Pax</Text>
                        <Text style={styles.detailText}>Starting {item.price}</Text>
                    </View>
                </View>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header / Search Section */}
            <View style={styles.headerContainer}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#CC0E0E" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitle}>Wedding Venues</Text>
                    <View style={{ width: 24 }} />
                </View>


                {/* Search Bar & Sort - Moved above locations */}
                <View style={[styles.searchRow, { marginBottom: 15 }]}>
                    {/* Sort Button (Left) */}
                    <View style={styles.sortContainer}>
                        <TouchableOpacity
                            style={styles.sortButton}
                            onPress={() => setShowSortDropdown(!showSortDropdown)}
                        >
                            <MaterialIcons name="sort" size={20} color="#CC0E0E" />
                        </TouchableOpacity>

                        {showSortDropdown && (
                            <View style={styles.sortDropdown}>
                                {['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating: Low to High', 'Rating: High to Low'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setSortBy(option);
                                            setShowSortDropdown(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.dropdownItemText,
                                            sortBy === option && { color: '#CC0E0E', fontWeight: 'bold' }
                                        ]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Search Input */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={18} color="#CC0E0E" />
                        <TextInput
                            placeholder="Search venues..."
                            style={styles.searchInput}
                            placeholderTextColor="#CC0E0E"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Locations Horizontal List */}
                <View style={styles.locationsWrapper}>
                    <FlatList
                        ref={locationListRef}
                        data={LOCATIONS}
                        renderItem={renderLocation}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.locationsList}
                    />
                </View>

            </View>

            {/* Venue List */}
            <Animated.FlatList
                data={filteredVenues}
                renderItem={renderVenue}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.venueList}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No venues found for this selection.</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // FFFFF0
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20,
    },
    headerContainer: {
        paddingBottom: 10,
        backgroundColor: COLORS.background,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
        zIndex: 100,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    backButton: {
        padding: 5,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textMain,
        fontFamily: 'Poppins_700Bold',
    },
    locationsWrapper: {
        marginBottom: 15,
    },
    locationsList: {
        paddingHorizontal: 15,
    },
    locationContainer: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    locationImageWrapper: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.border,
        marginBottom: 8,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: '#FFF',
    },
    locationImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    locationText: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: COLORS.textMain,
    },
    locationImageSelected: {
        borderWidth: 3,
        borderColor: COLORS.textMain,
        transform: [{ scale: 1.1 }]
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 200,
    },
    sortContainer: {
        marginRight: 10,
        position: 'relative',
        zIndex: 300,
    },
    sortButton: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.border,
        elevation: 3,
    },
    sortDropdown: {
        position: 'absolute',
        top: 40,
        left: 0,
        width: 180,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingVertical: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownItemText: {
        fontSize: 13,
        color: '#333',
        fontFamily: 'Poppins_400Regular',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 35,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: COLORS.textMain,
        fontFamily: 'Poppins_400Regular',
    },
    venueList: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    venueCard: {
        backgroundColor: COLORS.background, // FFFFF0
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'visible',
        elevation: 12,
        shadowColor: '#5a4a15',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        borderWidth: 1.5,
        borderColor: COLORS.border, // F29502
    },
    venueImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    venueInfo: {
        padding: 15,
        backgroundColor: COLORS.background, // FFFFF0
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    venueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    venueName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        flex: 1,
        fontFamily: 'Poppins_700Bold',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.border,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        color: COLORS.textMain,
        marginLeft: 4,
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    venueLocation: {
        color: '#555',
        marginLeft: 5,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 10,
    },
    detailText: {
        fontSize: 13,
        color: COLORS.textMain,
        fontFamily: 'Poppins_500Medium',
    },
    venueTypeBadge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: 'rgba(255, 255, 228, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.border
    },
    venueTypeText: {
        color: COLORS.textMain,
        fontFamily: 'Poppins_700Bold',
        fontSize: 12
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#888',
        fontStyle: 'italic',
        fontFamily: 'Poppins_400Regular',
    }
});

export default WeddingVenue;
