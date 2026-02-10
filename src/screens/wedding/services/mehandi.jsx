import { Ionicons } from '@expo/vector-icons';
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
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- CONSTANTS & THEME ---
const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red (Main Text)
    secondary: '#F29502',  // Gold/Orange (Sub Text & Borders)
    textDark: '#333333',
    textLight: '#F5F5F5',
    white: '#FFFFFF',
    cardBg: '#FFFFFF',
    placeholder: '#CCCCCC',
    overlay: 'rgba(0,0,0,0.4)',
    vine: '#E6D2B5', // Light tan for the connector line
};

const FONTS = {
    serif: 'System', // Use System Serif for "Handwritten" feel if custom font not avail
    sans: 'System',
};

// --- DUMMY DATA ---
const STYLES_INFO = {
    'Bridal': {
        title: 'Royal Bridal',
        desc: 'Full hands & feet, intricate storytelling.',
        time: '4-6 Hours',
        complexity: 'High',
    },
    'Arabic': {
        title: 'Modern Arabic',
        desc: 'Flowing floral patterns, open spaces.',
        time: '1-2 Hours',
        complexity: 'Medium',
    },
    'Minimal': {
        title: 'Chic Minimal',
        desc: 'Simple finger tips or wrist cuffs.',
        time: '30-45 Mins',
        complexity: 'Low',
    },
};

const VENDORS = [
    {
        id: '1',
        name: 'Shaaa Mehandi',
        portrait: require('../../../../assets/images/mehandiF.jpg'),
        quote: "“I believe every line tells a story. Let's write yours.”",
        verified: true,
        experience: '8 Years Exp.',
        badge: 'Intricate Bridal',
        rating: 4.9,
        weddings: 120,
        price: 3000,
        complexityRates: [
            { level: 'Simple', price: '₹1500', time: '1 hr' },
            { level: 'Med', price: '₹3000', time: '3 hrs' },
            { level: 'Bridal', price: '₹7000+', time: '6 hrs' },
        ],
        tags: ['Bridal Specialist', 'Portrait Mehandi', 'Certified'],
        experienceDesc: '8 Years • 120 Weddings',
        images: [
            'https://images.unsplash.com/photo-1596236904946-b620d2380d19?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544476915-ed1370594142?q=80&w=400&auto=format&fit=crop',
        ]
    },
    {
        id: '2',
        name: 'Kajal Artistry',
        portrait: require('../../../../assets/images/mehandi1.jpg'),
        quote: "“Modern designs for the modern bride. Fast & flawless.”",
        verified: true,
        experience: '5 Years Exp.',
        badge: 'Speed Artist',
        rating: 4.8,
        weddings: 85,
        price: 2500,
        complexityRates: [
            { level: 'Simple', price: '₹1200', time: '45m' },
            { level: 'Med', price: '₹2500', time: '2 hrs' },
            { level: 'Bridal', price: '₹5500+', time: '5 hrs' },
        ],
        tags: ['Speed Artist', 'Modern Designs', 'Geometric'],
        experienceDesc: '5 Years • 85 Weddings',
        images: [
            'https://images.unsplash.com/photo-1598522307222-263af7085c72?q=80&w=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1632514066928-8b09d6614457?q=80&w=400&auto=format&fit=crop',
        ]
    },
    {
        id: '3',
        name: 'Sana Henna Art',
        portrait: require('../../../../assets/images/mehandi.jpg'),
        quote: "“Intricate details, timeless traditions.”",
        verified: true,
        experience: '6 Years Exp.',
        badge: 'Traditional',
        rating: 4.7,
        weddings: 95,
        price: 2800,
        complexityRates: [
            { level: 'Simple', price: '₹1400', time: '50m' },
            { level: 'Med', price: '₹2800', time: '2.5 hrs' },
            { level: 'Bridal', price: '₹6000+', time: '5.5 hrs' },
        ],
        tags: ['Traditional', 'Intricate', 'Organic Henna'],
        experienceDesc: '6 Years • 95 Weddings',
        images: []
    },
    {
        id: '4',
        name: 'Riya Mehndi',
        portrait: require('../../../../assets/images/mehandiF.jpg'),
        quote: "“Beautiful henna for your special day.”",
        verified: false,
        experience: '3 Years Exp.',
        badge: 'Modern',
        rating: 4.5,
        weddings: 40,
        price: 2000,
        complexityRates: [
            { level: 'Simple', price: '₹1000', time: '40m' },
            { level: 'Med', price: '₹2200', time: '2 hrs' },
            { level: 'Bridal', price: '₹5000+', time: '4.5 hrs' },
        ],
        tags: ['Budget Friendly', 'Modern', 'Simple'],
        experienceDesc: '3 Years • 40 Weddings',
        images: []
    },
    {
        id: '5',
        name: 'Pooja Art',
        portrait: require('../../../../assets/images/mehandi1.jpg'),
        quote: "“Express yourself with henna.”",
        verified: true,
        experience: '4 Years Exp.',
        badge: 'Creative',
        rating: 4.6,
        weddings: 60,
        price: 2400,
        complexityRates: [
            { level: 'Simple', price: '₹1300', time: '45m' },
            { level: 'Med', price: '₹2600', time: '2.2 hrs' },
            { level: 'Bridal', price: '₹5800+', time: '5 hrs' },
        ],
        tags: ['Creative', 'Custom Designs', 'Floral'],
        experienceDesc: '4 Years • 60 Weddings',
        images: []
    },
];

const TESTIMONIALS = [
    { id: '1', name: 'Anya Sharma', text: "The spin-the-wheel discount was such a fun surprise! And the henna was perfection.", stars: 5 },
    { id: '2', name: 'Priya Verma', text: "Found my artist in 2 minutes. Loved the mood board feature for inspiration!", stars: 5 },
    { id: '3', name: 'Siddhi G.', text: "Professional, fast, and exactly the dark stain I wanted.", stars: 4 },
];

const MOOD_BOARD_IMAGES = [
    'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616091093747-4d8b9daf1e5d?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563823294326-8c4de8e09f5a?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544988636-6da456345ec4?q=80&w=400&auto=format&fit=crop',
];

const DESIGN_STYLES = [
    { id: '1', title: 'Minimalist Arabic', icon: 'leaf-outline', desc: 'Elegant Vines' },
    { id: '2', title: 'Rajasthani', icon: 'hand-right-outline', desc: 'Intricate Patterns' },
    { id: '3', title: 'Modern Mandala', icon: 'aperture-outline', desc: 'Geometric Center' },
    { id: '4', title: 'Portrait Bridal', icon: 'heart-circle-outline', desc: 'Love Story' },
];

const FEATURED_PATTERNS = [
    { id: '1', title: 'Back-Hand Vines', image: require('../../../../assets/images/mehandi.jpg') },
    { id: '2', title: 'Leg Patterns', image: require('../../../../assets/images/mehandi1.jpg') },
    { id: '3', title: 'Floral Bel', image: require('../../../../assets/images/mehandi.jpg') },
    { id: '4', title: 'Finger Caps', image: require('../../../../assets/images/mehandi1.jpg') },
];



const MehandiScreen = ({ navigation }) => {
    const [selectedStyle, setSelectedStyle] = useState('Bridal'); // Default active state
    const [bookingStep, setBookingStep] = useState(0); // For simple interaction in booking

    // --- Interactive Hand Canvas ---
    const renderHandCanvas = () => {
        const info = STYLES_INFO[selectedStyle];
        return (
            <View style={styles.heroContainer}>
                <ImageBackground
                    source={require('../../../../assets/images/mehandiF.jpg')} // Updated to local asset
                    style={styles.heroImage}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    >
                        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <Text style={styles.heroHeadline}>The Scent of Celebration</Text>
                        <Text style={styles.heroSubhead}>Begin your bridal journey with the timeless stain of deep mahogany and shared laughter.</Text>

                        {/* Interactive Hand Area */}
                        <View style={styles.handCanvasContainer}>


                            {/* Active Style Info Card Overlay */}


                            {/* Find Your Artist Button (Replacing Tabs) */}
                            <TouchableOpacity
                                style={styles.findArtistButton}
                                onPress={() => {
                                    // Scroll to artist section or perform action
                                }}
                            >
                                <Text style={styles.findArtistText}>Find Your Artist</Text>
                                <Ionicons name="arrow-down" size={18} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        );
    };

    // --- New Section: Choose Your Design Style ---
    const renderDesignStyles = () => (
        <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle, { color: COLORS.primary }]}>Choose Your Vibe</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.styleScrollContainer}>
                {DESIGN_STYLES.map((style, index) => (
                    <TouchableOpacity key={index} style={styles.styleCard}>
                        {/* Reference Image Style: Light Checkered/Plain BG Card + Icon Circle */}
                        <View style={styles.styleIconBox}>
                            <Ionicons name={style.icon} size={24} color={COLORS.secondary} /> {/* Reduced Icon Size */}
                        </View>
                        <Text style={styles.styleCardTitle}>{style.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    // --- New Section: Mehndi Favorites ---
    const renderFeaturedPatterns = () => (
        <View style={[styles.sectionContainer, { marginTop: 30 }]}> {/* Increased Gap after Hero */}
            <Text style={styles.sectionTitle}>Mehndi Favorites</Text>
            <Text style={styles.sectionSub}>Trending patterns for you.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.patternScrollContainer}>
                {FEATURED_PATTERNS.map((item, index) => (
                    <View key={index} style={styles.patternCard}>
                        <ImageBackground
                            source={item.image} // Using local require
                            style={styles.patternImage}
                            imageStyle={{ borderRadius: 12 }}
                        >
                            {/* Vintage Filter Overlay */}
                            <View style={styles.vintageOverlay} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.7)']}
                                style={styles.patternGradient}
                            >
                                <Text style={styles.patternTitle}>{item.title}</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    // --- Artist First Card ---
    // --- Artist Card (Venue Style Redesign) ---
    // --- Enhanced Artist Card (Static - High info on Front) ---
    const renderArtistCard = (artist) => (
        <View key={artist.id} style={styles.artistCardContainer}>
            <ImageBackground
                source={artist.portrait} // Changed to direct source object as it's now a require()
                style={styles.cardImageBg}
                imageStyle={{ borderRadius: 15 }}
            >
                {/* Top Badges */}
                <View style={[styles.cardHeaderRow, { justifyContent: 'flex-end' }]}>
                    <TouchableOpacity style={styles.heartBtn}>
                        <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Info Overlay (Lower Half) */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
                    style={styles.cardOverlayGradient}
                >
                    <Text style={styles.cardTitle}>{artist.name}</Text>
                    <Text style={styles.cardLocation}>📍 Mumbai, MH</Text>

                    {/* Tags */}
                    <View style={styles.tagsRow}>
                        {artist.tags?.map((tag, idx) => (
                            <View key={idx} style={styles.tagBadge}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Experience */}
                    <View style={styles.expPriceRow}>
                        <Text style={styles.expText}>{artist.experienceDesc}</Text>
                        {/* Price Removed */}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.cardActionsRow}>
                        <TouchableOpacity style={styles.bookNowBtn}>
                            <Text style={styles.bookNowText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );

    // --- Advanced Mood Board (Masonry Effect) ---
    const renderMoodBoard = () => {
        // Split images into two columns for masonry effect
        const col1 = MOOD_BOARD_IMAGES.filter((_, i) => i % 2 === 0);
        const col2 = MOOD_BOARD_IMAGES.filter((_, i) => i % 2 !== 0);

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Event Mood Board 🎨</Text>
                <Text style={styles.sectionSub}>Pin your inspirations.</Text>

                <View style={styles.masonryContainer}>
                    {/* Column 1 */}
                    <View style={styles.masonryCol}>
                        {col1.map((img, index) => (
                            <View key={`col1-${index}`} style={[styles.masonryItem, { height: index % 2 === 0 ? 200 : 150 }]}>
                                <Image source={{ uri: img }} style={styles.masonryImage} />
                                <TouchableOpacity style={styles.saveBtn} onPress={() => {/* Show toast */ }}>
                                    <Ionicons name="bookmark-outline" size={18} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {/* Column 2 */}
                    <View style={styles.masonryCol}>
                        {col2.map((img, index) => (
                            <View key={`col2-${index}`} style={[styles.masonryItem, { height: index % 2 === 0 ? 160 : 210 }]}> {/* Varying heights */}
                                <Image source={{ uri: img }} style={styles.masonryImage} />
                                <TouchableOpacity style={styles.saveBtn} onPress={() => {/* Show toast */ }}>
                                    <Ionicons name="bookmark-outline" size={18} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );
    };

    // --- Testimonials (Real Brides) ---
    const renderTestimonials = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Real Brides, Real Stories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                {TESTIMONIALS.map((review) => (
                    <View key={review.id} style={styles.testimonialCard}>
                        <View style={styles.starsRow}>
                            {Array(5).fill().map((_, i) => (
                                <Ionicons key={i} name={i < review.stars ? "star" : "star-outline"} size={14} color={COLORS.secondary} />
                            ))}
                        </View>
                        <Text style={styles.testimonialText}>"{review.text}"</Text>
                        <Text style={styles.testimonialName}>- {review.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    // --- Gamified Booking (Spin the Wheel) ---
    const renderSpinWheel = () => (
        <View style={styles.spinContainer}>
            <LinearGradient
                colors={['#FFF0F0', '#FFF']}
                style={styles.spinCard}
            >
                <View style={styles.spinContent}>
                    <Text style={[styles.bookingTitle, { textAlign: 'center' }]}>Unlock Your Offer! 🎁</Text>
                    <Text style={[styles.bookingSub, { textAlign: 'center' }]}>Spin to win discounts or upgrades.</Text>

                    {/* Wheel Visual (Static for now, implies animation) */}
                    <View style={styles.wheelCircle}>
                        <Ionicons name="color-palette" size={50} color={COLORS.primary} />
                    </View>

                    <TouchableOpacity style={styles.spinButton}>
                        <Text style={styles.spinBtnText}>Spin & Book Now</Text>
                    </TouchableOpacity>
                    <Text style={styles.spinNote}>*Guaranteed prize for every booking.</Text>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {renderHandCanvas()}

                {renderFeaturedPatterns()}
                {renderDesignStyles()}

                <View style={styles.journeyContainer}>
                    <Text style={styles.journeyTitle}>Featured Artists</Text>
                    {VENDORS.map(renderArtistCard)}
                </View>

                {renderTestimonials()}
                {/* {renderMoodBoard()} */}
                {/* {renderSpinWheel()} */}

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    // Hero & Hand Canvas
    heroContainer: {
        height: height * 0.55, // Reduced Height (was 0.65)
        width: width,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
    },

    // Find Artist Button
    findArtistButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: COLORS.primary, // User requested Red #CC0E0E
        width: '90%', // Cover hero section width
        alignSelf: 'center',
        paddingVertical: 14,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center Text
        gap: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    findArtistText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    backButton: {
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignSelf: 'flex-start',
        padding: 8,
        borderRadius: 20,
    },
    heroHeadline: {
        fontFamily: FONTS.serif,
        fontSize: 34,
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    heroSubhead: {
        fontFamily: FONTS.sans,
        fontSize: 16,
        color: COLORS.secondary, // User requested Orange #F29502
        marginBottom: 20,
    },
    handCanvasContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    handIcon: {
        width: 250,
        height: 350,
        resizeMode: 'contain',
        opacity: 0.9,
    },
    touchZone: {
        position: 'absolute',
        // backgroundColor: 'rgba(255,0,0,0.3)', // Debug color
    },
    zoneFingers: { top: 0, height: 100, width: 200 },
    zonePalm: { top: 120, height: 100, width: 150 },
    zoneWrist: { bottom: 20, height: 80, width: 120 },

    styleInfoCard: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 15,
        borderRadius: 16,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    styleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        fontFamily: FONTS.serif,
    },
    styleDesc: {
        fontSize: 13,
        color: '#555',
        marginBottom: 8,
    },
    styleMetaRow: {
        flexDirection: 'row',
        gap: 15,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    styleTabs: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 4,
    },
    styleTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    styleTabActive: {
        backgroundColor: COLORS.secondary,
    },
    styleTabText: {
        color: '#DDD',
        fontSize: 12,
        fontWeight: '600',
    },
    styleTabTextActive: {
        color: '#FFF',
    },

    // Journey Layout
    journeyContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: COLORS.background,
    },
    journeyTitle: {
        fontSize: 24,
        fontFamily: FONTS.serif,
        color: COLORS.primary,
        marginBottom: 30,
        textAlign: 'left', // Left Align
    },
    journeyStopContainer: {
        marginBottom: 40,
        position: 'relative',
        paddingLeft: 30, // Space for vine
    },
    vineLine: {
        position: 'absolute',
        left: 9,
        top: -40,
        bottom: -40,
        width: 2,
        backgroundColor: COLORS.vine,
        zIndex: 0,
    },
    vineNode: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.secondary,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.background,
    },
    nodeIcon: {
        width: 12,
        height: 12,
        tintColor: '#FFF',
    },

    // Enhanced Artist Card
    artistCardContainer: {
        marginBottom: 30,
        height: 400, // Reduced Height (was 480)
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: COLORS.white,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    cardImageBg: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
    },
    cardOverlayGradient: {
        padding: 20,
        paddingTop: 60, // Fade start
        justifyContent: 'flex-end',
    },
    cardTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: FONTS.serif,
        marginBottom: 2,
    },
    cardLocation: {
        fontSize: 14,
        color: COLORS.secondary, // Orange
        marginBottom: 12,
        fontWeight: '600',
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    tagBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    tagText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '600',
    },
    expPriceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    expText: {
        color: '#DDD',
        fontSize: 13,
    },
    cardPrice: {
        color: COLORS.primary, // Red text for price to pop
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#FFF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    cardActionsRow: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    bookNowBtn: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookNowText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    whatsappBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Masonry Mood Board
    masonryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 15,
    },
    masonryCol: {
        flex: 1,
        gap: 15,
    },
    masonryItem: {
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#EEE',
    },
    masonryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // Sections
    sectionContainer: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary, // Red Main Headings
        marginLeft: 20,
        marginBottom: 15,
        fontFamily: FONTS.serif,
    },
    sectionSub: {
        fontSize: 14,
        color: '#666',
        marginLeft: 20,
        marginTop: -10,
        marginBottom: 15,
    },

    // Testimonials
    testimonialCard: {
        width: 280,
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 16,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    starsRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 2,
    },
    testimonialText: {
        fontSize: 13,
        color: '#555',
        fontStyle: 'italic',
        marginBottom: 10,
        lineHeight: 20,
    },
    testimonialName: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondary,
        alignSelf: 'flex-end',
    },



    // Spin Wheel
    spinContainer: {
        padding: 20,
        marginBottom: 50,
    },
    spinCard: {
        borderRadius: 20,
        padding: 4, // border effect
        elevation: 4,
    },
    spinContent: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 30,
        alignItems: 'center',
    },
    wheelCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFF5E6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: COLORS.secondary,
        marginVertical: 20,
        borderStyle: 'dashed',
    },
    spinButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 10,
    },
    spinBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    spinNote: {
        fontSize: 10,
        color: '#999',
    },


    spinNote: {
        fontSize: 10,
        color: '#999',
    },

    // --- New Styles ---
    styleScrollContainer: {
        paddingHorizontal: 20,
        gap: 15,
    },
    styleCard: {
        width: 85, // Further Reduced (was 100)
        height: 100, // Further Reduced (was 120)
        backgroundColor: '#FFF8F0',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFE0B2',
        padding: 6,
    },
    styleIconBox: {
        width: 40, // Reduced (was 45)
        height: 40, // Reduced (was 45)
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 1,
    },
    styleCardTitle: {
        fontSize: 10, // Reduced (was 12)
        fontWeight: 'bold',
        color: COLORS.primary, // Red Text
        textAlign: 'center',
        fontFamily: FONTS.serif,
    },
    styleCardDesc: {
        fontSize: 8,
        color: '#666',
        textAlign: 'center',
        opacity: 0.8,
    },

    patternScrollContainer: {
        paddingHorizontal: 20,
        gap: 15,
    },
    patternCard: {
        width: 110, // Reduced (was 130)
        height: 150, // Reduced (was 180)
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        backgroundColor: '#EEE',
    },
    patternImage: {
        width: '100%',
        height: '100%',
    },
    vintageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(242, 149, 2, 0.1)', // #F29502 gold warm tint
        zIndex: 1,
    },
    patternGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 12,
        zIndex: 2,
    },
    patternTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: FONTS.serif,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
});

export default MehandiScreen;
