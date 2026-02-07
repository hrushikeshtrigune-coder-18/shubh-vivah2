import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

// Enable LayoutAnimation for expanding sections
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// --- 1. DESIGN SYSTEM COLORS ---
const colors = {
    saffron: '#FF9933',  // Primary CTAs, highlights
    gold: '#D4AF37',     // Premium accents
    maroon: '#800000',   // Section headers
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

const EVENTS_PLANNER = [
    {
        id: '1',
        title: 'Haldi Decor',
        status: 'In Progress',
        icon: 'sun-o',
        items: ['Marigold Drapes', 'Swing Setup', 'Yellow Backdrop'],
        previousWorkImage: require('../../../../assets/DF images/Traditional Marigold.jpg')
    },
    {
        id: '2',
        title: 'Mehendi Vibes',
        status: 'Pending',
        icon: 'hand-stop-o',
        items: ['Colorful Umbrellas', 'Lounge Seating', 'Signages'],
        previousWorkImage: require('../../../../assets/DF images/Floral Pastel.jpg')
    },
    {
        id: '3',
        title: 'Wedding Mandap',
        status: 'Planned',
        icon: 'heart-o',
        items: ['4-Pillar Mandap', 'Red Roses', 'Fire Pit Setup'],
        previousWorkImage: require('../../../../assets/DF images/Royal Heritage.jpg')
    },
];

const FLOWERS = [
    { id: '1', name: 'Marigold', type: 'Local', stock: 'High', image: { uri: 'https://images.unsplash.com/photo-1596726662887-224424754546?q=80&w=600&auto=format&fit=crop' } },
    { id: '2', name: 'Jasmine', type: 'Scented', stock: 'Med', image: { uri: 'https://plus.unsplash.com/premium_photo-1675853241484-93339bf4b105?q=80&w=600&auto=format&fit=crop' } },
    { id: '3', name: 'Red Rose', type: 'Premium', stock: 'Low', image: { uri: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop' } },
    { id: '4', name: 'Orchids', type: 'Exotic', stock: 'Med', image: { uri: 'https://images.unsplash.com/photo-1566928039233-149a4f4d2f44?q=80&w=600&auto=format&fit=crop' } },
];

const VENUE_AREAS = [
    { id: '1', area: 'Entrance', budget: '₹50k', status: 'Done' },
    { id: '2', area: 'Stage', budget: '₹2L', status: 'Pending' },
    { id: '3', area: 'Dining', budget: '₹80k', status: 'In Progress' },
];

// --- COMPONENTS ---

const ThemeCard = ({ item }) => (
    <View style={styles.themeCard}>
        <Image source={item.image} style={styles.themeImage} />
        <LinearGradient colors={['transparent', 'rgba(44,24,16,0.8)']} style={styles.themeOverlay}>
            <Text style={styles.themeText}>{item.name}</Text>
        </LinearGradient>
    </View>
);

const EventDropdown = ({ item, expanded, toggle }) => (
    <View style={[styles.eventCard, expanded && styles.eventCardExpanded]}>
        <TouchableOpacity onPress={toggle} style={[styles.eventHeader, expanded && styles.eventHeaderExpanded]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.eventIconBox}>
                    <FontAwesome5 name={item.icon} size={16} color={colors.maroon} />
                </View>
                <Text style={styles.eventTitle}>{item.title}</Text>
            </View>
            <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color={colors.textMain} />
        </TouchableOpacity>
        {expanded && (
            <View style={styles.eventBody}>
                {/* Previous Work Section */}
                <View style={styles.previousWorkContainer}>
                    <Text style={styles.previousWorkLabel}>Previous Work</Text>
                    <Image source={item.previousWorkImage} style={styles.previousWorkImage} />
                </View>

                {/* Items List */}
                <Text style={[styles.previousWorkLabel, { marginTop: 15, marginBottom: 5 }]}>Requirements</Text>
                {item.items.map((sub, idx) => (
                    <View key={idx} style={styles.eventItemRow}>
                        <Ionicons name="flower-outline" size={16} color={colors.maroon} />
                        <Text style={styles.eventItemText}>{sub}</Text>
                    </View>
                ))}
            </View>
        )}
    </View>
);

const DecorationFloralScreen = ({ navigation }) => {
    const [expandedEventId, setExpandedEventId] = useState(null);

    const toggleEvent = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedEventId(expandedEventId === id ? null : id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.ivory} />

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

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
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(44,24,16,0.7)']} style={styles.heroOverlay}>
                        <View style={styles.heroContent}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                                <Ionicons name="arrow-back" size={24} color={colors.ivory} />
                            </TouchableOpacity>
                            <Text style={styles.heroTitle}>Decoration & Floral</Text>
                            <Text style={styles.heroSubtitle}>Weaving dreams with petals & precision.</Text>
                        </View>
                    </LinearGradient>
                </View>



                {/* 2. WEDDING THEMES */}
                <View style={styles.sectionContainer}>
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
                <View style={[styles.sectionContainer, { paddingHorizontal: 20 }]}>
                    <Text style={styles.sectionHeader}>Event Planner</Text>
                    {EVENTS_PLANNER.map((event) => (
                        <EventDropdown
                            key={event.id}
                            item={event}
                            expanded={expandedEventId === event.id}
                            toggle={() => toggleEvent(event.id)}
                        />
                    ))}
                </View>

                {/* 4. FLOWER SELECTION */}
                <View style={styles.sectionContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                        <Text style={styles.sectionHeader}>Floral Selection</Text>
                        <Text style={styles.seeAll}>See All</Text>
                    </View>
                    <View style={styles.flowerGrid}>
                        {FLOWERS.map((flower) => (
                            <View key={flower.id} style={styles.flowerCard}>
                                <Image source={flower.image} style={styles.flowerImage} />
                                <View style={styles.flowerMeta}>
                                    <Text style={styles.flowerName}>{flower.name}</Text>
                                    <Text style={styles.flowerType}>{flower.type}</Text>
                                    <View style={[styles.stockBadge, { backgroundColor: flower.stock === 'Low' ? colors.maroon : colors.gold }]}>
                                        <Text style={styles.stockText}>{flower.stock} Stock</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>



                {/* 5. VENUE BREAKDOWN */}
                <View style={[styles.sectionContainer, { paddingHorizontal: 20 }]}>
                    <Text style={styles.sectionHeader}>Venue Breakdown</Text>
                    {VENUE_AREAS.map((area) => (
                        <View key={area.id} style={styles.venueRow}>
                            <View>
                                <Text style={styles.venueArea}>{area.area}</Text>
                                <Text style={styles.venueMix}>Rose • Marigold • Lights</Text>
                            </View>
                            <View style={[styles.statusPill, { backgroundColor: area.status === 'Done' ? '#E8F5E9' : '#FFF3E0' }]}>
                                <Text style={[styles.statusText, { color: area.status === 'Done' ? 'green' : colors.saffron }]}>{area.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* 7. VENDOR DETAILS (Enhanced) */}
                <View style={[styles.sectionContainer, { paddingHorizontal: 20, marginBottom: 40 }]}>
                    <Text style={styles.sectionHeader}>Usage Vendor Profile</Text>
                    <View style={styles.vendorCardEnhanced}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1544168190-79c11e018d4f?q=80&w=800&auto=format&fit=crop' }}
                            style={styles.vendorCover}
                        />
                        <View style={styles.vendorInfo}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View>
                                    <Text style={styles.vendorNameLarge}>Jay Decorators</Text>
                                    <View style={styles.vendorMetaRow}>
                                        <Ionicons name="location-outline" size={14} color={colors.textGrey} />
                                        <Text style={styles.vendorMetaText}>Mumbai, India</Text>
                                    </View>
                                </View>
                                <View style={styles.ratingBadge}>
                                    <Text style={styles.ratingText}>4.8</Text>
                                    <Ionicons name="star" size={10} color={colors.white} />
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.vendorFooter}>
                                <View>
                                    <Text style={styles.vendorLabel}>Starting From</Text>
                                    <Text style={styles.vendorPrice}>₹ 1,50,000</Text>
                                </View>
                                <TouchableOpacity style={styles.contactBtn}>
                                    <Text style={styles.contactText}>Contact Vendor</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 10. REVIEW CHEKLIST */}
                <View style={[styles.sectionContainer, { paddingHorizontal: 20 }]}>
                    <Text style={styles.sectionHeader}>Final Approval Checklist</Text>
                    <View style={styles.checklistCard}>
                        <View style={styles.checkRow}>
                            <Ionicons name="checkmark-circle" size={20} color="green" />
                            <Text style={styles.checkText}>Theme & Color Palette Approved</Text>
                        </View>
                        <View style={styles.checkRow}>
                            <Ionicons name="ellipse-outline" size={20} color={colors.maroon} />
                            <Text style={styles.checkText}>Flower Quantities Locked</Text>
                        </View>
                        <View style={styles.checkRow}>
                            <Ionicons name="ellipse-outline" size={20} color={colors.maroon} />
                            <Text style={styles.checkText}>Lighting Setup Reviewed</Text>
                        </View>
                    </View>
                </View>

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
        height: 280,
        justifyContent: 'flex-end',
    },
    heroOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backBtn: {
        position: 'absolute',
        top: 40,
        left: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    heroTitle: {
        color: colors.ivory,
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'serif',
        marginTop: 20,
    },
    heroSubtitle: {
        color: colors.gold,
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 5,
        fontWeight: '500',
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
        width: 160,
        height: 200,
        borderRadius: 15,
        marginRight: 15,
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
        padding: 15,
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
        justifyContent: 'space-between',
    },
    flowerCard: {
        width: (width - 55) / 2,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
    },
    flowerImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
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
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: colors.cardShadow,
    },
    vendorCover: {
        width: '100%',
        height: 150,
    },
    vendorInfo: {
        padding: 15,
    },
    vendorNameLarge: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textMain,
    },
    vendorMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    vendorMetaText: {
        marginLeft: 4,
        color: colors.textGrey,
        fontSize: 13,
    },
    ratingBadge: {
        backgroundColor: colors.saffron,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 3,
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
        backgroundColor: colors.textMain,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    contactText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 14,
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
        height: 150,
        borderRadius: 10,
        resizeMode: 'cover',
    },
});

export default DecorationFloralScreen;
