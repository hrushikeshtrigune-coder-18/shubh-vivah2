import { PlayfairDisplay_400Regular, PlayfairDisplay_700Bold, useFonts } from '@expo-google-fonts/playfair-display';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- VISUAL IDENTITY (UPDATED) ---
const COLORS = {
    // Background: FFFFF0 (Ivory)
    mainBg: '#FFFFF0',
    cardBg: '#FFFFF0',

    // Text Colors
    primaryText: '#CC0E0E', // Red
    subText: '#F29502',     // Gold

    // Accents
    gold: '#F29502',
    accent: '#CC0E0E',
    white: '#FFFFFF',
    textDark: '#333333',
    border: '#F29502',   // Gold Border
    surface: '#FFFFFF',
};


const FONTS = {
    serif: 'PlayfairDisplay_700Bold',
    serifReg: 'PlayfairDisplay_400Regular',
    sans: 'System',
};

// --- DUMMY DATA ---
const VENDORS = [
    {
        id: '1',
        name: 'SHAAA MEHANDI',
        verified: true,
        rating: 4.9,
        weddings: 120,
        city: 'Pune',
        startingPrice: '₹2,500',
        mostBooked: true,
        styles: ['Bridal', 'Arabic'],
        imageMain: 'https://images.unsplash.com/photo-1596236904946-b620d2380d19?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'KAJAL ARTISTRY',
        verified: true,
        rating: 4.8,
        weddings: 85,
        city: 'Mumbai',
        startingPrice: '₹3,000',
        mostBooked: false,
        styles: ['Portrait', 'Modern'],
        imageMain: 'https://images.unsplash.com/photo-1632514066928-8b09d6614457?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'MEHENDI BY RIYA',
        verified: false,
        rating: 4.6,
        weddings: 45,
        city: 'Delhi',
        startingPrice: '₹1,500',
        mostBooked: false,
        styles: ['Floral', 'Minimal'],
        imageMain: 'https://images.unsplash.com/photo-1551024601-562963344d18?q=80&w=400&auto=format&fit=crop',
    },
    {
        id: '4',
        name: 'ARTISTIC HANDS',
        verified: true,
        rating: 4.7,
        weddings: 60,
        city: 'Bangalore',
        startingPrice: '₹2,000',
        mostBooked: true,
        styles: ['Traditional', 'Mughlai'],
        imageMain: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=400&auto=format&fit=crop',
    },
];

const FILTER_STYLES = ['All', 'Bridal', 'Arabic', 'Floral', 'Portrait', 'Modern'];
const FILTER_CHIPS = ['Price Range', 'Bridal', 'Guest', 'Style', 'Experience', 'Dates'];

const MehandiScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        PlayfairDisplay_700Bold,
        PlayfairDisplay_400Regular,
    });

    const [selectedStyle, setSelectedStyle] = useState('All');
    const [location, setLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading Fonts...</Text>
            </View>
        );
    }

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground
                source={require('../../../../assets/images/mehandi1.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
            >
                {/* Removed overlay for full clarity */}

                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 240, 0.0)', 'rgba(255, 255, 240, 0.6)']}
                    style={styles.heroGradient}
                >
                    <View style={styles.heroContent}>
                        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.primaryText} />
                        </TouchableOpacity>

                        <Text style={styles.heroHeadline}>Elegance Etched in Tradition.</Text>
                        <Text style={styles.heroSubhead}>
                            Discover the finest Mehendi artists to color your celebrations with intricate stories and timeless patterns.
                        </Text>

                        {/* Search/Filter Bar */}
                        <View style={styles.searchContainer}>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="location-outline" size={20} color={COLORS.primaryText} style={styles.inputIcon} />
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

    const renderFilters = () => (
        <View style={styles.stickyFilterContainer}>
            {/* Search Bar */}
            <View style={styles.searchBarRow}>
                <View style={styles.locationInputWrapper}>
                    <Ionicons name="location-outline" size={18} color={COLORS.primary} />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#999"
                        style={styles.locationInput}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.mainSearchWrapper}>
                    <Ionicons name="search-outline" size={18} color={COLORS.textSub} />
                    <TextInput
                        placeholder="Search artist"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChipScroll} contentContainerStyle={{ paddingHorizontal: 4 }}>
                {FILTER_CHIPS.map((chip, index) => (
                    <TouchableOpacity key={index} style={styles.filterChip}>
                        <Text style={styles.filterChipText}>{chip}</Text>
                        <Ionicons name="chevron-down" size={12} color={COLORS.textSub} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderVendorCard = (vendor) => (
        <View key={vendor.id} style={styles.cardContainer}>
            <ImageBackground
                source={{ uri: vendor.imageMain }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 12 }}
            >
                {vendor.mostBooked && (
                    <View style={styles.mostBookedBadge}>
                        <Text style={styles.mostBookedText}>MOST BOOKED</Text>
                    </View>
                )}
            </ImageBackground>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{vendor.name}</Text>
                    <View style={styles.ratingTag}>
                        <Ionicons name="star" size={12} color="#FFF" />
                        <Text style={styles.ratingText}>{vendor.rating}</Text>
                    </View>
                </View>

                <Text style={styles.cardLocation}>
                    <Ionicons name="location-outline" size={14} color={COLORS.subText} /> {vendor.city} • {vendor.styles.join(', ')}
                </Text>

                <View style={styles.cardPriceRow}>
                    <Text style={styles.priceLabel}>Starting at </Text>
                    <Text style={styles.priceValue}>{vendor.startingPrice}</Text>
                </View>

                <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.cardBtnOutline}>
                        <Text style={styles.cardBtnTextOutline}>View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardBtnFilled}>
                        <Text style={styles.cardBtnTextFilled}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );



    const renderWhyChooseUs = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Why Choose Us?</Text>
            <View style={styles.featuresGrid}>
                {[
                    { icon: 'shield-check-outline', title: 'Verified' },
                    { icon: 'star-outline', title: 'Top Rated' },
                    { icon: 'cash-outline', title: 'Best Price' },
                    { icon: 'home-heart-outline', title: 'Home Service' },
                ].map((item, index) => (
                    <View key={index} style={styles.featureCardSimple}>
                        <MaterialCommunityIcons name={item.icon} size={30} color={COLORS.primaryText} />
                        <Text style={styles.featureTitleSimple}>{item.title}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderHowItWorks = () => (
        <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>How it Works</Text>
            <View style={styles.howItWorksContainer}>
                {[
                    { icon: 'compass-outline', title: 'Browse', desc: 'Explore artists' },
                    { icon: 'image-outline', title: 'Select', desc: 'Check designs' },
                    { icon: 'calendar-outline', title: 'Book', desc: 'Pay deposit' },
                    { icon: 'heart-outline', title: 'Enjoy', desc: 'Mehndi at home' },
                ].map((item, index) => (
                    <View key={index} style={styles.howItWorksCard}>
                        <View style={styles.howItWorksIconBox}>
                            <Ionicons name={item.icon} size={20} color={COLORS.primaryText} />
                        </View>
                        <Text style={styles.howItWorksTitle}>{item.title}</Text>
                        <Text style={styles.howItWorksDesc}>{item.desc}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderReviews = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Real Brides, Real Stories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled style={{ marginTop: 10 }}>
                {[
                    { name: 'Ananya S.', rating: 5, text: "The designs were intricate & beautiful! Highly recommend Shubh Vivah artists." },
                    { name: 'Priya K.', rating: 4.8, text: "Professional and very patient artist. Loved the bridal mehndi!" },
                    { name: 'Riya M.', rating: 5, text: "On-time service and extremely neat work. Verified artists are a blessing." },
                ].map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <View style={styles.quoteIcon}>
                            <FontAwesome5 name="quote-left" size={16} color={COLORS.gold} />
                        </View>
                        <Text style={styles.reviewText}>"{review.text}"</Text>
                        <View style={styles.reviewFooter}>
                            <View style={styles.reviewRating}>
                                {Array(5).fill().map((_, i) => (
                                    <Ionicons key={i} name={i < Math.floor(review.rating) ? "star" : "star-outline"} size={12} color={COLORS.gold} />
                                ))}
                            </View>
                            <Text style={styles.reviewName}>- {review.name}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <View style={styles.footerContent}>
                <Text style={styles.footerLogo}>Shubh Vivah</Text>
                <Text style={styles.footerTagline}>Making weddings memorable.</Text>

                <View style={styles.footerLinksRow}>
                    <TouchableOpacity><Text style={styles.footerLink}>Vendors</Text></TouchableOpacity>
                    <View style={styles.footerDot} />
                    <TouchableOpacity><Text style={styles.footerLink}>Venues</Text></TouchableOpacity>
                    <View style={styles.footerDot} />
                    <TouchableOpacity><Text style={styles.footerLink}>Contact</Text></TouchableOpacity>
                </View>

                <View style={styles.footerSocialRow}>
                    <TouchableOpacity style={styles.footerSocialIcon}><FontAwesome5 name="instagram" size={18} color="#FFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.footerSocialIcon}><FontAwesome5 name="facebook" size={18} color="#FFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.footerSocialIcon}><FontAwesome5 name="twitter" size={18} color="#FFF" /></TouchableOpacity>
                </View>

                <Text style={styles.copyrightText}>© 2024 Shubh Vivah. All rights reserved.</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                stickyHeaderIndices={[1]}
            >
                {renderHero()}
                {renderFilters()}

                <View style={styles.vendorListContainer}>
                    <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>Curated Artists</Text>
                    {VENDORS.map(renderVendorCard)}
                </View>


                {renderWhyChooseUs()}
                {renderHowItWorks()}
                {renderReviews()}
                {renderFooter()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    // Hero Section
    heroContainer: {
        height: height * 0.65, // Full immersive hero
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
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    heroContent: {
        marginBottom: 20,
    },
    heroHeadline: {
        fontFamily: FONTS.serif,
        fontSize: 34,
        color: COLORS.primaryText, // Red
        marginBottom: 10,
        lineHeight: 40,
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    heroSubhead: {
        fontFamily: FONTS.serifReg,
        fontSize: 16,
        color: COLORS.subText, // Gold
        marginBottom: 24,
        lineHeight: 24,
        fontWeight: '600',
    },
    heroButtonsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 4,
    },
    primaryBtnText: {
        color: COLORS.textLight,
        fontWeight: 'bold',
        fontSize: 14,
    },
    secondaryBtn: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 4,
    },
    secondaryBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    trustBadgesRow: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    trustBadgeText: {
        color: '#EEE',
        fontSize: 12,
        fontWeight: '600',
    },

    // Sticky Search & Filter
    stickyFilterContainer: {
        backgroundColor: COLORS.surface,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 100,
    },
    searchBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        height: 50,
        marginBottom: 10,
    },
    locationInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
    },
    locationInput: {
        flex: 1,
        marginLeft: 6,
        fontSize: 13,
        color: COLORS.textMain,
        fontFamily: FONTS.sans,
    },
    verticalDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#DDD',
        marginHorizontal: 10,
    },
    mainSearchWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        color: COLORS.textMain,
        fontFamily: FONTS.sans,
    },
    filterChipScroll: {
        flexDirection: 'row',
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    filterChipText: {
        fontSize: 12,
        color: COLORS.textMain,
        fontFamily: FONTS.sans,
    },

    // Vendor Grid
    vendorListContainer: {
        marginTop: 20,
        paddingHorizontal: 20, // increased padding for better alignment
    },
    sectionHeaderRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    viewAllText: {
        fontSize: 14,
        color: COLORS.primary,
        fontFamily: FONTS.sans,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontFamily: FONTS.serif,
        fontSize: 24,
        color: COLORS.primaryText,
    },
    // Updated Premium Card Styles
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.gold,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    cardImage: {
        width: '100%',
        height: 220,
        justifyContent: 'space-between',
        padding: 10,
    },
    // Retaining mostBookedBadge styles
    mostBookedBadge: {
        backgroundColor: COLORS.gold,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    mostBookedText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardTitle: {
        fontFamily: FONTS.serif,
        fontSize: 20,
        color: COLORS.primaryText, // Red
    },
    ratingTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gold,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardLocation: {
        fontSize: 13,
        color: '#666',
        marginBottom: 12,
        fontFamily: FONTS.sans,
    },
    cardPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceLabel: {
        fontSize: 12,
        color: '#666',
    },
    priceValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primaryText, // Red
        marginLeft: 5,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    cardBtnOutline: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 1.5,
        borderColor: COLORS.primaryText,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBtnTextOutline: {
        color: COLORS.primaryText,
        fontWeight: 'bold',
        fontSize: 14,
    },
    cardBtnFilled: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: COLORS.primaryText,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    cardBtnTextFilled: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
    },

    // How it Works (Simple Icon Base)
    sectionContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    howItWorksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    howItWorksCard: {
        width: '23%', // Adjusted for 4 items
        alignItems: 'center',
    },
    howItWorksIconBox: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(204, 14, 14, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    howItWorksTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: COLORS.primaryText,
        marginBottom: 4,
        fontFamily: FONTS.serif,
        textAlign: 'center',
    },
    howItWorksDesc: {
        fontSize: 9,
        color: COLORS.textDark,
        textAlign: 'center',
        fontFamily: FONTS.sans,
        lineHeight: 12,
    },

    // Why Choose Us (Simple)
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    featureCardSimple: {
        width: '23%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    featureTitleSimple: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primaryText,
        marginTop: 6,
        textAlign: 'center',
        fontFamily: FONTS.sans,
    },

    // Reviews
    reviewCard: {
        width: width * 0.75, // Carousel card width
        backgroundColor: COLORS.surface,
        marginRight: 15,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 2,
    },
    quoteIcon: {
        marginBottom: 10,
        opacity: 0.5,
    },
    reviewText: {
        fontSize: 13,
        color: COLORS.textMain,
        fontFamily: FONTS.serif,
        fontStyle: 'italic',
        lineHeight: 20,
        marginBottom: 15,
    },
    reviewFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewRating: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primaryText,
    },

    // Footer
    footerContainer: {
        marginTop: 50,
        backgroundColor: COLORS.primary, // Dark Green
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    },
    footerContent: {
        alignItems: 'center',
        width: '100%',
    },
    footerLogo: {
        fontFamily: FONTS.serif,
        fontSize: 24,
        color: COLORS.gold,
        marginBottom: 5,
    },
    footerTagline: {
        fontSize: 12,
        color: COLORS.gold, // Updated to Gold
        marginBottom: 20,
        fontFamily: FONTS.sans,
    },
    footerLinksRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    footerLink: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: '600',
    },
    footerDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.gold,
        marginHorizontal: 15,
    },
    footerSocialRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 30,
    },
    footerSocialIcon: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
    },
    copyrightText: {
        fontSize: 10,
        color: COLORS.gold, // Updated to Gold
    },
});

export default MehandiScreen;