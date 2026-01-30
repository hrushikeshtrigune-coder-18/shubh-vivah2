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

// Import local assets
// The file is at src/screens/wedding/services/photography.jsx
// Assets are at assets/images (from project root)
// Path to root: ../../../../
const photography1 = require('../../../../assets/images/photography1.jpg');
const ph2 = require('../../../../assets/images/ph2.jpg');
const ph3 = require('../../../../assets/images/ph3.jpg');

const { width } = Dimensions.get('window');

// Data for Photographers with multiple images for scrolling
const PHOTOGRAPHERS_DATA = [
    {
        id: '1',
        name: 'Gautam Khullar',
        rating: 4.9,
        location: 'Delhi',
        price: 150000,
        formattedPrice: '₹1,50,000 / day',
        images: [
            photography1, // User requested asset
            'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544161515-4ab6ce6db48e?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '2',
        name: 'Twogether Studios',
        rating: 4.8,
        location: 'Mumbai',
        price: 200000,
        formattedPrice: '₹2,00,000 / day',
        images: [
            ph2, // User requested asset
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '3',
        name: 'Stories by Joseph',
        rating: 5.0,
        location: 'Goa',
        price: 300000,
        formattedPrice: '₹3,00,000 / day',
        images: [
            ph3, // User requested asset
            'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=800&auto=format&fit=crop',
        ]
    },
    {
        id: '4',
        name: 'Folio Haus',
        rating: 4.7,
        location: 'Jaipur',
        price: 120000,
        formattedPrice: '₹1,20,000 / day',
        images: [
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544161515-4ab6ce6db48e?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=800&auto=format&fit=crop',
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

const Photography = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [photographers, setPhotographers] = useState(PHOTOGRAPHERS_DATA);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', null

    const handleSort = (order) => {
        let sorted = [...PHOTOGRAPHERS_DATA];
        if (order === 'asc') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (order === 'desc') {
            sorted.sort((a, b) => b.price - a.price);
        }
        setPhotographers(sorted);
        setSortOrder(order);
        setShowPriceDropdown(false);
    };

    const renderPhotographer = ({ item, index }) => {
        const inputRange = [
            -1,
            0,
            (index * 240), // Adjusted for card height
            (index + 2) * 240
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

        const getImageSource = (img) => {
            if (typeof img === 'string') return { uri: img };
            return img;
        };

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
                            source={getImageSource(img)}
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
                            placeholder="Search photographers..."
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Filters & Locations */}
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

                        <TouchableOpacity style={styles.filterChip}>
                            <Text style={styles.filterText}>Ratings</Text>
                        </TouchableOpacity>
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

            <Animated.FlatList
                data={photographers}
                renderItem={renderPhotographer}
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
        backgroundColor: '#FFFFE4', // Cream Background
    },
    navbarWrapper: {
        backgroundColor: 'rgba(255, 255, 228, 0.95)',
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
        height: 40,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    filterSection: {
        paddingHorizontal: 15,
        zIndex: 20, // To ensure dropdown appears above other elements if needed
    },
    filtersContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        flexWrap: 'wrap',
        zIndex: 30, // Higher index for dropdown
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
        fontWeight: '600',
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
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 25,
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
        fontSize: 10,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 15,
        paddingTop: 10,
        zIndex: 1,
    },
    card: {
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#FFF',
        elevation: 4,
        shadowColor: '#5a4a15',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#CC0E0E',
    },
    imageScrollContainer: {
        height: 180,
    },
    cardImage: {
        width: width - 32,
        height: 180,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
        backgroundColor: '#FFFFE4',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#CC0E0E',
        fontFamily: 'serif',
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
        fontWeight: 'bold',
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
    },
    priceText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: 'rgba(243, 216, 112, 0.3)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
});

export default Photography;
