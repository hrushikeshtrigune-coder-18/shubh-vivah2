import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// --- Colors ---
const COLORS = {
    primaryRed: '#D61C1C', // Red for buttons/headers
    textDark: '#2D2D2D',
    gold: '#F29502',
    background: '#FFFBE6', // Light cream
    white: '#FFFFFF',
    textGray: '#666666',
};

// --- Mock Data ---
const MOCK_ARTISTS = [
    {
        id: '1',
        name: 'Glamour by Gloria',
        location: 'Goa',
        rating: 4.9,
        reviews: 320,
        image: require('../../../../assets/Makeup/artist1.jpg'),
        price: '₹15,000 / function'
    },
    {
        id: '2',
        name: 'Divine Touch',
        location: 'Mumbai',
        rating: 4.8,
        reviews: 150,
        image: require('../../../../assets/Makeup/artist2.jpg'),
        price: '₹12,000 / function'
    },
    {
        id: '3',
        name: 'Stories by Joseph',
        location: 'Delhi',
        rating: 4.9,
        reviews: 210,
        image: require('../../../../assets/Makeup/artist3.jpg'),
        price: '₹20,000 / function'
    },
];

const MakeupPage = () => {
    const navigation = useNavigation();
    const scrollViewRef = useRef(null);

    const scrollToSection = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 400, animated: true });
        }
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Image
                source={require('../../../../assets/images/makeup.jpg')}
                style={styles.headerImage}
            />
            <View style={styles.overlay} />

            {/* Top Bar */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Header Content */}
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Because Some Moments Deserve to Live Forever</Text>

                <TouchableOpacity style={styles.ctaButton} onPress={scrollToSection}>
                    <Ionicons name="heart" size={18} color="#FFF" style={{ marginRight: 8 }} />
                    <Text style={styles.ctaText}>Find My Makeup Artist</Text>
                </TouchableOpacity>
            </View>

            {/* Floating Stats Card */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>500+</Text>
                    <Text style={styles.statLabel}>Verified Artists</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>4.8 ★</Text>
                    <Text style={styles.statLabel}>Average Rating</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>100%</Text>
                    <Text style={styles.statLabel}>Quality Guaranteed</Text>
                </View>
            </View>
        </View>
    );

    const renderArtistCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MakeupArtistsScreen')}>
            {/* Main Image Background */}
            <Image source={item.image} style={styles.cardImage} />

            {/* Top Right Heart Icon */}
            <TouchableOpacity style={styles.heartIcon}>
                <Ionicons name="heart-outline" size={20} color="#FFF" />
            </TouchableOpacity>

            {/* Bottom Gradient Overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.cardOverlay}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardLocation}>{item.location}</Text>

                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#F29502" />
                        <Text style={styles.ratingText}>{item.rating} (120 reviews)</Text>
                    </View>

                    <TouchableOpacity style={styles.seeMoreBtn} onPress={() => navigation.navigate('MakeupArtistsScreen')}>
                        <Text style={styles.seeMoreText}>View Portfolio</Text>
                        <View style={styles.arrowCircle}>
                            <Ionicons name="chevron-forward" size={16} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableOpacity >
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                {renderHeader()}

                <View style={styles.listContainer}>
                    <Text style={styles.sectionTitle}>Featured Makeup Artists</Text>

                    <FlatList
                        data={MOCK_ARTISTS}
                        renderItem={renderArtistCard}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    // Header Styles
    headerContainer: {
        height: 400,
        position: 'relative',
        marginBottom: 60,
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerContent: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        right: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 10,
        lineHeight: 34,
    },
    ctaButton: {
        backgroundColor: COLORS.primaryRed,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 25,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        width: '100%',
    },
    ctaText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Stats Card Styles
    statsCard: {
        position: 'absolute',
        bottom: -40,
        left: 20,
        right: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primaryRed,
    },
    statLabel: {
        fontSize: 10,
        color: COLORS.textGray,
        marginTop: 2,
    },
    verticalDivider: {
        width: 1,
        backgroundColor: '#EEE',
        height: '80%',
        alignSelf: 'center',
    },
    // List Styles
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primaryRed,
        marginBottom: 20,
    },
    // Updated Card Styles
    card: {
        height: 420, // Taller card to display full image
        borderRadius: 25,
        marginBottom: 25,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#000', // Dark bg for loading
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heartIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent glass
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingTop: 60,
        justifyContent: 'flex-end',
    },
    cardContent: {
        width: '100%',
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
        fontFamily: 'serif',
    },
    cardLocation: {
        fontSize: 14,
        color: '#EEE',
        fontWeight: '500',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingText: {
        color: '#EEE',
        fontSize: 12,
        marginLeft: 6,
    },
    seeMoreBtn: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent glass effect
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    seeMoreText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        flex: 1, // To center text accounting for the icon
        marginLeft: 30, // Offset for the icon on the right
    },
    arrowCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MakeupPage;
