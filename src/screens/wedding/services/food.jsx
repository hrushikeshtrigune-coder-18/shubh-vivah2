import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const food1 = require('../../../../assets/images/food1.jpg');
const food2 = require('../../../../assets/images/food2.jpg');
const food3 = require('../../../../assets/images/food3.jpg');
const food4 = require('../../../../assets/images/food4.jpg');

// Dummy Data for Caterers
const CATERERS_DATA = [
    {
        id: '1',
        name: 'Royal Feast Catering',
        rating: 4.8,
        location: 'Pune',
        price: 800,
        formattedPrice: 'Starting from ₹800 / plate',
        images: [
            food1,
            'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '2',
        name: 'Gourmet Delights',
        rating: 4.5,
        location: 'Mumbai',
        price: 1200,
        formattedPrice: 'Starting from ₹1,200 / plate',
        images: [
            food2,
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '3',
        name: 'Spice Symphony',
        rating: 4.9,
        location: 'Delhi',
        price: 1500,
        formattedPrice: 'Starting from ₹1,500 / plate',
        images: [
            food3,
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '4',
        name: 'Saffron Spices',
        rating: 4.6,
        location: 'Jaipur',
        price: 950,
        formattedPrice: 'Starting from ₹950 / plate',
        images: [
            food4,
            'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=800&auto=format&fit=crop',
        ]
    },
];

const LOCATIONS = [
    { id: '1', name: 'Delhi', short: 'DEL', image: 'https://images.unsplash.com/photo-1587474260584-136574528615?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: 'Mumbai', short: 'MUM', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: 'Goa', short: 'GOA', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: 'Jaipur', short: 'JAI', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=400&auto=format&fit=crop' },
    { id: '5', name: 'Pune', short: 'PUN', image: 'https://images.unsplash.com/photo-1605218427368-35b84260e0d0?q=80&w=400&auto=format&fit=crop' },
];

const Food = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [caterers, setCaterers] = useState(CATERERS_DATA);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showRatingDropdown, setShowRatingDropdown] = useState(false);
    const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', null (Price)
    const [ratingSortOrder, setRatingSortOrder] = useState(null); // 'asc', 'desc', null (Rating)

    const handleSort = (order) => {
        let sorted = [...caterers];
        if (order === 'asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (order === 'desc') {
            sorted.sort((a, b) => b.price - a.price);
        }
        setCaterers(sorted);
        setSortOrder(order);
        setShowPriceDropdown(false);
        setRatingSortOrder(null); // Reset rating sort
    };

    const handleRatingSort = (order) => {
        let sorted = [...caterers];
        if (order === 'asc') {
            sorted.sort((a, b) => a.rating - b.rating);
        } else if (order === 'desc') {
            sorted.sort((a, b) => b.rating - a.rating);
        }
        setCaterers(sorted);
        setRatingSortOrder(order);
        setShowRatingDropdown(false);
        setSortOrder(null); // Reset price sort
    };

    const renderCaterer = ({ item, index }) => {
        const inputRange = [
            -1,
            0,
            (index * 350), // Adjusted for increased card height
            (index + 2) * 350
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
                {/* Scrollable Images */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageScrollContainer}
                >
                    {item.images.map((img, imgIndex) => (
                        <Image
                            key={imgIndex}
                            source={typeof img === 'string' ? { uri: img } : img}
                            style={styles.cardImage}
                        />
                    ))}
                </ScrollView>

                <View style={styles.cardContent}>
                    <View style={styles.headerRow}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={12} color="#FFF" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsRow}>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-outline" size={14} color="#F3D870" />
                            <Text style={styles.locationText}>{item.location}</Text>
                        </View>
                        <Text style={styles.priceText}>{item.formattedPrice}</Text>
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
                        <Ionicons name="arrow-back" size={24} color="#CC0E0E" />
                    </TouchableOpacity>

                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
                        <TextInput
                            placeholder="Search caterers..."
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Filter Section */}
                <View style={styles.filterSection}>
                    <View style={styles.filtersContainer}>
                        <View style={{ position: 'relative', zIndex: 20 }}>
                            <TouchableOpacity
                                style={[styles.filterChip, sortOrder && styles.activeFilterChip]}
                                onPress={() => setShowPriceDropdown(!showPriceDropdown)}
                            >
                                <Text style={[styles.filterText, sortOrder && styles.activeFilterText]}>
                                    Price {sortOrder === 'asc' ? '(Low-High)' : sortOrder === 'desc' ? '(High-Low)' : ''}
                                </Text>
                                <Ionicons name={showPriceDropdown ? "chevron-up" : "chevron-down"} size={14} color={sortOrder ? "#CC0E0E" : "#555"} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>

                            {showPriceDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort('asc')}>
                                        <Text style={styles.dropdownText}>Low to High</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort('desc')}>
                                        <Text style={styles.dropdownText}>High to Low</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort(null)}>
                                        <Text style={styles.dropdownText}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View style={{ position: 'relative', zIndex: 20 }}>
                            <TouchableOpacity
                                style={[styles.filterChip, ratingSortOrder && styles.activeFilterChip]}
                                onPress={() => setShowRatingDropdown(!showRatingDropdown)}
                            >
                                <Text style={[styles.filterText, ratingSortOrder && styles.activeFilterText]}>
                                    Ratings {ratingSortOrder === 'asc' ? '(Low-High)' : ratingSortOrder === 'desc' ? '(High-Low)' : ''}
                                </Text>
                                <Ionicons name={showRatingDropdown ? "chevron-up" : "chevron-down"} size={14} color={ratingSortOrder ? "#CC0E0E" : "#555"} style={{ marginLeft: 4 }} />
                            </TouchableOpacity>

                            {showRatingDropdown && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleRatingSort('asc')}>
                                        <Text style={styles.dropdownText}>Low to High</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleRatingSort('desc')}>
                                        <Text style={styles.dropdownText}>High to Low</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleRatingSort(null)}>
                                        <Text style={styles.dropdownText}>Reset</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.locationScroll}
                        contentContainerStyle={styles.locationContent}
                    >
                        {LOCATIONS.map((loc) => (
                            <TouchableOpacity key={loc.id} style={styles.locationCircleContainer}>
                                <ImageBackground
                                    source={{ uri: loc.image }}
                                    style={styles.locationCircle}
                                    imageStyle={{ borderRadius: 25 }}
                                >
                                    <View style={styles.locationOverlay}>
                                        <Text style={styles.locationCircleText}>{loc.short}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            {/* Caterers List */}
            <Animated.FlatList
                data={caterers}
                renderItem={renderCaterer}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    navbarWrapper: {
        backgroundColor: 'rgba(255, 255, 240, 0.95)',
        zIndex: 10,
        paddingTop: StatusBar.currentHeight + 35, // Consistent top margin
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
        marginBottom: 10,
    },
    backButton: {
        padding: 5,
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 35, // Reduced height
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Poppins_400Regular',
    },
    filterSection: {
        paddingHorizontal: 15,
        zIndex: 20,
    },
    filtersContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
        zIndex: 30,
    },
    filterChip: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#F3D870',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeFilterChip: {
        backgroundColor: '#FFFBE6',
        borderColor: '#CC0E0E',
    },
    filterText: {
        fontSize: 11,
        color: '#555',
        fontFamily: 'Poppins_600SemiBold',
    },
    activeFilterText: {
        color: '#CC0E0E',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 35,
        left: 0,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: 120,
        zIndex: 100,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    dropdownItem: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    dropdownText: {
        fontSize: 12,
        color: '#333',
        fontFamily: 'Poppins_400Regular',
    },
    locationScroll: {
        flexDirection: 'row',
        zIndex: 10,
    },
    locationContent: {
        alignItems: 'center',
        paddingVertical: 5,
    },
    locationCircleContainer: {
        marginRight: 10,
    },
    locationCircle: {
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 27.5,
        borderWidth: 1,
        borderColor: '#F3D870',
    },
    locationOverlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationCircleText: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
    },
    listContainer: {
        padding: 15,
        paddingTop: 10,
        zIndex: 1,
    },
    card: {
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#FFFFF0',
        elevation: 4,
        shadowColor: '#5a4a15',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502',
    },
    imageScrollContainer: {
        height: 250, // Increased height
    },
    cardImage: {
        width: width - 32,
        height: 250, // Increased height
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
        backgroundColor: '#FFFFF0',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        color: '#CC0E0E',
        fontFamily: 'Poppins_700Bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3D870',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingText: {
        color: '#CC0E0E',
        fontFamily: 'Poppins_700Bold',
        marginLeft: 3,
        fontSize: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 4,
        fontFamily: 'Poppins_400Regular',
    },
    priceText: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: '#333',
        backgroundColor: 'rgba(243, 216, 112, 0.3)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
});

export default Food;
