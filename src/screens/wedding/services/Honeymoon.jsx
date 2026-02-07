import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Extrapolation,
    FadeInUp,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

// --- ASSETS & CONSTANTS ---
const wedImg = require('../../../../assets/images/wed.jpg');
const honeyImg = require('../../../../assets/images/honey.jpg');

const PRIMARY_COLOR = '#CC0E0E';
const ACCENT_COLOR = '#F29502';
const BG_COLOR = '#FFFFF0'; // Ivory/Cream

const HOW_IT_WORKS = [
    { id: 1, title: 'Choose Mood', icon: 'heart', desc: 'Beach, Mountain, or City?' },
    { id: 2, title: 'Pick Experience', icon: 'rose', desc: 'Candlelight dinners, Tours' },
    { id: 3, title: 'Review Plan', icon: 'map', desc: 'Day-wise itinerary check' },
    { id: 4, title: 'Confirm & Fly', icon: 'airplane', desc: 'We handle the rest' },
];

const VENDOR_CATEGORIES = [
    {
        title: "Beach Paradises 🏖️",
        vendors: [
            {
                id: '1',
                name: 'Luxe Escapes',
                image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop',
                rating: 4.9,
                reviews: 128,
                tags: ['✨ Ultra-Luxury', '🌊 Overwater Villas'],
                locations: [
                    { name: 'Maldives', coordinates: { lat: 3.2, lon: 73.2 }, itinerary: [{ day: 'Day 1', title: 'Arrival', desc: 'Speedboat transfer to private villa' }, { day: 'Day 2', title: 'Water Sports', desc: 'Snorkeling session' }] },
                    { name: 'Bali', coordinates: { lat: -8.4, lon: 115.1 }, itinerary: [{ day: 'Day 1', title: 'Ubud', desc: 'Jungle swing & rice terraces' }] },
                    { name: 'Bora Bora', coordinates: { lat: -16.5, lon: -151.7 }, itinerary: [{ day: 'Day 1', title: 'Lagoon', desc: 'Shark feeding tour' }] }
                ],
                startPrice: '₹2.5L',
                verified: true
            },
            {
                id: '3',
                name: 'Asian Wonders',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
                rating: 4.7,
                reviews: 200,
                tags: ['🌿 Eco-Conscious', '🏯 Culture'],
                locations: [
                    { name: 'Singapore', coordinates: { lat: 1.3, lon: 103.8 }, itinerary: [{ day: 'Day 1', title: 'City Tour', desc: 'Gardens by the Bay' }] },
                    { name: 'Thailand', coordinates: { lat: 15.8, lon: 100.9 }, itinerary: [{ day: 'Day 1', title: 'Phuket', desc: 'Island hopping' }] },
                    { name: 'Vietnam', coordinates: { lat: 14.0, lon: 108.2 }, itinerary: [{ day: 'Day 1', title: 'Ha Long Bay', desc: 'Cruise overnight' }] }
                ],
                startPrice: '₹1.2L',
                verified: false
            },
            {
                id: '5',
                name: 'Pacific Dreams',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
                rating: 4.8,
                reviews: 95,
                tags: ['🏄 Surfing', '🌺 Tropical'],
                locations: [
                    { name: 'Hawaii', coordinates: { lat: 19.8, lon: -155.5 }, itinerary: [{ day: 'Day 1', title: 'Honolulu', desc: 'Lei greeting' }] },
                    { name: 'Fiji', coordinates: { lat: -17.7, lon: 178.0 }, itinerary: [{ day: 'Day 1', title: 'Nadi', desc: 'Welcome ceremony' }] }
                ],
                startPrice: '₹3.5L',
                verified: true
            }
        ]
    },
    {
        title: "European Escapes 🏰",
        vendors: [
            {
                id: '2',
                name: 'Amour Travels',
                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
                rating: 4.8,
                reviews: 85,
                tags: ['🍷 Vineyards', '🏰 Fairytale Romantic'],
                locations: [
                    { name: 'Paris', coordinates: { lat: 48.8, lon: 2.3 }, itinerary: [{ day: 'Day 1', title: 'Eiffel Tower', desc: 'Dinner with a view' }] },
                    { name: 'Santorini', coordinates: { lat: 36.3, lon: 25.4 }, itinerary: [{ day: 'Day 1', title: 'Oia Sunset', desc: 'Catamaran cruise' }] },
                    { name: 'Amalfi Coast', coordinates: { lat: 40.6, lon: 14.6 }, itinerary: [{ day: 'Day 1', title: 'Positano', desc: 'Cliffside dinner' }] }
                ],
                startPrice: '₹1.8L',
                verified: true
            },
            {
                id: '4',
                name: 'Swiss Dreams',
                image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop',
                rating: 4.9,
                reviews: 56,
                tags: ['🏔️ Alps', '🍫 Chocolate Tour'],
                locations: [
                    { name: 'Zurich', coordinates: { lat: 47.3, lon: 8.5 }, itinerary: [{ day: 'Day 1', title: 'Lake Zurich', desc: 'Boat ride' }] },
                    { name: 'Zermatt', coordinates: { lat: 46.0, lon: 7.7 }, itinerary: [{ day: 'Day 1', title: 'Matterhorn', desc: 'Skiing / Hiking' }] }
                ],
                startPrice: '₹3.0L',
                verified: true
            },
            {
                id: '6',
                name: 'Mediterranean Bliss',
                image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2066&auto=format&fit=crop',
                rating: 4.6,
                reviews: 40,
                tags: ['🏛️ History', '🍝 Foodie'],
                locations: [
                    { name: 'Rome', coordinates: { lat: 41.9, lon: 12.4 }, itinerary: [{ day: 'Day 1', title: 'Colosseum', desc: 'Private tour' }] },
                    { name: 'Venice', coordinates: { lat: 45.4, lon: 12.3 }, itinerary: [{ day: 'Day 1', title: 'Gondola', desc: 'Sunset ride' }] },
                    { name: 'Barcelona', coordinates: { lat: 41.3, lon: 2.1 }, itinerary: [{ day: 'Day 1', title: 'Sagrada Familia', desc: 'Architecture tour' }] }
                ],
                startPrice: '₹1.5L',
                verified: false
            }
        ]
    }
];

const TRUST_BADGES = [
    { title: 'Verified', icon: 'shield-checkmark' },
    { title: 'Secure', icon: 'lock-closed' },
    { title: '24/7 Support', icon: 'headset' },
    { title: 'Easy Cancel', icon: 'refresh-circle' },
];

// --- COMPONENTS ---

// Neumorphic Card Wrapper
const Neumorph = ({ children, style, onPress, height = 100 }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.neumorphContainer, style, { height }]}
        >
            <View style={styles.shadowTop} />
            <View style={styles.shadowBottom} />
            <View style={styles.neumorphContent}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const VendorCard = ({ vendor, isHero, onPress, openItinerary }) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(scale.value) }]
    }));

    const handlePressIn = () => { scale.value = 0.97; };
    const handlePressOut = () => { scale.value = 1; };

    return (
        <Animated.View style={[
            styles.vendorCard,
            isHero ? styles.heroCard : styles.standardCard,
            animatedStyle
        ]}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{ flex: 1 }}
            >
                <Image source={{ uri: vendor.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />

                {/* Price Tag - Floating Top Right */}
                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>From {vendor.startPrice}</Text>
                </View>

                {/* Glassmorphism Details Panel */}
                <BlurView intensity={Platform.OS === 'ios' ? 80 : 100} tint="light" style={styles.glassInfo}>
                    <View style={styles.vendorHeader}>
                        <Text style={styles.vendorNameSerif} numberOfLines={1}>{vendor.name}</Text>
                        {vendor.verified && (
                            <Ionicons name="shield-checkmark" size={16} color="#4CAF50" style={{ marginLeft: 4 }} />
                        )}
                    </View>

                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color="#F29502" />
                        <Text style={styles.ratingText}>{vendor.rating} ({vendor.reviews})</Text>
                    </View>

                    {/* Vibe Tags Removed */
                    /* <View style={styles.tagsRow}>
                        {vendor.tags.map((tag, i) => (
                            <View key={i} style={styles.vibeTag}>
                                <Text style={styles.vibeText}>{tag}</Text>
                            </View>
                        ))}
                    </View> */}

                    {/* Destinations (Clickable) */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                        {vendor.locations.map((loc, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={styles.miniDestChip}
                                onPress={() => openItinerary(vendor.name, loc)}
                            >
                                <Ionicons name="location-sharp" size={10} color="#CC0E0E" />
                                <Text style={styles.miniDestText}>{loc.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Contact Button */}
                    <TouchableOpacity style={styles.contactBtn} onPress={onPress}>
                        <Text style={styles.contactBtnText}>Contact Us</Text>
                        <Ionicons name="chatbubble-ellipses-outline" size={14} color="#FFF" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>

                </BlurView>
            </TouchableOpacity>
        </Animated.View>
    );
};

const HoneymoonNeumorphic = ({ navigation }) => {
    // --- STATE & REFS ---
    /* Fonts loaded in App.jsx */

    const [bookingStep, setBookingStep] = useState(0); // 0 = default, 1 = loading, 2 = confirmed
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [selectedVendorName, setSelectedVendorName] = useState('');

    const scrollRef = useRef(null);

    // --- ANIMATIONS ---
    const dragX = useSharedValue(0);
    const bookScale = useSharedValue(1);
    const bookWidth = useSharedValue(200);

    // Gestures for Hero
    const pan = Gesture.Pan()
        .onChange((event) => {
            dragX.value += event.changeX;
        })
        .onFinalize(() => {
            withSpring(dragX.value = 0);
        });

    const heroTextStyle = useAnimatedStyle(() => ({
        opacity: interpolate(Math.abs(dragX.value), [0, 100], [1, 0.5], Extrapolation.CLAMP), // Keep text partially visible
    }));

    const leftImageStyle = useAnimatedStyle(() => ({
        // Static background
        opacity: 1,
    }));

    const rightImageStyle = useAnimatedStyle(() => ({
        // Right side (Honeymoon) slides over
        width: interpolate(dragX.value, [-width / 2, width / 2], [width, 0], Extrapolation.CLAMP),
    }));

    const btnStyle = useAnimatedStyle(() => ({
        transform: [{ scale: bookScale.value }],
        width: bookWidth.value,
    }));

    const handleBookNow = () => {
        if (bookingStep > 0) return;

        // Button Animation
        bookScale.value = withSpring(0.9, {}, () => {
            bookScale.value = withSpring(1);
        });

        setBookingStep(1); // Loading

        // Simulate Process
        setTimeout(() => {
            bookWidth.value = withTiming(250);
            setBookingStep(2); // Confirmed
        }, 2000);
    };

    const scrollToPlan = () => {
        scrollRef.current?.scrollTo({ y: height, animated: true });
    };

    const openItinerary = (vendorName, location) => {
        setSelectedVendorName(vendorName);
        setSelectedItinerary(location);
        setModalVisible(true);
    };

    /* Fonts checked in App.jsx */

    // --- RENDER SECTIONS ---

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <GestureDetector gesture={pan}>
                <View style={styles.splitScreen}>
                    {/* Left Side (Background - Wedding) */}
                    <Animated.View style={[styles.splitSide, styles.leftSide, leftImageStyle]}>
                        <Image source={wedImg} style={styles.heroImage} />
                        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill} />
                    </Animated.View>

                    {/* Right Side (Foreground - Honeymoon - Width Controlled) */}
                    <Animated.View style={[styles.splitSide, styles.rightSide, rightImageStyle]}>
                        <Image source={honeyImg} style={[styles.heroImage, { left: undefined, right: 0 }]} />
                        <LinearGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill} />
                    </Animated.View>

                    {/* Drag Handle */}
                    <Animated.View style={[styles.dragHandle, { transform: [{ translateX: dragX }] }]}>
                        <View style={styles.dragLine} />
                    </Animated.View>

                    {/* Text */}
                    <View style={styles.heroTextContainer}>
                        <Animated.Text style={[styles.heroTitle, heroTextStyle]}>From "I Do"</Animated.Text>
                        <Animated.Text style={[styles.heroSubtitle, heroTextStyle]}>To "Just Us Two"</Animated.Text>
                    </View>
                </View>
            </GestureDetector>

            <TouchableOpacity style={styles.heroCta} onPress={scrollToPlan}>
                <Text style={styles.heroCtaText}>Start Honeymoon Planning</Text>
                <Ionicons name="chevron-down" size={20} color="#CC0E0E" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderHowItWorks = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.howScroll}>
                {HOW_IT_WORKS.map((item, index) => (
                    <View key={item.id} style={styles.howStepContainer}>
                        {/* Connecting Line (except last) */}
                        {index < HOW_IT_WORKS.length - 1 && <View style={styles.stepConnector} />}

                        <View style={styles.stepCircle}>
                            <Ionicons name={item.icon} size={28} color="#CC0E0E" />
                        </View>
                        <Text style={styles.howTitle}>{item.title}</Text>
                        <Text style={styles.howDesc}>{item.desc}</Text>
                        <View style={styles.stepNumberBadge}>
                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const renderVendors = () => (
        <View style={styles.sectionContainer}>
            {VENDOR_CATEGORIES.map((category, index) => (
                <View key={index} style={{ marginBottom: 25 }}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filmstripContainer}
                        snapToInterval={280} // Approx snap
                        decelerationRate="fast"
                    >
                        {category.vendors.map((vendor, vIndex) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor}
                                isHero={vIndex === 0}
                                onPress={() => navigation.navigate('HoneymoonVendorDetails', { vendor })}
                                openItinerary={openItinerary}
                            />
                        ))}
                    </ScrollView>
                </View>
            ))}
        </View>
    );

    const renderBookingClarity = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>The Journey to 'Forever'</Text>
            <View style={styles.journeyContainer}>
                {[
                    { title: 'Trip Confirmation', desc: 'Secure your dates instantly', icon: 'checkmark-done-circle' },
                    { title: 'Planner Call', desc: 'Personalize your itinerary', icon: 'call' },
                    { title: 'Itinerary Shared', desc: 'Review day-by-day plans', icon: 'map' },
                    { title: 'Travel Support', desc: '24/7 assistance on trip', icon: 'headset' }
                ].map((step, i) => (
                    <View key={i} style={styles.journeyCard}>
                        <View style={styles.journeyIconBox}>
                            <Ionicons name={step.icon} size={24} color="#FFF" />
                        </View>
                        <View style={styles.journeyContent}>
                            <Text style={styles.journeyTitle}>{step.title}</Text>
                            <Text style={styles.journeyDesc}>{step.desc}</Text>
                        </View>
                        {i < 3 && <View style={styles.journeyLine} />}
                    </View>
                ))}
            </View>
        </View>
    );

    const renderBookButton = () => {
        return (
            <View style={styles.bookContainer}>
                <Animated.View style={[styles.bookBtnWrapper, btnStyle]}>
                    <TouchableOpacity
                        style={[
                            styles.bookBtn,
                            bookingStep === 2 && { backgroundColor: '#4CAF50' }
                        ]}
                        onPress={handleBookNow}
                        activeOpacity={1}
                    >
                        {bookingStep === 0 && (
                            <Text style={styles.bookBtnText}>Book Now</Text>
                        )}
                        {bookingStep === 1 && (
                            <Text style={styles.bookBtnText}>Booking...</Text>
                        )}
                        {bookingStep === 2 && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="checkmark-circle" size={20} color="#FFF" style={{ marginRight: 8 }} />
                                <Text style={styles.bookBtnText}>Honeymoon Reserved 💛</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                {bookingStep === 2 && (
                    <Animated.View entering={FadeInUp} style={styles.confirmationMsg}>
                        <Text style={styles.confText}>Your journey begins. We'll take it from here.</Text>
                    </Animated.View>
                )}
            </View>
        );
    };

    const renderTrust = () => (
        <View style={styles.trustContainer}>
            {TRUST_BADGES.map((item, i) => (
                <View key={i} style={styles.trustItem}>
                    <Ionicons name={item.icon} size={24} color="#999" />
                    <Text style={styles.trustText}>{item.title}</Text>
                </View>
            ))}
        </View>
    );

    const renderItineraryModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitle}>{selectedItinerary?.name || 'Itinerary'}</Text>
                            <Text style={styles.modalVendor}>by {selectedVendorName}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {selectedItinerary?.itinerary ? (
                            <View style={styles.timelineContainer}>
                                {selectedItinerary.itinerary.map((day, index) => (
                                    <View key={index} style={styles.timelineItem}>
                                        <View style={styles.timelineDot} />
                                        <View style={styles.timelineLine} />
                                        <View style={styles.timelineContent}>
                                            <Text style={styles.timelineDay}>{day.day}</Text>
                                            <Text style={styles.timelineTitle}>{day.title}</Text>
                                            <Text style={styles.timelineDesc}>{day.desc}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <Text style={styles.noItineraryText}>Itinerary details coming soon.</Text>
                        )}

                        <TouchableOpacity style={styles.modalCta}>
                            <Text style={styles.modalCtaText}>Request Quote for this Trip</Text>
                        </TouchableOpacity>
                        <View style={{ height: 40 }} />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

                <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    {renderHero()}
                    {renderHowItWorks()}
                    {renderVendors()}
                    {renderBookingClarity()}
                    {renderBookButton()}
                    {renderTrust()}
                </ScrollView>

                {/* Sticky Planner */}


                {renderItineraryModal()}

            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    // --- HERO ---
    heroContainer: {
        height: height,
        width: '100%',
        position: 'relative',
    },
    splitScreen: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    splitSide: {
        position: 'absolute',
        top: 0, bottom: 0,
        height: '100%',
        overflow: 'hidden', // Important for cropping
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSide: { width: '100%', left: 0 },
    rightSide: { right: 0, elevation: 5 }, // Align right, zIndex higher
    heroImage: {
        width: width, // Fixed width to screen
        height: '100%',
        resizeMode: 'cover',
    },
    dragHandle: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: '50%',
        width: 40,
        marginLeft: -20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    dragLine: {
        width: 2,
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    heroTextContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    heroTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 40,
        color: PRIMARY_COLOR,
        textShadowColor: 'rgba(255,255,255,0.3)',
        textShadowRadius: 10,
    },
    heroSubtitle: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 28,
        color: '#FFEB3B',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 10,
    },
    heroCta: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        zIndex: 20,
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
    },
    heroCtaText: {
        fontFamily: 'Outfit_700Bold',
        color: PRIMARY_COLOR,
        marginRight: 5,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20,
    },

    // --- NEUMORPH ---
    neumorphContainer: {
        backgroundColor: '#FFFFF0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        padding: 15,
        position: 'relative',
    },
    shadowTop: {
        position: 'absolute',
        top: -4, left: -4, right: 4, bottom: 4,
        backgroundColor: '#FFFFFF', // Light shadow
        borderRadius: 20,
        opacity: 0.8,
    },
    shadowBottom: {
        position: 'absolute',
        top: 4, left: 4, right: -4, bottom: -4,
        backgroundColor: '#E0E0D0', // Dark shadow
        borderRadius: 20,
        opacity: 0.6,
    },
    neumorphContent: {
        width: '100%',
        alignItems: 'center',
    },

    // --- SECTIONS ---
    sectionContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: PRIMARY_COLOR,
        marginBottom: 20,
    },
    categoryTitle: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 20,
        color: PRIMARY_COLOR,
        marginBottom: 15,
        marginLeft: 5,
        borderLeftWidth: 3,
        borderLeftColor: ACCENT_COLOR,
        paddingLeft: 10,
    },
    filmstripContainer: {
        paddingRight: 20,
        gap: 15,
    },

    // How It Works
    howScroll: {
        paddingVertical: 10,
        paddingLeft: 10,
    },
    howStepContainer: {
        width: 120,
        marginRight: 10,
        alignItems: 'center',
        position: 'relative',
    },
    stepCircle: {
        width: 60, height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 4,
        shadowColor: '#CC0E0E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#FFE0E0',
    },
    stepConnector: {
        position: 'absolute',
        top: 30,
        left: 60, // Start after circle
        width: 70, // Bridge gap
        height: 2,
        backgroundColor: '#FFEBEE',
        zIndex: -1,
    },
    howTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 14,
        textAlign: 'center',
        color: PRIMARY_COLOR,
        marginBottom: 4,
    },
    howDesc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 11,
        textAlign: 'center',
        color: '#666',
        paddingHorizontal: 5,
    },
    stepNumberBadge: {
        position: 'absolute',
        top: 0, right: 30,
        backgroundColor: ACCENT_COLOR,
        width: 20, height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    stepNumberText: {
        color: '#FFF',
        fontSize: 10,
        fontFamily: 'Outfit_700Bold',
    },

    // Vendors & Redesign (Bento/Glassmorphism)
    vendorCard: {
        backgroundColor: '#FFF',
        borderRadius: 32, // More rounded "Vogue" style
        overflow: 'hidden',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        position: 'relative',
        borderWidth: 1,
        borderColor: ACCENT_COLOR,
    },
    heroCard: {
        width: 300,
        height: 380, // Taller, Pinterest style
    },
    standardCard: {
        width: 240,
        height: 380,
    },

    priceTag: {
        position: 'absolute',
        top: 20, right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        zIndex: 5,
    },
    priceText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: PRIMARY_COLOR,
    },
    glassInfo: {
        position: 'absolute',
        bottom: 15, left: 15, right: 15,
        // height: 160, // Removed fixed height
        borderRadius: 24,
        overflow: 'hidden',
        padding: 15, // Padding inside blur
        // justifyContent: 'space-between', // Let content stack naturally
        // Stronger fallbacks and overlay for readability
        backgroundColor: Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
    },
    vendorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    vendorNameSerif: {
        fontFamily: 'PlayfairDisplay_700Bold', // Elegant font
        fontSize: 22, // Increased size
        color: PRIMARY_COLOR,
        flex: 1,
        textShadowColor: 'rgba(255, 255, 255, 0.4)', // Added shadow for readability
        textShadowRadius: 4,
        fontWeight: 'bold', // Forced bold
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingText: {
        color: ACCENT_COLOR,
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        marginLeft: 4,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
    },
    vibeTag: {
        backgroundColor: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        elevation: 3, // Shadow for visibility
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    vibeText: {
        fontSize: 12,
        fontFamily: 'Outfit_700Bold',
        color: '#000',
        fontWeight: 'bold',
    },
    miniDestChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 6, // Increased from 4
        paddingHorizontal: 8,
        borderRadius: 20,
        marginRight: 6,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    miniDestText: {
        fontSize: 11, // Increased size
        fontFamily: 'Outfit_600SemiBold', // Bolder font
        color: '#333', // Darker text for contrast
        marginLeft: 3,
        // fontWeight: '600', // Removed this as font family handles it
        includeFontPadding: false, // Fix vertical alignment/cutting off on Android
        textAlignVertical: 'center',
    },
    contactBtn: {
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactBtnText: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
    },

    // Journey Map / Booking Clarity
    journeyContainer: {
        marginTop: 10,
    },
    journeyCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 15,
        padding: 15,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#FFF0E0',
        position: 'relative',
        zIndex: 1,
    },
    journeyIconBox: {
        width: 50, height: 50,
        borderRadius: 25,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        elevation: 5,
    },
    journeyContent: {
        flex: 1,
    },
    journeyTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: PRIMARY_COLOR,
        marginBottom: 2,
    },
    journeyDesc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#666',
    },
    journeyLine: {
        position: 'absolute',
        left: 39, // Center of journeyIconBox (15 padding + 25 half width) approx 40
        top: 60, // card height approx 80, so connect to next
        bottom: -25, // Extends to next
        width: 2,
        backgroundColor: '#FFE0B2',
        zIndex: -1,
    },

    // Book Button
    bookContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    bookBtnWrapper: {
        height: 55,
        borderRadius: 30,
        overflow: 'hidden',
    },
    bookBtn: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookBtnText: {
        color: '#FFF',
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
    },
    confirmationMsg: {
        marginTop: 15,
    },
    confText: {
        fontFamily: 'Outfit_500Medium',
        color: '#4CAF50',
        fontSize: 14,
    },

    // Trust
    trustContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingHorizontal: 20,
        gap: 20,
    },
    trustItem: {
        alignItems: 'center',
        width: '40%',
    },
    trustText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },

    // Sticky Planner
    plannerCard: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#FFF',
        padding: 10,
        paddingRight: 15,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    plannerImage: {
        width: 36, height: 36,
        borderRadius: 18,
        marginRight: 10,
    },
    plannerName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 12,
        color: '#333',
    },
    plannerStatus: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 10,
        color: '#4CAF50',
    },
    plannerBtn: {
        marginLeft: 10,
        backgroundColor: '#FFF5F5',
        padding: 6,
        borderRadius: 20,
    },

    // Modal
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '80%',
        padding: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    modalTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 24,
        color: '#333',
    },
    modalVendor: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    closeButton: {
        padding: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },

    // Timeline
    timelineContainer: {
        paddingLeft: 10,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    timelineDot: {
        width: 14, height: 14,
        borderRadius: 7,
        backgroundColor: PRIMARY_COLOR,
        marginTop: 5,
        zIndex: 1,
    },
    timelineLine: {
        position: 'absolute',
        top: 20, left: 6,
        bottom: -30,
        width: 2,
        backgroundColor: '#F0F0F0',
    },
    timelineContent: {
        marginLeft: 20,
        flex: 1,
        backgroundColor: '#FFF9F9', // Subtle reddish tint
        padding: 15,
        borderRadius: 15,
    },
    timelineDay: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
        color: PRIMARY_COLOR,
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    timelineTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    timelineDesc: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: '#666',
        lineHeight: 20,
    },

    modalCta: {
        backgroundColor: '#333',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    modalCtaText: {
        color: '#FFF',
        fontFamily: 'Outfit_700Bold',
        fontSize: 16,
    },
    noItineraryText: {
        fontFamily: 'Outfit_400Regular',
        color: '#999',
        textAlign: 'center',
        marginTop: 50,
    },
});

export default HoneymoonNeumorphic;