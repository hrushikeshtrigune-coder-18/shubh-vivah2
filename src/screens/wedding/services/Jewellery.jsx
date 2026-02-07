import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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
    View,
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

const jewelleryData = [
    {
        id: '1',
        name: 'Royal Kundan Set',
        location: 'Jaipur, RJ',
        rating: '4.8',
        guests: 'Bridal Set', // Reusing 'guests' field concept for Type/Category
        price: '₹ 1.5L',
        image: { uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' },
    },
    {
        id: '2',
        name: 'Diamond Choker',
        location: 'Mumbai, MH',
        rating: '4.9',
        guests: 'Necklace',
        price: '₹ 2.25L',
        image: { uri: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop' },
    },
    {
        id: '3',
        name: 'Temple Gold Set',
        location: 'Chennai, TN',
        rating: '4.7',
        guests: 'Traditional',
        price: '₹ 3.0L',
        image: { uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' },
    },
    {
        id: '4',
        name: 'Polki Earrings',
        location: 'Hyderabad, TS',
        rating: '4.6',
        guests: 'Earrings',
        price: '₹ 75k',
        image: { uri: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop' },
    },
    {
        id: '5',
        name: 'Antique Bangles',
        location: 'Kolkata, WB',
        rating: '4.8',
        guests: 'Bangles',
        price: '₹ 1.2L',
        image: { uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' },
    },
];

const JewelleryScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [bookedItems, setBookedItems] = useState({});
    const [loadingId, setLoadingId] = useState(null);
    const [likedItems, setLikedItems] = useState({});

    const handleBookNow = (id) => {
        setLoadingId(id);
        setTimeout(() => {
            setBookedItems((prev) => {
                const isBooked = !!prev[id];
                const newState = { ...prev, [id]: !isBooked };
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                return newState;
            });
            setLoadingId(null);
            if (!bookedItems[id]) {
                Alert.alert("Success", "Item added to your booking list!");
            } else {
                Alert.alert("Info", "Item removed from booking list.");
            }
        }, 800);
    };

    const toggleLike = (id) => {
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.akshid} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bridal Jewellery</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {jewelleryData.map((item) => {
                    const isBooked = !!bookedItems[item.id];
                    const isLoading = loadingId === item.id;
                    const isLiked = !!likedItems[item.id];

                    return (
                        <View key={item.id} style={styles.cardContainer}>
                            <ImageBackground
                                source={item.image}
                                style={styles.cardImage}
                                imageStyle={{ borderRadius: 20 }}
                            >
                                {/* Top Badges */}
                                <View style={styles.topRow}>
                                    <View style={styles.ratingBadge}>
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.heartBtn}
                                        onPress={() => toggleLike(item.id)}
                                        activeOpacity={0.8}
                                    >
                                        <Ionicons
                                            name={isLiked ? "heart" : "heart-outline"}
                                            size={20}
                                            color={isLiked ? COLORS.textRed : COLORS.textDark}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* Bottom White Overlay */}
                                <View style={styles.bottomOverlay}>
                                    <View style={styles.textColumn}>
                                        <Text style={styles.cardTitle}>{item.name}</Text>
                                        <Text style={styles.cardLocation}>{item.location}</Text>

                                        <View style={styles.priceRow}>
                                            <Text style={styles.cardPrice}>{item.price}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.actionColumn}>
                                        <View style={styles.guestBadge}>
                                            <Text style={styles.guestText}>{item.guests}</Text>
                                        </View>

                                        <TouchableOpacity
                                            style={[
                                                styles.bookButton,
                                                isBooked && styles.bookedButton,
                                                isLoading && styles.loadingButton
                                            ]}
                                            onPress={() => handleBookNow(item.id)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text style={styles.bookButtonText}>
                                                    {isBooked ? 'Booked' : 'Book'}
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    );
                })}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.akshid, // Keeping consistency with the theme
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.akshid,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        fontFamily: 'serif',
    },
    scrollContent: {
        padding: 20,
        paddingTop: 10,
    },
    cardContainer: {
        marginBottom: 25,
        borderRadius: 20,
        backgroundColor: 'transparent',
        shadowColor: '#000', // Shadow for the whole card
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 350, // Tall card
        justifyContent: 'space-between', // Push content to top and bottom
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    ratingBadge: {
        backgroundColor: '#F29502', // Orange/Gold
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    heartBtn: {
        backgroundColor: '#fff',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomOverlay: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 20,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textColumn: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textRed,
        marginBottom: 4,
    },
    cardLocation: {
        fontSize: 13,
        color: '#F29502',
        fontWeight: '600',
        marginBottom: 6,
    },
    priceRow: {
        marginTop: 5,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.kumkum,
    },
    actionColumn: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%',
        paddingLeft: 10,
    },
    guestBadge: {
        backgroundColor: '#FFF0E0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 10,
    },
    guestText: {
        fontSize: 11,
        color: '#F29502',
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: COLORS.kumkum,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
    },
    bookedButton: {
        backgroundColor: '#28a745',
    },
    loadingButton: {
        backgroundColor: '#cc0e0e99',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'bold',
    },
});

export default JewelleryScreen;
