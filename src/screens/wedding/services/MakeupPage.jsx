import React, { useState } from 'react';
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

                <TouchableOpacity style={styles.ctaButton}>
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
        <View style={styles.card}>
            {/* Main Image Background */}
            <Image source={item.image} style={styles.cardImage} />

            {/* Top Badges */}
            <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
            <TouchableOpacity style={styles.heartIcon}>
                <Ionicons name="heart-outline" size={20} color="#D61C1C" />
            </TouchableOpacity>

            {/* Overlapping Content Box */}
            <BlurView intensity={50} tint="light" style={styles.contentBox}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.cardPrice}>{item.price.split(' ')[0]}</Text>
                    <View style={styles.guestTag}>
                        <Text style={styles.guestTagText}>Bridal • Party</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Profile</Text>
                </TouchableOpacity>
            </BlurView>
        </View >
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
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
        height: 380, // Taller card to fit image and content box
        borderRadius: 25,
        marginBottom: 25,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E6C68C', // Gold border from ref
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#F29502', // Orange/Gold Circle
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    ratingText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    heartIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: '#FFF',
        width: 36,
        height: 36,
        borderRadius: 18, // Circle
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
        elevation: 2,
    },
    // Content Box Overlay
    contentBox: {
        position: 'absolute',
        bottom: 10,
        left: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Glassy white
        borderRadius: 20,
        padding: 15,
        overflow: 'hidden',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A70002', // Maroon/Red like "Royal Orchid Palace"
        marginBottom: 4,
        fontFamily: 'serif',
    },
    cardLocation: {
        fontSize: 14,
        color: '#F29502', // Gold/Orange like "Pune, MH"
        fontWeight: '600',
        marginBottom: 12,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A70002',
    },
    guestTag: {
        backgroundColor: '#FFF3E0', // Light orange bg
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    guestTagText: {
        color: '#F29502',
        fontSize: 12,
        fontWeight: '600',
    },
    viewBtn: {
        backgroundColor: '#D61C1C', // Red button
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    viewBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MakeupPage;
