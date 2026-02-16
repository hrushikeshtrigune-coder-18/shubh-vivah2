import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const PRIMARY_COLOR = '#CC0E0E';
const ACCENT_COLOR = '#F29502';
const BG_COLOR = '#FFFFF0';

const HoneymoonVendorDetails = ({ navigation, route }) => {
    const { vendor } = route.params || {};
    const [selectedLocation, setSelectedLocation] = useState(vendor?.locations?.[0] || null);
    const [expandedDay, setExpandedDay] = useState(0); // Index of expanded day

    // Fallback if no vendor passed (for testing)
    const currentVendor = vendor || {
        name: "Luxe Escapes",
        image: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 128,
        startPrice: "₹2.5L",
        locations: [
            { name: 'Maldives', image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1', price: '₹2.5L', duration: '5 Nights / 6 Days' },
            { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4', price: '₹1.8L', duration: '6 Nights / 7 Days' }
        ]
    };

    const handleCall = () => { Linking.openURL('tel:1234567890'); };
    const handleWhatsapp = () => { Linking.openURL('whatsapp://send?phone=1234567890'); };
    const handleEmail = () => { Linking.openURL('mailto:vendor@example.com'); };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Image source={{ uri: currentVendor.image }} style={styles.headerImage} resizeMode="cover" />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
                <Text style={styles.vendorName}>{currentVendor.name}</Text>
                <Text style={styles.tagline}>"Crafting Love Stories Across the World"</Text>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={16} color="#F29502" />
                    <Text style={styles.ratingText}>{currentVendor.rating} ({currentVendor.reviews} Reviews)</Text>
                </View>
            </View>
        </View>
    );

    const renderContactButtons = () => (
        <View style={styles.contactContainer}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="call" size={24} color="#2196F3" />
                </View>
                <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleWhatsapp}>
                <View style={[styles.iconBox, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="logo-whatsapp" size={24} color="#4CAF50" />
                </View>
                <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
                <View style={[styles.iconBox, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="mail" size={24} color="#FF9800" />
                </View>
                <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
                <View style={[styles.iconBox, { backgroundColor: '#FFEBEE' }]}>
                    <Ionicons name="document-text" size={24} color="#F44336" />
                </View>
                <Text style={styles.actionText}>Enquire</Text>
            </TouchableOpacity>
        </View>
    );

    const renderAbout = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About {currentVendor.name}</Text>
            <Text style={styles.description}>
                Specializing in luxury honeymoon experiences for over 10 years. We have curated unforgettable journeys for 500+ couples across the globe.
            </Text>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>10+</Text>
                    <Text style={styles.statLabel}>Years Exp.</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>500+</Text>
                    <Text style={styles.statLabel}>Couples</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>50+</Text>
                    <Text style={styles.statLabel}>Destinations</Text>
                </View>
            </View>

            <Text style={styles.subTitle}>Why Choose Us</Text>
            <View style={styles.perksContainer}>
                {[
                    { icon: 'diamond', text: 'Luxury Stays' },
                    { icon: 'heart', text: 'Personalized' },
                    { icon: 'wallet', text: 'Best Rates' },
                    { icon: 'shield-checkmark', text: 'Verified' },
                ].map((perk, i) => (
                    <View key={i} style={styles.perkItem}>
                        <Ionicons name={perk.icon} size={20} color={PRIMARY_COLOR} />
                        <Text style={styles.perkText}>{perk.text}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    const renderLocations = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Provided Locations</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.locationsScroll}>
                {currentVendor.locations?.map((loc, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.locationCard,
                            selectedLocation?.name === loc.name && styles.selectedLocationCard
                        ]}
                        onPress={() => setSelectedLocation(loc)}
                        activeOpacity={0.9}
                    >
                        <Image source={{ uri: currentVendor.image }} style={styles.locationImage} />
                        {/* Note: In real app, loc should have its own image. Using vendor image as fallback/placeholder if loc.image missing in mock */}
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={StyleSheet.absoluteFill} />
                        <View style={styles.locationContent}>
                            <Text style={styles.locationName}>{loc.name}</Text>
                            <Text style={styles.locationPrice}>From {currentVendor.startPrice}</Text>
                            <Text style={styles.locationDuration}>5 Nights / 6 Days</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderItinerary = () => {
        if (!selectedLocation) return null;

        const dummyItinerary = selectedLocation.itinerary || [
            { day: 'Day 1', title: 'Arrival & Welcome', desc: 'Private transfer to your luxury villa. Welcome dinner by the beach.', highlights: ['Airport Transfer', 'Welcome Drink', 'Dinner'] },
            { day: 'Day 2', title: 'Island Exploration', desc: 'Guided tour of the hidden lagoons and snorkeling spots.', highlights: ['Snorkeling', 'Boat Ride', 'Lunch'] },
            { day: 'Day 3', title: 'Leisure & Spa', desc: 'Relax at the resort spa with a couple’s massage session.', highlights: ['Spa Treatment', 'Sunset View'] },
            { day: 'Day 4', title: 'Cultural Experience', desc: 'Visit local markets and temples.', highlights: ['City Tour', 'cultural Show'] },
            { day: 'Day 5', title: 'Departure', desc: 'Breakfast and private transfer to airport.', highlights: ['Breakfast', 'Transfer'] },
        ];

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Itinerary: {selectedLocation.name}</Text>
                <Text style={styles.customNote}>* Packages can be customized as per your needs</Text>

                <View style={styles.itineraryList}>
                    {dummyItinerary.map((day, index) => {
                        const isExpanded = expandedDay === index;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dayCard, isExpanded && styles.dayCardExpanded]}
                                onPress={() => setExpandedDay(isExpanded ? -1 : index)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.dayHeader}>
                                    <View style={styles.dayBadge}>
                                        <Text style={styles.dayText}>{day.day}</Text>
                                    </View>
                                    <Text style={styles.dayTitle}>{day.title}</Text>
                                    <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color="#666" />
                                </View>
                                {isExpanded && (
                                    <Animated.View entering={FadeInUp.duration(300)} style={styles.dayBody}>
                                        <Text style={styles.dayDesc}>{day.desc}</Text>
                                        <View style={styles.highlightsContainer}>
                                            {day.highlights?.map((h, i) => (
                                                <View key={i} style={styles.highlightChip}>
                                                    <Ionicons name="checkmark-circle-outline" size={14} color={PRIMARY_COLOR} />
                                                    <Text style={styles.highlightText}>{h}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </Animated.View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {renderHeader()}
                {renderContactButtons()}
                {renderAbout()}
                {renderLocations()}
                {renderItinerary()}
            </ScrollView>

            {/* Bottom Enquiry Bar */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.bottomPrice}>Starting from {currentVendor.startPrice}</Text>
                    <Text style={styles.bottomSub}>per couple</Text>
                </View>
                <TouchableOpacity style={styles.enquireBtn}>
                    <Text style={styles.enquireBtnText}>Send Enquiry</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    headerContainer: {
        height: 350,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    backButton: {
        position: 'absolute',
        top: 50, left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
        zIndex: 10,
    },
    headerContent: {
        padding: 20,
        marginBottom: 10,
    },
    vendorName: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 32,
        color: '#FFF',
        marginBottom: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 10,
    },
    tagline: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 16,
        color: '#FFEB3B',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#FFF',
        marginLeft: 5,
        fontFamily: 'Outfit_600SemiBold',
    },

    // Contact
    contactContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#FFF',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    actionBtn: {
        alignItems: 'center',
    },
    iconBox: {
        width: 50, height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    actionText: {
        fontSize: 12,
        fontFamily: 'Outfit_500Medium',
        color: '#333',
    },

    // Example Section Styles
    sectionContainer: {
        padding: 20,
        paddingTop: 10,
    },
    sectionTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: PRIMARY_COLOR,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        fontFamily: 'Outfit_400Regular',
        marginBottom: 15,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontFamily: 'Outfit_700Bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#777',
        fontFamily: 'Outfit_400Regular',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#EEE',
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Outfit_600SemiBold',
        color: '#333',
        marginBottom: 10,
    },
    perksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    perkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0E0',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    perkText: {
        fontSize: 12,
        marginLeft: 5,
        color: '#333',
        fontFamily: 'Outfit_500Medium',
    },

    // Locations
    locationsScroll: {
        paddingRight: 20,
        gap: 15,
    },
    locationCard: {
        width: 220,
        height: 150,
        borderRadius: 15,
        overflow: 'hidden',
        position: 'relative',
    },
    selectedLocationCard: {
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
    },
    locationImage: {
        width: '100%',
        height: '100%',
    },
    locationContent: {
        position: 'absolute',
        bottom: 15, left: 15,
    },
    locationName: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Outfit_700Bold',
    },
    locationPrice: {
        color: '#FFEB3B',
        fontSize: 12,
        fontFamily: 'Outfit_600SemiBold',
    },
    locationDuration: {
        color: '#EEE',
        fontSize: 10,
    },

    // Itinerary
    customNote: {
        fontSize: 12,
        color: '#777',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    itineraryList: {
        gap: 10,
    },
    dayCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        elevation: 1,
    },
    dayCardExpanded: {
        elevation: 4,
        borderColor: PRIMARY_COLOR,
        borderWidth: 1,
    },
    dayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayBadge: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginRight: 10,
    },
    dayText: {
        fontSize: 12,
        fontFamily: 'Outfit_700Bold',
        color: '#333',
    },
    dayTitle: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Outfit_600SemiBold',
        color: '#333',
    },
    dayBody: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 10,
    },
    dayDesc: {
        fontSize: 13,
        color: '#555',
        lineHeight: 20,
        marginBottom: 10,
    },
    highlightsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    highlightChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9F9',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFE0E0',
    },
    highlightText: {
        fontSize: 11,
        marginLeft: 4,
        color: PRIMARY_COLOR,
    },

    // Bottom Bar
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        elevation: 20,
    },
    bottomPrice: {
        fontSize: 18,
        fontFamily: 'Outfit_700Bold',
        color: PRIMARY_COLOR,
    },
    bottomSub: {
        fontSize: 12,
        color: '#777',
    },
    enquireBtn: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    enquireBtnText: {
        color: '#FFF',
        fontSize: 14,
        fontFamily: 'Outfit_700Bold',
    },
});

export default HoneymoonVendorDetails;
