import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
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
import Animated, {
    FadeInDown,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// --- ASSETS ---
// Replace with actual asset requirements if needed
const HERO_IMG = require('../../../../assets/images/decor.jpg');

const PRIMARY_COLOR = '#CC0E0E';
const ACCENT_COLOR = '#F29502';
const BG_COLOR = '#FFFFF0';

// --- DATA ---
const DECOR_STYLES = [
    { id: '1', title: 'Royal', icon: 'crown', color: '#FFD700' },
    { id: '2', title: 'Floral', icon: 'rose', color: '#E91E63' },
    { id: '3', title: 'Minimal', icon: 'leaf', color: '#4CAF50' },
    { id: '4', title: 'Boho', icon: 'color-wand', color: '#FF9800' },
];

const VENDORS = [
    {
        id: '1',
        name: 'Dreamy Weddings',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop',
        rating: 4.9,
        reviews: 210,
        price: '₹1.5L',
        location: 'Mumbai',
        tags: ['Mandap', 'Floral'],
        verified: true,
    },
    {
        id: '2',
        name: 'Elegant Events',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
        rating: 4.7,
        reviews: 150,
        price: '₹80k',
        location: 'Pune',
        tags: ['Lighting', 'Modern'],
        verified: true,
    },
    {
        id: '3',
        name: 'Royal Setups',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
        rating: 4.8,
        reviews: 95,
        price: '₹2.5L',
        location: 'Delhi',
        tags: ['Theme', 'Royal'],
        verified: false,
    },
];

// --- NEUMORPHIC COMPONENT ---
const Neumorph = ({ children, style, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.neumorphContainer, style]}
    >
        <View style={styles.shadowTop} />
        <View style={styles.shadowBottom} />
        <View style={styles.neumorphContent}>
            {children}
        </View>
    </TouchableOpacity>
);

const Decoration = ({ navigation }) => {
    const scrollRef = useRef(null);
    const [selectedStyle, setSelectedStyle] = useState(null);

    // --- ANIMATIONS ---
    // Floating Petals Simulation (using simple repetitive translation)
    const petalY = useSharedValue(0);

    useEffect(() => {
        petalY.value = withRepeat(
            withTimed(height, { duration: 5000 }), // Move down
            -1,
            false
        );
    }, []);

    // Helper for timing to avoid import complexity with reanimated directly sometimes
    const withTimed = (toValue, config) => withTiming(toValue, config);


    // --- RENDER SECTIONS ---

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <Image source={HERO_IMG} style={styles.heroImage} />
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.heroContent}>
                <Animated.Text entering={FadeInDown.delay(300)} style={styles.heroTitle}>
                    Where Your Wedding Comes to Life 🌸
                </Animated.Text>
                <Animated.Text entering={FadeInDown.delay(600)} style={styles.heroSub}>
                    Mandaps • Floral Styling • Theme Decor
                </Animated.Text>

                {/* Simulated Floating Petals Overlay - Simplified just dots for now */}
                <View style={styles.petalsContainer}>
                    {[...Array(5)].map((_, i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles.petal,
                                {
                                    left: `${Math.random() * 100}%`,
                                    // transform: [{ translateY: petalY }] // Simple static for scaffold
                                }
                            ]}
                        />
                    ))}
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderStyleExplorer = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Explore Decor Styles</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.styleScroll}>
                {DECOR_STYLES.map((item) => (
                    <Neumorph
                        key={item.id}
                        style={[
                            styles.styleCard,
                            selectedStyle === item.id && styles.selectedCard
                        ]}
                        onPress={() => setSelectedStyle(item.id)}
                    >
                        <Ionicons name={item.icon} size={28} color={item.color} />
                        <Text style={styles.styleText}>{item.title}</Text>
                    </Neumorph>
                ))}
            </ScrollView>
        </View>
    );

    const renderHowItWorks = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <View style={styles.stepsRow}>
                {['Style', 'Explore', 'Customize', 'Book'].map((step, i) => (
                    <View key={i} style={styles.stepItem}>
                        <View style={styles.stepCircle}>
                            <Text style={styles.stepNum}>{i + 1}</Text>
                        </View>
                        <Text style={styles.stepLabel}>{step}</Text>
                        {i < 3 && <View style={styles.stepLine} />}
                    </View>
                ))}
            </View>
        </View>
    );

    const renderVendors = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Verified Decorators</Text>
            {VENDORS.map((vendor) => (
                <View key={vendor.id} style={styles.vendorCard}>
                    <Image source={{ uri: vendor.image }} style={styles.vendorImg} />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.vendorOverlay}>
                        <View>
                            <Text style={styles.vendorName}>{vendor.name}</Text>
                            <View style={styles.vendorMeta}>
                                <Ionicons name="location" size={12} color="#DDD" />
                                <Text style={styles.metaText}>{vendor.location}</Text>
                                <View style={styles.dot} />
                                <Ionicons name="star" size={12} color="#FFD700" />
                                <Text style={styles.metaText}>{vendor.rating} ({vendor.reviews})</Text>
                            </View>
                        </View>
                        <View style={styles.priceTag}>
                            <Text style={styles.priceText}>From {vendor.price}</Text>
                        </View>
                    </LinearGradient>

                    <View style={styles.cardBody}>
                        <View style={styles.tagsRow}>
                            {vendor.tags.map((tag, i) => (
                                <View key={i} style={styles.tagBadge}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {renderHero()}
                {renderStyleExplorer()}
                {renderHowItWorks()}
                {renderVendors()}
            </ScrollView>

            {/* Sticky Action Bar */}
            <View style={styles.stickyBar}>
                <TouchableOpacity style={styles.stickyBtnOutline}>
                    <Text style={styles.stickyTextOutline}>Shortlist (0)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stickyBtnFilled}>
                    <Text style={styles.stickyTextFilled}>Talk to Expert</Text>
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
    heroContainer: {
        height: height * 0.6,
        width: '100%',
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    heroContent: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
    },
    heroTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 32,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 10,
        marginBottom: 10,
    },
    heroSub: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 16,
        color: '#F29502',
        letterSpacing: 1,
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
    petalsContainer: {
        ...StyleSheet.absoluteFillObject,
        pointerEvents: 'none',
    },
    petal: {
        position: 'absolute',
        top: -20,
        width: 10,
        height: 10,
        backgroundColor: '#FFC0CB',
        borderRadius: 5,
        opacity: 0.8,
    },

    // Sections
    sectionContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: '#333',
        marginBottom: 20,
    },

    // Neumorph
    neumorphContainer: {
        backgroundColor: '#FFFFF0',
        borderRadius: 15,
        margin: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },
    shadowTop: {
        position: 'absolute',
        top: -4, left: -4, right: 4, bottom: 4,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        opacity: 1,
    },
    shadowBottom: {
        position: 'absolute',
        top: 4, left: 4, right: -4, bottom: -4,
        backgroundColor: '#E1BEE7', // Darker shadow for pink bg
        borderRadius: 15,
        opacity: 0.4,
    },
    neumorphContent: {
        alignItems: 'center',
    },
    styleScroll: {
        paddingVertical: 10,
    },
    styleCard: {
        // base
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
    },
    styleText: {
        marginTop: 10,
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: '#555',
    },

    // How It Works
    stepsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    stepItem: {
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 30, height: 30,
        borderRadius: 15,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        zIndex: 2,
    },
    stepNum: {
        color: '#FFF',
        fontFamily: 'Outfit_700Bold',
        fontSize: 12,
    },
    stepLabel: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    stepLine: {
        position: 'absolute',
        top: 15,
        left: '50%',
        width: '100%',
        height: 2,
        backgroundColor: '#E0E0E0',
        zIndex: 1,
    },

    // Vendors
    vendorCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    vendorImg: {
        width: '100%',
        height: 220,
    },
    vendorOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 15,
    },
    vendorName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 20,
        color: '#FFF',
    },
    vendorMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    metaText: {
        color: '#EEE',
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        marginLeft: 4,
    },
    dot: {
        width: 4, height: 4,
        borderRadius: 2,
        backgroundColor: '#FFF',
        marginHorizontal: 8,
    },
    priceTag: {
        position: 'absolute',
        top: 20, right: 20,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    priceText: {
        fontFamily: 'Outfit_700Bold',
        color: PRIMARY_COLOR,
        fontSize: 12,
    },
    cardBody: {
        padding: 15,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        gap: 8,
    },
    tagBadge: {
        backgroundColor: '#FFF5F5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#F29502',
    },
    tagText: {
        fontFamily: 'Outfit_500Medium',
        color: PRIMARY_COLOR,
        fontSize: 11,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 15,
    },
    actionBtnOutline: {
        flex: 1,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionTextOutline: {
        fontFamily: 'Outfit_600SemiBold',
        color: PRIMARY_COLOR,
        fontSize: 14,
    },
    actionBtnFilled: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    actionTextFilled: {
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFF',
        fontSize: 14,
    },

    // Sticky Bar
    stickyBar: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        padding: 15,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        gap: 15,
        elevation: 10,
    },
    stickyBtnOutline: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#888',
        alignItems: 'center',
    },
    stickyTextOutline: {
        fontFamily: 'Outfit_600SemiBold',
        color: '#555',
    },
    stickyBtnFilled: {
        flex: 1,
        backgroundColor: '#333',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    stickyTextFilled: {
        fontFamily: 'Outfit_600SemiBold',
        color: '#FFF',
    },
});

export default Decoration;
