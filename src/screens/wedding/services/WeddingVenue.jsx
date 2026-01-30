import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../../theme/colors';

const { width } = Dimensions.get('window');

const LOCATIONS = [
    { id: '1', name: 'Pune', image: 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?q=80&w=200&auto=format&fit=crop' },
    { id: '2', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1562283833-281b37494ce4?q=80&w=200&auto=format&fit=crop' },
    { id: '3', name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=200&auto=format&fit=crop' },
    { id: '4', name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=200&auto=format&fit=crop' },
    { id: '5', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-18bd27909ddb?q=80&w=200&auto=format&fit=crop' },
];

const PUNE_AREAS = [
    'All Areas',
    'Pimpri Chinchwad',
    'Chinchwad',
    'Pimpri',
    'Kothrud',
    'Aundh',
    'Baner'
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
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1587474260584-18bd27909ddb?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1519225463359-d743a56b4199?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1520483602335-3b3dd1c50d2e?q=80&w=800&auto=format&fit=crop',
    },
];

const WeddingVenue = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [selectedLocation, setSelectedLocation] = useState('Pune');
    const [selectedArea, setSelectedArea] = useState('All Areas');
    const [filteredVenues, setFilteredVenues] = useState([]);
    const [showAreaDropdown, setShowAreaDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let filtered = VENUES;

        // Filter by Location
        if (selectedLocation !== 'All') {
            filtered = filtered.filter(v => v.city === selectedLocation);
        }

        // Filter by Area (only for Pune)
        if (selectedLocation === 'Pune' && selectedArea !== 'All Areas') {
            filtered = filtered.filter(v => v.area === selectedArea);
        }

        // Filter by Search Query
        if (searchQuery) {
            filtered = filtered.filter(v =>
                v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredVenues(filtered);
    }, [selectedLocation, selectedArea, searchQuery]);

    const renderLocation = ({ item }) => {
        const isSelected = selectedLocation === item.name;
        return (
            <TouchableOpacity
                style={styles.locationContainer}
                onPress={() => {
                    setSelectedLocation(item.name);
                    setSelectedArea('All Areas'); // Reset area when location changes
                    setShowAreaDropdown(false);
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
                <Image source={{ uri: item.image }} style={styles.venueImage} />
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

                {/* Locations Horizontal List */}
                <View style={styles.locationsWrapper}>
                    <FlatList
                        data={LOCATIONS}
                        renderItem={renderLocation}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.locationsList}
                    />
                </View>

                {/* Search Bar & Area Dropdown (for Pune) */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#CC0E0E" />
                        <TextInput
                            placeholder="Search venues..."
                            style={styles.searchInput}
                            placeholderTextColor="#CC0E0E"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {selectedLocation === 'Pune' && (
                        <View style={styles.areaDropdownContainer}>
                            <TouchableOpacity
                                style={styles.areaDropdownButton}
                                onPress={() => setShowAreaDropdown(!showAreaDropdown)}
                            >
                                <Text style={styles.areaDropdownText} numberOfLines={1}>
                                    {selectedArea === 'All Areas' ? 'Area' : selectedArea}
                                </Text>
                                <Ionicons name={showAreaDropdown ? "chevron-up" : "chevron-down"} size={16} color="#CC0E0E" />
                            </TouchableOpacity>

                            {showAreaDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <ScrollView style={{ maxHeight: 200 }}>
                                        {PUNE_AREAS.map((area, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.dropdownItem}
                                                onPress={() => {
                                                    setSelectedArea(area);
                                                    setShowAreaDropdown(false);
                                                }}
                                            >
                                                <Text style={[
                                                    styles.dropdownItemText,
                                                    selectedArea === area && { color: '#CC0E0E', fontWeight: 'bold' }
                                                ]}>{area}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    )}
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
        backgroundColor: '#FFFFE4', // New Background
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20, // Reduced top padding
    },
    headerContainer: {
        paddingBottom: 10, // Reduced
        backgroundColor: '#FFFFE4', // Match Background
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10,
        zIndex: 100, // Important for dropdown visibility
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 5, // Reduced
    },
    backButton: {
        padding: 5,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#CC0E0E', // New Text Color
        fontFamily: 'serif',
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
        borderColor: '#F3D870',
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
        fontWeight: '700',
        color: '#CC0E0E',
    },
    locationImageSelected: {
        borderWidth: 3,
        borderColor: '#D32F2F',
        transform: [{ scale: 1.1 }]
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        zIndex: 200, // Higher than header container for dropdown
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 40,
        borderWidth: 1.5,
        borderColor: '#F3D870',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#CC0E0E',
    },
    areaDropdownContainer: {
        position: 'relative',
        zIndex: 300,
    },
    areaDropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        borderWidth: 1.5,
        borderColor: '#F3D870',
        borderRadius: 20,
        paddingHorizontal: 12,
        height: 40,
        minWidth: 100,
        maxWidth: 140,
    },
    areaDropdownText: {
        fontSize: 13,
        color: '#CC0E0E',
        fontWeight: 'bold',
        marginRight: 5,
        flex: 1,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 45,
        right: 0,
        width: 160,
        backgroundColor: '#FFF',
        borderRadius: 15,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        zIndex: 1000,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#333',
    },
    venueList: {
        padding: 20,
        paddingTop: 10,
        paddingBottom: 100, // Extra padding for scrolling
    },
    venueCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 24,
        overflow: 'visible',
        elevation: 12,
        shadowColor: '#5a4a15',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        borderWidth: 1.5,
        borderColor: '#CC0E0E',
        borderBottomWidth: 4,
        borderRightWidth: 2,
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
        backgroundColor: '#FFFFE4',
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
        color: '#CC0E0E',
        flex: 1,
        fontFamily: 'serif',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3D870',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        color: '#CC0E0E',
        marginLeft: 4,
        fontSize: 12,
        fontWeight: 'bold',
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
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F3D870',
        paddingTop: 10,
    },
    detailText: {
        fontSize: 13,
        color: '#CC0E0E',
        fontWeight: '500',
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
        borderColor: '#F3D870'
    },
    venueTypeText: {
        color: '#CC0E0E',
        fontWeight: 'bold',
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
    }
});

export default WeddingVenue;
