import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// STRICT Color Palette from JewelleryDetails
const COLORS = {
    kumkum: '#A70002',       // Primary Accent
    akshid: '#FFFFE4',       // Background / Soft sections
    textRed: '#CC0E0E',      // Text Highlight / Alerts
    haldi: '#F3D870',        // Secondary Accent
    darkHaldi: '#f29502',    // Dark Accent / Icons / Circles
    white: '#FFFFFF',
    textDark: '#1A1A1A',     // Deep black for contrast
    textGray: '#666666',
    cardShadow: 'rgba(167, 0, 2, 0.1)', // Kumkum tinted shadow
    gold: '#D4AF37',
};


const SUB_CATEGORIES = ['Photos', 'Videos', 'Media'];
const SUB_FILTERS = [
    { id: 'All', name: 'All', icon: 'grid-outline' },
    { id: 'bridal', name: 'Bridal', icon: 'heart-outline' },
    { id: 'party', name: 'Party', icon: 'sparkles-outline' },
    { id: 'engagement', name: 'Engagement', icon: 'ring-outline' }, // closest to ring is ring-outline? using ellipse or similar if not found
];

// Mock Data for Makeup
const PORTFOLIO_IMAGES = [
    { id: '1', source: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), height: 250, label: 'Bridal Glow', category: 'bridal' },
    { id: '2', source: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), height: 180, label: 'Party Glam', category: 'party' },
    { id: '3', source: require('../../../../assets/EventMimg/Makeup/artist3.jpg'), height: 220, label: 'Engagement Look', category: 'engagement' },
    { id: '4', source: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), height: 200, label: 'Sangeet Vibes', category: 'party' },
    { id: '5', source: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), height: 240, label: 'Reception Royal', category: 'bridal' },
    { id: '6', source: require('../../../../assets/EventMimg/Makeup/artist3.jpg'), height: 190, label: 'Haldi Special', category: 'engagement' },
];

const ABOUT_DATA = {
    description: "Welcome to Glamour by Gloria, where we enhance your natural beauty for your special day. With over 5 years of experience, we specialize in HD and Airbrush makeup that looks flawless in person and in photos.",
    highlights: ["Certified MUA", "Premium Products", "Global Experience"],
    specialties: ["Bridal HD Makeup", "Airbrush Techniques", "Hairstyling", "Draping"]
};

// Adapted to Pricing Card format
const PRICING_PACKAGES = [
    { id: '1', title: 'Bridal HD Makeup', price: ' 15,000', details: 'High Definition makeup, hair styling, draping, lashes, and trial included.', popular: true },
    { id: '2', title: 'Party Makeup', price: ' 5,000', details: 'Glamorous look for bridesmaids and family members. Includes basic hair.', popular: false },
    { id: '3', title: 'Engagement Look', price: ' 10,000', details: 'Subtle yet stunning makeup for your engagement ceremony.', popular: false },
    { id: '4', title: 'Airbrush Bridal', price: ' 20,000+', details: 'Flawless, long-lasting airbrush finish for the bride.', popular: true },
];

const REVIEWS_DATA = [
    { id: '1', user: 'Priya Sharma', rating: 5, date: '2 days ago', comment: 'Absolutely loved my bridal look! She is very professional and uses high-end products.' },
    { id: '2', user: 'Anjali Verma', rating: 4, date: '1 week ago', comment: 'Great work with the makeup, but hair styling could be better. Overall satisfied.' },
    { id: '3', user: 'Sneha Patel', rating: 5, date: '3 weeks ago', comment: 'Best MUA in town! Made me look like a dream.' },
];

// Mock Videos
const VIDEOS_DATA = [
    { id: '1', thumbnail: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), title: 'Bridal Makeup Tutorial', duration: '5:15' },
    { id: '2', thumbnail: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), title: 'Party Look Transformation', duration: '3:30' },
    { id: '3', thumbnail: require('../../../../assets/EventMimg/Makeup/artist3.jpg'), title: 'Client Testimonials', duration: '1:45' },
];

// Mock Media
const MEDIA_DATA = [
    { id: '1', image: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), title: 'Featured in WedMeGood', source: 'WedMeGood', date: 'Oct 2024' },
    { id: '2', image: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), title: 'Top 10 MUAs in Goa', source: 'WeddingSutra', date: 'Aug 2024' },
];

const MakeupArtistDetails = ({ route, navigation }: { route?: any; navigation?: any }) => {

    const { item } = route.params || {};
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('PROJECTS');
    const [isBookmark, setIsBookmark] = useState(false);
    const [bookModalVisible, setBookModalVisible] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState('Photos'); // Default to Photos just like Source? Source says 'Media' in state but 'Photos' in handleViewPhotos
    // Let's default to 'Photos' for better UX here
    const [activeSubFilter, setActiveSubFilter] = useState('All');

    const mainScrollRef = useRef<ScrollView>(null);
    const [contentY, setContentY] = useState(0);

    // Form State
    const [bookingForm, setBookingForm] = useState({
        fullName: '',
        mobile: '',
        date: '',
        timeSlot: ''
    });


    // Hero Carousel Logic
    const flatListRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    // Dynamic Hero Images
    const heroImages = React.useMemo(() => {
        // If item has specific thumbnails, use them
        // For now, let's use the provided item image or mapping
        if (item?.image) {
            // Replicate the single image multiple times for the carousel effect if only 1 is provided
            // or use PORTFOLIO_IMAGES as hero images
            return PORTFOLIO_IMAGES.slice(0, 3).map((img, i) => ({ id: `hero-${i}`, source: img.source }));
        }
        return [
            { id: 'hero-1', source: require('../../../../assets/EventMimg/Makeup/artist1.jpg') },
            { id: 'hero-2', source: require('../../../../assets/EventMimg/Makeup/artist2.jpg') },
            { id: 'hero-3', source: require('../../../../assets/EventMimg/Makeup/artist3.jpg') },
        ];
    }, [item]);

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % heroImages.length;
                (flatListRef.current as any)?.scrollTo({
                    x: nextIndex * width,
                    animated: true,
                });

                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const handleViewPhotos = () => {
        setActiveTab('PROJECTS');
        setActiveSubTab('Photos');
        if (mainScrollRef.current && contentY > 0) {
            (mainScrollRef.current as any).scrollTo({ y: contentY - 60, animated: true }); // -60 for header offset
        }

    };

    // Animate Avatar
    const animatedAvatarStyle = useAnimatedStyle(() => {
        const left = interpolate(
            scrollY.value,
            [0, 200],
            [20, width / 2 - 40],
            Extrapolation.CLAMP
        );
        const top = interpolate(
            scrollY.value,
            [0, 200],
            [50, -40],
            Extrapolation.CLAMP
        );
        const scale = interpolate(
            scrollY.value,
            [0, 200],
            [1, 1.2],
            Extrapolation.CLAMP
        );

        return {
            left,
            top,
            transform: [{ scale }]
        };
    });

    // Animate Info
    const animatedInfoStyle = useAnimatedStyle(() => {
        const marginLeft = interpolate(
            scrollY.value,
            [0, 200],
            [115, 0],
            Extrapolation.CLAMP
        );
        const paddingTop = interpolate(
            scrollY.value,
            [0, 200],
            [0, 60],
            Extrapolation.CLAMP
        );
        const opacity = interpolate(
            scrollY.value,
            [0, 100, 200],
            [1, 0.5, 1],
            Extrapolation.CLAMP
        );

        return {
            marginLeft,
            paddingTop,
            opacity,
            alignItems: scrollY.value > 100 ? 'center' : 'flex-start'
        };
    });

    // Dynamic Header that stays fixed
    const renderFixedHeader = () => (
        <View style={[styles.fixedHeader, { top: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButtonBlur}>
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => setIsBookmark(!isBookmark)} style={styles.iconButtonBlur}>
                    <Ionicons name={isBookmark ? "bookmark" : "bookmark-outline"} size={22} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButtonBlur}>
                    <Ionicons name="share-social-outline" size={22} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {Platform.OS !== 'web' && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}

            {/* Fixed Background Hero Slider */}
            <View style={styles.heroBackground}>
                <ScrollView
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    scrollEnabled={true}
                    style={StyleSheet.absoluteFill}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                        setCurrentIndex(newIndex);
                    }}
                >
                    {heroImages.map((img, index) => (
                        <Image
                            key={index} // Use index as key if id not unique in mocked array
                            source={img.source}
                            style={{ width, height: 450 }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>
                <View style={styles.heroOverlay} />
            </View>

            {renderFixedHeader()}

            <Animated.ScrollView
                ref={mainScrollRef as any}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                {/* Spacer to push sheet down */}
                <View style={{ height: 350 }} />

                {/* Profile Sheet */}
                <View style={styles.sheetContainer}>
                    {/* Floating Avatar - Animated */}
                    <Animated.View style={[styles.avatarContainer, animatedAvatarStyle]}>
                        <Image source={item?.image || require('../../../../assets/EventMimg/Makeup/artist1.jpg')} style={styles.avatarImage} resizeMode="cover" />
                    </Animated.View>

                    {/* Vendor Info - Animated */}
                    <Animated.View style={[styles.vendorInfoSection, animatedInfoStyle]}>
                        <Text style={styles.vendorName}>{item?.name || 'Glamour by Gloria'}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={16} color={COLORS.textGray} />
                            <Text style={styles.locationText}>{item?.location || 'Pune, MH'}</Text>
                        </View>
                        <Text style={styles.tagline}>{item?.tagline || 'Enhancing your natural beauty for your special day.'}</Text>

                        {/* Highlights / Stats Row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="heart-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>1.2k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="eye-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>5k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="star" size={18} color={COLORS.darkHaldi} />
                                <Text style={styles.statValue}>{item?.rating || 4.9} ({item?.reviews || 120})</Text>
                            </View>
                        </View>
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Main Tabs */}
                    <View
                        style={styles.mainTabsWrapper}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setContentY(layout.y);
                        }}
                    >
                        {['Projects', 'Pricing', 'About', 'Reviews'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab.toUpperCase())}
                                style={[styles.mainTabItem, activeTab === tab.toUpperCase() && styles.activeMainTabItem]}
                            >
                                <Text style={[styles.mainTabText, activeTab === tab.toUpperCase() && styles.activeMainTabText]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Portfolio Content */}
                    {activeTab === 'PROJECTS' && (
                        <View style={styles.portfolioSection}>
                            <View style={styles.portfolioHeaderRow}>
                                <Text style={styles.portfolioTitle}>Portfolio</Text>
                                <View style={styles.subCategoryTabs}>
                                    {SUB_CATEGORIES.map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            onPress={() => setActiveSubTab(cat)}
                                            style={[styles.subTabItem, activeSubTab === cat && styles.activeSubTabItem]}
                                        >
                                            <Text style={[styles.subTabText, activeSubTab === cat && styles.activeSubTabText]}>{cat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subFilterPills}>
                                {SUB_FILTERS.map((filter) => (
                                    <TouchableOpacity
                                        key={filter.id}
                                        onPress={() => setActiveSubFilter(filter.id)}
                                        style={[styles.subFilterPill, activeSubFilter === filter.id && styles.activeSubFilterPill]}
                                    >
                                        <Ionicons
                                            name={filter.icon as any}
                                            size={18}
                                            color={activeSubFilter === filter.id ? COLORS.white : COLORS.textGray}
                                        />

                                        <Text style={[styles.subFilterText, activeSubFilter === filter.id && styles.activeSubFilterText]}>
                                            {filter.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Photos Sub-tab */}
                            {activeSubTab === 'Photos' && (
                                <View style={styles.masonryGrid}>
                                    <View style={styles.gridColumn}>
                                        {PORTFOLIO_IMAGES
                                            .filter(img => activeSubFilter === 'All' || img.category === activeSubFilter)
                                            .filter((_, i) => i % 2 === 0)
                                            .map((img) => (
                                                <View key={img.id} style={[styles.masonryItem, { height: img.height }]}>
                                                    <Image source={img.source} style={styles.gridImage} resizeMode="cover" />
                                                    <View style={styles.gridItemOverlay}>
                                                        <Text style={styles.gridItemText}>{img.label}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>
                                    <View style={styles.gridColumn}>
                                        {PORTFOLIO_IMAGES
                                            .filter(img => activeSubFilter === 'All' || img.category === activeSubFilter)
                                            .filter((_, i) => i % 2 !== 0)
                                            .map((img) => (
                                                <View key={img.id} style={[styles.masonryItem, { height: img.height }]}>
                                                    <Image source={img.source} style={styles.gridImage} resizeMode="cover" />
                                                    <View style={styles.gridItemOverlay}>
                                                        <Text style={styles.gridItemText}>{img.label}</Text>
                                                    </View>
                                                </View>
                                            ))}
                                    </View>
                                </View>
                            )}

                            {/* Videos Sub-tab */}
                            {activeSubTab === 'Videos' && (
                                <View style={styles.videosGrid}>
                                    {VIDEOS_DATA.map((video) => (
                                        <TouchableOpacity key={video.id} style={styles.videoCard}>
                                            <Image source={video.thumbnail} style={styles.videoThumbnail} resizeMode="cover" />
                                            <View style={styles.playIconOverlay}>
                                                <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
                                            </View>
                                            <View style={styles.videoDurationBadge}>
                                                <Text style={styles.videoDurationText}>{video.duration}</Text>
                                            </View>
                                            <View style={styles.videoInfoOverlay}>
                                                <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {/* Media Sub-tab */}
                            {activeSubTab === 'Media' && (
                                <View style={styles.mediaList}>
                                    {MEDIA_DATA.map((item) => (
                                        <TouchableOpacity key={item.id} style={styles.mediaCard}>
                                            <Image source={item.image} style={styles.mediaImage} />
                                            <View style={styles.mediaContent}>
                                                <Text style={styles.mediaSource}>{item.source}  {item.date}</Text>
                                                <Text style={styles.mediaTitle}>{item.title}</Text>
                                                <View style={styles.readMoreRow}>
                                                    <Text style={styles.readMoreText}>Read Article</Text>
                                                    <Ionicons name="arrow-forward" size={14} color={COLORS.kumkum} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    )}

                    {/* Pricing Content */}
                    {activeTab === 'PRICING' && (
                        <View style={styles.sectionContent}>
                            <Text style={styles.sectionHeading}>Indicative Pricing</Text>
                            {PRICING_PACKAGES.map((pkg) => (
                                <View key={pkg.id} style={styles.pricingCard}>
                                    <View style={styles.pricingHeader}>
                                        <Text style={styles.pricingTitle}>{pkg.title}</Text>
                                        {pkg.popular && <View style={styles.popularTag}><Text style={styles.popularText}>Popular</Text></View>}
                                    </View>
                                    <Text style={styles.pricingPrice}>{pkg.price}</Text>
                                    <Text style={styles.pricingDetails}>{pkg.details}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* About Content */}
                    {activeTab === 'ABOUT' && (
                        <View style={styles.sectionContent}>
                            <Text style={styles.sectionHeading}>About Us</Text>
                            <Text style={styles.aboutDescription}>{ABOUT_DATA.description}</Text>

                            <Text style={[styles.sectionHeading, { marginTop: 20, fontSize: 18 }]}>Specialties</Text>
                            <View style={styles.specialtiesGrid}>
                                {ABOUT_DATA.specialties.map((spec, index) => (
                                    <View key={index} style={styles.specialtyItem}>
                                        <Ionicons name="sparkles-outline" size={16} color={COLORS.kumkum} />
                                        <Text style={styles.specialtyText}>{spec}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Reviews Content */}
                    {activeTab === 'REVIEWS' && (
                        <View style={styles.sectionContent}>
                            <View style={styles.ratingSummary}>
                                <Text style={styles.bigRating}>4.9</Text>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={16} color={COLORS.darkHaldi} />)}
                                    </View>
                                    <Text style={styles.totalReviews}>Based on 120 reviews</Text>
                                </View>
                            </View>

                            {REVIEWS_DATA.map((review) => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View style={styles.reviewHeader}>
                                        <View style={styles.reviewerInfo}>
                                            <View style={styles.reviewerAvatar}>
                                                <Text style={styles.avatarText}>{review.user.charAt(0)}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.reviewerName}>{review.user}</Text>
                                                <Text style={styles.reviewDate}>{review.date}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.reviewRating}>
                                            <Text style={styles.ratingNum}>{review.rating}</Text>
                                            <Ionicons name="star" size={12} color={COLORS.white} />
                                        </View>
                                    </View>
                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* CTA Buttons */}
                    <View style={styles.ctaRow}>
                        <TouchableOpacity style={[styles.contactBtn, styles.bookBtn]} onPress={() => setBookModalVisible(true)}>
                            <Text style={styles.contactBtnText}>Book Appointment</Text>
                            <Ionicons name="calendar-outline" size={18} color={COLORS.white} />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.contactBtn, styles.viewPhotosBtn]} onPress={handleViewPhotos}>
                            <Text style={[styles.contactBtnText, { color: COLORS.textDark }]}>View Photos</Text>
                            <Ionicons name="images-outline" size={18} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>

                </View>
            </Animated.ScrollView>

            {/* Book Visit Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={bookModalVisible}
                onRequestClose={() => setBookModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setBookModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Book Appointment</Text>
                                    <TouchableOpacity onPress={() => setBookModalVisible(false)} style={styles.closeBtn}>
                                        <Ionicons name="close" size={20} color={COLORS.darkHaldi} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalSubtitle}>Schedule a session with {item?.name || 'Glamour by Gloria'}</Text>

                                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                                    <View style={styles.formCard}>
                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Full Name</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="person-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput placeholder="Enter your full name" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                            </View>
                                        </View>

                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Mobile Number</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="call-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput placeholder="Enter mobile number" keyboardType="phone-pad" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                            </View>
                                        </View>

                                        <View style={styles.rowInputs}>
                                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                                <Text style={styles.label}>Event Date</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="calendar-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput placeholder="DD/MM/YYYY" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                                </View>
                                            </View>
                                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                                <Text style={styles.label}>Time Slot</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="time-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput placeholder="e.g. 10:00 AM" style={styles.input} placeholderTextColor={COLORS.textGray + '99'} />
                                                </View>
                                            </View>
                                        </View>

                                        <Text style={styles.disclaimer}>* We will contact you to confirm your appointment.</Text>

                                        <View style={styles.modalFooter}>
                                            <TouchableOpacity style={styles.backBtnModal} onPress={() => setBookModalVisible(false)}>
                                                <Text style={styles.backBtnText}>Back</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmBtn}>
                                                <Text style={styles.confirmBtnText}>Confirm Booking</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};


// Styles Copied from JewelleryDetails.jsx
const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLORS.akshid },

    // Fixed Hero
    heroBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 450 },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', pointerEvents: 'none' },

    // Fixed Header
    fixedHeader: {
        position: 'absolute', left: 20, right: 20, zIndex: 50,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    iconButtonBlur: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center', alignItems: 'center',
    },

    // Sheet
    sheetContainer: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingTop: 20,
        paddingHorizontal: 20,
        minHeight: 600,
        ...Platform.select({
            web: { boxShadow: '0px -5px 15px rgba(0,0,0,0.1)' },
            default: {
                shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 15
            }
        })
    },

    // Avatar
    avatarContainer: {
        position: 'absolute',
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: COLORS.akshid,
        padding: 4,
        zIndex: 10,
        ...Platform.select({
            default: { elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 5 }
        })
    },
    avatarImage: { width: '100%', height: '100%', borderRadius: 40 },

    // Vendor Info
    vendorInfoSection: { marginBottom: 20 },
    vendorName: { fontSize: 20, fontWeight: '800', color: COLORS.textDark, marginBottom: 5 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 4 },
    locationText: { fontSize: 13, color: COLORS.textGray, fontWeight: '500' },
    tagline: { fontSize: 13, color: COLORS.textGray, marginBottom: 12, lineHeight: 18 },

    statsRow: { flexDirection: 'row', gap: 15, alignItems: 'center' },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statValue: { fontSize: 12, fontWeight: '600', color: COLORS.textDark },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginBottom: 20 },

    // Main Tabs
    mainTabsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    mainTabItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    activeMainTabItem: {
        borderBottomColor: COLORS.darkHaldi,
    },
    mainTabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#A0A0A0'
    },
    activeMainTabText: {
        color: COLORS.darkHaldi
    },

    // Portfolio Section
    portfolioSection: { marginTop: 10 },
    portfolioHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 15
    },
    portfolioTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textDark },
    subCategoryTabs: { flexDirection: 'row', gap: 15 },
    subTabItem: { paddingBottom: 5, borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeSubTabItem: { borderBottomColor: COLORS.darkHaldi },
    subTabText: { fontSize: 13, fontWeight: '600', color: COLORS.textGray },
    activeSubTabText: { color: COLORS.darkHaldi },

    subFilterPills: { flexDirection: 'row', marginBottom: 20 },
    subFilterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginRight: 10,
        gap: 6
    },
    activeSubFilterPill: { backgroundColor: COLORS.darkHaldi },
    subFilterText: { fontSize: 13, fontWeight: '600', color: COLORS.textGray },
    activeSubFilterText: { color: COLORS.white },

    masonryGrid: { flexDirection: 'row', gap: 15 },
    gridColumn: { flex: 1, gap: 15 },
    masonryItem: {
        borderRadius: 80, // Large border radius for the oval effect
        overflow: 'hidden',
        backgroundColor: COLORS.haldi,
        position: 'relative'
    },
    gridImage: { width: '100%', height: '100%' },
    gridItemOverlay: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        paddingVertical: 5,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    gridItemText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: Platform.select({ ios: 'Times New Roman', android: 'serif' }),
    },

    // Videos
    videosGrid: { gap: 15 },
    videoCard: { marginBottom: 20, borderRadius: 15, overflow: 'hidden', backgroundColor: COLORS.white, elevation: 2 },
    videoThumbnail: { width: '100%', height: 200 },
    playIconOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
    videoDurationBadge: { position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    videoDurationText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
    videoInfoOverlay: { padding: 12 },
    videoTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark },

    // Media
    mediaList: { gap: 15 },
    mediaCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, overflow: 'hidden', elevation: 2 },
    mediaImage: { width: 100, height: 100 },
    mediaContent: { flex: 1, padding: 12, justifyContent: 'center' },
    mediaSource: { fontSize: 10, color: COLORS.textGray, marginBottom: 4, textTransform: 'uppercase' },
    mediaTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8 },
    readMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    readMoreText: { fontSize: 12, color: COLORS.kumkum, fontWeight: '600' },

    // Section Content generic
    sectionContent: { marginTop: 10 },
    sectionHeading: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 10, fontFamily: 'serif' },

    // Pricing
    pricingCard: { backgroundColor: COLORS.white, padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1, borderWidth: 1, borderColor: '#eee' },
    pricingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 },
    pricingTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
    popularTag: { backgroundColor: COLORS.gold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    popularText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
    pricingPrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.textRed, marginBottom: 5 },
    pricingDetails: { fontSize: 12, color: COLORS.textGray, lineHeight: 18 },

    // About
    aboutDescription: { fontSize: 14, color: COLORS.textGray, lineHeight: 22 },
    specialtiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
    specialtyItem: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f9f9f9', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
    specialtyText: { fontSize: 12, color: COLORS.textDark, fontWeight: '600' },

    // Reviews
    ratingSummary: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, padding: 15, borderRadius: 12, marginBottom: 15 },
    bigRating: { fontSize: 32, fontWeight: 'bold', color: COLORS.textDark, marginRight: 15 },
    totalReviews: { fontSize: 12, color: COLORS.textGray, marginTop: 2 },
    reviewCard: { backgroundColor: COLORS.white, padding: 15, borderRadius: 12, marginBottom: 10 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    reviewerInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    reviewerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontWeight: 'bold', color: COLORS.textGray },
    reviewerName: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark },
    reviewDate: { fontSize: 11, color: COLORS.textGray },
    reviewRating: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: 'green', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    ratingNum: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
    reviewComment: { fontSize: 13, color: COLORS.textGray, lineHeight: 18 },

    // Bottom CTA
    ctaRow: { marginTop: 30, flexDirection: 'row', gap: 15 },
    contactBtn: {
        flex: 1, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 30,
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10,
        ...Platform.select({
            web: { boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' },
            default: { elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }
        }),
    },
    bookBtn: { backgroundColor: COLORS.kumkum },
    viewPhotosBtn: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#eee' },
    contactBtnText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: COLORS.akshid,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 24,
        maxHeight: '85%'
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    modalTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.kumkum },
    closeBtn: { padding: 5, backgroundColor: '#f0f0f0', borderRadius: 20 },
    modalSubtitle: { fontSize: 13, color: COLORS.darkHaldi, marginBottom: 25 },
    formContainer: {},
    formCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 20,
        ...Platform.select({
            web: { boxShadow: '0px 6px 20px rgba(0,0,0,0.06)' },
            default: { elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 10 }
        })
    },
    inputGroup: { marginBottom: 18 },
    label: { fontSize: 14, fontWeight: '600', color: COLORS.textGray, marginBottom: 8 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        borderWidth: 1, borderColor: COLORS.haldi, borderRadius: 12,
        paddingHorizontal: 15, height: 50, backgroundColor: '#F9F9F9'
    },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, color: COLORS.textDark, fontSize: 14 },
    rowInputs: { flexDirection: 'row' },
    disclaimer: { fontSize: 11, color: COLORS.textGray, fontStyle: 'italic', marginBottom: 20 },
    modalFooter: { flexDirection: 'row', gap: 15 },
    backBtnModal: { flex: 1, paddingVertical: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.textGray, alignItems: 'center' },
    backBtnText: { color: COLORS.textGray, fontWeight: 'bold' },
    confirmBtn: { flex: 2, backgroundColor: COLORS.kumkum, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    confirmBtnText: { color: COLORS.white, fontWeight: 'bold' },
});

export default MakeupArtistDetails;
