import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
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
            (index * 330), // Adjusted for card height (260 img + content)
            (index + 2) * 330
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

            {/* Header / Search Section */}
            <View style={styles.headerContainer}>
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#CC0E0E" />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.pageTitle}>Wedding Photographer</Text>
                    </View>
                    <View style={styles.backButtonPlaceholder} />
                </View>

                {/* Search Bar & Sort - Moved above locations */}
                <View style={[styles.searchRow, { marginBottom: 15 }]}>
                    {/* Filter Button (Left) - Replacing Chips */}
                    <View style={styles.sortContainer}>
                        <TouchableOpacity
                            style={styles.sortButton}
                            onPress={() => setShowPriceDropdown(!showPriceDropdown)}
                        >
                            <MaterialIcons name="sort" size={20} color="#CC0E0E" />
                        </TouchableOpacity>

                        {showPriceDropdown && (
                            <View style={styles.sortDropdown}>
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort('asc')}>
                                    <Text style={styles.dropdownText}>Price: Low to High</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort('desc')}>
                                    <Text style={styles.dropdownText}>Price: High to Low</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSort(null)}>
                                    <Text style={styles.dropdownText}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Search Input */}
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={18} color="#CC0E0E" />
                        <TextInput
                            placeholder="Search photographers..."
                            style={styles.searchInput}
                            placeholderTextColor="#CC0E0E"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Locations Horizontal List */}
                <View style={styles.locationsWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.locationsList}
                    >
                        {LOCATIONS.map((loc) => (
                            <TouchableOpacity key={loc.id} style={styles.headerLocationContainer}>
                                <View style={styles.locationImageWrapper}>
                                    <Image source={{ uri: loc.image }} style={styles.locationImage} />
                                </View>
                                <Text style={styles.locationTextLabel}>{loc.name}</Text>
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
        backgroundColor: '#FFFFF0', // Updated Background
    },
    headerContainer: {
        paddingBottom: 10,
        backgroundColor: '#FFFFF0',
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
        zIndex: 10,
    },
    backButtonPlaceholder: {
        width: 34,
        height: 34,
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#CC0E0E',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
    },
    locationsWrapper: {
        marginBottom: 15,
    },
    locationsList: {
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    headerLocationContainer: {
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
        marginBottom: 4, // Reduced from 8
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
    locationTextLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_700Bold',
        color: '#CC0E0E',
        textAlign: 'center',
        // Removed marginTop
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
        borderColor: '#F3D870',
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
        borderColor: '#F3D870',
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownText: {
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
        borderColor: '#F3D870',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#CC0E0E',
        fontFamily: 'Poppins_400Regular',
    },
    listContainer: {
        padding: 15,
        paddingTop: 10,
        zIndex: 1,
    },
    card: {
        marginBottom: 15,
        borderRadius: 15,
        backgroundColor: '#FFFFF0', // Matches page background
        elevation: 4,
        shadowColor: '#5a4a15',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502', // Updated Border Color
    },
    imageScrollContainer: {
        height: 260,
    },
    cardImage: {
        width: width - 32,
        height: 260,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
        backgroundColor: '#FFFFF0', // Matches page background
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    name: {
        fontSize: 16,
        color: '#CC0E0E', // Reverted to Red
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
        color: '#555', // Reverted to dark grey
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

export default Photography;
