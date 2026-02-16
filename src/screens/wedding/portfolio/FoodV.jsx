import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// --- Strick Color Theme ---
const COLORS = {
    saffron: '#FF9933',  // Primary accent, highlights
    gold: '#D4AF37',     // Premium accents, dividers
    maroon: '#800000',   // Headings, emphasis
    ivory: '#FFFFF0',    // Main background
    textMain: '#2C1810', // Body text
    white: '#FFFFFF',
    overlayIvory: 'rgba(255, 255, 240, 0.85)',
    overlayDark: 'rgba(44, 24, 16, 0.6)',
};

// --- Fonts (System Fallbacks) ---
const FONTS = {
    serif: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    sans: Platform.OS === 'ios' ? 'System' : 'sans-serif',
};

// --- Mock Data ---

const HERO_IMAGES = [
    'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop', // Wedding buffet
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop', // Food spread
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop', // Plated dish
];

const VENDOR_HIGHLIGHTS = [
    { id: 1, label: '15+ Years Exp', icon: 'medal' },
    { id: 2, label: '500+ Weddings', icon: 'glass-cheers' },
    { id: 3, label: 'FSSAI Certified', icon: 'certificate' },
    { id: 4, label: 'Multi-Cuisine', icon: 'utensils' },
];

const FOOD_FILTERS = [
    { id: 1, label: 'All' },
    { id: 2, label: 'Pure Veg' },
    { id: 3, label: 'Non-Veg' },
    { id: 4, label: 'Vegan' },
    { id: 5, label: 'Jain' },
    { id: 6, label: 'Halal' },
];

const MENU_HIGHLIGHTS = [
    { id: 1, name: 'Royal Thali', image: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=400&auto=format&fit=crop', price: '₹1200', type: 'Veg' },
    { id: 2, name: 'Live Chaat', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop', price: '₹450', type: 'Veg' },
    { id: 3, name: 'Mughlai Feast', image: 'https://images.unsplash.com/photo-1631515243349-e06051a09871?q=80&w=400&auto=format&fit=crop', price: '₹1500', type: 'Non-Veg' },
    { id: 4, name: 'Dessert Bar', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop', price: '₹300', type: 'Veg' },
    { id: 5, name: 'Paneer Tikka', image: 'https://images.unsplash.com/photo-1567188040754-5835ece3ea88?q=80&w=400&auto=format&fit=crop', price: '₹400', type: 'Veg' },
    { id: 6, name: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop', price: '₹600', type: 'Non-Veg' },
];

const PREVIOUS_WORK = [
    { id: 1, image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=400&auto=format&fit=crop', title: 'Grand Buffet Setup' },
    { id: 2, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&auto=format&fit=crop', title: 'Outdoor Catering' },
    { id: 3, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=400&auto=format&fit=crop', title: 'Live Counters' },
    { id: 4, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=400&auto=format&fit=crop', title: 'Dessert Station' },
];

const SERVICES_INCLUDED = [
    'Live Counters & Chefs',
    'Uniformed Wait Staff',
    'Crockery & Cutlery',
    'Drinking Water Stations',
    'Buffet Setup & Decor',
    'Waste Management'
];

const VIDEOS_REELS = [
    { id: 1, title: 'Grand Wedding 2024', source: require('../../../../assets/videos/grand_wedding.mp4') },
    { id: 2, title: 'Live Kitchen Tour', source: require('../../../../assets/videos/video R2.mp4') },
    { id: 3, title: 'Client Testimonial', source: require('../../../../assets/videos/videoR3.mp4') },
];



const COVERAGE_AREAS = ['Mumbai', 'Navi Mumbai', 'Thane', 'Pune', 'Lonavala', 'Nasik'];

const SUGGESTED_VENDORS = [
    { id: 1, name: 'Royal Feasts', rating: 4.9, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop' },
    { id: 2, name: 'Spice Kingdom', rating: 4.7, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop' },
    { id: 3, name: 'Golden Plate', rating: 4.8, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop' },
];

const SECTION_SPACING = 30;

// --- Components ---

const HeroImage = ({ uri, index }) => {
    return (
        <View style={styles.heroImageWrapper}>
            <Image source={{ uri }} style={styles.heroImage} resizeMode="cover" />
            <LinearGradient
                colors={['transparent', 'rgba(255, 255, 240, 0.4)', COLORS.overlayIvory]}
                locations={[0, 0.7, 1]}
                style={styles.heroGradient}
            />
        </View>
    );
};

const SectionHeader = ({ title, showViewAll = false }) => (
    <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionTitleBar} />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {showViewAll && (
            <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
        )}
    </View>
);

const AnimatedVendorCard = ({ vendor, index }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 200, // Stagger effect
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                delay: index * 200,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.suggestedCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <Image source={{ uri: vendor.image }} style={styles.suggestedImage} />
            <View style={styles.suggestedInfo}>
                <Text style={styles.suggestedName} numberOfLines={1}>{vendor.name}</Text>
                <View style={styles.reviewRating}>
                    <Ionicons name="star" size={12} color={COLORS.gold} />
                    <Text style={styles.ratingText}>{vendor.rating}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const FoodV = () => {
    const navigation = useNavigation();
    const [heroIndex, setHeroIndex] = useState(0);
    const heroCarouselRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingForm, setBookingForm] = useState({ name: '', mobile: '', date: '' });
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // UI States
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(856);
    const [isShortlisted, setIsShortlisted] = useState(false);
    const [shortlistCount, setShortlistCount] = useState(240);
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, submitting, success

    // Action Handlers
    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    const toggleShortlist = () => {
        setIsShortlisted(!isShortlisted);
        setShortlistCount(prev => isShortlisted ? prev - 1 : prev + 1);
    };

    const handleBookingSubmit = () => {
        setBookingStatus('submitting');
        setTimeout(() => {
            setBookingStatus('success');
        }, 1500);
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setBookingStatus('idle');
        setBookingForm({ name: '', mobile: '', date: '' });
    };

    // Filter Logic
    const getFilteredMenu = () => {
        if (selectedFilter === 'All') return MENU_HIGHLIGHTS;
        if (selectedFilter === 'Pure Veg' || selectedFilter === 'Vegan' || selectedFilter === 'Jain') {
            return MENU_HIGHLIGHTS.filter(item => item.type === 'Veg');
        }
        if (selectedFilter === 'Non-Veg' || selectedFilter === 'Halal') {
            return MENU_HIGHLIGHTS.filter(item => item.type === 'Non-Veg');
        }
        return MENU_HIGHLIGHTS;
    };

    const filteredMenu = getFilteredMenu();

    // Auto Scroll Hero
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (heroCarouselRef.current) {
                let nextIndex = heroIndex + 1;
                if (nextIndex >= HERO_IMAGES.length) nextIndex = 0;
                setHeroIndex(nextIndex);
                heroCarouselRef.current.scrollTo({ x: nextIndex * width, animated: true });
            }
        }, 4000);
        return () => clearInterval(intervalId);
    }, [heroIndex]);

    const renderHeroSection = () => (
        <View style={styles.heroContainer}>
            <ScrollView
                ref={heroCarouselRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(e) => setHeroIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            >
                {HERO_IMAGES.map((img, index) => (
                    <View key={index} style={{ width, height: 350, overflow: 'hidden' }}>
                        <HeroImage uri={img} index={index} />
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                {HERO_IMAGES.map((_, index) => {
                    const widthAnim = scrollX.interpolate({
                        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                        outputRange: [6, 20, 6],
                        extrapolate: 'clamp',
                    });
                    const opacityAnim = scrollX.interpolate({
                        inputRange: [(index - 1) * width, index * width, (index + 1) * width],
                        outputRange: [0.5, 1, 0.5],
                        extrapolate: 'clamp',
                    });
                    return (
                        <Animated.View
                            key={index}
                            style={[styles.paginationDot, { width: widthAnim, opacity: opacityAnim }]}
                        />
                    );
                })}
            </View>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.backButtonBlur}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.ivory} />
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderVendorProfile = () => {
        return (
            <View style={styles.profileContainer}>
                <View style={styles.profileImageWrapper}>
                    {/* REPLACED LOGO WITH CATERING IMAGE */}
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=300&auto=format&fit=crop' }}
                        style={styles.profileImage}
                    />
                </View>

                {/* Spacer removed as image is no longer absolute */}

                <Text style={styles.vendorName}>Maharaja Catering Co.</Text>

                <View style={styles.locationRatingRow}>
                    <View style={styles.iconTextRow}>
                        <Ionicons name="location-sharp" size={14} color={COLORS.textMain} />
                        <Text style={styles.subText}>Mumbai, MH</Text>
                    </View>
                    <View style={styles.verticalDivider} />
                    <View style={styles.iconTextRow}>
                        <Ionicons name="star" size={14} color={COLORS.gold} />
                        <Text style={styles.subText}>4.9 (128 Reviews)</Text>
                    </View>
                </View>

                {/* Vendor Highlights (Replaces Action Icons) */}
                <View style={styles.highlightsContainer}>
                    {/* Reusing highlightsContainer style but positioning here */}
                    {VENDOR_HIGHLIGHTS.map(item => (
                        <View key={item.id} style={styles.highlightChip}>
                            <FontAwesome5 name={item.icon} size={14} color={COLORS.saffron} />
                            <Text style={styles.highlightText}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderBookingModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showBookingModal}
            onRequestClose={() => setShowBookingModal(false)}
        >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {bookingStatus === 'success' ? (
                        <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
                                <Ionicons name="checkmark" size={30} color="green" />
                            </View>
                            <Text style={styles.modalTitle}>Request Sent!</Text>
                            <Text style={[styles.modalSubtitle, { textAlign: 'center' }]}>
                                Thank you, {bookingForm.name}.{"\n"}The caterer will contact you shortly.
                            </Text>
                            <TouchableOpacity style={styles.modalSubmitBtn} onPress={closeBookingModal}>
                                <Text style={styles.modalSubmitText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Book a Tasting</Text>
                                <TouchableOpacity onPress={closeBookingModal}>
                                    <Ionicons name="close" size={24} color={COLORS.textMain} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.modalSubtitle}>Experience the royal taste before your big day.</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Your Name</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Enter Name"
                                    placeholderTextColor="#999"
                                    value={bookingForm.name}
                                    onChangeText={t => setBookingForm({ ...bookingForm, name: t })}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Mobile Number</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Enter Mobile"
                                    placeholderTextColor="#999"
                                    keyboardType="phone-pad"
                                    value={bookingForm.mobile}
                                    onChangeText={t => setBookingForm({ ...bookingForm, mobile: t })}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.modalSubmitBtn, bookingStatus === 'submitting' && { opacity: 0.7 }]}
                                onPress={handleBookingSubmit}
                                disabled={bookingStatus === 'submitting'}
                            >
                                <Text style={styles.modalSubmitText}>
                                    {bookingStatus === 'submitting' ? 'Sending...' : 'Confirm Request'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    const renderVideoModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={showVideoModal}
            onRequestClose={() => {
                setShowVideoModal(false);
                setSelectedVideo(null);
            }}
        >
            <View style={styles.videoModalContainer}>
                <TouchableOpacity
                    style={styles.videoCloseButton}
                    onPress={() => {
                        setShowVideoModal(false);
                        setSelectedVideo(null);
                    }}
                >
                    <Ionicons name="close-circle" size={40} color={COLORS.white} />
                </TouchableOpacity>

                <View style={styles.videoPlayerWrapper}>
                    {selectedVideo && (
                        <Video
                            source={selectedVideo.source} // Ensure source is passed
                            style={styles.fullScreenVideo}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            shouldPlay={true}
                            isMuted={true}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderHeroSection()}

                <View style={styles.contentBody}>
                    <View>
                        {renderVendorProfile()}
                    </View>

                    {/* Suggested Vendors - Moved Before Menu */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="Similar Caterers" />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                            {SUGGESTED_VENDORS.map((vendor, index) => (
                                <AnimatedVendorCard key={vendor.id} vendor={vendor} index={index} />
                            ))}
                        </ScrollView>
                    </View>

                    {/* Menu Highlights - Now Filtered */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="Menu Highlights" showViewAll />

                        {/* Filters - Moved Here */}
                        <View style={styles.filterContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 20 }}>
                                {FOOD_FILTERS.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[styles.filterChip, selectedFilter === item.label && styles.filterChipActive]}
                                        onPress={() => setSelectedFilter(item.label)}
                                    >
                                        <Text style={[styles.filterText, selectedFilter === item.label && styles.filterTextActive]}>
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {filteredMenu.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                                {filteredMenu.map(item => (
                                    <View key={item.id} style={styles.menuCard}>
                                        {/* Veg/Non-Veg Indicator */}
                                        <View style={[styles.vegTag, { borderColor: item.type === 'Non-Veg' ? COLORS.maroon : 'green' }]}>
                                            <View style={[styles.vegDot, { backgroundColor: item.type === 'Non-Veg' ? COLORS.maroon : 'green' }]} />
                                        </View>

                                        <View style={styles.menuImageContainer}>
                                            <Image source={{ uri: item.image }} style={styles.menuImage} />
                                        </View>

                                        <Text style={styles.menuName} numberOfLines={1}>{item.name}</Text>

                                        <View style={styles.pricePill}>
                                            <Text style={styles.menuPrice}>{item.price}/plate</Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noItemsText}>No items found for this filter.</Text>
                        )}
                    </View>

                    {/* Previous Work Section */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="Our Previous Work" showViewAll />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                            {PREVIOUS_WORK.map(work => (
                                <View key={work.id} style={styles.previousWorkCard}>
                                    <Image source={{ uri: work.image }} style={styles.previousWorkImage} />
                                    <Text style={styles.previousWorkTitle} numberOfLines={1}>{work.title}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Services Included */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="Services Included" />
                        <View style={styles.servicesGrid}>
                            {SERVICES_INCLUDED.map((service, index) => (
                                <View key={index} style={styles.serviceItem}>
                                    <Ionicons name="checkmark-circle" size={18} color={COLORS.gold} />
                                    <Text style={styles.serviceText}>{service}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Videos & Reels */}
                    <View style={styles.sectionContainer}>
                        <SectionHeader title="Videos & Reels" />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                            {VIDEOS_REELS.map(video => (
                                <TouchableOpacity
                                    key={video.id}
                                    style={styles.videoCard}
                                    onPress={() => {
                                        if (video.source) {
                                            setSelectedVideo(video);
                                            setShowVideoModal(true);
                                        }
                                    }}
                                    activeOpacity={0.9}
                                >
                                    {video.source ? (
                                        // Show a static preview or the video component (paused) as thumbnail
                                        // For better performance in list, we can just show the video paused
                                        <Video
                                            source={video.source}
                                            style={styles.videoThumbnail}
                                            resizeMode={ResizeMode.COVER}
                                            shouldPlay={false}
                                            isMuted={true}
                                        />
                                    ) : (
                                        <Image source={{ uri: video.thumbnail }} style={styles.videoThumbnail} />
                                    )}

                                    <View style={styles.playIconContainer}>
                                        <Ionicons name="play" size={24} color={COLORS.ivory} />
                                    </View>
                                    <Text style={styles.videoTitle} numberOfLines={1}>{video.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>



                    {/* Coverage Area */}
                    <View style={[styles.sectionContainer, { marginBottom: 100 }]}>
                        <SectionHeader title="Service Coverage Area" />
                        <View style={styles.coverageGrid}>
                            {COVERAGE_AREAS.map((city, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[styles.coverageChip, selectedCity === city && styles.coverageChipActive]}
                                    onPress={() => setSelectedCity(city)}
                                >
                                    <Text style={[styles.coverageText, selectedCity === city && styles.coverageTextActive]}>{city}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* Bottom Floating Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.bookButton} onPress={() => setShowBookingModal(true)}>
                    <Text style={styles.bookButtonText}>Book A Cater Now</Text>
                    <Ionicons name="calendar" size={20} color={COLORS.ivory} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>

            {renderBookingModal()}
            {renderVideoModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.ivory,
    },
    scrollContent: {
        flexGrow: 1,
    },
    // Hero
    heroContainer: {
        height: 280,
        width: width,
        position: 'relative',
    },
    heroImageWrapper: {
        width: width,
        height: 280,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4,
        backgroundColor: COLORS.gold,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    },
    backButtonBlur: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },

    // Content Body
    contentBody: {
        marginTop: -50, // Pull up to overlap slightly
        backgroundColor: COLORS.ivory,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
    },

    // Profile
    profileContainer: {
        marginTop: 0,
        backgroundColor: COLORS.ivory,
        marginHorizontal: 15,
        paddingTop: 20, // Reduced from 70
        paddingBottom: 25,
        paddingHorizontal: 20, // Added for inner alignment
        borderRadius: 20,
        elevation: 6,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        alignItems: 'flex-start', // Changed from center
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.2)',
    },
    profileImageWrapper: {
        marginBottom: 15, // Added spacing
        // Removed absolute positioning and flex alignment
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: COLORS.gold, // Strong gold border
        backgroundColor: COLORS.white,
    },
    vendorName: {
        fontSize: 24,
        fontFamily: FONTS.serif,
        fontWeight: 'bold',
        color: COLORS.maroon,
        marginBottom: 8,
        textAlign: 'left', // Changed from center
    },
    locationRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        // Aligns left by default in flex-start container
    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        height: 14,
        backgroundColor: COLORS.gold,
        marginHorizontal: 10,
    },
    subText: {
        fontSize: 14,
        color: COLORS.textMain,
        marginLeft: 4,
        fontFamily: FONTS.sans,
    },
    actionIconsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Changed from center
        gap: 25,
        marginBottom: 20,
    },
    actionIconItem: {
        alignItems: 'center',
    },
    actionIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)', // Soft gold border
        marginBottom: 6,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
    },
    actionLabel: {
        fontSize: 12,
        color: COLORS.textMain,
        fontWeight: '500',
    },

    // Filters
    filterContainer: {
        marginBottom: 20,
    },
    filterScroll: {
        maxHeight: 40,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gold,
        marginRight: 10,
    },
    filterChipActive: {
        backgroundColor: COLORS.maroon,
        borderColor: COLORS.maroon,
    },
    filterText: {
        fontSize: 13,
        color: COLORS.textMain,
        fontWeight: '500',
    },
    filterTextActive: {
        color: COLORS.ivory,
        fontWeight: 'bold',
    },

    // Highlights
    highlightsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // Changed from center
        gap: 10,
        marginHorizontal: 0, // Removed horizontal margin to align with parent padding
        marginBottom: SECTION_SPACING,
    },
    highlightChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1', // Light gold bg
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.4)',
    },
    highlightText: {
        fontSize: 12,
        color: COLORS.textMain,
        marginLeft: 6,
        fontWeight: '600',
    },

    // Sections
    sectionContainer: {
        marginBottom: SECTION_SPACING,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitleBar: {
        width: 4,
        height: 18,
        backgroundColor: COLORS.maroon,
        marginRight: 8,
        borderRadius: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FONTS.serif,
        fontWeight: 'bold',
        color: COLORS.maroon,
    },
    viewAllText: {
        fontSize: 13,
        color: COLORS.saffron,
        fontWeight: '600',
    },
    horizontalList: {
        paddingHorizontal: 20,
        gap: 15,
    },
    noItemsText: {
        textAlign: 'center',
        color: COLORS.textMain,
        marginTop: 20,
        fontStyle: 'italic',
    },

    // Menu Cards
    // Menu Cards
    menuCard: {
        width: 180,
        marginRight: 15,
        backgroundColor: COLORS.ivory,
        borderRadius: 16,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.4)',
        elevation: 6,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        marginBottom: 10,
        marginTop: 5,
    },
    menuImageContainer: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: COLORS.white,
        elevation: 8,
        shadowColor: COLORS.textMain,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 12,
        marginTop: 5,
    },
    menuImage: {
        width: '100%',
        height: '100%',
        borderRadius: 65,
    },
    vegTag: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 16,
        height: 16,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 3,
        zIndex: 5,
    },
    vegDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    menuName: {
        fontSize: 16,
        fontFamily: FONTS.serif,
        fontWeight: 'bold',
        color: COLORS.maroon,
        textAlign: 'center',
        marginBottom: 8,
    },
    pricePill: {
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
    },
    menuPrice: {
        fontSize: 13,
        color: COLORS.textMain,
        fontWeight: '600',
    },
    bookNowButton: {
        width: '100%',
        height: 34,
        borderRadius: 17,
        overflow: 'hidden',
        elevation: 3,
    },
    bookNowGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookNowText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },

    // Services
    servicesGrid: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: (width - 50) / 2,
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EFEFEF',
    },
    serviceText: {
        fontSize: 12,
        color: COLORS.textMain,
        marginLeft: 8,
        flex: 1,
    },

    // Videos
    // Videos
    videoCard: {
        width: 200, // Reduced width
        marginRight: 15,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        elevation: 4,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        height: 320, // Reduced height
    },
    videoThumbnail: {
        width: '100%',
        height: '100%', // Fill the card
    },
    playIconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -25,
        marginLeft: -25,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.gold,
        zIndex: 10,
    },
    videoTitle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        fontSize: 14,
        color: COLORS.white,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.6)', // Overlay on video
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },

    // Previous Work
    previousWorkCard: {
        width: 280,
        marginRight: 10,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        elevation: 3,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    },
    previousWorkImage: {
        width: '100%',
        height: 180,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(212, 175, 55, 0.3)',
    },
    previousWorkTitle: {
        fontSize: 16, // Larger font
        fontFamily: FONTS.serif,
        fontWeight: '600',
        color: COLORS.maroon,
        padding: 10,
        textAlign: 'center',
    },

    // Reviews
    reviewCard: {
        width: 260,
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        marginRight: 8,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    reviewName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.maroon,
    },
    reviewRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 12,
        color: COLORS.textMain,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    reviewDate: {
        fontSize: 10,
        color: '#888',
        marginBottom: 8,
    },
    reviewComment: {
        fontSize: 12,
        color: COLORS.textMain,
        lineHeight: 18,
        fontStyle: 'italic',
    },

    // Coverage
    coverageGrid: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    coverageChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.saffron,
        backgroundColor: COLORS.white,
    },
    coverageChipActive: {
        backgroundColor: COLORS.maroon,
        borderColor: COLORS.maroon,
    },
    coverageText: {
        fontSize: 12,
        color: COLORS.textMain,
    },
    coverageTextActive: {
        color: COLORS.ivory,
        fontWeight: 'bold',
    },

    // Suggested
    suggestedCard: {
        width: 200, // Increased from 140
        marginRight: 0,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#EEE',
    },
    suggestedImage: {
        width: '100%',
        height: 140, // Increased from 100
    },
    suggestedInfo: {
        padding: 8,
    },
    suggestedName: {
        fontSize: 12,
        color: COLORS.maroon,
        fontWeight: '600',
        marginBottom: 4,
    },

    // Bottom Button
    bottomContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    bookButton: {
        backgroundColor: COLORS.maroon,
        paddingVertical: 16,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        elevation: 8,
        borderWidth: 1,
        borderColor: COLORS.gold,
    },
    bookButtonText: {
        color: COLORS.ivory,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(44, 24, 16, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: FONTS.serif,
        fontWeight: 'bold',
        color: COLORS.maroon,
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.textMain,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textMain,
        marginBottom: 6,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: COLORS.gold,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 14,
        color: COLORS.textMain,
        backgroundColor: '#FFF8E1',
    },
    modalSubmitBtn: {
        backgroundColor: COLORS.maroon,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    modalSubmitText: {
        color: COLORS.ivory,
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Video Modal
    videoModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 20,
        padding: 10,
    },
    videoPlayerWrapper: {
        width: width,
        height: height * 0.8, // 80% of screen height
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreenVideo: {
        width: width,
        height: '100%',
    },
});

export default FoodV;
