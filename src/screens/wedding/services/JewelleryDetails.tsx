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

// STRICT Color Palette
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
};

const SUB_CATEGORIES = ['Photos', 'Videos', 'Media'];
const SUB_FILTERS = [
    { id: 'All', name: 'All', icon: 'grid-outline' },
    { id: 'floral', name: 'Floral', icon: 'flower-outline' },
    { id: 'theme', name: 'Theme', icon: 'color-palette-outline' },
    { id: 'traditional', name: 'Traditional', icon: 'layers-outline' },
];

const PORTFOLIO_IMAGES = [
    { id: '1', source: require('../../../../assets/EventMimg/Jewellery folder/jewelry1.jpg.jpeg'), height: 200, label: 'Traditional', category: 'traditional' },
    { id: '2', source: require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'), height: 280, label: 'Floral Design', category: 'floral' },
    { id: '3', source: require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'), height: 240, label: 'Theme Based', category: 'theme' },
    { id: '4', source: require('../../../../assets/EventMimg/Jewellery folder/jewelry4.jpg.jpeg'), height: 180, label: 'Bridal Set', category: 'traditional' },
    { id: '5', source: require('../../../../assets/EventMimg/Jewellery folder/RING 3.jpeg'), height: 260, label: 'Modern Ring', category: 'theme' },
    { id: '6', source: require('../../../../assets/EventMimg/Jewellery folder/RING1.jpg.jpeg'), height: 220, label: 'Floral Ring', category: 'floral' },
    { id: '7', source: require('../../../../assets/EventMimg/Jewellery folder/RING2.jpg.jpeg'), height: 240, label: 'Classic Gold', category: 'traditional' },
    { id: '8', source: require('../../../../assets/EventMimg/Jewellery folder/RING4.jpg.jpeg'), height: 200, label: 'Theme Cut', category: 'theme' },
];

const ABOUT_DATA = {
    description: "Welcome to Royal Orchid Palace, where we craft timeless pieces of jewellery that become a part of your legacy. Established in 1998, we have been serving the finest families with our exquisite gold, diamond, and polki collections.",
    highlights: ["custom designs", "certified purity", "lifetime exchange"],
    specialties: ["Bridal Sets", "Antique Kundan", "Solitaire Rings", "Temple Jewellery"]
};

const PRICING_PACKAGES = [
    { id: '1', title: 'Bridal Gold Set', price: '₹ 1.5L - 5L', details: 'Complete necklace, earrings, and maang tikka set in 22k gold.', popular: true },
    { id: '2', title: 'Diamond Engagement Ring', price: '₹ 50k - 2L', details: 'Solitaire and halo settings available in 18k gold and platinum.', popular: false },
    { id: '3', title: 'Antique Temple Set', price: '₹ 2L - 8L', details: 'Handcrafted deity motifs with precious gemstones.', popular: false },
    { id: '4', title: 'Polki Choker', price: '₹ 3L+', details: 'Uncut diamonds set in traditional jadau style.', popular: true },
];

const REVIEWS_DATA = [
    { id: '1', user: 'Anjali Sharma', rating: 5, date: '2 days ago', comment: 'Absolutely stunning collection! The bridal set I bought was the highlight of my wedding. Highly recommend.' },
    { id: '2', user: 'Rahul Verma', rating: 4, date: '1 week ago', comment: 'Great designs and transparent pricing. The staff was very patient and helpful.' },
    { id: '3', user: 'Priya Patel', rating: 5, date: '3 weeks ago', comment: 'Loved the custom engagement ring. It was exactly what I imagined. Thank you!' },
];

const VIDEOS_DATA = [
    { id: '1', thumbnail: require('../../../../assets/EventMimg/Jewellery folder/jewelry1.jpg.jpeg'), title: 'Bridal Collection Launch 2024', duration: '2:15' },
    { id: '2', thumbnail: require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'), title: 'Behind the Scenes: Handcrafted Kundan', duration: '4:30' },
    { id: '3', thumbnail: require('../../../../assets/EventMimg/Jewellery folder/bridalJewelary.jpg.jpeg'), title: 'Real Brides Testimonials', duration: '1:45' },
    { id: '4', thumbnail: require('../../../../assets/EventMimg/Jewellery folder/Djewellery.jpg.jpeg'), title: 'Diamond Solitaire Showcase', duration: '3:00' },
];

const MEDIA_DATA = [
    { id: '1', image: require('../../../../assets/EventMimg/Jewellery folder/jewelary.jpg.jpeg'), title: 'featured in Vogue Wedding Book 2024', source: 'Vogue India', date: 'Oct 2024' },
    { id: '2', image: require('../../../../assets/EventMimg/Jewellery folder/RING4.jpg.jpeg'), title: 'Best Traditional Jewellery Award', source: 'WeddingSutra', date: 'Aug 2024' },
    { id: '3', image: require('../../../../assets/EventMimg/Jewellery folder/accessories.jpg.jpeg'), title: 'Top 10 Jewellers in Pune', source: 'LBB Pune', date: 'July 2024' },
];

const JewelleryDetails: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { item } = route.params || {};

    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('PROJECTS');
    const [isBookmark, setIsBookmark] = useState(false);
    const [bookModalVisible, setBookModalVisible] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState('Media');
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
        if (item?.thumbnails && Array.isArray(item.thumbnails) && item.thumbnails.length > 0) {
            return item.thumbnails.map((img: any, index: number) => ({ id: `hero-${index}`, source: img }));
        }

        if (item?.image) {
            if (typeof item.image === 'string') {
                return [{ id: 'hero-main', source: { uri: item.image } }];
            }
            return [{ id: 'hero-main', source: item.image }];
        }
        return [];
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
            // Need to use scrollTo on the underlying native component or work with Animated ref
            // Since useAnimatedRef is often used with Reanimated, we use a standard ref here if possible 
            // but Animated.ScrollView might require .scrollTo({ y, animated })
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
                    {heroImages.map((item: any) => (
                        <Image
                            key={item.id}
                            source={item.source}
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
                        <Image source={item?.image} style={styles.avatarImage} resizeMode="cover" />
                    </Animated.View>

                    {/* Vendor Info - Animated */}
                    <Animated.View style={[styles.vendorInfoSection, animatedInfoStyle]}>
                        <Text style={styles.vendorName}>{item?.name || 'Royal Orchid Palace'}</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location-outline" size={16} color={COLORS.textGray} />
                            <Text style={styles.locationText}>{item?.location || 'Located in the beautiful city of Pune, MH.'}</Text>
                        </View>
                        <Text style={styles.tagline}>{item?.tagline || 'Offering a royal experience with curated luxury events.'}</Text>

                        {/* Highlights / Stats Row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="heart-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>2.5k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="eye-outline" size={18} color={COLORS.textDark} />
                                <Text style={styles.statValue}>15k</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Ionicons name="star" size={18} color={COLORS.darkHaldi} />
                                <Text style={styles.statValue}>{item?.ratingValue || 4.8} ({item?.reviews || 320})</Text>
                            </View>
                        </View>
                    </Animated.View>

                    <View style={styles.divider} />

                    {/* Highlights Scroll */}


                    {/* Main Tabs */}
                    <View
                        style={styles.mainTabsWrapper}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout;
                            setContentY(layout.y + 280); // +280 approx for Hero height + Info height if layout.y is relative to parent View
                            // Actually since onLayout is inside ScrollView, layout.y is relative to ScrollView content start
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
                                                <Text style={styles.mediaSource}>{item.source} • {item.date}</Text>
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
                                        <Ionicons name="diamond-outline" size={16} color={COLORS.kumkum} />
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
                                <Text style={styles.bigRating}>4.8</Text>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={16} color={COLORS.darkHaldi} />)}
                                    </View>
                                    <Text style={styles.totalReviews}>Based on 320 reviews</Text>
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
                            <Text style={styles.contactBtnText}>Book Visit</Text>
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
                                    <Text style={styles.modalTitle}>Book a Visit</Text>
                                    <TouchableOpacity onPress={() => setBookModalVisible(false)} style={styles.closeBtn}>
                                        <Ionicons name="close" size={20} color={COLORS.darkHaldi} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalSubtitle}>Schedule a tour of {item?.name || 'Royal Orchid Palace'}</Text>

                                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                                    <View style={styles.formCard}>
                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Full Name</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="person-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput
                                                    placeholder="Enter your full name"
                                                    style={styles.input}
                                                    placeholderTextColor={COLORS.textGray + '99'}
                                                    value={bookingForm.fullName}
                                                    onChangeText={(text) => setBookingForm(prev => ({ ...prev, fullName: text }))}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.inputGroup}>
                                            <Text style={styles.label}>Mobile Number (OTP optional)</Text>
                                            <View style={styles.inputWrapper}>
                                                <Ionicons name="call-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                <TextInput
                                                    placeholder="Enter mobile number"
                                                    keyboardType="phone-pad"
                                                    style={styles.input}
                                                    placeholderTextColor={COLORS.textGray + '99'}
                                                    value={bookingForm.mobile}
                                                    onChangeText={(text) => setBookingForm(prev => ({ ...prev, mobile: text }))}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.rowInputs}>
                                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                                <Text style={styles.label}>Preferred Date</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="calendar-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput
                                                        placeholder="DD/MM/YYYY"
                                                        style={styles.input}
                                                        placeholderTextColor={COLORS.textGray + '99'}
                                                        value={bookingForm.date}
                                                        onChangeText={(text) => setBookingForm(prev => ({ ...prev, date: text }))}
                                                    />
                                                </View>
                                            </View>
                                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                                <Text style={styles.label}>Time Slot</Text>
                                                <View style={styles.inputWrapper}>
                                                    <Ionicons name="time-outline" size={20} color={COLORS.textGray} style={styles.inputIcon} />
                                                    <TextInput
                                                        placeholder="e.g. 2:00 PM"
                                                        style={styles.input}
                                                        placeholderTextColor={COLORS.textGray + '99'}
                                                        value={bookingForm.timeSlot}
                                                        onChangeText={(text) => setBookingForm(prev => ({ ...prev, timeSlot: text }))}
                                                    />
                                                </View>
                                            </View>

                                        </View>

                                        <Text style={styles.disclaimer}>* Our relationship manager will call you to confirm the appointment.</Text>

                                        <View style={styles.modalFooter}>
                                            <TouchableOpacity style={styles.backBtnModal} onPress={() => setBookModalVisible(false)}>
                                                <Text style={styles.backBtnText}>Back</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.confirmBtn}>
                                                <Text style={styles.confirmBtnText}>Confirm Visit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback >
            </Modal >
        </View >
    );
};

// End of JewelleryDetails

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: COLORS.akshid },

    // Fixed Hero
    heroBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 450 },
    heroImage: { width: '100%', height: '100%' }, // Kept for reference, replaced by FlatList items inline style
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }, // Ensure overlay doesn't block touches if we want manual scroll

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
    scrollContent: { paddingBottom: 40 },
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

    // Avatar - Base styles, animated parts handled by reanimated
    avatarContainer: {
        position: 'absolute',
        // top: 50, // Handled by animation
        // left: 20, // Handled by animation
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: COLORS.akshid,
        padding: 4,
        zIndex: 10,
        ...Platform.select({
            default: { elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 5 }
        })
    },
    avatarImage: { width: '100%', height: '100%', borderRadius: 40 },

    // Vendor Info - Base styles
    vendorInfoSection: { marginBottom: 20 }, // marginLeft handled by animation
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
        backgroundColor: 'rgba(255, 255, 255, 0.25)', // Glassmorphic look
        paddingVertical: 5,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    gridItemText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '900',
        fontFamily: Platform.select({ ios: 'Times New Roman', android: 'serif' }), // Serif for that ETH style
    },

    // Bottom CTA
    ctaRow: { marginTop: 30, flexDirection: 'row', gap: 15 },
    contactBtn: {
        flex: 1, paddingVertical: 15, borderRadius: 30,
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
    input: {
        flex: 1, color: '#2B2B2B', fontSize: 15,
        ...Platform.select({
            web: { outlineStyle: 'none' as any }
        })
    },

    rowInputs: { flexDirection: 'row' },
    disclaimer: { fontSize: 11, color: COLORS.darkHaldi, fontStyle: 'italic', marginBottom: 25, lineHeight: 16 },
    modalFooter: { flexDirection: 'row', gap: 15, marginTop: 10 },
    backBtnModal: {
        flex: 0.4, backgroundColor: 'transparent', borderRadius: 12, borderWidth: 1, borderColor: COLORS.darkHaldi,
        justifyContent: 'center', alignItems: 'center', paddingVertical: 14
    },
    backBtnText: { color: COLORS.darkHaldi, fontWeight: '600', fontSize: 16 },
    confirmBtn: {
        flex: 1, backgroundColor: COLORS.kumkum, borderRadius: 12,
        justifyContent: 'center', alignItems: 'center', paddingVertical: 14,
        ...Platform.select({
            default: { elevation: 3 }
        })
    },
    confirmBtnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },

    // New Sections Styles
    sectionContent: { marginTop: 10, paddingBottom: 20 },
    sectionHeading: { fontSize: 22, fontWeight: '800', color: COLORS.textDark, marginBottom: 15 },

    // Pricing Styles
    pricingCard: {
        backgroundColor: COLORS.white, borderRadius: 16, padding: 15, marginBottom: 15,
        ...Platform.select({
            default: { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 }
        })
    },
    pricingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    pricingTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark },
    popularTag: { backgroundColor: '#FFF8E1', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, borderWidth: 1, borderColor: COLORS.haldi },
    popularText: { fontSize: 10, fontWeight: '700', color: COLORS.darkHaldi },
    pricingPrice: { fontSize: 18, fontWeight: '800', color: COLORS.kumkum, marginBottom: 5 },
    pricingDetails: { fontSize: 13, color: COLORS.textGray, lineHeight: 18 },

    // About Styles
    aboutDescription: { fontSize: 14, color: COLORS.textDark, lineHeight: 22 },
    specialtiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
    specialtyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, gap: 5, borderWidth: 1, borderColor: '#eee' },
    specialtyText: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },

    // Reviews Styles
    ratingSummary: { flexDirection: 'row', alignItems: 'center', gap: 15, marginBottom: 25, backgroundColor: '#FFF8E1', padding: 15, borderRadius: 16 },
    bigRating: { fontSize: 36, fontWeight: '800', color: COLORS.darkHaldi },
    totalReviews: { fontSize: 12, color: COLORS.textGray, marginTop: 2 },
    reviewCard: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
    reviewerInfo: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    reviewerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.kumkum, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: COLORS.white, fontWeight: 'bold', fontSize: 18 },
    reviewerName: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
    reviewDate: { fontSize: 11, color: COLORS.textGray },
    reviewRating: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.darkHaldi, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, gap: 3 },
    ratingNum: { color: COLORS.white, fontWeight: 'bold', fontSize: 12 },
    reviewComment: { fontSize: 13, color: '#444', lineHeight: 20 },

    // Video Styles
    videosGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    videoCard: {
        width: '48%', height: 120, borderRadius: 12, marginBottom: 15, overflow: 'hidden', position: 'relative', backgroundColor: '#000',
        ...Platform.select({
            default: { elevation: 3 }
        })
    },
    videoThumbnail: { width: '100%', height: '100%', opacity: 0.8 },
    playIconOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
    videoDurationBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    videoDurationText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    videoInfoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },

    videoTitle: { color: '#fff', fontSize: 11, fontWeight: '600', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },

    // Media Styles
    mediaList: { paddingBottom: 10 },
    mediaCard: {
        flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, marginBottom: 15, overflow: 'hidden',
        borderWidth: 1, borderColor: '#eee'
    },
    mediaImage: { width: 100, height: 100 },
    mediaContent: { flex: 1, padding: 12, justifyContent: 'center' },
    mediaSource: { fontSize: 11, color: COLORS.kumkum, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
    mediaTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 8, lineHeight: 20 },
    readMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    readMoreText: { fontSize: 12, color: COLORS.kumkum, fontWeight: '600' }
});

export default JewelleryDetails;