import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- CONSTANTS & THEME ---
const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#800000',    // Deep Maroon
    secondary: '#F29502',  // Gold
    textDark: '#333333',
    textLight: '#F5F5F5',
    white: '#FFFFFF',
    cardBg: '#FFFFFF',
    placeholder: '#CCCCCC',
    overlay: 'rgba(0,0,0,0.4)',
};

const FONTS = {
    serif: 'Serif',
    sans: 'System',
};

// --- DUMMY DATA ---
const VENDORS = [
    {
        id: '1',
        name: 'Shaaa Mehandi',
        verified: true,
        rating: 4.9,
        weddings: 120,
        price: 300,
        styles: ['Bridal', 'Arabic'],
        images: [
            'https://images.unsplash.com/photo-1596236904946-b620d2380d19?q=80&w=400&auto=format&fit=crop', // Henna hands
            'https://images.unsplash.com/photo-1544476915-ed1370594142?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1610123598195-26a575a2fa3a?q=80&w=400&auto=format&fit=crop',
        ]
    },
    {
        id: '2',
        name: 'Kajal Artistry',
        verified: true,
        rating: 4.8,
        weddings: 85,
        price: 500,
        styles: ['Portrait', 'Modern'],
        images: [
            'https://images.unsplash.com/photo-1598522307222-263af7085c72?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1632514066928-8b09d6614457?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=400&auto=format&fit=crop',
        ]
    },
    {
        id: '3',
        name: 'Mehendi by Riya',
        verified: false,
        rating: 4.6,
        weddings: 45,
        price: 250,
        styles: ['Floral', 'Minimal'],
        images: [
            'https://images.unsplash.com/photo-1551024601-562963344d18?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596704014902-127116790a6f?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582234032535-6187b47b43f9?q=80&w=400&auto=format&fit=crop',
        ]
    },
];

const TESTIMONIALS = [
    {
        id: '1',
        name: 'Aditi S.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        quote: "The stain was so dark and intricate! Loved it.",
        rating: 5
    },
    {
        id: '2',
        name: 'Priya M.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
        quote: "Professional and very fast. Highly recommend!",
        rating: 5
    },
    {
        id: '3',
        name: 'Sneha K.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        quote: "Beautiful portrait design, exactly what I wanted.",
        rating: 4.5
    }
];

const FILTER_STYLES = ['All', 'Bridal', 'Arabic', 'Floral', 'Portrait', 'Modern'];

const MehandiScreen = ({ navigation }) => {
    const [selectedStyle, setSelectedStyle] = useState('All');
    const [location, setLocation] = useState('');

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1544476915-ed1370594142?q=80&w=1080&auto=format&fit=crop' }}
                style={styles.heroImage}
                resizeMode="cover"
            >
                {/* Vintage Grain Overlay (Simulated with semi-transparent noise texture or color) */}
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(50, 20, 0, 0.3)' }]} />

                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.9)']}
                    style={styles.heroGradient}
                >
                    <View style={styles.heroContent}>
                        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <Text style={styles.heroHeadline}>Elegance Etched in Tradition.</Text>
                        <Text style={styles.heroSubhead}>
                            Discover the finest Mehendi artists to color your celebrations with intricate stories and timeless patterns.
                        </Text>

                        {/* Search/Filter Bar */}
                        <View style={styles.searchContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="location-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                                <TextInput
                                    placeholder="Location (e.g. Pune)"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>
                            <View style={styles.dividerVertical} />
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.styleFilterScroll}>
                                {FILTER_STYLES.map((style, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.styleChip,
                                            selectedStyle === style && styles.styleChipActive
                                        ]}
                                        onPress={() => setSelectedStyle(style)}
                                    >
                                        <Text style={[
                                            styles.styleChipText,
                                            selectedStyle === style && styles.styleChipTextActive
                                        ]}>{style}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );

    const renderVendorCard = (vendor) => (
        <View key={vendor.id} style={styles.vendorCard}>
            {/* Image Gallery Carousel */}
            <View style={styles.carouselContainer}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {vendor.images.map((img, idx) => (
                        <Image key={idx} source={{ uri: img }} style={styles.carouselImage} />
                    ))}
                </ScrollView>
                <View style={styles.carouselIndicatorContainer}>
                    <Text style={styles.carouselIndicatorText}>Swipe for more</Text>
                </View>
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={styles.nameRow}>
                        <Text style={styles.vendorName}>{vendor.name}</Text>
                        {vendor.verified && (
                            <MaterialCommunityIcons name="check-decagram" size={16} color={COLORS.secondary} style={{ marginLeft: 6 }} />
                        )}
                    </View>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFF" />
                        <Text style={styles.ratingText}>{vendor.rating}</Text>
                    </View>
                </View>

                <Text style={styles.weddingsCount}>{vendor.weddings} Weddings Completed</Text>

                <View style={styles.styleTagsRow}>
                    {vendor.styles.map((style, idx) => (
                        <View key={idx} style={styles.styleTag}>
                            <Text style={styles.styleTagText}>{style}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.cardFooter}>
                    <View>
                        <Text style={styles.priceLabel}>Starting from</Text>
                        <Text style={styles.priceValue}>₹{vendor.price}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const renderHowItWorks = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How it Works</Text>
            <View style={styles.stepsContainer}>
                <View style={styles.stepItem}>
                    <View style={styles.stepIconCtx}>
                        <Ionicons name="search" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.stepText}>Explore Artists</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color="#CCC" />
                <View style={styles.stepItem}>
                    <View style={styles.stepIconCtx}>
                        <Ionicons name="images-outline" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.stepText}>View Portfolios</Text>
                </View>
                <Ionicons name="arrow-forward" size={18} color="#CCC" />
                <View style={styles.stepItem}>
                    <View style={styles.stepIconCtx}>
                        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.stepText}>Book a Trial</Text>
                </View>
            </View>
        </View>
    );

    const renderTestimonials = () => (
        <View style={[styles.sectionContainer, { marginBottom: 40 }]}>
            <Text style={styles.sectionTitle}>Happy Brides</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                {TESTIMONIALS.map((item) => (
                    <View key={item.id} style={styles.testimonialCard}>
                        <Image source={{ uri: item.image }} style={styles.testimonialImage} />
                        <View style={styles.testimonialContent}>
                            <Text style={styles.testimonialQuote}>"{item.quote}"</Text>
                            <Text style={styles.testimonialName}>- {item.name}</Text>
                            <View style={styles.starsRow}>
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons
                                        key={i}
                                        name={i < Math.floor(item.rating) ? "star" : "star-outline"}
                                        size={12}
                                        color={COLORS.secondary}
                                    />
                                ))}
                            </View>
                        </View>
                        {/* Grain overlay for vintage feel */}
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255, 240, 200, 0.1)', borderRadius: 16 }]} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {renderHero()}

                <View style={styles.vendorListContainer}>
                    <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>Featured Artists</Text>
                    {VENDORS.map(renderVendorCard)}
                </View>

                {renderHowItWorks()}
                {renderTestimonials()}

                <View style={styles.joinCtaContainer}>
                    <LinearGradient
                        colors={[COLORS.primary, '#600000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.joinCtaGradient}
                    >
                        <Text style={styles.joinCtaText}>Are you a Mehendi Artist?</Text>
                        <TouchableOpacity style={styles.joinButton}>
                            <Text style={styles.joinButtonText}>Join Shubh Vivah today</Text>
                        </TouchableOpacity>
                    </LinearGradient>
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
    // Hero
    heroContainer: {
        height: height * 0.55,
        width: width,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        paddingBottom: 40,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    heroContent: {
        zIndex: 10,
    },
    heroHeadline: {
        fontFamily: FONTS.serif,
        fontSize: 32,
        color: COLORS.white,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        marginBottom: 8,
    },
    heroSubhead: {
        fontFamily: FONTS.sans,
        fontSize: 14,
        color: '#E0E0E0',
        marginBottom: 20,
        lineHeight: 20,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    searchContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 4,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontFamily: FONTS.sans,
        fontSize: 14,
        color: COLORS.textDark,
    },
    dividerVertical: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 4,
    },
    styleFilterScroll: {
        paddingTop: 8,
    },
    styleChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    styleChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    styleChipText: {
        fontSize: 12,
        color: '#666',
        fontFamily: FONTS.sans,
    },
    styleChipTextActive: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    // Vendor Card
    vendorListContainer: {
        marginTop: 20,
    },
    sectionTitle: {
        fontFamily: FONTS.serif,
        fontSize: 22,
        color: COLORS.primary,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    vendorCard: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        marginBottom: 24,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    carouselContainer: {
        height: 200,
        position: 'relative',
    },
    carouselImage: {
        width: width - 42, // Card width accounting for margins/borders roughly
        height: 200,
        resizeMode: 'cover',
    },
    carouselIndicatorContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    carouselIndicatorText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '600',
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    vendorName: {
        fontFamily: FONTS.serif,
        fontSize: 18,
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    weddingsCount: {
        fontSize: 12,
        color: '#888',
        marginBottom: 12,
    },
    styleTagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    styleTag: {
        backgroundColor: '#FFF5F5', // Light red tint
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 6,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#FFE0E0',
    },
    styleTagText: {
        fontSize: 10,
        color: COLORS.primary,
        fontWeight: '600',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        paddingTop: 12,
    },
    priceLabel: {
        fontSize: 10,
        color: '#888',
    },
    priceValue: {
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
    bookButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    bookButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 12,
    },

    // How It Works
    sectionContainer: {
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    stepsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    stepItem: {
        alignItems: 'center',
    },
    stepIconCtx: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    stepText: {
        fontSize: 10,
        color: '#555',
        fontWeight: '600',
        textAlign: 'center',
    },

    // Testimonials
    testimonialCard: {
        width: 260,
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 16,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#EEE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    testimonialImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 12,
    },
    testimonialContent: {
        marginBottom: 4,
    },
    testimonialQuote: {
        fontSize: 13,
        color: '#444',
        fontStyle: 'italic',
        marginBottom: 8,
        lineHeight: 18,
    },
    testimonialName: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    starsRow: {
        flexDirection: 'row',
    },

    // CTA
    joinCtaContainer: {
        marginHorizontal: 20,
        marginBottom: 40,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    joinCtaGradient: {
        padding: 24,
        alignItems: 'center',
    },
    joinCtaText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    joinButton: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
    },
    joinButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default MehandiScreen;