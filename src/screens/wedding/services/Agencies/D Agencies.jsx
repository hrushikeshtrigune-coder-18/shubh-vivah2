import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
    saffron: '#FF9933',
    gold: '#D4AF37',
    maroon: '#800000',
    ivory: '#FFFFF0',
    textMain: '#800000',
    textLight: '#5D4037',
    white: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.15)',
    surface: '#FFF8E1',
};

const AGENCIES_DATA = [
    {
        id: '1',
        name: 'Royal Heritage Weddings',
        location: 'Udaipur, Rajasthan',
        rating: 4.9,
        reviews: 128,
        description: 'Majestic palace weddings with royal perfection and modern luxury.',
        image: require('../../../../../assets/images/venue1.jpg'),
    },
    {
        id: '2',
        name: 'Elite Event Curators',
        location: 'Mumbai, Maharashtra',
        rating: 4.8,
        reviews: 215,
        description: 'Bespoke high-profile planning merging contemporary and cultural roots.',
        image: require('../../../../../assets/images/photo.jpg'),
    },
    {
        id: '3',
        name: 'Vedic Vows Planners',
        location: 'Pune, Maharashtra',
        rating: 4.7,
        reviews: 95,
        description: 'Bringing ancient traditions to life with elegant management flare.',
        image: require('../../../../../assets/images/decor.jpg'),
    },
    {
        id: '4',
        name: 'Golden Glow Agencies',
        location: 'Goa',
        rating: 4.8,
        reviews: 154,
        description: 'Luxury destination beach weddings with premium thematic coordination.',
        image: require('../../../../../assets/images/Food.jpg'),
    }
];

const AgencyCard = ({ agency, index, fadeAnim, navigation }) => {
    return (
        <Animated.View
            style={[
                styles.cardContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        {
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [20, 0]
                            })
                        },
                        {
                            scale: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.95, 1]
                            })
                        }
                    ]
                }
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.cardInner}
                onPress={() => navigation.navigate('WAgenciesScreen', { agency })}
            >
                {/* Image Section - Left Sticky Column */}
                <View style={styles.imageColumn}>
                    <Image source={agency.image} style={styles.agencyThumbnail} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.4)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={styles.premiumRibbon}>
                        <Ionicons name="ribbon" size={12} color="#FFF" />
                    </View>
                </View>

                {/* Info Section - Right side */}
                <View style={styles.infoColumn}>
                    <View style={styles.cardHeader}>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={10} color={COLORS.gold} />
                            <Text style={styles.ratingText}>{agency.rating}</Text>
                        </View>
                        <Text style={styles.locationTextBrief}>{agency.location}</Text>
                    </View>

                    <Text style={styles.agencyNameCompact} numberOfLines={1}>{agency.name}</Text>
                    <Text style={styles.agencyDescCompact} numberOfLines={2}>{agency.description}</Text>

                    <View style={styles.cardActionRow}>
                        <View style={styles.reviewsBrief}>
                            <Text style={styles.reviewsTextSmall}>{agency.reviews} ⭐ Reviews</Text>
                        </View>
                        <View style={styles.exploreTrigger}>
                            <Text style={styles.exploreText}>View Details</Text>
                            <Ionicons name="chevron-forward" size={12} color={COLORS.maroon} />
                        </View>
                    </View>
                </View>

                {/* Decorative Traditional Element */}
                <View style={styles.modernTraditionalMarker} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const DAgencies = () => {
    const navigation = useNavigation();
    const fadeAnims = useRef(AGENCIES_DATA.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        Animated.stagger(100, fadeAnims.map(anim =>
            Animated.spring(anim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            })
        )).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Background Pattern Layer */}
            <View style={[StyleSheet.absoluteFill, { opacity: 0.03 }]}>
                <ImageBackground
                    source={require('../../../../../assets/images/venue1.jpg')} // Using as a subtle texture
                    style={StyleSheet.absoluteFill}
                    blurRadius={50}
                />
            </View>

            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <BlurView intensity={20} tint="light" style={styles.backBlur}>
                        <Ionicons name="arrow-back" size={22} color={COLORS.maroon} />
                    </BlurView>
                </TouchableOpacity>
                <View style={styles.titleArea}>
                    <Text style={styles.headerTitleTiny}>Discover Premium</Text>
                    <Text style={styles.headerSubtitleMain}>Wedding Agencies</Text>
                </View>
                <TouchableOpacity style={styles.searchFloating}>
                    <Ionicons name="search" size={20} color={COLORS.maroon} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Horizontal Category Pill Scroll could go here */}

                <View style={styles.listWrapper}>
                    {AGENCIES_DATA.map((agency, index) => (
                        <AgencyCard
                            key={agency.id}
                            agency={agency}
                            index={index}
                            fadeAnim={fadeAnims[index]}
                            navigation={navigation}
                        />
                    ))}
                </View>

                {/* Footer Insight */}
                <View style={styles.pageFooter}>
                    <View style={styles.footerLine} />
                    <Ionicons name="diamond" size={16} color={COLORS.gold} />
                    <View style={styles.footerLine} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(212, 175, 55, 0.1)',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    backBlur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    titleArea: {
        alignItems: 'center',
    },
    headerTitleTiny: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.gold,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    headerSubtitleMain: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.maroon,
        fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'serif',
    },
    searchFloating: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(128,0,0,0.05)',
        borderRadius: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 40,
    },
    listWrapper: {
        gap: 12,
    },
    cardContainer: {
        elevation: 6,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    cardInner: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 24,
        height: 140, // Much more compact
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.12)',
    },
    imageColumn: {
        width: 120,
        height: '100%',
    },
    agencyThumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    premiumRibbon: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.maroon,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.gold,
    },
    infoColumn: {
        flex: 1,
        padding: 14,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        gap: 3,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.maroon,
    },
    locationTextBrief: {
        fontSize: 10,
        color: COLORS.textLight,
        fontWeight: 'bold',
    },
    agencyNameCompact: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.maroon,
        marginBottom: 4,
    },
    agencyDescCompact: {
        fontSize: 11,
        color: COLORS.textLight,
        lineHeight: 15,
        fontWeight: '500',
        opacity: 0.8,
    },
    cardActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    reviewsBrief: {
        backgroundColor: 'rgba(128,0,0,0.03)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    reviewsTextSmall: {
        fontSize: 9,
        fontWeight: 'bold',
        color: COLORS.gold,
    },
    exploreTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    exploreText: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.maroon,
    },
    modernTraditionalMarker: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        backgroundColor: COLORS.gold,
        opacity: 0.05,
        borderTopLeftRadius: 30,
    },
    pageFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        gap: 15,
        opacity: 0.4,
    },
    footerLine: {
        width: 40,
        height: 1,
        backgroundColor: COLORS.gold,
    }
});

export default DAgencies;
