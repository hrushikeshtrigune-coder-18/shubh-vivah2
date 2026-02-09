import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#CC0E0E';
const ACCENT_COLOR = '#F29502';
const BG_COLOR = '#FFFFF0';

const HoneymoonVendorDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { vendor } = route.params || {};

    if (!vendor) {
        return (
            <View style={styles.errorContainer}>
                <Text>Vendor details not found.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ color: PRIMARY_COLOR, marginTop: 10 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <Image source={{ uri: vendor.image }} style={styles.heroImage} />
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BlurView intensity={50} tint="dark" style={styles.backButtonBlur}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </BlurView>
                    </TouchableOpacity>

                    <Animated.View entering={FadeInUp.delay(200)} style={styles.heroContent}>
                        <View style={styles.badgeContainer}>
                            {vendor.verified && (
                                <View style={styles.verifiedBadge}>
                                    <Ionicons name="shield-checkmark" size={14} color="#FFF" />
                                    <Text style={styles.badgeText}>Verified</Text>
                                </View>
                            )}
                            <View style={styles.ratingBadge}>
                                <Ionicons name="star" size={14} color="#F29502" />
                                <Text style={styles.badgeText}>{vendor.rating} ({vendor.reviews} Reviews)</Text>
                            </View>
                        </View>
                        <Text style={styles.vendorName}>{vendor.name}</Text>
                        <Text style={styles.priceText}>Packages from {vendor.startPrice}</Text>
                    </Animated.View>
                </View>

                {/* Details Section */}
                <Animated.View entering={FadeInDown.delay(400)} style={styles.detailsContainer}>

                    {/* Tags */}
                    <View style={styles.tagsContainer}>
                        {vendor.tags?.map((tag, index) => (
                            <View key={index} style={styles.tagChip}>
                                <Text style={styles.tagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Locations / Itineraries */}
                    <Text style={styles.sectionTitle}>Available Destinations</Text>
                    {vendor.locations?.map((loc, index) => (
                        <View key={index} style={styles.locationCard}>
                            <View style={styles.locationHeader}>
                                <View style={styles.locationIconBox}>
                                    <Ionicons name="location" size={20} color={PRIMARY_COLOR} />
                                </View>
                                <View>
                                    <Text style={styles.locationName}>{loc.name}</Text>
                                    <Text style={styles.locationCoords}>{loc.coordinates?.lat}, {loc.coordinates?.lon}</Text>
                                </View>
                            </View>

                            {loc.itinerary && (
                                <View style={styles.itineraryPreview}>
                                    <Text style={styles.itineraryTitle}>Sample Itinerary:</Text>
                                    {loc.itinerary.map((item, i) => (
                                        <View key={i} style={styles.itineraryItem}>
                                            <View style={styles.dot} />
                                            <Text style={styles.itineraryText}>
                                                <Text style={{ fontWeight: 'bold' }}>{item.day}: </Text>
                                                {item.title} - {item.desc}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}

                    {/* About Section (Placeholder if not in data) */}
                    <Text style={styles.sectionTitle}>About {vendor.name}</Text>
                    <Text style={styles.description}>
                        Experience the ultimate romantic getaway with {vendor.name}.
                        Specializing in {vendor.tags?.join(', ')}, we ensure every moment
                        of your honeymoon is crafted to perfection.
                    </Text>

                </Animated.View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={styles.bottomPrice}>{vendor.startPrice}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                    <Text style={styles.bookButtonText}>Request Quote</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContainer: {
        height: height * 0.45,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    backButtonBlur: {
        padding: 8,
        borderRadius: 20,
    },
    heroContent: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    badgeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 10,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
        color: '#333',
    },
    vendorName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 10,
        fontFamily: 'serif',
    },
    priceText: {
        fontSize: 18,
        color: '#FFEB3B',
        fontWeight: '600',
        marginTop: 5,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 5,
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: BG_COLOR,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    tagChip: {
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FFCDD2',
    },
    tagText: {
        color: PRIMARY_COLOR,
        fontSize: 13,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        fontFamily: 'serif',
    },
    locationCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: ACCENT_COLOR,
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    locationIconBox: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF3E0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    locationCoords: {
        fontSize: 12,
        color: '#888',
    },
    itineraryPreview: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    itineraryTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
    },
    itineraryItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: PRIMARY_COLOR,
        marginTop: 6,
        marginRight: 8,
    },
    itineraryText: {
        fontSize: 13,
        color: '#666',
        flex: 1,
        lineHeight: 18,
    },
    description: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
        marginBottom: 20,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        elevation: 10,
    },
    priceContainer: {
        flex: 1,
    },
    priceLabel: {
        fontSize: 12,
        color: '#888',
    },
    bottomPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    bookButton: {
        backgroundColor: PRIMARY_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        elevation: 3,
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
});

export default HoneymoonVendorDetails;
