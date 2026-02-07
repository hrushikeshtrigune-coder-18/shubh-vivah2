import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import ph2 from '../../../../assets/images/ph2.jpg';
import ph3 from '../../../../assets/images/ph3.jpg';
import photography1 from '../../../../assets/images/photography1.jpg';

const { width } = Dimensions.get('window');

const PHOTOGRAPHERS_DATA = [
    {
        id: '1',
        name: 'Stories by Joseph',
        rating: 4.9,
        reviews: 320,
        city: 'Goa',
        price: '₹3,00,000 / day',
        tags: ['Candid', 'Drone', 'Cinematic'],
        image: photography1,
    },
    {
        id: '2',
        name: 'Twogether Studios',
        rating: 5.0,
        reviews: 450,
        city: 'Mumbai',
        price: '₹2,00,000 / day',
        tags: ['Same-day edits', 'Traditional', 'Studio'],
        image: ph2,
    },
    {
        id: '3',
        name: 'The Wedding Filmer',
        rating: 4.8,
        reviews: 210,
        city: 'Delhi',
        price: '₹5,00,000 / day',
        tags: ['Luxury', 'Film', 'Destination'],
        image: ph3,
    },
];

const TESTIMONIALS = [
    {
        id: '1',
        couple: 'Aditi & Rohan',
        location: 'Udaipur',
        photographer: 'Stories by Joseph',
        quote: '“They captured emotions we didn’t even notice. Truly magical!”',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: '2',
        couple: 'Priya & Vikram',
        location: 'Goa',
        photographer: 'Twogether Studios',
        quote: '“The cinematic film was better than a Bollywood movie. Crying happy tears!”',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop',
    },
];

const REASONS_TO_BOOK = [
    { id: '1', text: 'Verified Professionals', icon: 'check-decagram' },
    { id: '2', text: 'Real Portfolios Only', icon: 'image-album' },
    { id: '3', text: 'Transparent Pricing', icon: 'cash-check' },
    { id: '4', text: 'Backup Team Available', icon: 'account-group' },
    { id: '5', text: 'Secure Payments', icon: 'shield-lock' },
];

const Photography = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop' }}
                style={styles.heroImage}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.8)']}
                    style={styles.heroGradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>Because Some Moments Deserve to Live Forever 📸</Text>
                        <Text style={styles.heroSubtitle}>Candid • Traditional • Cinematic Films • Destination Weddings</Text>

                        <View style={styles.ctaRow}>
                            <TouchableOpacity style={styles.primaryCta}>
                                <Ionicons name="heart" size={16} color="#FFF" style={{ marginRight: 6 }} />
                                <Text style={styles.primaryCtaText}>Find My Photographer</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>

            {/* Trust Indicators */}
            <View style={styles.trustContainer}>
                <View style={styles.trustItem}>
                    <Text style={styles.trustNumber}>500+</Text>
                    <Text style={styles.trustLabel}>Verified Photographers</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.trustItem}>
                    <Text style={styles.trustNumber}>4.8 ★</Text>
                    <Text style={styles.trustLabel}>Average Rating</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.trustItem}>
                    <Text style={styles.trustNumber}>100%</Text>
                    <Text style={styles.trustLabel}>Quality Guaranteed</Text>
                </View>
            </View>
        </View>
    );

    const renderPhotographerCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.studioName}>{item.name}</Text>
                <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFF" />
                    <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                </View>
            </View>

            <Image source={item.image} style={styles.cardImage} />
            <TouchableOpacity style={styles.saveButton}>
                <Ionicons name="heart-outline" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location-outline" size={16} color="#F29502" />
                        <Text style={styles.locationText}>{item.city}</Text>
                    </View>
                    <Text style={styles.priceText}>Starts {item.price}</Text>
                </View>

                <View style={styles.tagContainer}>
                    {item.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.portfolioButton}>
                    <Text style={styles.portfolioButtonText}>View Portfolio</Text>
                    <Ionicons name="images-outline" size={16} color="#CC0E0E" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderTestimonials = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Real Wedding Stories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ overflow: 'visible' }}>
                {TESTIMONIALS.map((item) => (
                    <View key={item.id} style={styles.testimonialCard}>
                        <Image source={{ uri: item.image }} style={styles.testimonialImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.9)']}
                            style={styles.testimonialOverlay}
                        >
                            <Text style={styles.testimonialQuote}>{item.quote}</Text>
                            <Text style={styles.testimonialCouple}>{item.couple}</Text>
                            <Text style={styles.testimonialDetail}>in {item.location} • by {item.photographer}</Text>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const renderWhyBook = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 10 }]}>Why Book With Us?</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                {REASONS_TO_BOOK.slice(0, 4).map((item) => (
                    <View key={item.id} style={{ alignItems: 'center', width: '23%', marginBottom: 10 }}>
                        <MaterialCommunityIcons name={item.icon} size={24} color="#CC0E0E" style={{ marginBottom: 5 }} />
                        <Text style={{ fontFamily: 'Outfit_500Medium', fontSize: 10, color: '#333', textAlign: 'center' }}>{item.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderHeader()}

                <View style={[styles.sectionContainer, { marginTop: 20 }]}>
                    <Text style={styles.sectionTitle}>Featured Photographers</Text>
                    {PHOTOGRAPHERS_DATA.map((item) => (
                        <View key={item.id}>
                            {renderPhotographerCard({ item })}
                        </View>
                    ))}
                </View>

                {renderTestimonials()}
                {renderWhyBook()}

                {/* Emotional Storytelling */}
                <View style={styles.storyContainer}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1511285560982-1356c11d4606?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.storyImage}
                        imageStyle={{ borderRadius: 20 }}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                            style={styles.storyOverlay}
                        >
                            <Text style={styles.storyText}>“Years from now, these photographs will still make your heart skip a beat.” 💛</Text>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                {/* Sticky Bottom Actions Placeholder within ScrollView for now */}
                <View style={styles.bottomActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="eye-outline" size={20} color="#CC0E0E" />
                        <Text style={styles.actionText}>View Shortlisted Photographers</Text>
                    </TouchableOpacity>
                    <View style={styles.actionDivider} />
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="call-outline" size={20} color="#CC0E0E" />
                        <Text style={styles.actionText}>Talk to Expert</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    headerContainer: {
        marginBottom: 10,
    },
    heroImage: {
        width: width,
        height: 450,
        justifyContent: 'flex-end',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 50,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    heroContent: {
        marginBottom: 20,
    },
    heroTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 32,
        color: '#FFF',
        marginBottom: 10,
        lineHeight: 40,
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
    },
    heroSubtitle: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#FFEB3B',
        marginBottom: 25,
        fontWeight: '600',
    },
    ctaRow: {
        flexDirection: 'row',
        gap: 10,
    },
    primaryCta: {
        flex: 1,
        backgroundColor: '#CC0E0E',
        paddingVertical: 10, // Reduced from 14
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryCtaText: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14, // Reduced from 16
    },

    trustContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 15,
        marginTop: -30,
        borderRadius: 15,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    trustItem: {
        alignItems: 'center',
        flex: 1,
    },
    trustNumber: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
    },
    trustLabel: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 10,
        color: '#555',
        textAlign: 'center',
        marginTop: 2,
    },
    verticalDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#EEE',
    },
    sectionContainer: {
        marginTop: 30,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 22,
        color: '#CC0E0E',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502',
        elevation: 3,
    },
    cardHeader: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FDF3F3',
    },
    studioName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 18,
        color: '#CC0E0E',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F29502',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        marginLeft: 4,
    },
    cardImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    saveButton: {
        position: 'absolute',
        top: 70, // Adjusted below header
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 8,
        borderRadius: 20,
    },
    cardContent: {
        padding: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 14,
        color: '#555',
        marginLeft: 4,
    },
    priceText: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 15,
    },
    tag: {
        backgroundColor: '#FFF5F5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#FFD1D1',
    },
    tagText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#CC0E0E',
    },
    portfolioButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#CC0E0E',
        borderRadius: 12,
        borderStyle: 'dashed',
    },
    portfolioButtonText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#CC0E0E',
        marginRight: 8,
    },
    testimonialCard: {
        width: 300,
        height: 200,
        marginRight: 15,
        borderRadius: 15,
        overflow: 'hidden',
    },
    testimonialImage: {
        width: '100%',
        height: '100%',
    },
    testimonialOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 15,
    },
    testimonialQuote: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 14,
        color: '#FFF',
        fontStyle: 'italic',
        marginBottom: 8,
    },
    testimonialCouple: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#F29502',
    },
    testimonialDetail: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#DDD',
    },
    whyBookCard: {
        width: 140,
        height: 140,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F29502',
        elevation: 3,
        shadowColor: '#F29502',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        transform: [{ rotate: '-1deg' }], // Slight tilt for uniqueness
    },
    whyBookIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CC0E0E',
    },
    whyBookText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    storyContainer: {
        margin: 15,
        marginTop: 20, // Reduced margin
        borderRadius: 15,
        overflow: 'hidden',
        height: 120, // Reduced height from 200
        borderWidth: 1,
        borderColor: '#F29502',
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    storyOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    storyText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14, // Reduced from 20
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 20,
    },
    bottomActions: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 12,
        padding: 10, // Reduced from 15
        borderWidth: 1,
        borderColor: '#EEE',
        elevation: 3,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
    actionDivider: {
        width: 1,
        backgroundColor: '#DDD',
        marginHorizontal: 10,
    },
});

export default Photography;