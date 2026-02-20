import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import VendorCard from '../../../components/VendorCard';
import venue1 from '../../../../assets/images/venue1.jpg';
import venue2 from '../../../../assets/images/venue2.jpg';
import venue3 from '../../../../assets/images/venue3.jpg';
import venue4 from '../../../../assets/images/venue4.jpg';
import venue5 from '../../../../assets/images/venue5.jpg';
import venue6 from '../../../../assets/images/venue6.jpg';
import venue7 from '../../../../assets/images/venue7.jpg';
import venue8 from '../../../../assets/images/venue8.jpg';

const { width } = Dimensions.get('window');

interface Vendor {
    id: string;
    name: string;
    rating: number;
    tag: string;
    location: string;
    city: string;
    image: any;
    previews: any[];
}

interface Post {
    id: string;
    vendorName: string;
    vendorLogo: any;
    images: any[];
    likes: number;
    city: string;
    description: string;
    rating: number;
    eventType: string;
    locationDetail: string;
    imageHeight: number;
}

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
    inputBg: '#FFF5F5',
};

const FEATURED_VENDORS = [
    {
        id: 'v1',
        name: 'Elite Decor',
        rating: 4.9,
        tag: 'Luxury Decor',
        location: 'Worli, Mumbai',
        city: 'Mumbai',
        image: venue1,
        previews: [venue6, venue7, venue8]
    },
    {
        id: 'v2',
        name: 'Grand Events',
        rating: 4.8,
        tag: 'Premium',
        location: 'Koregaon Park, Pune',
        city: 'Pune',
        image: venue2,
        previews: [venue5, venue3, venue4]
    },
    {
        id: 'v3',
        name: 'Budget Bliss',
        rating: 4.6,
        tag: 'Budget Friendly',
        location: 'Civil Lines, Jaipur',
        city: 'Jaipur',
        image: venue3,
        previews: [venue1, venue2, venue8]
    },
    {
        id: 'v4',
        name: 'Royal Banquets',
        rating: 4.9,
        tag: 'Luxury',
        location: 'Viman Nagar, Pune',
        city: 'Pune',
        image: venue4,
        previews: [venue2, venue6, venue7]
    },
];

const POSTS_DATA = [
    {
        id: 'p1',
        vendorName: 'Elite Decor',
        vendorLogo: venue1,
        images: [venue6, venue7, venue8],
        likes: 1200,
        city: 'Mumbai',
        description: 'Luxury Floral Mandap Setup with premium marigold and silk draping.',
        rating: 4.9,
        eventType: 'Wedding Ceremony',
        locationDetail: 'Palace Grounds',
        imageHeight: 220
    },
    {
        id: 'p2',
        vendorName: 'Grand Events',
        vendorLogo: venue2,
        images: [venue7, venue5, venue3],
        likes: 850,
        city: 'Pune',
        description: 'Minimalist Poolside Decor.',
        rating: 4.8,
        eventType: 'Cocktail Party',
        locationDetail: 'JW Marriott',
        imageHeight: 180
    },
    {
        id: 'p3',
        vendorName: 'Budget Bliss',
        vendorLogo: venue3,
        images: [venue8, venue1, venue2],
        likes: 640,
        city: 'Jaipur',
        description: 'Vibrant Palace Wedding themes.',
        rating: 4.6,
        eventType: 'Mehendi',
        locationDetail: 'Rambagh Palace',
        imageHeight: 250
    },
    {
        id: 'p4',
        vendorName: 'Royal Banquets',
        vendorLogo: venue4,
        images: [venue1, venue6, venue5],
        likes: 2100,
        city: 'Pune',
        description: 'Grand Ballroom Illumination.',
        rating: 4.9,
        eventType: 'Reception',
        locationDetail: 'Conrad Hotel',
        imageHeight: 160
    },
    {
        id: 'p5',
        vendorName: 'Snap Story',
        vendorLogo: venue5,
        images: [venue2, venue4, venue6],
        likes: 980,
        city: 'Mumbai',
        description: 'Candid Moments in Sunlight.',
        rating: 4.7,
        eventType: 'Photography',
        locationDetail: 'Bandra Fort',
        imageHeight: 210
    },
    {
        id: 'p6',
        vendorName: 'Elite Decor',
        vendorLogo: venue1,
        images: [venue3, venue5, venue7],
        likes: 1500,
        city: 'Mumbai',
        description: 'Bohemian Entrance Decor with hanging plants and floral accents.',
        rating: 4.9,
        eventType: 'Wedding',
        locationDetail: 'Beach Resort',
        imageHeight: 260
    },
];

const POPULAR_SEARCHES = ['Farmhouses in Pune', 'Resorts with Pool', 'Banquet Halls Mumbai', 'Wedding Lawns'];
const TRENDING_TAGS = ['Poolside', 'Royal', 'Beachfront', 'Minimalist'];

// Post Component (Dynamic Widths for Editorial Layout)
interface PostCardProps {
    post: Post;
    onPostPress: (post: Post) => void;
    onVendorPress?: (post: Post) => void;
    isFullWidth: boolean;
    key?: any; // Added to resolve TSC mismatch
}

const PostCard = ({ post, onPostPress, onVendorPress, isFullWidth }: PostCardProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);

    // Expanded widths: reduced margins
    const cardWidth = isFullWidth ? (width - 20) : (width - 28) / 2;
    // 40/60 Proportion: Image is approx 40% of reduced height
    const imageHeight = isFullWidth ? 200 : (post.imageHeight * 0.75);

    // Auto-scroll logic 
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
            useNativeDriver: false, listener: (event: any) => {
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

const WeddingVenue = ({ navigation }: { navigation: any }) => {
    const scrollRef = useRef<ScrollView>(null);
    const featuredScrollRef = useRef<ScrollView>(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    // States
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | any>(null);
    const [isVendorProfileVisible, setIsVendorProfileVisible] = useState(false);
    const [activeMediaTab, setActiveMediaTab] = useState('Photos');
    const [activePhotoCategory, setActivePhotoCategory] = useState('Venue'); // Changed default to 'Venue'
    const [userRating, setUserRating] = useState(0);
    const [activeSection, setActiveSection] = useState('Projects');

    // Animation Values for Sticky Tabs
    const tabUnderlineTranslateX = useRef(new Animated.Value(0)).current;
    const profileScrollY = useRef(new Animated.Value(0)).current;

    // Refs for profile section scrolling
    const profileScrollRef = useRef<ScrollView>(null);
    const portfolioRef = useRef<View>(null);
    const pricingRef = useRef<View>(null);
    const aboutRef = useRef<View>(null);
    const reviewsRef = useRef<View>(null);

    const handleTabPress = (section: string, ref: any, index: number) => {
        setActiveSection(section);
        // Animate underline
        const tabWidth = 70; // Slightly reduced width to fit 4 tabs
        const gap = 20;      // Slightly reduced gap
        Animated.spring(tabUnderlineTranslateX, {
            toValue: index * (tabWidth + gap),
            useNativeDriver: true,
            bounciness: 0
        }).start();

        scrollToProfileSection(ref);
    };

    const scrollToProfileSection = (ref: React.RefObject<View>) => {
        ref.current?.measureLayout(
            profileScrollRef.current as any,
            (x: number, y: number) => {
                profileScrollRef.current?.scrollTo({ y: y - 80, animated: true });
            },
            () => { }
        );
    };
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [featuredIndex, setFeaturedIndex] = useState(0);

    // Auto-scroll logic for Featured Collections
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSearchFocused) {
                const nextIndex = (featuredIndex + 1) % FEATURED_VENDORS.length;
                setFeaturedIndex(nextIndex);
                featuredScrollRef.current?.scrollTo({
                    x: nextIndex * (width * 0.82 + 24), // card width + margin
                    animated: true,
                });
            }
        }, 4000); // 4 seconds delay

        return () => clearInterval(interval);
    }, [featuredIndex, isSearchFocused]);

    // Filtering Logic
    const getFilteredVendors = () => {
        const query = searchQuery.toLowerCase();
        return FEATURED_VENDORS.filter(v =>
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
            <ImageBackground source={venue6} style={styles.heroImage} imageStyle={{ borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.heroGradient}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.utilityBtn}><Ionicons name="notifications-outline" size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 60, paddingHorizontal: 5 }}>
                        <Text style={styles.heroHeadline}>Finding Your{"\n"}Perfect Venue 💍</Text>
                        <Text style={styles.heroSubhead}>Explore exclusive high-end wedding spaces</Text>
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
                        placeholder="Search venues, areas…"
                        placeholderTextColor="#999"
                        onFocus={() => setSearchFocused(true)}
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
            </View>

            <View style={styles.trustIndicatorRow}>
                <View style={styles.trustBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.primary} /><Text style={styles.trustBadgeText}>Verified</Text></View>
                <View style={styles.trustBadge}><Ionicons name="sparkles" size={14} color={COLORS.primary} /><Text style={styles.trustBadgeText}>Premium Quality</Text></View>
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
                            placeholder="Search venues, areas…"
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
                        {['Mumbai', 'Pune', 'Jaipur'].map((item, idx) => (
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
        const filteredVendors = getFilteredVendors();
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Our Vendors</Text>
                    <TouchableOpacity><Text style={styles.seeAllText}>Browse More</Text></TouchableOpacity>
                </View>
                {filteredVendors.length > 0 ? (
                    <ScrollView
                        ref={featuredScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
                        decelerationRate="fast"
                        snapToInterval={width * 0.82 + 24}
                    >
                        {filteredVendors.map((vendor) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor}
                                onPress={() => {
                                    setSelectedVendor(vendor);
                                    setIsVendorProfileVisible(true);
                                }}
                                containerStyle={{ marginRight: 24 }}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.noResults}><Text style={styles.noResultsText}>No vendors found</Text></View>
                )}
            </View>
        );
    };

    const renderVendorPostsFeed = () => {
        const filteredPosts = getFilteredPosts();

        // Rhythmic Logic: 1 Full -> 2 Half -> 1 Full...
        const renderRhythmicPattern = () => {
            const pattern = [];
            let i = 0;
            while (i < filteredPosts.length) {
                // Full Width Post
                pattern.push(
                    <View key={`full-${filteredPosts[i].id}`} style={{ paddingHorizontal: 10 }}>
                        <PostCard
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            isFullWidth={true}
                        />
                    </View>
                );
                i++;
                if (i >= filteredPosts.length) break;

                // Two Half Width Posts
                const pair = [];
                if (i < filteredPosts.length) {
                    pair.push(
                        <PostCard
                            key={`half-${filteredPosts[i].id}`}
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
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
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.vendorName) || { name: p.vendorName, location: p.city, image: p.images[0] };
                                setSelectedVendor(vendor);
                                setIsVendorProfileVisible(true);
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
            Banquet: [venue6, venue1, venue3, venue5],
            Lawn: [venue7, venue2, venue8, venue4],
            Resorts: [venue3, venue5, venue6, venue1]
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
                            <Image source={selectedVendor.image || venue1} style={styles.coverImage} />
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
                                <Image source={selectedVendor.image || venue1} style={styles.avatarImage} />
                            </View>
                            <View style={styles.nameSection}>
                                <Text style={styles.profileVendorName}>{selectedVendor.name}</Text>
                                <Text style={styles.profileBusinessName}>Wedding & Events Specialist</Text>
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
                                            width: 70, // Matches new tabWidth
                                            transform: [{ translateX: tabUnderlineTranslateX }]
                                        }
                                    ]}
                                />
                            </View>
                        </View>

                        {/* 3: Main Scrollable Content */}
                        <View style={styles.profileInfoContent}>
                            {/* Media Section (Projects) */}
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
                                        {/* Row of Categories (Venue, Resort, Lawns, Banquet) */}
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={styles.photoCategoryScroll}
                                        >
                                            {['Venue', 'Resort', 'Lawns', 'Banquet'].map((cat) => (
                                                <TouchableOpacity
                                                    key={cat}
                                                    style={[styles.photoCategoryTab, activePhotoCategory === cat && styles.photoCategoryTabActive]}
                                                    onPress={() => setActivePhotoCategory(cat)}
                                                >
                                                    <Text style={[styles.photoCategoryText, activePhotoCategory === cat && styles.photoCategoryTextActive]}>
                                                        {cat}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>

                                        {/* Featured Project Card */}
                                        <TouchableOpacity style={styles.featuredProjectCard}>
                                            <Image source={venue6} style={styles.featuredProjectImage} />
                                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.featuredProjectOverlay}>
                                                <View style={styles.featuredBadge}><Text style={styles.featuredBadgeText}>Featured</Text></View>
                                                <Text style={styles.featuredProjectTitle}>Grand Royal Wedding 2024</Text>
                                                <View style={styles.featuredMetaRow}>
                                                    <Text style={styles.featuredMetaText}>12 Photos • Luxury Backdrop</Text>
                                                    <View style={styles.viewProjectBtn}><Text style={styles.viewProjectBtnText}>View Project</Text></View>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        {/* 2-Column Pinterest-style Grid */}
                                        <View style={styles.pinterestGrid}>
                                            <View style={styles.gridColumn}>
                                                {[
                                                    { title: 'Elegant Lawn Reception', type: 'Lawns', likes: 124, images: [venue7, venue2, venue8], height: 260 },
                                                    { title: 'Modern Banquet Setup', type: 'Banquet', likes: 89, images: [venue3, venue5, venue6], height: 200 }
                                                ].filter(p => activePhotoCategory === 'Venue' || p.type === activePhotoCategory).map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <ScrollView
                                                            horizontal
                                                            pagingEnabled
                                                            showsHorizontalScrollIndicator={false}
                                                            style={styles.cardCarousel}
                                                        >
                                                            {proj.images.map((img, i) => (
                                                                <Image key={i} source={img} style={[styles.projectImage, { width: (width - 63) / 2 }]} />
                                                            ))}
                                                        </ScrollView>
                                                        <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                                                        <View style={[styles.pagerDots, { bottom: 50 }]}>
                                                            {proj.images.map((_, i) => <View key={i} style={styles.miniDot} />)}
                                                        </View>
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
                                                    { title: 'Lakeside Resort Gala', type: 'Resort', likes: 210, images: [venue5, venue6, venue1], height: 210 },
                                                    { title: 'Golden Hour Lawn', type: 'Lawns', likes: 156, images: [venue1, venue4, venue7], height: 250 }
                                                ].filter(p => activePhotoCategory === 'Venue' || p.type === activePhotoCategory).map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <ScrollView
                                                            horizontal
                                                            pagingEnabled
                                                            showsHorizontalScrollIndicator={false}
                                                            style={styles.cardCarousel}
                                                        >
                                                            {proj.images.map((img, i) => (
                                                                <Image key={i} source={img} style={[styles.projectImage, { width: (width - 63) / 2 }]} />
                                                            ))}
                                                        </ScrollView>
                                                        <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                                                        <View style={[styles.pagerDots, { bottom: 50 }]}>
                                                            {proj.images.map((_, i) => <View key={i} style={styles.miniDot} />)}
                                                        </View>
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
                                        <Text style={styles.videoPlaceholderText}>Video walkthroughs coming soon</Text>
                                    </View>
                                )}
                            </View>

                            {/* Phase 6: Premium Pricing Section */}
                            <View ref={pricingRef} style={styles.profilePricingSection}>
                                <View style={styles.pricingSectionTitleRow}>
                                    <Text style={styles.profileSectionLabel}>Event Pricing</Text>
                                    <View style={styles.verifiedPriceBadge}>
                                        <Ionicons name="shield-checkmark" size={14} color="#D48806" />
                                        <Text style={styles.verifiedPriceText}>Best Price Guaranteed</Text>
                                    </View>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pricingCardsScroll}>
                                    {[
                                        { title: 'Wedding Royale', price: '₹1,50,000', per: 'per event', tag: 'Most Popular', color: '#CC0E0E' },
                                        { title: 'Engagement Gala', price: '₹75,000', per: 'per event', tag: 'Limited Offer', color: '#D48806' },
                                        { title: 'Pre-Wedding Shoot', price: '₹45,000', per: 'per day', tag: 'New', color: '#2C3E50' }
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
                                                {([
                                                    { icon: 'restaurant', label: 'In-house Catering' },
                                                    { icon: 'bed', label: '2 Luxury AC Rooms' },
                                                    { icon: 'color-palette', label: 'Premium Theme Decor' },
                                                    { icon: 'musical-notes', label: 'Sound & Basic IQ' }
                                                ] as { icon: any, label: string }[]).map((inc, i) => (
                                                    <View key={i} style={styles.inclusionLine}>
                                                        <Ionicons name={inc.icon} size={16} color="#999" />
                                                        <Text style={styles.inclusionText}>{inc.label}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            <TouchableOpacity style={[styles.bookNowMinBtn, { borderColor: pkg.color }]}>
                                                <Text style={[styles.bookNowMinText, { color: pkg.color }]}>Customize Plan</Text>
                                            </TouchableOpacity>

                                            {/* Decorative Punch Holes (Ticket Style) */}
                                            <View style={styles.ticketPunchLeft} />
                                            <View style={styles.ticketPunchRight} />
                                        </View>
                                    ))}
                                </ScrollView>

                                <View style={styles.pricingFootnote}>
                                    <Ionicons name="information-circle" size={14} color="#666" />
                                    <Text style={styles.footnoteText}>Prices vary based on guest count and peak dates.</Text>
                                </View>
                            </View>

                            {/* About Us Section */}
                            <View ref={aboutRef} style={[styles.profileAboutContainer, { marginTop: 40 }]}>
                                <Text style={styles.profileSectionLabel}>About Us</Text>

                                <View style={styles.storyQuoteSection}>
                                    <View style={styles.quoteBar} />
                                    <Text style={styles.storyQuoteText}>
                                        "Crafting timeless celebrations and magical memories for over 15 years."
                                    </Text>
                                </View>

                                <Text style={styles.profileAboutText}>
                                    With over 15 years of excellence in the wedding industry, {selectedVendor.name} is dedicated to creating magical moments that last a lifetime. Our team of professionals brings a unique blend of creativity and precision to every event.
                                </Text>

                                <View style={styles.statsGrid}>
                                    <View style={styles.statCard}>
                                        <Ionicons name="calendar" size={24} color={COLORS.secondary} />
                                        <Text style={styles.statVal}>15+</Text>
                                        <Text style={styles.statLabel}>Years Exp.</Text>
                                    </View>
                                    <View style={styles.statCard}>
                                        <Ionicons name="sparkles" size={24} color={COLORS.secondary} />
                                        <Text style={styles.statVal}>250+</Text>
                                        <Text style={styles.statLabel}>Events Done</Text>
                                    </View>
                                    <View style={styles.statCard}>
                                        <Ionicons name="happy" size={24} color={COLORS.secondary} />
                                        <Text style={styles.statVal}>98%</Text>
                                        <Text style={styles.statLabel}>Satisfaction</Text>
                                    </View>
                                    <View style={styles.statCard}>
                                        <Ionicons name="star" size={24} color={COLORS.secondary} />
                                        <Text style={styles.statVal}>Luxury</Text>
                                        <Text style={styles.statLabel}>Service</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Reviews Section */}
                            <View ref={reviewsRef} style={styles.profileReviewsSection}>
                                <Text style={styles.profileSectionLabel}>Ratings & Reviews</Text>

                                <View style={styles.ratingOverview}>
                                    <View style={styles.bigRatingBadge}>
                                        <Text style={styles.bigRatingScore}>5.0</Text>
                                        <Text style={styles.bigRatingStatus}>Excellent</Text>
                                        <View style={styles.bigRatingStars}>
                                            {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={14} color="#FFD700" />)}
                                        </View>
                                        <Text style={styles.bigRatingSub}>53 Verfied Reviews</Text>
                                    </View>

                                    <View style={styles.distributionSide}>
                                        {[
                                            { star: 5, progress: 0.95 },
                                            { star: 4, progress: 0.05 },
                                            { star: 3, progress: 0.02 },
                                            { star: 2, progress: 0 },
                                            { star: 1, progress: 0 }
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

                                {/* Interactive Rating Prompt */}
                                <View style={styles.personalRatingContainer}>
                                    <Text style={styles.personalRatingTitle}>Tap to Rate</Text>
                                    <View style={styles.interactiveStars}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <TouchableOpacity key={s} onPress={() => setUserRating(s)}>
                                                <Ionicons
                                                    name={s <= userRating ? "star" : "star-outline"}
                                                    size={38}
                                                    color={s <= userRating ? "#FFD700" : "#EEE"}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {[
                                    { name: 'Aditya & Neha', rating: 5, comment: 'Absolutely stunning work! The attention to detail in the decor exceeded our expectations.' },
                                    { name: 'Rahul S.', rating: 4, comment: 'Very professional team. They managed the timeline perfectly during our engagement ceremony.' }
                                ].map((rev, i) => (
                                    <View key={i} style={styles.reviewCard}>
                                        <View style={styles.reviewHeader}>
                                            <Text style={styles.reviewerName}>{rev.name}</Text>
                                            <View style={styles.ratingStars}>
                                                <Ionicons name="star" size={14} color="#FFD700" />
                                                <Text style={styles.ratingVal}>{rev.rating}.0</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.reviewComment}>{rev.comment}</Text>
                                    </View>
                                ))}

                                {/* Engagement Trigger Sections */}
                                <View style={styles.engagementTriggers}>
                                    <View style={styles.triggerCard}>
                                        <Text style={styles.triggerLabel}>Starting Price</Text>
                                        <Text style={styles.triggerVal}>₹1,500 <Text style={styles.perPlate}>/plate</Text></Text>
                                    </View>
                                    <View style={styles.triggerCard}>
                                        <Text style={styles.triggerLabel}>Capacity</Text>
                                        <Text style={styles.triggerVal}>200 - 2,000 <Text style={styles.perPlate}>Guests</Text></Text>
                                    </View>
                                </View>

                                <View style={styles.whyChooseSection}>
                                    <Text style={styles.smallSectionLabel}>Why Choose Us</Text>
                                    {[
                                        'Exclusive In-house Catering',
                                        'Advanced Lighting & Sound',
                                        'AC Changing Rooms for Guest',
                                        'Dedicated Event Coordinator'
                                    ].map((item, i) => (
                                        <View key={i} style={styles.checkRow}>
                                            <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
                                            <Text style={styles.checkText}>{item}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* FAQs Accordion */}
                                <View style={styles.faqSection}>
                                    <Text style={styles.profileSectionLabel}>FAQs</Text>
                                    {[
                                        { q: 'Is outside catering allowed?', a: 'We primarily provide in-house catering but allow external vendors with a royalty fee.' },
                                        { q: 'Do you have AC rooms?', a: 'Yes, we provide 4 luxury AC rooms for the bride and groom parties.' }
                                    ].map((faq, i) => (
                                        <TouchableOpacity key={i} style={styles.faqCard}>
                                            <View style={styles.faqHeader}>
                                                <Text style={styles.faqQuestion}>{faq.q}</Text>
                                                <Ionicons name="add" size={20} color="#999" />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Final Contact CTA */}
                                <TouchableOpacity style={styles.profileContactBtn}>
                                    <Text style={styles.profileContactBtnText}>Contact Us</Text>
                                    <Ionicons name="chatbubble-ellipses" size={20} color="#FFF" />
                                </TouchableOpacity>
                            </View> {/* End profileReviewsSection */}
                        </View> {/* End profileInfoContent */}
                    </Animated.ScrollView>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })} scrollEventThrottle={16}>
                {renderActionHero()}
                {renderLargePremiumVendorCards()}
                {renderVendorPostsFeed()}

                <View style={styles.footerContainer}><TouchableOpacity style={styles.stickyButton}><Text style={styles.stickyButtonText}>Shortlist Venues</Text><Ionicons name="arrow-forward" size={18} color="#FFF" /></TouchableOpacity></View>
            </ScrollView>

            {renderSearchOverlay()}

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
                                    const vendor = FEATURED_VENDORS.find(v => v.name === selectedPost?.vendorName) || { name: selectedPost?.vendorName, location: selectedPost?.locationDetail, image: selectedPost?.images[0] };
                                    setSelectedVendor(vendor);
                                    setIsVendorProfileVisible(true);
                                }}
                            >
                                <Text style={styles.btnText}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalSecondaryBtn}><Ionicons name="call-outline" size={20} color="#FFF" /><Text style={styles.btnText}>Contact</Text></TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>

            {renderVendorProfileModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    heroContainer: { marginBottom: 50 },
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

    trustIndicatorRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 25 },
    trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 14, elevation: 1 },
    trustBadgeText: { fontFamily: 'Outfit_500Medium', fontSize: 12, color: COLORS.primary },

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

    // Premium Vendor Card (Full-Bleed)
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

    // Discovery Feed (Staggered Pinterest-style)
    sectionContainer: { marginTop: 40 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#CC0E0E' },

    // Pricing Section Styles
    profilePricingSection: { marginTop: 35, paddingHorizontal: 20 },
    pricingSectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    verifiedPriceBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF9F0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#FFECB3' },
    verifiedPriceText: { fontFamily: 'Outfit_600SemiBold', fontSize: 11, color: '#D48806' },
    pricingCardsScroll: { paddingRight: 20, paddingVertical: 10 },
    eventPriceCard: {
        width: width * 0.75,
        backgroundColor: '#FFF',
        borderRadius: 24,
        marginRight: 20,
        padding: 24,
        paddingTop: 45,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden'
    },
    eventCardTopTag: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomLeftRadius: 20
    },
    eventCardTagText: { color: '#FFF', fontFamily: 'Outfit_700Bold', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
    eventCardIdentity: { marginBottom: 15 },
    eventPackageTitle: { fontFamily: 'Outfit_700Bold', fontSize: 22, color: '#222', marginBottom: 5 },
    eventPriceTag: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
    eventMainPrice: { fontFamily: 'Outfit_800ExtraBold', fontSize: 28, color: COLORS.primary },
    eventPricePer: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#666' },
    pricingDivider: { height: 1.5, backgroundColor: '#F0F0F0', marginVertical: 15, borderStyle: 'dashed', borderRadius: 1 },
    pricingInclusions: { gap: 10, marginBottom: 25 },
    inclusionLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    inclusionText: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#555' },
    bookNowMinBtn: {
        height: 50,
        borderRadius: 15,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bookNowMinText: { fontFamily: 'Outfit_700Bold', fontSize: 14 },
    ticketPunchLeft: {
        position: 'absolute',
        left: -12,
        top: '48%',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fdfcf0', // Matches modal background if ivory
        zIndex: 10
    },
    ticketPunchRight: {
        position: 'absolute',
        right: -12,
        top: '48%',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fdfcf0',
        zIndex: 10
    },
    pricingFootnote: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 15, opacity: 0.7 },
    footnoteText: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#666' },

    // Discovery Feed (Staggered Pinterest-style)
    staggeredGrid: { flexDirection: 'row', paddingHorizontal: 15, gap: 12 },
    gridColumn: { flex: 1, gap: 20 }, // Removed duplicate gridColumn later
    postCardCompact: {
        borderRadius: 24,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: COLORS.secondary, // Yellow/Gold border
        elevation: 3,
    },

    dotContainerCompact: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
    dotActiveSmall: { width: 12, backgroundColor: '#FFF' },
    likeBtnSmall: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },

    imageBleedGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
    },

    // Info Panel Compact
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

    // Profile Screen Styles
    profileContainer: { flex: 1, backgroundColor: '#FFF' },
    profileHeader: { height: 320, width: '100%' },
    coverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
    profileIdentityOverlay: { marginTop: -60, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 24, paddingTop: 20, alignItems: 'center', paddingBottom: 20 },
    avatarContainer: { width: 110, height: 110, borderRadius: 55, borderWidth: 5, borderColor: '#FFF', elevation: 15, backgroundColor: '#FFF', overflow: 'hidden', marginTop: -70 },
    avatarImage: { width: '100%', height: '100%' },
    nameSection: { alignItems: 'center', marginTop: 10 },
    profileVendorName: { fontFamily: 'Outfit_700Bold', fontSize: 28, color: '#111' },
    profileBusinessName: { fontFamily: 'Outfit_500Medium', fontSize: 16, color: COLORS.secondary, marginTop: 4 },
    profileLocationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
    profileLocationText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#777' },
    stickyNavWrapper: { backgroundColor: 'rgba(255,255,248,0.95)', borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }, // Ivory glass look
    shortcutNavBar: { flexDirection: 'row', gap: 30, paddingHorizontal: 24, paddingVertical: 18, alignItems: 'center' },
    shortcutNavText: { fontFamily: 'Outfit_600SemiBold', fontSize: 15, color: '#999' },
    shortcutNavTextActive: { color: COLORS.secondary },
    tabUnderline: { position: 'absolute', bottom: 12, left: 24, width: 60, height: 3, backgroundColor: COLORS.secondary, borderRadius: 2 },
    profileInfoContent: { backgroundColor: '#FFF', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
    mediaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    mediaMainTabs: { flexDirection: 'row', gap: 20 },
    mediaMainTab: { paddingBottom: 6 },
    mediaMainTabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.secondary },
    mTabText: { fontFamily: 'Outfit_600SemiBold', fontSize: 13, color: '#999' },
    mTabTextActive: { color: COLORS.secondary },
    profileMediaSection: { marginTop: 30 },
    featuredProjectCard: { width: '100%', height: 240, borderRadius: 24, overflow: 'hidden', marginBottom: 20, elevation: 5 },
    featuredProjectImage: { width: '100%', height: '100%' },
    featuredProjectOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', padding: 20, justifyContent: 'flex-end' },
    featuredBadge: { backgroundColor: COLORS.secondary, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
    featuredBadgeText: { fontFamily: 'Outfit_700Bold', fontSize: 10, color: '#FFF', textTransform: 'uppercase' },
    featuredProjectTitle: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#FFF' },
    featuredMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    featuredMetaText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#DDD' },
    viewProjectBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FFF' },
    viewProjectBtnText: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: '#FFF' },
    pinterestGrid: { flexDirection: 'row', gap: 15 },
    projectCard: { width: '100%', borderRadius: 20, backgroundColor: '#FFF', overflow: 'hidden', elevation: 3 },
    projectImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    cardCarousel: { flex: 1 },
    pagerDots: { position: 'absolute', width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    miniDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.6)' },
    typeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, zIndex: 10 },
    storyQuoteSection: { flexDirection: 'row', gap: 15, marginVertical: 20 },
    quoteBar: { width: 4, backgroundColor: COLORS.secondary, borderRadius: 2 },
    storyQuoteText: { fontFamily: 'Outfit_600SemiBold', fontSize: 18, color: COLORS.secondary, fontStyle: 'italic', flex: 1, lineHeight: 26 },
    profileAboutContainer: { marginTop: 40 },
    profileAboutText: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#666', lineHeight: 22, marginTop: 4 },
    profileSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#222', marginBottom: 16 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 24 },
    statCard: { width: (width - 72) / 2, backgroundColor: '#FEFEF8', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#F0E6D2', alignItems: 'center', gap: 4 },
    statVal: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#222' },
    statLabel: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#888' },
    typeBadgeText: { fontFamily: 'Outfit_700Bold', fontSize: 9, color: '#FFF' },
    projectCardFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    likesText: { fontFamily: 'Outfit_600SemiBold', fontSize: 11, color: '#333' },
    miniViewProject: { padding: 4 },
    videoPlaceholder: { width: '100%', height: 200, backgroundColor: '#F9F9F9', borderRadius: 20, alignItems: 'center', justifyContent: 'center', gap: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#DDD' },
    videoPlaceholderText: { fontFamily: 'Outfit_500Medium', fontSize: 14, color: '#999' },
    profileImageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
    profileReviewsSection: { marginTop: 40 },
    distributionContainer: { backgroundColor: '#FFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', marginBottom: 24 },
    distHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
    distTitle: { fontFamily: 'Outfit_500Medium', fontSize: 18, color: '#444' },
    distSummaryBox: { alignItems: 'flex-end' },
    distSummaryContent: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4CAF50', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
    distScore: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#FFF' },
    distCountSub: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666', marginTop: 4 },
    distRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
    distStarLabel: { flexDirection: 'row', alignItems: 'center', width: 60, gap: 6 },
    squareCheckbox: { width: 16, height: 16, borderWidth: 1.5, borderColor: '#999', borderRadius: 2 },
    distStarNum: { fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#444' },
    progressBarBg: { flex: 1, height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: '#FF6B00' },
    distRowCounts: { width: 80, textAlign: 'right', fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666' },
    lastUpdatedRow: { marginTop: 15 },
    lastUpdatedText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666', fontStyle: 'italic' },
    personalRatingContainer: { alignItems: 'center', padding: 20, backgroundColor: '#F9F9F9', borderRadius: 20, marginBottom: 24 },
    personalRatingTitle: { fontFamily: 'Outfit_600SemiBold', fontSize: 16, color: '#333', marginBottom: 15 },
    interactiveStars: { flexDirection: 'row', gap: 10 },
    ratingFeedback: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: COLORS.primary, marginTop: 10 },
    reviewCard: { backgroundColor: '#F9F9F9', padding: 16, borderRadius: 16, marginBottom: 12 },
    reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    reviewerName: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#333' },
    ratingStars: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingVal: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: '#333' },
    reviewComment: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#666', lineHeight: 20 },
    ratingOverview: { flexDirection: 'row', gap: 20, alignItems: 'center', marginVertical: 30 },
    bigRatingBadge: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(242,149,2,0.05)', borderWidth: 2, borderColor: COLORS.secondary, alignItems: 'center', justifyContent: 'center', gap: 4 },
    bigRatingScore: { fontFamily: 'Outfit_700Bold', fontSize: 38, color: COLORS.secondary },
    bigRatingStatus: { fontFamily: 'Outfit_600SemiBold', fontSize: 12, color: COLORS.secondary, textTransform: 'uppercase' },
    bigRatingStars: { flexDirection: 'row', gap: 2, marginVertical: 4 },
    bigRatingSub: { fontFamily: 'Outfit_400Regular', fontSize: 9, color: '#999', marginTop: 2 },
    distributionSide: { flex: 1, gap: 8 },
    distRowMini: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    distStarNumMini: { fontFamily: 'Outfit_600SemiBold', fontSize: 11, color: '#666', width: 12 },
    progressBarMiniBg: { flex: 1, height: 4, backgroundColor: '#F0F0F0', borderRadius: 2, overflow: 'hidden' },
    progressBarMiniFill: { height: '100%', backgroundColor: COLORS.secondary, borderRadius: 2 },
    engagementTriggers: { flexDirection: 'row', gap: 12, marginTop: 30 },
    triggerCard: { flex: 1, padding: 16, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F0F0F0', elevation: 2 },
    triggerLabel: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#888', marginBottom: 4 },
    triggerVal: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#222' },
    perPlate: { fontFamily: 'Outfit_400Regular', fontSize: 11, color: '#999' },
    whyChooseSection: { marginTop: 30, backgroundColor: '#FDFCF0', padding: 20, borderRadius: 24 },
    smallSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#222', marginBottom: 15 },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    checkText: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#555' },
    faqSection: { marginTop: 40 },
    faqCard: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    faqQuestion: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: '#333' },
    profileContactBtn: { backgroundColor: COLORS.secondary, marginTop: 40, height: 56, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 8 },
    profileContactBtnText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#FFF' },
    gridImageWrapper: { width: (width - 58) / 2, height: 180, borderRadius: 16, overflow: 'hidden' },
    gridImage: { width: '100%', height: '100%', resizeMode: 'cover' },

    // Photo Category Filters
    photoCategoryScroll: { paddingVertical: 15, marginBottom: 10 },
    photoCategoryTab: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F7F7F7',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#EEE'
    },
    photoCategoryTabActive: {
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.secondary
    },
    photoCategoryText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#666'
    },
    photoCategoryTextActive: {
        color: '#FFF'
    },

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

    seeAllText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: COLORS.secondary },
    footerContainer: { alignItems: 'center', marginVertical: 40, paddingBottom: 40 },
    stickyButton: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 36, elevation: 12 },
    stickyButtonText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: COLORS.white, marginRight: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
    noResults: { padding: 60, alignItems: 'center' },
    noResultsText: { fontFamily: 'Outfit_400Regular', color: '#999', fontSize: 15 },
});

export default WeddingVenue;