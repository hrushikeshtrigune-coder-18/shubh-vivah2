import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Dummy Data
const CUISINES = [
    { id: '1', name: 'North Indian', image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=400&auto=format&fit=crop' },
    { id: '2', name: 'South Indian', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=400&auto=format&fit=crop' },
    { id: '3', name: 'Jain', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
    { id: '4', name: 'Gujarati', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400&auto=format&fit=crop' },
    { id: '5', name: 'Mughlai', image: 'https://images.unsplash.com/photo-1631515243349-e06051a09871?q=80&w=400&auto=format&fit=crop' },
    { id: '6', name: 'Continental', image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f959?q=80&w=400&auto=format&fit=crop' },
    { id: '7', name: 'Italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=400&auto=format&fit=crop' },
    { id: '8', name: 'Live Counters', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400&auto=format&fit=crop' },
    { id: '9', name: 'Desserts & Chaat', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop' },
];

const CATERERS_DATA = [
    {
        id: '1',
        name: 'Royal Feast Catering',
        rating: 4.8,
        reviews: 124,
        location: 'Pune, MH',
        priceVeg: 800,
        priceNonVeg: 1100,
        capacity: '300-1500 guests',
        specialties: ['Live Counters', 'Custom Menu', 'Jain Friendly'],
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Gourmet Delights',
        rating: 4.5,
        reviews: 89,
        location: 'Mumbai, MH',
        priceVeg: 1200,
        priceNonVeg: 1500,
        capacity: '500-2000 guests',
        specialties: ['Multi-Cuisine', 'Luxury Presentation'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Spice Symphony',
        rating: 4.9,
        reviews: 210,
        location: 'Delhi, NCR',
        priceVeg: 1500,
        priceNonVeg: 1800,
        capacity: '200-1000 guests',
        specialties: ['Mughlai', 'North Indian', 'Live Chaat'],
        image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
    },
];

const TESTIMONIALS = [
    {
        id: '1',
        couple: 'Aditi & Rohan',
        initials: 'AR',
        event: 'Wedding Reception',
        caterer: 'Royal Feast Catering',
        quote: '“Our guests are still talking about the food! The live counters were a hit.”',
        image: 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=600&auto=format&fit=crop',
        tags: ['300 Guests', 'Live Counters', 'Pune'],
    },
    {
        id: '2',
        couple: 'Priya & Vikram',
        initials: 'PV',
        event: 'Sangeet Night',
        caterer: 'Spice Symphony',
        quote: '“Absolutely delicious spread and impeccable service. Highly recommended!”',
        image: 'https://images.unsplash.com/photo-1583939003579-73013917c9dd?q=80&w=600&auto=format&fit=crop',
        tags: ['500 Guests', 'Multi-Cuisine', 'Mumbai'],
    },
];

const Food = ({ navigation }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop' }}
                style={styles.heroImage}
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                    style={styles.heroGradient}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>Delight Your Guests with Unforgettable Flavours 🍽️</Text>
                        <Text style={styles.heroSubtitle}>Wedding Catering • Live Counters • Custom Menus • Luxury Presentation</Text>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
                            <TextInput
                                placeholder="Search by cuisine, city, or budget…"
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>

            {/* Quick Highlights */}
            <View style={styles.highlightsContainer}>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="chef-hat" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>300+ Verified{'\n'}Caterers</Text>
                </View>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="silverware-clean" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>Multi-Cuisine{'\n'}Experts</Text>
                </View>
                <View style={styles.highlightItem}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#CC0E0E" />
                    </View>
                    <Text style={styles.highlightText}>Quality &{'\n'}Hygiene Assured</Text>
                </View>
            </View>


        </View>
    );

    const renderCuisines = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Explore by Cuisine</Text>
            <FlatList
                data={CUISINES}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cuisineCard}>
                        <Image source={{ uri: item.image }} style={styles.cuisineImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            style={styles.cuisineGradient}
                        >
                            <Text style={styles.cuisineName}>{item.name}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    const renderCatererCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <TouchableOpacity style={styles.saveButton}>
                <Ionicons name="heart-outline" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFF" />
                        <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>{item.location}</Text>
                </View>

                <View style={styles.priceRow}>
                    <View style={styles.priceItem}>
                        <Text style={styles.priceLabel}>Veg</Text>
                        <Text style={styles.priceValue}>₹{item.priceVeg}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.priceItem}>
                        <Text style={styles.priceLabel}>Non-Veg</Text>
                        <Text style={styles.priceValue}>₹{item.priceNonVeg}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="people-outline" size={16} color="#666" />
                    <Text style={styles.infoText}>Ideal for: {item.capacity}</Text>
                </View>

                <View style={styles.chipContainer}>
                    {item.specialties.map((spec, index) => (
                        <View key={index} style={styles.chip}>
                            <Text style={styles.chipText}>{spec}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.ctaButton} onPress={() => { }}>
                    <Text style={styles.ctaText}>View Menu & Packages</Text>
                    <Ionicons name="arrow-forward" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderTestimonials = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Real Weddings, Real Flavours</Text>
            <FlatList
                data={TESTIMONIALS}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.snapshotCard}>
                        {/* Background Quote Icon */}
                        <MaterialCommunityIcons name="format-quote-close" size={100} color="rgba(204, 14, 14, 0.05)" style={styles.bgQuoteIcon} />

                        <View style={styles.snapshotHeader}>
                            <Image source={{ uri: item.image }} style={styles.snapshotAvatar} />
                            <View>
                                <Text style={styles.snapshotCouple}>{item.couple}</Text>
                                <Text style={styles.snapshotEvent}>{item.event}</Text>
                            </View>
                        </View>

                        <Text style={styles.snapshotQuote}>{item.quote}</Text>

                        <View style={styles.snapshotTags}>
                            {item.tags.map((tag, idx) => (
                                <View key={idx} style={styles.snapshotTag}>
                                    <Text style={styles.snapshotTagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
        </View>
    );

    const renderInteractiveTools = () => (
        <View style={styles.toolsContainer}>
            <Text style={styles.sectionTitle}>Plan Your Feast Smarter</Text>
            <View style={styles.toolsGrid}>
                {/* Menu Planner - Dominant Card */}
                <TouchableOpacity
                    style={[styles.toolCard, styles.menuPlannerCard]}
                    onPress={() => {
                        setModalContent('Menu Planner feature coming soon!');
                        setModalVisible(true);
                    }}
                >
                    <View style={styles.mostUsedBadge}>
                        <Text style={styles.mostUsedText}>Most Used by Couples 💍</Text>
                    </View>
                    <View style={[styles.toolIcon, { backgroundColor: '#FFF3E0' }]}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={32} color="#E65100" />
                    </View>
                    <Text style={styles.toolTitleLarge}>Menu Planner</Text>
                    <Text style={styles.toolDesc}>Curate your perfect spread with our smart tool</Text>
                </TouchableOpacity>

                {/* Budget Calculator - Smaller Card */}
                <TouchableOpacity
                    style={[styles.toolCard, styles.budgetCard]}
                    onPress={() => {
                        setModalContent('Budget Calculator feature coming soon!');
                        setModalVisible(true);
                    }}
                >
                    <View style={[styles.toolIcon, { backgroundColor: '#E0F7FA' }]}>
                        <MaterialCommunityIcons name="calculator" size={24} color="#006064" />
                    </View>
                    <Text style={styles.toolTitle}>Budget{'\n'}Calculator</Text>
                </TouchableOpacity>
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
                {renderCuisines()}

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Top Rated Caterers</Text>
                    {CATERERS_DATA.map(item => (
                        <View key={item.id}>
                            {renderCatererCard({ item })}
                        </View>
                    ))}
                </View>

                {renderTestimonials()}
                {renderInteractiveTools()}

                {/* Emotional Storytelling */}
                <View style={styles.storyContainer}>
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=800&auto=format&fit=crop' }}
                        style={styles.storyImage}
                        imageStyle={{ borderRadius: 20 }}
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
                            style={styles.storyOverlay}
                        >
                            <Text style={styles.storyText}>“Because great food turns celebrations into lifelong memories.”</Text>
                        </LinearGradient>
                    </ImageBackground>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Modal for Tools */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalContent}</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0', // Updated Background
    },
    headerContainer: {
        marginBottom: 20,
    },
    heroImage: {
        width: width,
        height: 400,
        justifyContent: 'flex-end',
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
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    heroContent: {
        marginTop: 60,
    },
    heroTitle: {
        fontFamily: 'Outfit_700Bold', // Ensuring it is Outfit_700Bold
        fontSize: 28,
        color: '#FFF',
        marginBottom: 10,
        lineHeight: 36,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 16,
        color: '#FFEB3B', // Updated to Bright Yellow
        marginBottom: 20,
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#CC0E0E',
    },
    highlightsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        marginTop: -30,
        marginHorizontal: 15,
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    highlightItem: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    highlightText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11, // Increased from 10
        color: '#CC0E0E',
        textAlign: 'center',
    },
    tagContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 15,
        gap: 10,
    },
    tag: {
        backgroundColor: '#FFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    tagText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13, // Increased from 12
        color: '#F29502',
    },
    sectionContainer: {
        marginTop: 25,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#CC0E0E', // Ensuring it is Red
        marginBottom: 15,
    },
    cuisineCard: {
        marginRight: 15,
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502',
    },
    cuisineImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cuisineGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        justifyContent: 'flex-end',
        padding: 8,
    },
    cuisineName: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#FFF',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    saveButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },
    cardContent: {
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    cardTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 18,
        color: '#CC0E0E',
        flex: 1,
        marginRight: 10,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F29502',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
    },
    ratingText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 10,
        color: '#FFF',
        marginLeft: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14, // Increased from 13
        color: '#F29502',
        marginLeft: 6,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFF0',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    priceItem: {
        flex: 1,
        alignItems: 'center',
    },
    priceLabel: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12, // Increased from 11
        color: '#F29502',
    },
    priceValue: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15, // Increased from 14
        color: '#CC0E0E',
    },
    divider: {
        width: 1,
        height: '80%',
        backgroundColor: '#F29502',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 15,
    },
    chip: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    chipText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12, // Increased from 11
        color: '#CC0E0E',
    },
    ctaButton: {
        backgroundColor: '#CC0E0E',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    ctaText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#FFF',
        marginRight: 8,
    },
    snapshotCard: {
        width: width - 60,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#F29502',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    bgQuoteIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },
    snapshotHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    snapshotAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#F29502',
    },
    snapshotCouple: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
    },
    snapshotEvent: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#666',
    },
    snapshotQuote: {
        fontFamily: 'Outfit_400Regular', // Normal weight for readability
        fontSize: 15,
        fontStyle: 'italic',
        color: '#444',
        marginBottom: 15,
        lineHeight: 24,
    },
    snapshotTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    snapshotTag: {
        backgroundColor: '#FFF3E0',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    snapshotTagText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 11,
        color: '#E65100',
    },

    // Tools Section
    toolsContainer: {
        paddingHorizontal: 15,
        marginTop: 30,
    },
    toolsGrid: {
        flexDirection: 'row',
        gap: 15,
    },
    toolCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#F29502',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuPlannerCard: {
        flex: 2, // Larger card
        backgroundColor: '#FFF',
        paddingTop: 25, // Space for badge
    },
    budgetCard: {
        flex: 1, // Smaller card
    },
    mostUsedBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#CC0E0E',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    mostUsedText: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 9,
        color: '#FFF',
    },
    toolIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    toolTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#CC0E0E',
        textAlign: 'center',
    },
    toolTitleLarge: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#CC0E0E',
        textAlign: 'center',
        marginBottom: 4,
    },
    toolDesc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 11,
        color: '#888',
        textAlign: 'center',
        marginTop: 5,
    },

    // Story Section
    storyContainer: {
        margin: 15,
        marginTop: 30,
        borderRadius: 20,
        overflow: 'hidden',
        height: 180, // Reduced from 250
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
        padding: 20,
    },
    storyText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16, // Slightly reduced
        color: '#FFF',
        textAlign: 'center',
        lineHeight: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFF0', // Updated Background
        padding: 25,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        elevation: 10,
        borderWidth: 1,
        borderColor: '#F29502', // Accent Border
    },
    modalText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 16,
        color: '#CC0E0E', // Main Text Color
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#CC0E0E', // Main Color
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    modalButtonText: {
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFF',
        fontSize: 14,
    },
});

export default Food;