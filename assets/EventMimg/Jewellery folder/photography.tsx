import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    PanResponder,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import ph2 from '../../../../assets/images/ph2.jpg';
import ph3 from '../../../../assets/images/ph3.jpg';
import photography1 from '../../../../assets/images/photography1.jpg';

const { width } = Dimensions.get('window');

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
    inputBg: '#FFF5F5',
};

const PHOTOGRAPHERS_DATA = [
    {
        id: '1',
        name: 'Stories by Joseph',
        rating: 4.9,
        reviews: 320,
        tag: 'Luxury Candid',
        location: 'Anjuna, Goa',
        city: 'Goa',
        price: '₹3,00,000 / day',
        tags: ['Candid', 'Drone', 'Cinematic'],
        image: photography1,
        previews: [ph2, ph3, photography1],
        accentColor: '#3d1616',
    },
    {
        id: '2',
        name: 'Twogether Studios',
        rating: 5.0,
        reviews: 450,
        tag: 'Premium Wedding',
        location: 'Juhu, Mumbai',
        city: 'Mumbai',
        price: '₹2,00,000 / day',
        tags: ['Same-day edits', 'Traditional', 'Studio'],
        image: ph2,
        previews: [photography1, ph3, ph2],
        accentColor: '#301828',
    },
    {
        id: '3',
        name: 'The Wedding Filmer',
        rating: 4.8,
        reviews: 210,
        tag: 'Cinematic Films',
        location: 'South Delhi, Delhi',
        city: 'Delhi',
        price: '₹5,00,000 / day',
        tags: ['Luxury', 'Film', 'Destination'],
        image: ph3,
        previews: [ph2, photography1, ph3],
        accentColor: '#421010',
    },
];

const POSTS_DATA = [
    {
        id: 'p1',
        vendorName: 'Stories by Joseph',
        vendorLogo: photography1,
        images: [photography1, ph2, ph3],
        likes: 1200,
        city: 'Goa',
        description: 'Magic of destination weddings in Goa. Capturing the golden hour vibes.',
        rating: 4.9,
        eventType: 'Beach Wedding',
        locationDetail: 'W Hotel Goa',
        imageHeight: 220
    },
    {
        id: 'p2',
        vendorName: 'Twogether Studios',
        vendorLogo: ph2,
        images: [ph2, photography1, ph3],
        likes: 850,
        city: 'Mumbai',
        description: 'Elegant indoor ceremonies. Focus on emotions and traditional rituals.',
        rating: 5.0,
        eventType: 'Traditional Ceremony',
        locationDetail: 'Taj Mahal Palace',
        imageHeight: 180
    },
    {
        id: 'p3',
        vendorName: 'The Wedding Filmer',
        vendorLogo: ph3,
        images: [ph3, ph2, photography1],
        likes: 2100,
        city: 'Delhi',
        description: 'Grand cinematic films for royal destination weddings.',
        rating: 4.8,
        eventType: 'Royal Wedding',
        locationDetail: 'Fairmont Jaipur',
        imageHeight: 250
    },
    {
        id: 'p4',
        vendorName: 'Stories by Joseph',
        vendorLogo: photography1,
        images: [ph2, ph3, photography1],
        likes: 950,
        city: 'Goa',
        description: 'Candid moments from a sunset beach wedding.',
        rating: 4.9,
        eventType: 'Candid Shoot',
        locationDetail: 'Calangute, Goa',
        imageHeight: 200
    },
    {
        id: 'p5',
        vendorName: 'Twogether Studios',
        vendorLogo: ph2,
        images: [ph3, photography1, ph2],
        likes: 1100,
        city: 'Mumbai',
        description: 'Capturing the essence of traditional Marathi weddings.',
        rating: 5.0,
        eventType: 'Traditional',
        locationDetail: 'JW Marriott, Sahar',
        imageHeight: 230
    },
    {
        id: 'p6',
        vendorName: 'The Wedding Filmer',
        vendorLogo: ph3,
        images: [photography1, ph2, ph3],
        likes: 1800,
        city: 'Delhi',
        description: 'High-end destination wedding cinematography.',
        rating: 4.8,
        eventType: 'Cinematic Movie',
        locationDetail: 'Rambagh Palace, Jaipur',
        imageHeight: 180
    },
    {
        id: 'p7',
        vendorName: 'Stories by Joseph',
        vendorLogo: photography1,
        images: [ph3, ph2, photography1],
        likes: 720,
        city: 'Bangalore',
        description: 'Modern indoor wedding photography with natural lighting.',
        rating: 4.9,
        eventType: 'Pre-wedding Shoot',
        locationDetail: 'Leela Palace',
        imageHeight: 210
    },
    {
        id: 'p8',
        vendorName: 'Twogether Studios',
        vendorLogo: ph2,
        images: [photography1, ph3, ph2],
        likes: 1350,
        city: 'Pune',
        description: 'Emotional highlights from a grand reception night.',
        rating: 5.0,
        eventType: 'Reception',
        locationDetail: 'Conrad Pune',
        imageHeight: 190
    },
    {
        id: 'p9',
        vendorName: 'The Wedding Filmer',
        vendorLogo: ph3,
        images: [ph2, photography1, ph3],
        likes: 2400,
        city: 'Udaipur',
        description: 'Royal entries and cinematic slow-mo captures.',
        rating: 4.8,
        eventType: 'Grand Entry',
        locationDetail: 'The Oberoi Udaivilas',
        imageHeight: 240
    },
    {
        id: 'p10',
        vendorName: 'Stories by Joseph',
        vendorLogo: photography1,
        images: [photography1, ph2, ph3],
        likes: 680,
        city: 'Goa',
        description: 'The joy of intimate weddings. Simple and beautiful.',
        rating: 4.9,
        eventType: 'Intimate Wedding',
        locationDetail: 'South Goa Beach',
        imageHeight: 170
    }
];

const POPULAR_SEARCHES = ['Wedding Photographers Goa', 'Cinematic Shoots Mumbai', 'Candid Delhi', 'Traditional Wedding'];
const TRENDING_TAGS = ['Candid', 'Cinematic', 'Traditional', 'Destination'];

// Post Component (Dynamic Widths for Editorial Layout)
const PostCard = ({ post, onPostPress, onVendorPress, isFullWidth }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);

    const cardWidth = isFullWidth ? (width - 20) : (width - 28) / 2;
    const imageHeight = isFullWidth ? 200 : (post.imageHeight * 0.75);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % post.images.length;
            setActiveIndex(nextIndex);
            scrollRef.current?.scrollTo({ x: nextIndex * cardWidth, animated: true });
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, post.images.length, cardWidth]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
            useNativeDriver: false, listener: (event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
                if (index !== activeIndex) {
                    setActiveIndex(index);
                }
            }
        }
    );

    return (
        <TouchableOpacity
            style={[styles.postCardCompact, { width: cardWidth, marginBottom: 20 }]}
            onPress={() => onPostPress(post)}
            activeOpacity={0.95}
        >
            <View style={{ height: imageHeight, width: '100%', overflow: 'hidden' }}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={cardWidth}
                >
                    {post.images.map((img, index) => (
                        <Image key={index} source={img} style={{ width: cardWidth, height: imageHeight }} resizeMode="cover" />
                    ))}
                </ScrollView>

                <View style={styles.dotContainerCompact}>
                    {post.images.map((_, index) => (
                        <View key={index} style={[styles.dotSmall, activeIndex === index && styles.dotActiveSmall]} />
                    ))}
                </View>

                <TouchableOpacity style={styles.likeBtnSmall}>
                    <Ionicons name="heart-outline" size={15} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={[styles.infoPanelCompact, isFullWidth && { paddingHorizontal: 15, paddingVertical: 18 }]}>
                <View style={styles.panelHeaderCompact}>
                    <TouchableOpacity onPress={() => onVendorPress && onVendorPress(post)}>
                        <Text style={[styles.vendorNameCompact, isFullWidth && { fontSize: 16 }]} numberOfLines={1}>{post.vendorName}</Text>
                    </TouchableOpacity>
                    <View style={styles.ratingCompact}>
                        <Ionicons name="star" size={10} color={COLORS.secondary} />
                        <Text style={styles.ratingTextCompact}>{post.rating}</Text>
                    </View>
                </View>

                {isFullWidth && <Text style={styles.postDescriptionFull} numberOfLines={2}>{post.description}</Text>}

                <Text style={styles.eventTypeCompact}>{post.eventType} • {post.city}</Text>
                <Text style={styles.locationCompact} numberOfLines={1}>{post.locationDetail}</Text>

                <View style={styles.metaRowCompact}>
                    <Text style={styles.metaLikesCompact}>{post.likes} likes</Text>
                    <Ionicons name="bookmark-outline" size={13} color="#AAA" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const TESTIMONIALS = [
    {
        id: '1',
        couple: 'Aditi & Rohan',
        location: 'Udaipur',
        photographer: 'Stories by Joseph',
        quote: '“They captured emotions we didn’t even notice. Truly magical!”',
        image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop',
    },
    {
        id: '2',
        couple: 'Priya & Vikram',
        location: 'Goa',
        photographer: 'Twogether Studios',
        quote: '“The cinematic film was better than a Bollywood movie. Crying happy tears!”',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop',
    },
];

const REASONS_TO_BOOK = [
    { id: '1', text: 'Verified Professionals', icon: 'check-decagram' },
    { id: '2', text: 'Real Portfolios Only', icon: 'image-album' },
    { id: '3', text: 'Transparent Pricing', icon: 'cash-check' },
    { id: '4', text: 'Backup Team Available', icon: 'account-group' },
    { id: '5', text: 'Secure Payments', icon: 'shield-lock' },
];

const SwipeButton = ({ onSwipeComplete }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const buttonWidth = width - 70; // Adjusted for padding
    const knobWidth = 44;
    const swipeThreshold = buttonWidth - knobWidth - 10;

    const shimmerAnim = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dx >= 0 && gestureState.dx <= swipeThreshold) {
                    pan.setValue({ x: gestureState.dx, y: 0 });
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx >= swipeThreshold - 20) {
                    Animated.timing(pan, {
                        toValue: { x: swipeThreshold, y: 0 },
                        duration: 100,
                        useNativeDriver: false,
                    }).start(() => {
                        onSwipeComplete();
                        setTimeout(() => pan.setValue({ x: 0, y: 0 }), 500);
                    });
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        const startShimmer = () => {
            shimmerAnim.setValue(0);
            Animated.loop(
                Animated.sequence([
                    Animated.timing(shimmerAnim, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.delay(1000),
                ])
            ).start();
        };
        startShimmer();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-buttonWidth, buttonWidth],
    });

    return (
        <View style={styles.swipeContainer}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(0, 0, 0, 0.6)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    }
                ]}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
            <Text style={styles.swipeText}>Book now</Text>
            <Animated.View
                style={[
                    styles.swipeKnob,
                    { transform: pan.getTranslateTransform() }
                ]}
                {...panResponder.panHandlers}
            >
                <Ionicons name="airplane" size={18} color="#FFF" />
            </Animated.View>
        </View>
    );
};

const Photography = ({ navigation }) => {
    const scrollRef = useRef(null);
    const featuredScrollRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    // States
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isVendorProfileVisible, setIsVendorProfileVisible] = useState(false);
    const [activeMediaTab, setActiveMediaTab] = useState('Photos');
    const [activePhotoSubTab, setActivePhotoSubTab] = useState('Wedding');
    const [userRating, setUserRating] = useState(0);
    const [activeSection, setActiveSection] = useState('Projects');
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Contact Form States
    const [contactName, setContactName] = useState('');
    const [contactEventType, setContactEventType] = useState('');
    const [contactMobile, setContactMobile] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactDate, setContactDate] = useState('');
    const [contactTime, setContactTime] = useState('');
    const [contactNote, setContactNote] = useState('');


    // Animation Values for Sticky Tabs
    const tabUnderlineTranslateX = useRef(new Animated.Value(0)).current;
    const profileScrollY = useRef(new Animated.Value(0)).current;

    // Refs for profile section scrolling
    const profileScrollRef = useRef(null);
    const portfolioRef = useRef(null);
    const pricingRef = useRef(null);
    const aboutRef = useRef(null);
    const reviewsRef = useRef(null);

    const handleTabPress = (section, ref, index) => {
        setActiveSection(section);
        // Animate underline
        const tabWidth = 70;
        const gap = 20;
        Animated.spring(tabUnderlineTranslateX, {
            toValue: index * (tabWidth + gap),
            useNativeDriver: true,
            bounciness: 0
        }).start();

        scrollToProfileSection(ref);
    };

    const scrollToProfileSection = (ref) => {
        ref.current?.measureLayout(
            profileScrollRef.current,
            (x, y) => {
                profileScrollRef.current?.scrollTo({ y: y - 80, animated: true });
            },
            () => { }
        );
    };

    // Auto-scroll logic for Featured Collections
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSearchFocused) {
                const nextIndex = (featuredIndex + 1) % PHOTOGRAPHERS_DATA.length;
                setFeaturedIndex(nextIndex);
                featuredScrollRef.current?.scrollTo({
                    x: nextIndex * (width * 0.82 + 24), // card width + margin
                    animated: true,
                });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [featuredIndex, isSearchFocused]);

    // Filtering Logic
    const getFilteredPhotographers = () => {
        const query = searchQuery.toLowerCase();
        return PHOTOGRAPHERS_DATA.filter(v =>
            v.city.toLowerCase().includes(query) ||
            v.name.toLowerCase().includes(query) ||
            v.location.toLowerCase().includes(query)
        );
    };

    const getFilteredPosts = () => {
        const query = searchQuery.toLowerCase();
        return POSTS_DATA.filter(p =>
            p.city.toLowerCase().includes(query) ||
            p.vendorName.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.eventType.toLowerCase().includes(query)
        );
    };

    const renderActionHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground source={photography1} style={styles.heroImage} imageStyle={{ borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.heroGradient}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.utilityBtn}><Ionicons name="notifications-outline" size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 60, paddingHorizontal: 5 }}>
                        <Text style={styles.heroHeadline}>Capturing Your{"\n"}Forever Moments 📸</Text>
                        <Text style={styles.heroSubhead}>Explore top-rated wedding photographers</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>

            <View style={[styles.premiumSearchContainer, isSearchFocused && styles.premiumSearchActive]}>
                <TouchableOpacity style={styles.locationSelector}>
                    <Text style={styles.locationTextPin}>📍 {selectedCity}</Text>
                    <Ionicons name="chevron-down" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
                <View style={styles.searchDivider} />
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.premiumInput}
                        placeholder="Search photographer"
                        placeholderTextColor="#999"
                        onFocus={() => setSearchFocused(true)}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
            </View>

        </View>
    );

    const renderSearchOverlay = () => (
        <Modal visible={isSearchFocused} animationType="fade" transparent onRequestClose={() => setSearchFocused(false)}>
            <View style={styles.overlayContainer}>
                <View style={styles.overlayHeader}>
                    <View style={styles.overlaySearchBox}>
                        <TextInput
                            style={styles.overlayInput}
                            autoFocus
                            placeholder="Search photographer"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                        />
                        <TouchableOpacity onPress={() => { setSearchFocused(false); }}>
                            <Text style={styles.cancelText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.overlayContent}>
                    <Text style={styles.overlaySectionTitle}>Recent Discoveries</Text>
                    <View style={styles.recentList}>
                        {['Mumbai', 'Pune', 'Goa'].map((item, idx) => (
                            <TouchableOpacity key={idx} style={styles.recentItem} onPress={() => { setSearchQuery(item); setSearchFocused(false); setSelectedCity(item); }}>
                                <Ionicons name="search-outline" size={18} color="#999" />
                                <Text style={styles.recentText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.overlaySectionTitle}>Popular Collections</Text>
                    <View style={styles.popularRow}>
                        {POPULAR_SEARCHES.map((item, idx) => (
                            <TouchableOpacity key={idx} style={styles.popularTag} onPress={() => { setSearchQuery(item); setSearchFocused(false); }}>
                                <Text style={styles.popularTagText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );



    const renderLargePremiumVendorCards = () => {
        const filteredPhotographers = getFilteredPhotographers();
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Our Photographers</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>Browse More</Text></TouchableOpacity>
                </View>
                {filteredPhotographers.length > 0 ? (
                    <ScrollView
                        ref={featuredScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        decelerationRate="fast"
                        snapToInterval={width * 0.82 + 24}
                    >
                        {filteredPhotographers.map((vendor) => (
                            <TouchableOpacity
                                key={vendor.id}
                                style={styles.premiumVendorCard}
                                activeOpacity={0.9}
                                onPress={() => {
                                    setSelectedVendor(vendor);
                                    setIsVendorProfileVisible(true);
                                }}
                            >
                                <ImageBackground source={vendor.image} style={styles.vendorMainImg} imageStyle={{ borderRadius: 20 }}>
                                    <View style={styles.premiumTag}>
                                        <Text style={styles.premiumTagText}>{vendor.tag}</Text>
                                    </View>
                                </ImageBackground>
                                <View style={styles.vendorDetails}>
                                    <View style={styles.detailsTop}>
                                        <Text style={styles.vendorNamePremium}>{vendor.name}</Text>
                                        <View style={styles.ratingBadgePremium}>
                                            <Ionicons name="star" size={12} color="#FFF" />
                                            <Text style={styles.ratingTextPremium}>{vendor.rating}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.locationContainerPremium}>
                                        <Ionicons name="location-outline" size={14} color="#666" />
                                        <Text style={styles.locationTextPremium}>{vendor.location}</Text>
                                    </View>
                                    <View style={styles.previewsRow}>
                                        {vendor.previews.map((img, idx) => (
                                            <Image key={idx} source={img} style={styles.miniThumb} />
                                        ))}
                                        <TouchableOpacity style={styles.followBtnGold}>
                                            <Text style={styles.followTextGold}>Follow</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.noResults}><Text style={styles.noResultsText}>No photographers found</Text></View>
                )}
            </View>
        );
    };

    const renderVendorPostsFeed = () => {
        const filteredPosts = getFilteredPosts();

        const renderRhythmicPattern = () => {
            const pattern = [];
            let i = 0;
            while (i < filteredPosts.length) {
                pattern.push(
                    <View key={`full-${filteredPosts[i].id}`} style={{ paddingHorizontal: 10 }}>
                        <PostCard
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            onVendorPress={(p) => {
                                const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            isFullWidth={true}
                        />
                    </View>
                );
                i++;
                if (i >= filteredPosts.length) break;

                const pair = [];
                if (i < filteredPosts.length) {
                    pair.push(
                        <PostCard
                            key={`half-${filteredPosts[i].id}`}
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            onVendorPress={(p) => {
                                const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            isFullWidth={false}
                        />
                    );
                    i++;
                }
                if (i < filteredPosts.length) {
                    pair.push(
                        <PostCard
                            key={`half-${filteredPosts[i].id}`}
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                setSelectedPost(p);
                            }}
                            onVendorPress={(p) => {
                                const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                navigation.navigate('PhotographerPortfolio', { vendor });
                            }}
                            isFullWidth={false}
                        />
                    );
                    i++;
                }

                pattern.push(
                    <View key={`pair-${i}`} style={styles.editorialRow}>
                        {pair}
                    </View>
                );
            }
            return pattern;
        };

        return (
            <View style={styles.sectionContainer}>
                <View style={[styles.sectionHeader, { marginBottom: 25, paddingHorizontal: 10 }]}>
                    <Text style={styles.sectionTitle}>Recent Posts</Text>
                </View>
                {renderRhythmicPattern()}
            </View>
        );
    };

    const renderVendorProfileModal = () => {
        if (!selectedVendor) return null;

        // Mock categorize posts for the vendor
        const categories = {
            Candid: [photography1, ph2, ph3, photography1],
            Cinematic: [ph2, ph3, photography1, ph2],
            Traditional: [ph3, photography1, ph2, ph3]
        };

        return (
            <Modal
                visible={isVendorProfileVisible}
                animationType="slide"
                onRequestClose={() => setIsVendorProfileVisible(false)}
            >
                <View style={styles.profileContainer}>
                    <Animated.ScrollView
                        ref={profileScrollRef}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        stickyHeaderIndices={[2]}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: profileScrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >
                        {/* 0: Header with Background */}
                        <View style={styles.profileHeader}>
                            <Image source={selectedVendor.image || photography1} style={styles.coverImage} />
                            <LinearGradient
                                colors={['rgba(0,0,0,0.5)', 'transparent']}
                                style={styles.headerOverlay}
                            />
                            <TouchableOpacity
                                style={styles.closeBtnProfile}
                                onPress={() => setIsVendorProfileVisible(false)}
                            >
                                <Ionicons name="chevron-down" size={28} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        {/* 1: Profile Identity (Floating) */}
                        <View style={styles.profileIdentityOverlay}>
                            <View style={styles.avatarContainer}>
                                <Image source={selectedVendor.image || photography1} style={styles.avatarImage} />
                            </View>
                            <View style={styles.nameSection}>
                                <Text style={styles.profileVendorName}>{selectedVendor.name}</Text>
                                <Text style={styles.profileBusinessName}>Candid & Cinematic Excellence</Text>
                                <View style={styles.profileLocationRow}>
                                    <Ionicons name="location" size={16} color={COLORS.primary} />
                                    <Text style={styles.profileLocationText}>{selectedVendor.location}</Text>
                                </View>
                            </View>
                        </View>

                        {/* 2: Sticky Shortcut Nav Bar */}
                        <View style={styles.stickyNavWrapper}>
                            <View style={styles.shortcutNavBar}>
                                <TouchableOpacity onPress={() => handleTabPress('Projects', portfolioRef, 0)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Projects' && styles.shortcutNavTextActive]}>Projects</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleTabPress('Pricing', pricingRef, 1)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Pricing' && styles.shortcutNavTextActive]}>Pricing</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleTabPress('About', aboutRef, 2)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'About' && styles.shortcutNavTextActive]}>About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleTabPress('Reviews', reviewsRef, 3)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Reviews' && styles.shortcutNavTextActive]}>Reviews</Text>
                                </TouchableOpacity>

                                {/* Animated Gold Underline */}
                                <Animated.View
                                    style={[
                                        styles.tabUnderline,
                                        {
                                            width: 70,
                                            transform: [{ translateX: tabUnderlineTranslateX }]
                                        }
                                    ]}
                                />
                            </View>
                        </View>

                        {/* 3: Main Scrollable Content */}
                        <View style={styles.profileInfoContent}>
                            {/* Portfolio Section */}
                            <View ref={portfolioRef} style={styles.profileMediaSection}>
                                <View style={styles.mediaHeaderRow}>
                                    <Text style={styles.profileSectionLabel}>Portfolio</Text>
                                    <View style={styles.mediaMainTabs}>
                                        {['Photos', 'Videos'].map(mTab => (
                                            <TouchableOpacity
                                                key={mTab}
                                                style={[styles.mediaMainTab, activeMediaTab === mTab && styles.mediaMainTabActive]}
                                                onPress={() => setActiveMediaTab(mTab)}
                                            >
                                                <Text style={[styles.mTabText, activeMediaTab === mTab && styles.mTabTextActive]}>{mTab}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {activeMediaTab === 'Photos' ? (
                                    <View>
                                        {/* Portfolio Sub-Tabs */}
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            style={styles.mediaSubTabsScroll}
                                        >
                                            {['Pre-Wedding', 'Wedding', 'Post-Wedding'].map(sub => (
                                                <TouchableOpacity
                                                    key={sub}
                                                    style={[styles.mediaSubTab, activePhotoSubTab === sub && styles.mediaSubTabActive]}
                                                    onPress={() => setActivePhotoSubTab(sub)}
                                                >
                                                    <Text style={[styles.mediaSubTabText, activePhotoSubTab === sub && styles.mediaSubTabTextActive]}>{sub}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>

                                        {/* Filtered Content Title */}
                                        <Text style={[styles.profileSectionLabel, { marginBottom: 15, fontSize: 16 }]}>
                                            {activePhotoSubTab} Showcase
                                        </Text>

                                        {/* Featured Project */}
                                        <TouchableOpacity style={styles.featuredProjectCard}>
                                            <Image source={activePhotoSubTab === 'Pre-Wedding' ? ph2 : activePhotoSubTab === 'Post-Wedding' ? ph3 : photography1} style={styles.featuredProjectImage} />
                                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.featuredProjectOverlay}>
                                                <View style={styles.featuredBadge}><Text style={styles.featuredBadgeText}>Featured</Text></View>
                                                <Text style={styles.featuredProjectTitle}>{activePhotoSubTab} Memories</Text>
                                                <View style={styles.featuredMetaRow}>
                                                    <Text style={styles.featuredMetaText}>18 Photos • Story Highlights</Text>
                                                    <View style={styles.viewProjectBtn}><Text style={styles.viewProjectBtnText}>View Project</Text></View>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        {/* Pinterest Grid */}
                                        <View style={styles.pinterestGrid}>
                                            <View style={styles.gridColumn}>
                                                {[
                                                    { title: 'The Moment', type: activePhotoSubTab, likes: 145, images: [ph2, ph3, photography1], height: 260 },
                                                    { title: 'Tradition', type: activePhotoSubTab, likes: 120, images: [ph3, photography1, ph2], height: 200 }
                                                ].map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.cardCarousel}>
                                                            {proj.images.map((img, i) => (
                                                                <Image key={i} source={img} style={[styles.projectImage, { width: (width - 63) / 2 }]} />
                                                            ))}
                                                        </ScrollView>
                                                        <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                                                        <View style={styles.projectCardFooter}>
                                                            <View style={styles.likesRow}>
                                                                <Ionicons name="heart" size={14} color="#FF4b4b" />
                                                                <Text style={styles.likesText}>{proj.likes}</Text>
                                                            </View>
                                                            <TouchableOpacity style={styles.miniViewProject}><Ionicons name="eye" size={16} color={COLORS.secondary} /></TouchableOpacity>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                            <View style={styles.gridColumn}>
                                                {[
                                                    { title: 'Portrait', type: activePhotoSubTab, likes: 198, images: [photography1, ph2, ph3], height: 210 },
                                                    { title: 'Celebration', type: activePhotoSubTab, likes: 167, images: [ph2, ph3, photography1], height: 250 }
                                                ].map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.cardCarousel}>
                                                            {proj.images.map((img, i) => (
                                                                <Image key={i} source={img} style={[styles.projectImage, { width: (width - 63) / 2 }]} />
                                                            ))}
                                                        </ScrollView>
                                                        <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                                                        <View style={styles.projectCardFooter}>
                                                            <View style={styles.likesRow}>
                                                                <Ionicons name="heart" size={14} color="#FF4b4b" />
                                                                <Text style={styles.likesText}>{proj.likes}</Text>
                                                            </View>
                                                            <TouchableOpacity style={styles.miniViewProject}><Ionicons name="eye" size={16} color={COLORS.secondary} /></TouchableOpacity>
                                                        </View>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.videoPlaceholder}>
                                        <Ionicons name="play-circle-outline" size={48} color={COLORS.secondary} />
                                        <Text style={styles.videoPlaceholderText}>Cinematic films coming soon</Text>
                                    </View>
                                )}
                            </View>

                            {/* Pricing Section */}
                            <View ref={pricingRef} style={styles.profilePricingSection}>
                                <View style={styles.pricingSectionTitleRow}>
                                    <Text style={styles.profileSectionLabel}>Service Packages</Text>
                                    <View style={styles.verifiedPriceBadge}>
                                        <Ionicons name="shield-checkmark" size={14} color="#D48806" />
                                        <Text style={styles.verifiedPriceText}>Best Price Guaranteed</Text>
                                    </View>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pricingCardsScroll}>
                                    {[
                                        { title: 'The Wedding Story', price: '₹1,50,000', per: 'per day', tag: 'Most Popular', color: '#CC0E0E' },
                                        { title: 'Cinematic Memoir', price: '₹2,50,000', per: 'per day', tag: 'Best Value', color: '#D48806' },
                                        { title: 'Pre-Wedding Magic', price: '₹75,000', per: 'full shoot', tag: 'New', color: '#2C3E50' }
                                    ].map((pkg, idx) => (
                                        <View key={idx} style={styles.eventPriceCard}>
                                            <View style={[styles.eventCardTopTag, { backgroundColor: pkg.color }]}>
                                                <Text style={styles.eventCardTagText}>{pkg.tag}</Text>
                                            </View>
                                            <View style={styles.eventCardIdentity}>
                                                <Text style={styles.eventPackageTitle}>{pkg.title}</Text>
                                                <View style={styles.eventPriceTag}>
                                                    <Text style={styles.eventMainPrice}>{pkg.price}</Text>
                                                    <Text style={styles.eventPricePer}>{pkg.per}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.pricingDivider} />
                                            <View style={styles.pricingInclusions}>
                                                {[
                                                    { icon: 'camera', label: '2 Senior Photographers' },
                                                    { icon: 'videocam', label: '1 Cinematographer' },
                                                    { icon: 'copy', label: '300+ Edited High-Res' },
                                                    { icon: 'book', label: 'Premium Wedding Album' }
                                                ].map((inc, i) => (
                                                    <View key={i} style={styles.inclusionLine}>
                                                        <Ionicons name={inc.icon} size={16} color="#999" />
                                                        <Text style={styles.inclusionText}>{inc.label}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* About Us */}
                            <View ref={aboutRef} style={[styles.profileAboutContainer, { marginTop: 40 }]}>
                                <Text style={styles.profileSectionLabel}>Artist Story</Text>
                                <View style={styles.storyQuoteSection}>
                                    <View style={styles.quoteBar} />
                                    <Text style={styles.storyQuoteText}>
                                        "We don't just take pictures, we curate emotions and timeless stories."
                                    </Text>
                                </View>
                                <Text style={styles.profileAboutText}>
                                    With over a decade of capturing the most beautiful weddings across the globe, {selectedVendor.name} has become synonymous with artistic storytelling. Our approach is to be invisible yet present, catching those fleeting glances and silent tears of joy.
                                </Text>
                            </View>

                            {/* Reviews */}
                            <View ref={reviewsRef} style={styles.profileReviewsSection}>
                                <Text style={styles.profileSectionLabel}>Artist Ratings</Text>
                                <View style={styles.ratingOverview}>
                                    <View style={styles.bigRatingBadge}>
                                        <Text style={styles.bigRatingScore}>{selectedVendor.rating}</Text>
                                        <Text style={styles.bigRatingStatus}>Top Rated</Text>
                                        <View style={styles.bigRatingStars}>
                                            {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={14} color="#FFD700" />)}
                                        </View>
                                        <Text style={styles.bigRatingSub}>{selectedVendor.reviews} Reviews</Text>
                                    </View>
                                    <View style={styles.distributionSide}>
                                        {[
                                            { star: 5, progress: 0.92 },
                                            { star: 4, progress: 0.08 },
                                            { star: 3, progress: 0.0 }, { star: 2, progress: 0 }, { star: 1, progress: 0 }
                                        ].map(item => (
                                            <View key={item.star} style={styles.distRowMini}>
                                                <Text style={styles.distStarNumMini}>{item.star}</Text>
                                                <View style={styles.progressBarMiniBg}>
                                                    <View style={[styles.progressBarMiniFill, { width: `${item.progress * 100}%` }]} />
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            {/* Why Choose Us Section */}
                            <View style={styles.whyChooseCard}>
                                <Text style={styles.whyChooseTitle}>Why Choose Us</Text>
                                {[
                                    'Professional High-End Equipment',
                                    'Cinematic Storytelling Style',
                                    'Friendly & Experienced Crew',
                                    'Fast Delivery (30 Days)'
                                ].map((item, idx) => (
                                    <View key={idx} style={styles.whyChooseItem}>
                                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                        <Text style={styles.whyChooseText}>{item}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* FAQ Section */}
                            <View style={styles.faqSection}>
                                <Text style={styles.faqMainTitle}>FAQs</Text>
                                {[
                                    { q: 'How many photos will I receive?', a: 'Typically 300-500 edited images per event.' },
                                    { q: 'What is your delivery timeline?', a: 'Standard delivery is within 4-6 weeks.' },
                                    { q: 'Do you travel for weddings?', a: 'Yes, we capture weddings worldwide.' }
                                ].map((faq, idx) => (
                                    <View key={idx} style={styles.faqItem}>
                                        <View style={styles.faqHeader}>
                                            <Text style={styles.faqQuestion}>{faq.q}</Text>
                                            <Ionicons name="add" size={24} color="#999" />
                                        </View>
                                        <View style={styles.faqDivider} />
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.contactUsBtn}
                                onPress={() => setIsContactModalVisible(true)}
                            >
                                <Text style={styles.contactUsBtnText}>Contact Us</Text>
                                <Ionicons name="chatbubble-ellipses" size={22} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </Animated.ScrollView>
                    {renderContactModal()}
                </View>
            </Modal>
        );
    };

    const renderContactModal = () => {
        return (
            <Modal
                visible={isContactModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setIsContactModalVisible(false)}
            >
                <View style={styles.contactModalOverlay}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.contactModalContainer}
                    >
                        <View style={styles.contactFormCard}>
                            <View style={styles.contactHeader}>
                                <View>
                                    <Text style={styles.contactTitle}>Book a Visit</Text>
                                    <Text style={styles.contactSubTitle}>
                                        Schedule a tour of {selectedVendor?.name || 'Rohan Mehta'}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.closeContactBtn}
                                    onPress={() => setIsContactModalVisible(false)}
                                >
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                                <Text style={styles.contactLabel}>Full Name</Text>
                                <View style={styles.contactInputWrapper}>
                                    <Ionicons name="person-outline" size={20} color="#999" />
                                    <TextInput
                                        style={styles.contactInput}
                                        placeholder="Enter your full name"
                                        placeholderTextColor="#BBB"
                                        value={contactName}
                                        onChangeText={setContactName}
                                    />
                                </View>

                                <Text style={styles.contactLabel}>Mobile Number (OTP optional)</Text>
                                <View style={styles.contactInputWrapper}>
                                    <Ionicons name="call-outline" size={20} color="#999" />
                                    <TextInput
                                        style={styles.contactInput}
                                        placeholder="Enter mobile number"
                                        placeholderTextColor="#BBB"
                                        keyboardType="phone-pad"
                                        value={contactMobile}
                                        onChangeText={setContactMobile}
                                    />
                                </View>

                                <View style={styles.contactInputRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.contactLabel}>Event Type</Text>
                                        <View style={styles.contactInputWrapper}>
                                            <Ionicons name="list-outline" size={20} color="#999" />
                                            <TextInput
                                                style={styles.contactInput}
                                                placeholder="e.g. Wedding"
                                                placeholderTextColor="#BBB"
                                                value={contactEventType}
                                                onChangeText={setContactEventType}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.contactLabel}>City</Text>
                                        <View style={styles.contactInputWrapper}>
                                            <Ionicons name="business-outline" size={20} color="#999" />
                                            <TextInput
                                                style={styles.contactInput}
                                                placeholder="Enter city"
                                                placeholderTextColor="#BBB"
                                                value={contactCity}
                                                onChangeText={setContactCity}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.contactInputRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.contactLabel}>Preferred Date</Text>
                                        <View style={styles.contactInputWrapper}>
                                            <Ionicons name="calendar-outline" size={20} color="#999" />
                                            <TextInput
                                                style={styles.contactInput}
                                                placeholder="DD/MM/YYYY"
                                                placeholderTextColor="#BBB"
                                                value={contactDate}
                                                onChangeText={setContactDate}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.contactLabel}>Time Slot</Text>
                                        <View style={styles.contactInputWrapper}>
                                            <Ionicons name="time-outline" size={20} color="#999" />
                                            <TextInput
                                                style={styles.contactInput}
                                                placeholder="e.g. 2:00 PM"
                                                placeholderTextColor="#BBB"
                                                value={contactTime}
                                                onChangeText={setContactTime}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <Text style={styles.contactLabel}>Add a Note</Text>
                                <View style={[styles.contactInputWrapper, { height: 80, alignItems: 'flex-start', paddingTop: 10 }]}>
                                    <TextInput
                                        style={[styles.contactInput, { textAlignVertical: 'top' }]}
                                        placeholder="Optional notes..."
                                        placeholderTextColor="#BBB"
                                        multiline
                                        numberOfLines={3}
                                        value={contactNote}
                                        onChangeText={setContactNote}
                                    />
                                </View>

                                <View style={styles.contactActionRow}>
                                    <TouchableOpacity
                                        style={styles.backContactBtn}
                                        onPress={() => setIsContactModalVisible(false)}
                                    >
                                        <Text style={styles.backContactText}>Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.confirmContactBtn}
                                        onPress={() => {
                                            alert('Booking Request Sent!');
                                            setIsContactModalVisible(false);
                                        }}
                                    >
                                        <Text style={styles.confirmContactText}>Confirm Visit</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        );
    };






    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {renderActionHero()}

                {renderLargePremiumVendorCards()}

                {renderVendorPostsFeed()}

                <View style={{ height: 40 }} />
            </ScrollView>
            {renderSearchOverlay()}
            {renderVendorProfileModal()}


            <Modal visible={!!selectedPost} transparent animationType="slide" onRequestClose={() => setSelectedPost(null)}>
                <View style={styles.modalContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} pagingEnabled horizontal style={{ flex: 1 }}>
                        {selectedPost?.images.map((img, idx) => (
                            <Image key={idx} source={img} style={{ width: width, height: '100%' }} resizeMode="cover" />
                        ))}
                    </ScrollView>
                    <View style={styles.modalHeader}><TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPost(null)}><Ionicons name="close" size={24} color="#FFF" /></TouchableOpacity></View>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.modalContent}>
                        <View style={styles.modalVendorInfo}>
                            <View style={styles.modalLogo}><Image source={selectedPost?.vendorLogo} style={styles.miniLogoImg} /></View>
                            <View>
                                <Text style={styles.modalVendorName}>{selectedPost?.vendorName}</Text>
                                <Text style={styles.modalTagline}>{selectedPost?.locationDetail}</Text>
                            </View>
                        </View>
                        <Text style={styles.modalLongDesc}>{selectedPost?.description}</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={styles.modalPrimaryBtn}
                                onPress={() => {
                                    const vendor = PHOTOGRAPHERS_DATA.find(v => v.name === selectedPost?.vendorName) || { name: selectedPost?.vendorName, location: selectedPost?.locationDetail, image: selectedPost?.images[0] };
                                    setSelectedVendor(vendor);
                                    setIsVendorProfileVisible(true);
                                    setSelectedPost(null);
                                }}
                            >
                                <Text style={styles.btnText}>View Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    heroContainer: { marginBottom: 20 },
    heroImage: { width: width, height: 460, justifyContent: 'flex-end' },
    heroGradient: { flex: 1, justifyContent: 'flex-end', padding: 25, paddingBottom: 100 },
    topBar: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    backButton: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    utilityBtn: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    heroHeadline: { fontFamily: 'Outfit_700Bold', fontSize: 36, color: COLORS.white, lineHeight: 44, marginBottom: 12 },
    heroSubhead: { fontFamily: 'Outfit_400Regular', fontSize: 16, color: '#FFEB3B', marginBottom: 24, opacity: 0.95 },

    premiumSearchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        height: 60,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: -30,
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        paddingHorizontal: 18,
    },
    premiumSearchActive: { borderWidth: 1.5, borderColor: COLORS.secondary },
    locationSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 110 },
    locationTextPin: { fontFamily: 'Outfit_600SemiBold', fontSize: 15, color: '#333' },
    searchDivider: { width: 1.5, height: 28, backgroundColor: '#EEE', marginHorizontal: 12 },
    searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    premiumInput: { flex: 1, fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#333' },


    overlayContainer: { flex: 1, backgroundColor: '#FFF' },
    overlayHeader: { paddingTop: 60, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F5F5F5', paddingBottom: 20 },
    overlaySearchBox: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    overlayInput: { flex: 1, height: 48, backgroundColor: '#F8F8F8', borderRadius: 16, paddingHorizontal: 18, fontFamily: 'Outfit_400Regular', fontSize: 16 },
    cancelText: { color: COLORS.primary, fontFamily: 'Outfit_600SemiBold', fontSize: 15 },
    overlayContent: { padding: 25 },
    overlaySectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#333', marginBottom: 18, marginTop: 15 },
    recentList: { gap: 15, marginBottom: 25 },
    recentItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    recentText: { fontFamily: 'Outfit_400Regular', color: '#555', fontSize: 15 },
    popularRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
    popularTag: { backgroundColor: '#FFF9F0', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: '#FFECB3' },
    popularTagText: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#D48806' },

    premiumVendorCard: { width: width * 0.82, marginRight: 24, backgroundColor: '#FFF', borderRadius: 32, elevation: 6, overflow: 'hidden' },
    vendorMainImg: { width: '100%', height: 180, justifyContent: 'flex-start', padding: 15 },
    premiumTag: { backgroundColor: 'rgba(255,255,255,0.92)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    premiumTagText: { color: COLORS.primary, fontSize: 11, fontFamily: 'Outfit_700Bold', letterSpacing: 0.5 },
    vendorDetails: { padding: 20, paddingTop: 15 },
    detailsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNamePremium: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#222' },
    ratingBadgePremium: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, gap: 4 },
    ratingTextPremium: { color: '#FFF', fontSize: 12, fontFamily: 'Outfit_700Bold' },
    locationContainerPremium: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
    locationTextPremium: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666' },
    previewsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    miniThumb: { width: 44, height: 44, backgroundColor: '#F0F0F0', borderRadius: 10 },
    followBtnGold: { marginLeft: 'auto', borderWidth: 1.5, borderColor: COLORS.secondary, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 14 },
    followTextGold: { color: COLORS.secondary, fontFamily: 'Outfit_600SemiBold', fontSize: 13 },

    sectionContainer: { marginTop: 20 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#CC0E0E' },

    seeAllText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: COLORS.secondary },
    noResults: { padding: 60, alignItems: 'center' },
    noResultsText: { fontFamily: 'Outfit_400Regular', color: '#999', fontSize: 15 },

    postCardCompact: {
        borderRadius: 24,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: COLORS.secondary,
        elevation: 3,
    },
    dotContainerCompact: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
    dotActiveSmall: { width: 12, backgroundColor: '#FFF' },
    likeBtnSmall: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },
    infoPanelCompact: { paddingVertical: 14, paddingHorizontal: 15 },
    panelHeaderCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNameCompact: { fontFamily: 'Outfit_700Bold', fontSize: 13, color: '#111', flex: 1 },
    ratingCompact: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#F5F5F5', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
    ratingTextCompact: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#333' },
    eventTypeCompact: { fontFamily: 'Outfit_600SemiBold', fontSize: 10, color: COLORS.primary, marginBottom: 1 },
    locationCompact: { fontFamily: 'Outfit_400Regular', fontSize: 9, color: '#777', marginBottom: 10 },
    metaRowCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#EEE', paddingTop: 8 },
    metaLikesCompact: { fontFamily: 'Outfit_500Medium', fontSize: 10, color: '#999' },
    postDescriptionFull: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },
    editorialRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10, alignItems: 'flex-start' },

    modalContainer: { flex: 1, backgroundColor: '#000' },
    modalHeader: { position: 'absolute', top: 60, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    closeButton: { padding: 12, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 28 },
    modalContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 30, paddingBottom: 50, gap: 20 },
    modalVendorInfo: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    modalLogo: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: COLORS.secondary, overflow: 'hidden' },
    miniLogoImg: { width: '100%', height: '100%', borderRadius: 28 },
    modalVendorName: { color: '#FFF', fontSize: 24, fontFamily: 'Outfit_700Bold' },
    modalTagline: { color: COLORS.secondary, fontSize: 14, fontFamily: 'Outfit_500Medium' },
    modalLongDesc: { color: '#CCC', fontSize: 15, lineHeight: 22, fontFamily: 'Outfit_300Light' },
    modalActions: { flexDirection: 'row', gap: 16, marginTop: 10 },
    modalPrimaryBtn: { flex: 1, backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
    modalSecondaryBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', paddingVertical: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    btnText: { color: '#FFF', fontFamily: 'Outfit_600SemiBold', fontSize: 16 },

    // Profile Modal Styles
    profileContainer: { flex: 1, backgroundColor: '#FFF' },
    profileHeader: { height: 280, width: '100%', position: 'relative' },
    coverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerOverlay: { ...StyleSheet.absoluteFillObject },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 24 },
    profileIdentityOverlay: { marginTop: -60, paddingHorizontal: 20, alignItems: 'center' },
    avatarContainer: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#FFF', elevation: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, overflow: 'hidden', backgroundColor: '#F8F8F8' },
    avatarImage: { width: '100%', height: '100%' },
    nameSection: { alignItems: 'center', marginTop: 15 },
    profileVendorName: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#1A1A1A', textAlign: 'center' },
    profileBusinessName: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: COLORS.secondary, marginTop: 4, letterSpacing: 0.5 },
    profileLocationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
    profileLocationText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666' },

    stickyNavWrapper: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingTop: 10 },
    shortcutNavBar: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 15, gap: 20, position: 'relative' },
    shortcutNavText: { fontFamily: 'Outfit_600SemiBold', fontSize: 15, color: '#999', width: 70, textAlign: 'center' },
    shortcutNavTextActive: { color: COLORS.primary },
    tabUnderline: { position: 'absolute', bottom: 0, left: 20, height: 3, backgroundColor: COLORS.primary, borderRadius: 3 },

    profileInfoContent: { padding: 20 },
    profileSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#1A1A1A', marginBottom: 20 },
    mediaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },

    mediaSubTabsScroll: { marginBottom: 20 },
    mediaSubTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', marginRight: 10, borderWidth: 1, borderColor: '#EEE' },
    mediaSubTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    mediaSubTabText: { fontFamily: 'Outfit_600SemiBold', fontSize: 13, color: '#666' },
    mediaSubTabTextActive: { color: '#FFF' },
    mediaMainTabs: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 12, padding: 4 },
    mediaMainTab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
    mediaMainTabActive: { backgroundColor: '#FFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    mTabText: { fontFamily: 'Outfit_600SemiBold', fontSize: 13, color: '#999' },
    mTabTextActive: { color: COLORS.primary },

    featuredProjectCard: { height: 240, borderRadius: 24, overflow: 'hidden', marginBottom: 25 },
    featuredProjectImage: { width: '100%', height: '100%' },
    featuredProjectOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 20 },
    featuredBadge: { backgroundColor: COLORS.secondary, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 10 },
    featuredBadgeText: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#FFF', textTransform: 'uppercase' },
    featuredProjectTitle: { fontFamily: 'Outfit_700Bold', fontSize: 22, color: '#FFF' },
    featuredMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    featuredMetaText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#EEE' },
    viewProjectBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    viewProjectBtnText: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: '#FFF' },

    pinterestGrid: { flexDirection: 'row', gap: 15 },
    gridColumn: { flex: 1, gap: 15 },
    projectCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#F8F8F8', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
    cardCarousel: { flex: 1 },
    projectImage: { height: '100%', resizeMode: 'cover' },
    typeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    typeBadgeText: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: COLORS.primary },
    projectCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#FFF' },
    likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    likesText: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: '#666' },
    miniViewProject: { padding: 4 },

    profilePricingSection: { marginTop: 40 },
    pricingSectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    verifiedPriceBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF9E6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFE58F' },
    verifiedPriceText: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: '#D48806' },
    pricingCardsScroll: { paddingRight: 20 },

    eventPriceCard: { width: width * 0.75, backgroundColor: '#FFF', borderRadius: 24, padding: 24, marginRight: 15, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, borderWidth: 1, borderColor: '#F0F0F0' },
    eventCardTopTag: { position: 'absolute', top: 0, right: 30, paddingHorizontal: 12, paddingVertical: 6, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
    eventCardTagText: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#FFF' },
    eventCardIdentity: { marginTop: 10 },
    eventPackageTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#1A1A1A' },
    eventPriceTag: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 8 },
    eventMainPrice: { fontFamily: 'Outfit_700Bold', fontSize: 26, color: COLORS.primary },
    eventPricePer: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#999' },
    pricingDivider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 20 },
    pricingInclusions: { gap: 12, marginBottom: 25 },
    inclusionLine: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    inclusionText: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#555' },


    profileAboutContainer: { padding: 0 },
    storyQuoteSection: { flexDirection: 'row', gap: 15, marginBottom: 15 },
    quoteBar: { width: 4, backgroundColor: COLORS.secondary, borderRadius: 2 },
    storyQuoteText: { flex: 1, fontFamily: 'Outfit_600SemiBold', fontSize: 18, color: '#444', fontStyle: 'italic', lineHeight: 26 },
    profileAboutText: { fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#666', lineHeight: 24 },

    profileReviewsSection: { marginTop: 40 },
    ratingOverview: { flexDirection: 'row', gap: 20, alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 24, padding: 20 },
    bigRatingBadge: { alignItems: 'center', paddingRight: 20, borderRightWidth: 1, borderRightColor: '#E0E0E0' },
    bigRatingScore: { fontFamily: 'Outfit_700Bold', fontSize: 48, color: '#1A1A1A' },
    bigRatingStatus: { fontFamily: 'Outfit_700Bold', fontSize: 14, color: COLORS.secondary, textTransform: 'uppercase' },
    bigRatingStars: { flexDirection: 'row', marginVertical: 8 },
    bigRatingSub: { fontFamily: 'Outfit_500Medium', fontSize: 12, color: '#999' },
    distributionSide: { flex: 1, gap: 8 },
    distRowMini: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    distStarNumMini: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: '#666', width: 10 },
    progressBarMiniBg: { flex: 1, height: 6, backgroundColor: '#E0E0E0', borderRadius: 3 },
    progressBarMiniFill: { height: '100%', backgroundColor: '#FFD700', borderRadius: 3 },

    profileContactBtn: { backgroundColor: COLORS.primary, marginTop: 30, paddingVertical: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, elevation: 8, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 10 },
    profileContactBtnText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#FFF' },

    videoPlaceholder: { height: 200, backgroundColor: '#F8F8F8', borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#DDD' },
    videoPlaceholderText: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#999', marginTop: 10 },

    // Why Choose & FAQ Styles
    whyChooseCard: { backgroundColor: '#FFFEF5', borderRadius: 24, padding: 25, marginTop: 30, borderWidth: 1, borderColor: '#FFF9E6' },
    whyChooseTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#1A1A1A', marginBottom: 15 },
    whyChooseItem: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    whyChooseText: { fontFamily: 'Outfit_500Medium', fontSize: 15, color: '#444' },

    faqSection: { marginTop: 40 },
    faqMainTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#1A1A1A', marginBottom: 25 },
    faqItem: { marginBottom: 20 },
    faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
    faqQuestion: { fontFamily: 'Outfit_600SemiBold', fontSize: 16, color: '#1A1A1A', flex: 1 },
    faqDivider: { height: 1, backgroundColor: '#F0F0F0', marginTop: 10 },

    contactUsBtn: {
        backgroundColor: '#2C1810',
        marginTop: 30,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        elevation: 6,
        shadowColor: '#2C1810',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8
    },
    contactUsBtnText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#FFF' },

    // Contact Modal Styles
    contactModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
    contactModalContainer: { width: '100%' },
    contactFormCard: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingTop: 24,
        maxHeight: '90%',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 15
    },
    contactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    contactTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#C61E1A' },
    contactSubTitle: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#F29502', marginTop: 4 },
    closeContactBtn: { backgroundColor: '#F5F5F5', borderRadius: 25, padding: 8 },
    contactLabel: { fontFamily: 'Outfit_700Bold', fontSize: 13, color: '#C61E1A', marginTop: 12, marginBottom: 6 },
    contactInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FBFBFB',
        borderWidth: 1.5,
        borderColor: '#F29502',
        borderRadius: 16,
        paddingHorizontal: 15,
        height: 48,
        gap: 12
    },
    contactInput: { flex: 1, fontFamily: 'Outfit_500Medium', fontSize: 16, color: '#333' },
    contactInputRow: { flexDirection: 'row', gap: 12 },
    contactActionRow: { flexDirection: 'row', gap: 15, marginTop: 25, marginBottom: 10 },
    backContactBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
    confirmContactBtn: { flex: 2, height: 52, borderRadius: 16, backgroundColor: '#C61E1A', alignItems: 'center', justifyContent: 'center' },
    backContactText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#666' },
    confirmContactText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#FFF' },
});

export default Photography;