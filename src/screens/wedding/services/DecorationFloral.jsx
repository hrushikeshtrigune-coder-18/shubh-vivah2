import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



const { width } = Dimensions.get('window');

// --- 1. DESIGN SYSTEM COLORS ---
const colors = {
    saffron: '#FF9933',  // Primary CTAs, highlights
    gold: '#D4AF37',     // Premium accents
    maroon: '#800000',   // Section headers
    kumkum: '#A70002',   // Kumkum Red
    ivory: '#FFFFF0',    // Backgrounds
    textMain: '#2C1810', // Readable text
    white: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.3)',
    cardShadow: '#2C1810'
};

// --- DATA MOCKS ---
const THEMES = [
    { id: '1', name: 'Royal Heritage', image: require('../../../../assets/DF images/Royal Heritage.jpg') },
    { id: '2', name: 'Floral Pastel', image: require('../../../../assets/DF images/Floral Pastel.jpg') },
    { id: '3', name: 'Traditional Marigold', image: require('../../../../assets/DF images/Traditional Marigold.jpg') },
    { id: '4', name: 'Modern Minimal', image: require('../../../../assets/DF images/Modern Minimal.jpg') },
];



const REAL_STORIES = [
    {
        id: '1',
        title: 'Royal Heritage',
        couple: 'Aditi & Rahul',
        image: require('../../../../assets/images/Royal Heritage 2.jpg'),
        icon: 'heart'
    },
    {
        id: '2',
        title: 'Beachside Bliss',
        couple: 'Priya & Arjun',
        image: require('../../../../assets/images/Beachside Bliss.jpg'),
        icon: 'sunny'
    },
    {
        id: '3',
        title: 'Floral Fantasy',
        couple: 'Sita & Ram',
        image: require('../../../../assets/images/Floral Fantasy.jpg'),
        icon: 'leaf'
    },
];

const TESTIMONIALS = [
    {
        id: '1',
        text: "Absolutely dreamy decor! The team understood our vision perfectly.",
        author: "Ananya S.",
        rating: 5
    },
    {
        id: '2',
        text: "Professional, timely, and stunningly beautiful work.",
        author: "Vikram R.",
        rating: 5
    },
    {
        id: '3',
        text: "They transformed the venue into a fairytale. Highly recommended!",
        author: "Meera K.",
        rating: 4
    }
];

const VENDORS = [
    {
        id: '1',
        name: 'Rohan Mehta',
        location: 'Mumbai, India',
        rating: 4.9,
        price: '₹1,50,000',
        image: { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop' }
    },
    {
        id: '2',
        name: 'Kavya Singh',
        location: 'Delhi, India',
        rating: 4.7,
        price: '₹2,00,000',
        image: require('../../../../assets/images/venue1.jpg')
    },
    {
        id: '3',
        name: 'Ishaan Malhotra',
        location: 'Udaipur, India',
        rating: 5.0,
        price: '₹5,00,000',
        image: require('../../../../assets/images/venue2.jpg')
    },
    {
        id: '4',
        name: 'Aarav joshi',
        location: 'Bangalore, India',
        rating: 4.6,
        price: '₹1,20,000',
        image: require('../../../../assets/images/venue3.jpg')
    }
];

// --- COMPONENTS ---

const StoryCard = ({ item }) => (
    <View style={styles.storyCard}>
        <Image source={item.image} style={styles.storyImage} />
        <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.storyOverlay}
        >
            <View style={styles.storyContent}>
                <Ionicons name={item.icon} size={20} color={colors.gold} style={{ marginBottom: 5 }} />
                <Text style={styles.storyTitle}>{item.title}</Text>
                <Text style={styles.storyCouple}>{item.couple}</Text>
            </View>
        </LinearGradient>
    </View>
);

const TestimonialCard = ({ item }) => (
    <View style={styles.testimonialCard}>
        <View style={styles.quoteIcon}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color={colors.saffron} />
        </View>
        <Text style={styles.testimonialText}>"{item.text}"</Text>
        <View style={styles.testimonialFooter}>
            <Text style={styles.testimonialAuthor}>- {item.author}</Text>
            <View style={{ flexDirection: 'row' }}>
                {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" size={12} color={colors.gold} />
                ))}
            </View>
        </View>
    </View>
);

const VendorCard = ({ item, navigation }) => (
    <View style={[styles.vendorCardEnhanced, { width: 280, marginRight: 20 }]}>
        <View>
            <Image
                source={item.image}
                style={styles.vendorCover}
            />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.vendorImageOverlay}
            />
            <View style={styles.cardFloatingBadges}>
                <View style={styles.ratingBadgeFloating}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Ionicons name="star" size={10} color={colors.white} />
                </View>
                <TouchableOpacity style={styles.favoriteBtn}>
                    <Ionicons name="heart-outline" size={18} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.vendorInfo}>
            <Text style={styles.vendorNameLarge}>{item.name}</Text>
            <View style={styles.vendorMetaRow}>
                <Ionicons name="location-sharp" size={14} color={colors.saffron} />
                <Text style={styles.vendorMetaText}>{item.location}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.vendorFooter}>
                <View>
                    <Text style={styles.vendorLabel}>Starting from</Text>
                    <Text style={styles.vendorPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => navigation.navigate('DecorPortfolio', { vendor: item })}
                >
                    <Text style={styles.contactBtnText}>View Portfolio</Text>
                    <Ionicons name="arrow-forward" size={14} color={colors.white} style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const ThemeCard = ({ item }) => (
    <View style={styles.themeCard}>
        <Image source={item.image} style={styles.themeImage} />
        <LinearGradient colors={['transparent', 'rgba(44,24,16,0.8)']} style={styles.themeOverlay}>
            <Text style={styles.themeText}>{item.name}</Text>
        </LinearGradient>
    </View>
);



const DecorationFloralScreen = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [themesY, setThemesY] = useState(0);

    const scrollToThemes = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: themesY, animated: true });
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.ivory} />

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >

                {/* 1. HERO BANNER (VIDEO) */}
                <View style={styles.heroBanner}>
                    <Video
                        source={require('../../../../assets/videos/decoration_hero.mp4')}
                        style={StyleSheet.absoluteFill}
                        resizeMode={ResizeMode.COVER}
                        shouldPlay
                        isLooping
                        isMuted
                    />
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.heroOverlay}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Ionicons name="arrow-back" size={24} color={colors.ivory} />
                        </TouchableOpacity>

                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>Because Some Moments Deserve to be Beautiful</Text>

                            <Text style={styles.heroSubtitle}>
                                <Text style={{ color: colors.gold }}>Floral</Text> • <Text style={{ color: colors.gold }}>Thematic</Text> • <Text style={{ color: colors.gold }}>Luxury</Text> • <Text style={{ color: colors.gold }}>Destination</Text>
                            </Text>

                            <TouchableOpacity style={styles.heroCTA} onPress={scrollToThemes}>
                                <Ionicons name="heart" size={20} color={colors.white} style={{ marginRight: 8 }} />
                                <Text style={styles.heroCTAText}>Plan My Decor</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Floating Stats Bar */}
                        <View style={styles.statsBar}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>500+</Text>
                                <Text style={styles.statLabel}>Verified Decorators</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>4.8 <Ionicons name="star" size={14} color={colors.gold} /></Text>
                                <Text style={styles.statLabel}>Average Rating</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>100%</Text>
                                <Text style={styles.statLabel}>Quality Guaranteed</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>



                {/* 2. WEDDING THEMES */}
                <View
                    style={styles.sectionContainer}
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        setThemesY(layout.y);
                    }}
                >
                    <Text style={styles.sectionHeader}>Curated Themes</Text>
                    <FlatList
                        data={THEMES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <ThemeCard item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                    />
                </View>

                {/* 3. EVENT PLANNER */}




                {/* 3. VENDOR DETAILS (Moved Up & Horizontal List) */}
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginBottom: 15 }}>
                        <Text style={styles.sectionHeader}>Featured Vendors</Text>
                        <Text style={styles.seeAll}>See All</Text>
                    </View>
                    <FlatList
                        data={VENDORS}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <VendorCard item={item} navigation={navigation} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                    />
                </View>

                {/* 4. REAL EVENTS & STORIES */}
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center', marginBottom: 15 }}>
                        <Text style={styles.sectionHeader}>Real Events & Stories</Text>
                        <Text style={styles.seeAll}>View All</Text>
                    </View>
                    <FlatList
                        data={REAL_STORIES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <StoryCard item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                    />
                </View>

                {/* 5. CLIENT LOVE (Testimonials) */}
                <View style={[styles.sectionContainer, { marginTop: 10, marginBottom: 40 }]}>
                    <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>Client Love</Text>
                    <FlatList
                        data={TESTIMONIALS}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <TestimonialCard item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                    />
                </View>

                {/* 6. WHY BOOK WITH US */}
                <View style={[styles.sectionContainer, { paddingHorizontal: 20, marginBottom: 80 }]}>
                    <Text style={styles.sectionHeader}>Why Book With Us?</Text>
                    <View style={styles.whyUsContainer}>
                        <View style={[styles.whyUsItem, { backgroundColor: '#F0F8FF' }]}>
                            <View style={[styles.whyUsIconBox, { backgroundColor: '#FFFFFF' }]}>
                                <Ionicons name="ribbon-outline" size={26} color="#1565C0" />
                            </View>
                            <Text style={styles.whyUsTitle}>Trusted Vendors</Text>
                            <Text style={styles.whyUsDesc}>Verified professionals for your big day.</Text>
                        </View>
                        <View style={[styles.whyUsItem, { backgroundColor: '#F1F8E9' }]}>
                            <View style={[styles.whyUsIconBox, { backgroundColor: '#FFFFFF' }]}>
                                <Ionicons name="wallet-outline" size={26} color="#2E7D32" />
                            </View>
                            <Text style={styles.whyUsTitle}>Best Prices</Text>
                            <Text style={styles.whyUsDesc}>Transparent pricing with no hidden costs.</Text>
                        </View>
                        <View style={[styles.whyUsItem, { backgroundColor: '#FFF8E1' }]}>
                            <View style={[styles.whyUsIconBox, { backgroundColor: '#FFFFFF' }]}>
                                <Ionicons name="chatbubbles-outline" size={26} color="#EF6C00" />
                            </View>
                            <Text style={styles.whyUsTitle}>Verified Reviews</Text>
                            <Text style={styles.whyUsDesc}>Real feedback from real couples.</Text>
                        </View>
                    </View>
                </View>

                {/* 10. REVIEW CHEKLIST */}


            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ivory,
    },
    // Hero
    heroBanner: {
        width: width,
        height: 480, // Increased height for new layout
        justifyContent: 'flex-end',
        marginBottom: 50, // Space for the floating stats bar overlap if needed, or visual breathing room
    },
    heroOverlay: {
        flex: 1,
        justifyContent: 'flex-end', // Align content to bottom
        paddingHorizontal: 20,
        paddingBottom: 80, // Space for stats bar
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.4)', // Darker background for visibility
        borderRadius: 20,
        zIndex: 10,
    },
    heroContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    heroTitle: {
        color: colors.white, // Reverted to White as per request
        fontSize: 32,
        fontWeight: '800', // Extra bold
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 10,
        textShadowColor: 'rgba(255,255,255,0.3)', // Lighter shadow for contrast
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    heroSubtitle: {
        color: colors.gold,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 25,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    heroCTA: {
        flexDirection: 'row',
        backgroundColor: '#D32F2F', // Red color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    heroCTAText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Stats Bar
    statsBar: {
        position: 'absolute',
        bottom: -30, // Floating effect partial overlap
        left: 20,
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 15,
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 8, // High elevation for floating look
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        zIndex: 20,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: '#D32F2F', // Red to match CTA
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        color: '#555',
        fontSize: 10,
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: '70%',
        backgroundColor: '#eee',
    },

    // Sections
    sectionContainer: {
        marginBottom: 25,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.maroon,
        fontFamily: 'serif',
        marginBottom: 15,
        paddingHorizontal: 20, // Default padding for headers
    },
    // Themes
    themeCard: {
        width: 110,
        height: 150,
        borderRadius: 15,
        marginRight: 10,
        overflow: 'hidden',
    },
    themeImage: {
        width: '100%',
        height: '100%',
    },
    themeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        justifyContent: 'flex-end',
        padding: 10,
    },
    themeText: {
        color: colors.ivory,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    // Events
    // Events
    eventCard: {
        backgroundColor: '#FFFBEA', // Cream background (matches header in image)
        borderRadius: 12,
        marginBottom: 10,
        elevation: 1, // Softer shadow
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F5E6C1', // Light gold/cream border
    },
    eventCardExpanded: {
        backgroundColor: colors.white, // Body becomes white when expanded
        borderColor: '#F1E3C4',
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFFBEA', // Match card bg
    },
    eventHeaderExpanded: {
        backgroundColor: '#FFFBEA', // Keep header cream even when expanded
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',
    },
    eventIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(128, 0, 0, 0.08)', // Light maroon tint
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4A2C2A', // Darker brown/maroon for text
    },
    eventBody: {
        padding: 12,
        backgroundColor: colors.white,
    },
    eventItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    eventItemText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#5D4037', // Brownish grey text
        fontWeight: '500',
    },
    // Flowers
    flowerGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    flowerCard: {
        width: (width - 70) / 3, // Changed to 3 columns
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        // Improved shadow/elevation
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    flowerImage: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        resizeMode: 'cover',
    },
    flowerMeta: {
        padding: 10,
    },
    flowerName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.textMain,
    },
    flowerType: {
        fontSize: 12,
        color: colors.textGrey,
        marginTop: 2,
    },
    stockBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 6,
    },
    stockText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    seeAll: {
        color: colors.saffron,
        fontWeight: 'bold',
        fontSize: 14,
    },
    // Venue
    venueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    venueArea: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.textMain,
    },
    venueBudget: {
        fontSize: 13,
        color: colors.gold,
        fontWeight: '600',
        marginTop: 2,
    },
    statusPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    // Moodboard
    moodboardItem: {
        marginRight: 15,
        borderRadius: 12,
        backgroundColor: colors.white,
        padding: 8,
        elevation: 2,
    },
    moodboardImage: {
        width: 140,
        height: 180,
        borderRadius: 8,
        marginBottom: 8,
    },
    colorPalette: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    swatch: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginHorizontal: 3,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    addMoodBtn: {
        width: 140,
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.maroon,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
    },
    addMoodText: {
        marginTop: 5,
        color: colors.maroon,
        fontWeight: 'bold',
    },
    // Venue Mix
    venueMix: {
        fontSize: 12,
        color: colors.textGrey,
        marginTop: 2,
        fontStyle: 'italic',
    },
    // Timeline
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    timelineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.saffron,
        marginTop: 5,
        marginRight: 12,
    },
    timelineContent: {
        flex: 1,
    },
    timelineTime: {
        fontSize: 12,
        color: colors.textGrey,
        fontWeight: '600',
    },
    timelineEvent: {
        fontSize: 14,
        color: colors.textMain,
    },
    // Checklist
    checklistCard: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        marginBottom: 20,
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkText: {
        marginLeft: 10,
        fontSize: 15,
        color: colors.textMain,
    },
    // Vendor Enhanced
    vendorCardEnhanced: {
        backgroundColor: colors.white,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    vendorCover: {
        width: '100%',
        height: 180,
    },
    vendorImageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    cardFloatingBadges: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingBadgeFloating: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    favoriteBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    ratingText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 4,
    },
    vendorInfo: {
        padding: 15,
    },
    vendorNameLarge: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textMain,
        marginBottom: 2,
    },
    vendorMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    vendorMetaText: {
        marginLeft: 4,
        color: colors.textGrey,
        fontSize: 13,
        fontWeight: '500',
    },
    vendorFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vendorLabel: {
        fontSize: 11,
        color: colors.textGrey,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    vendorPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.maroon,
    },
    contactBtn: {
        backgroundColor: colors.textMain,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 25,
        elevation: 3,
        shadowColor: colors.textMain,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactBtnText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 13,
    },
    divider: {
        height: 1,
        backgroundColor: '#F5F5F5',
        marginVertical: 12,
    },
    vendorFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vendorLabel: {
        fontSize: 12,
        color: colors.textGrey,
    },
    vendorPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.maroon,
    },
    contactBtn: {
        backgroundColor: colors.textMain, // Dark background
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        elevation: 2,
    },
    contactBtnText: {
        color: colors.white, // White text for contrast
        fontWeight: 'bold',
        fontSize: 12, // Adjusted for better fit
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 15,
    },
    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: width,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        elevation: 10,
    },
    totalLabel: {
        fontSize: 12,
        color: colors.textGrey,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textMain,
    },
    primaryActionBtn: {
        backgroundColor: colors.saffron,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 4,
    },
    primaryActionText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    // Previous Work Styles
    previousWorkContainer: {
        marginBottom: 15,
    },
    previousWorkLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.maroon,
        marginBottom: 8,
    },
    previousWorkImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    // Why Us
    whyUsContainer: {
        flexDirection: 'row', // Horizontal layout
        justifyContent: 'space-between', // Distribute items
        paddingHorizontal: 5, // Slight padding for shadows
    },
    whyUsItem: {
        width: (width - 60) / 3, // 3 items with padding
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 15,
        alignItems: 'center', // Center content
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    whyUsIconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    whyUsTitle: {
        fontSize: 12, // Reduced size for grid
        fontWeight: 'bold',
        color: colors.kumkum, // Updated to Kumkum color
        marginBottom: 4,
        textAlign: 'center', // Center text
    },
    whyUsDesc: {
        fontSize: 10, // Reduced size for grid
        color: colors.textGrey,
        textAlign: 'center', // Center text
        lineHeight: 14,
    },
    // Real Stories
    storyCard: {
        width: 200,
        height: 250,
        borderRadius: 15,
        marginRight: 15,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden',
    },
    storyImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    storyOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        justifyContent: 'flex-end',
        padding: 15,
    },
    storyContent: {
        justifyContent: 'flex-end',
    },
    storyTitle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    storyCouple: {
        color: colors.gold,
        fontSize: 14,
        fontWeight: '500',
    },
    // Testimonials
    testimonialCard: {
        width: 260,
        backgroundColor: '#FFF9E6', // Light cream/gold tint
        borderRadius: 15,
        padding: 20,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F5E6C1',
    },
    quoteIcon: {
        marginBottom: 10,
    },
    testimonialText: {
        fontSize: 14,
        color: '#4A3B32',
        fontStyle: 'italic',
        lineHeight: 20,
        marginBottom: 15,
    },
    testimonialFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    testimonialAuthor: {
        fontWeight: 'bold',
        color: colors.maroon,
        fontSize: 14,
    },
});

export default DecorationFloralScreen;
