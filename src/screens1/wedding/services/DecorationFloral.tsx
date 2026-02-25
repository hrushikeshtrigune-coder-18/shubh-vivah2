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
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import VendorCard from '../../../components1/VendorCard';
import venue1 from '../../../../assets1/images/venue1.jpg';
import venue2 from '../../../../assets1/images/venue2.jpg';
import venue3 from '../../../../assets1/images/venue3.jpg';
import venue4 from '../../../../assets1/images/venue4.jpg';
import venue5 from '../../../../assets1/images/venue5.jpg';
import venue6 from '../../../../assets1/images/venue6.jpg';
import venue7 from '../../../../assets1/images/venue7.jpg';
import venue8 from '../../../../assets1/images/venue8.jpg';

// New Floral Images
import dfPastel from '../../../../assets1/DF images/Floral Pastel.jpg';
import dfMinimal from '../../../../assets1/DF images/Modern Minimal.jpg';
import dfRoyal from '../../../../assets1/DF images/Royal Heritage.jpg';
import dfMarigold from '../../../../assets1/DF images/Traditional Marigold.jpg';

const { width, height } = Dimensions.get('window');

const COLORS = {
    background: '#FDFCF0',
    primary: '#800000',
    secondary: '#D48806',
    white: '#FFFFFF',
};

const FEATURED_VENDORS = [
    {
        id: 'v1',
        name: 'Traditional Marigold',
        rating: 4.9,
        tag: 'Heritage Decor',
        location: 'Worli, Mumbai',
        city: 'Mumbai',
        image: dfMarigold,
        previews: [venue6, venue7, venue8],
        featuredProject: { image: dfMarigold as any, title: 'Heritage Marigold Wedding 2024' }
    },
    {
        id: 'v2',
        name: 'Floral Pastel',
        rating: 4.8,
        tag: 'Boutique Floral',
        location: 'Koregaon Park, Pune',
        city: 'Pune',
        image: dfPastel,
        previews: [venue5, venue3, venue4],
        featuredProject: { image: dfPastel, title: 'Enchanted Pastel Dream' }
    },
    {
        id: 'v3',
        name: 'Modern Minimal',
        rating: 4.6,
        tag: 'Minimalist Decor',
        location: 'Civil Lines, Jaipur',
        city: 'Jaipur',
        image: dfMinimal,
        previews: [venue1, venue2, venue8],
        featuredProject: { image: dfMinimal, title: 'Zen Garden Ceremony' }
    },
    {
        id: 'v4',
        name: 'Royal Heritage',
        rating: 4.9,
        tag: 'Grand Palatial',
        location: 'Viman Nagar, Pune',
        city: 'Pune',
        image: dfRoyal,
        previews: [venue2, venue6, venue7],
        featuredProject: { image: dfRoyal, title: 'Kings Heritage Reception' }
    },
];

const POSTS_DATA = [
    {
        id: 'p1',
        displayName: 'Traditional Marigold',
        vendorLogo: dfMarigold,
        images: [dfMarigold, venue1, venue6],
        likes: 1200,
        city: 'Mumbai',
        description: 'Vibrant marigold setup for a traditional Indian wedding vibe.',
        rating: 4.9,
        eventType: 'Wedding Ceremony',
        locationDetail: 'Palace Grounds',
        imageHeight: 220
    },
    {
        id: 'p2',
        displayName: 'Floral Pastel',
        vendorLogo: dfPastel,
        images: [dfPastel, venue2, venue5],
        likes: 850,
        city: 'Pune',
        description: 'Soft pastel hues with fresh roses and lilies.',
        rating: 4.8,
        eventType: 'Reception',
        locationDetail: 'JW Marriott',
        imageHeight: 180
    },
    {
        id: 'p3',
        displayName: 'Modern Minimal',
        vendorLogo: dfMinimal,
        images: [dfMinimal, venue3, venue2],
        likes: 640,
        city: 'Jaipur',
        description: 'Clean lines and greenery for the modern couple.',
        rating: 4.6,
        eventType: 'Engagement',
        locationDetail: 'Rambagh Palace',
        imageHeight: 250
    },
    {
        id: 'p4',
        displayName: 'Royal Heritage',
        vendorLogo: dfRoyal,
        images: [dfRoyal, venue4, venue7],
        likes: 2100,
        city: 'Delhi',
        description: 'Grandiose heritage decor with antique floral arrangements.',
        rating: 4.9,
        eventType: 'Reception',
        locationDetail: 'The Leela',
        imageHeight: 160
    },
];

const POPULAR_SEARCHES = ['Floral Mandap', 'Entrance Decor', 'Thematic Stage', 'Marigold Themes'];
const TRENDING_TAGS = ['Pastel', 'Royal', 'Eco-friendly', 'Minimalist'];

// Post Component (Dynamic Widths for Editorial Layout)
interface PostCardProps {
    post: any;
    onPostPress: (post: any) => void;
    onVendorPress?: (post: any) => void;
    isFullWidth: boolean;
}

const PostCard = ({ post, onPostPress, onVendorPress, isFullWidth }: PostCardProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView>(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const cardWidth = isFullWidth ? (width - 20) : (width - 28) / 2;
    const imageHeight = isFullWidth ? 200 : (post.imageHeight * 0.75);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

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
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                style={[styles.postCardCompact, { width: cardWidth, marginBottom: 20 }]}
                onPress={() => onPostPress(post)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
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
                        {post.images.map((img: any, index: number) => (
                            <Image key={index} source={img} style={{ width: cardWidth, height: imageHeight }} resizeMode="cover" />
                        ))}
                    </ScrollView>

                    <View style={styles.dotContainerCompact}>
                        {post.images.map((_: any, index: number) => (
                            <View key={index} style={[styles.dotSmall, activeIndex === index && styles.dotActiveSmall]} />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.likeBtnSmall}>
                        <Ionicons name="heart-outline" size={14} color="#FFF" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.infoPanelCompact, isFullWidth && { paddingHorizontal: 15, paddingVertical: 18 }]}>
                    <View style={styles.panelHeaderCompact}>
                        <TouchableOpacity onPress={() => onVendorPress && onVendorPress(post)}>
                            <Text style={[styles.vendorNameCompact, isFullWidth && { fontSize: 16 }]} numberOfLines={1}>{post.displayName}</Text>
                        </TouchableOpacity>
                        <View style={styles.ratingCompact}>
                            <Ionicons name="star" size={10} color={COLORS.secondary} />
                            <Text style={styles.ratingTextCompact}>{post.rating}</Text>
                        </View>
                    </View>

                    {isFullWidth && <Text style={styles.postDescriptionFull} numberOfLines={2}>{post.description}</Text>}

                    <Text style={styles.eventTypeCompact}>{post.eventType}  {post.city}</Text>
                    <Text style={styles.locationCompact} numberOfLines={1}>{post.locationDetail}</Text>

                    <View style={styles.metaRowCompact}>
                        <Text style={styles.metaLikesCompact}>{post.likes} likes</Text>
                        <Ionicons name="bookmark-outline" size={13} color="#AAA" />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};


const DecorationFloralScreen = ({ navigation }: { navigation?: any }) => {
    const scrollRef = useRef<ScrollView>(null);
    const featuredScrollRef = useRef<ScrollView>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setSearchFocused] = useState(false);
    const [selectedMediaCategory, setSelectedMediaCategory] = useState('Floral');
    const [scrollY] = useState(new Animated.Value(0));
    const [selectedVendor, setSelectedVendor] = useState(FEATURED_VENDORS[0]);
    const [isVendorProfileVisible, setIsVendorProfileVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('About');
    const [activeMediaTab, setActiveMediaTab] = useState('Photos');
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Contact Form States
    const [contactName, setContactName] = useState('');
    const [contactMobile, setContactMobile] = useState('');
    const [contactEventType, setContactEventType] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactDate, setContactDate] = useState('');
    const [contactTime, setContactTime] = useState('');
    const [contactNote, setContactNote] = useState('');


    const [selectedCity, setSelectedCity] = useState('Mumbai');
    const [featuredIndex, setFeaturedIndex] = useState(0);

    const openVendorProfile = (vendor: any) => {
        setSelectedVendor(vendor);
        setIsVendorProfileVisible(true);
    };

    const closeVendorProfile = () => {
        setIsVendorProfileVisible(false);
    };
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
        const tabWidth = 70;
        const gap = 12;
        Animated.spring(tabUnderlineTranslateX, {
            toValue: index * (tabWidth + gap),
            useNativeDriver: true,
            bounciness: 0
        }).start();

        scrollToProfileSection(ref);
    };

    const scrollToProfileSection = (ref: any) => {
        ref.current?.measureLayout(
            profileScrollRef.current,
            (x: number, y: number) => {
                profileScrollRef.current?.scrollTo({ y: y - 80, animated: true });
            },
            () => { }
        );
    };


    // Auto-scroll logic for Featured Collections
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isSearchFocused) {
                const nextIndex = (featuredIndex + 1) % FEATURED_VENDORS.length;
                setFeaturedIndex(nextIndex);
                featuredScrollRef.current?.scrollTo({
                    x: nextIndex * (width * 0.82 + 24),
                    animated: true,
                });
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [featuredIndex, isSearchFocused]);

    const getFilteredVendors = () => {
        const query = searchQuery.toLowerCase();
        return FEATURED_VENDORS.filter(v => {
            return v.city.toLowerCase().includes(query) ||
                v.name.toLowerCase().includes(query) ||
                v.location.toLowerCase().includes(query);
        });
    };

    const getFilteredPosts = () => {
        const query = searchQuery.toLowerCase();
        return POSTS_DATA.filter(p => {
            return p.city.toLowerCase().includes(query) ||
                p.displayName.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.eventType.toLowerCase().includes(query);
        });
    };



    const renderActionHero = () => (
        <View style={styles.heroContainer}>
            <ImageBackground source={venue7} style={styles.heroImage} imageStyle={{ borderBottomLeftRadius: 36, borderBottomRightRadius: 36 }} resizeMode="cover">
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']} style={styles.heroGradient}>
                    <View style={styles.topBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.utilityBtn}><Ionicons name="notifications-outline" size={20} color="#FFF" /></TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 60, paddingHorizontal: 25 }}>
                        <Text style={styles.heroHeadline}>Finding Your{"\n"}Perfect Decor</Text>
                        <Text style={styles.heroSubhead}>Explore exclusive high-end decoration themes</Text>
                    </View>
                </LinearGradient>
            </ImageBackground>

            <View style={[styles.premiumSearchContainer, isSearchFocused && styles.premiumSearchActive]}>
                <TouchableOpacity style={styles.locationSelector}>
                    <Text style={styles.locationTextPin}> {selectedCity}</Text>
                    <Ionicons name="chevron-down" size={14} color={COLORS.secondary} />
                </TouchableOpacity>
                <View style={styles.searchDivider} />
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.premiumInput}
                        placeholder="Search decor, areas"
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
                            placeholder="Search decor, areas"
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
                    <TouchableOpacity><Text style={styles.seeAllText}>Explore All</Text></TouchableOpacity>
                </View>
                {filteredVendors.length > 0 ? (
                    <ScrollView
                        ref={featuredScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                        snapToInterval={width * 0.82 + 24}
                        decelerationRate="fast"
                    >
                        {filteredVendors.map((vendor) => (
                            <VendorCard
                                key={vendor.id}
                                vendor={vendor as any}
                                onPress={() => openVendorProfile(vendor)}
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

        const renderRhythmicPattern = () => {
            const pattern = [];
            let i = 0;
            while (i < filteredPosts.length) {
                pattern.push(
                    <View key={`full-${filteredPosts[i].id}`} style={{ paddingHorizontal: 10 }}>
                        <PostCard
                            post={filteredPosts[i]}
                            onPostPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
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
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
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
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
                            }}
                            onVendorPress={(p) => {
                                const vendor = FEATURED_VENDORS.find(v => v.name === p.displayName);
                                if (vendor) openVendorProfile(vendor);
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

                        <View style={styles.profileIdentityOverlay}>
                            <View style={styles.avatarContainer}>
                                <Image source={selectedVendor.image || venue1} style={styles.avatarImage} />
                            </View>
                            <View style={styles.nameSection}>
                                <Text style={styles.profileVendorName}>{selectedVendor.name}</Text>
                                <Text style={styles.profileBusinessName}>Decoration & Theme Specialist</Text>
                                <View style={styles.profileLocationRow}>
                                    <Ionicons name="location" size={16} color={COLORS.primary} />
                                    <Text style={styles.profileLocationText}>{selectedVendor.location}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.stickyNavWrapper}>
                            <View style={styles.shortcutNavBar}>
                                <TouchableOpacity style={styles.shortcutNavTab} onPress={() => handleTabPress('Projects', portfolioRef, 0)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Projects' && styles.shortcutNavTextActive]}>Projects</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shortcutNavTab} onPress={() => handleTabPress('Pricing', pricingRef, 1)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Pricing' && styles.shortcutNavTextActive]}>Pricing</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shortcutNavTab} onPress={() => handleTabPress('About', aboutRef, 2)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'About' && styles.shortcutNavTextActive]}>About</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shortcutNavTab} onPress={() => handleTabPress('Reviews', reviewsRef, 3)}>
                                    <Text style={[styles.shortcutNavText, activeSection === 'Reviews' && styles.shortcutNavTextActive]}>Reviews</Text>
                                </TouchableOpacity>

                                <Animated.View
                                    style={[
                                        styles.tabUnderline,
                                        {
                                            width: 80,
                                            transform: [{ translateX: tabUnderlineTranslateX }]
                                        }
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={styles.profileInfoContent}>
                            <View ref={portfolioRef} style={styles.profileMediaSection}>
                                <View style={styles.mediaHeaderRow}>
                                    <Text style={styles.profileSectionLabel}>Portfolio</Text>
                                    <View style={styles.mediaMainTabs}>
                                        {['Photos', 'Videos', 'Media'].map(mTab => (
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
                                        <TouchableOpacity style={styles.featuredProjectCard}>
                                            <Image source={selectedVendor.featuredProject?.image || venue5} style={styles.featuredProjectImage} />
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.85)']}
                                                style={styles.featuredProjectOverlay}
                                            />
                                            <View style={styles.featuredProjectOverlay}>
                                                <View style={styles.featuredBadge}>
                                                    <Text style={styles.featuredBadgeText}>FEATURED</Text>
                                                </View>
                                                <Text style={styles.featuredProjectTitle}>{selectedVendor.featuredProject?.title || 'Bespoke Decoration Project'}</Text>
                                                <View style={styles.featuredMetaRow}>
                                                    <Text style={styles.featuredMetaText}>12 Photos  Premium Setup</Text>
                                                    <TouchableOpacity style={styles.viewProjectBtn}>
                                                        <Text style={styles.viewProjectBtnText}>View Project</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={styles.pinterestGrid}>
                                            <View style={styles.gridColumn}>
                                                {[
                                                    { title: 'Elegant Floral Mandap', type: 'Mandap', likes: 124, images: [venue7, venue2, venue8], height: 260 },
                                                    { title: 'Modern Entrance Decor', type: 'Entrance', likes: 89, images: [venue3, venue5, venue6], height: 200 }
                                                ].map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <Image source={proj.images[0]} style={styles.projectImage} />
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
                                                    { title: 'Royal Stage Gala', type: 'Stage', likes: 210, images: [venue5, venue6, venue1], height: 210 },
                                                    { title: 'Pastel Theme Mehendi', type: 'Mehendi', likes: 156, images: [venue1, venue4, venue7], height: 250 }
                                                ].map((proj, idx) => (
                                                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                                                        <Image source={proj.images[0]} style={styles.projectImage} />
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
                                ) : activeMediaTab === 'Videos' ? (
                                    <View style={styles.videoPlaceholder}>
                                        <Ionicons name="play-circle-outline" size={48} color={COLORS.secondary} />
                                        <Text style={styles.videoPlaceholderText}>Video walkthroughs coming soon</Text>
                                    </View>
                                ) : (
                                    <View style={styles.mediaFieldsContainer}>
                                        <View style={styles.mediaSubTabsWrapper}>
                                            {[
                                                { label: 'Floral', value: 'Floral', icon: 'sunny' },
                                                { label: 'Theme', value: 'Theme', icon: 'diamond' },
                                                { label: 'Traditional', value: 'Traditional', icon: 'infinite' }
                                            ].map((subTab) => (
                                                <TouchableOpacity
                                                    key={subTab.value}
                                                    style={[styles.mediaSubTab, selectedMediaCategory === subTab.value && styles.mediaSubTabActive]}
                                                    onPress={() => setSelectedMediaCategory(subTab.value)}
                                                >
                                                    <Ionicons
                                                        name={subTab.icon as any}
                                                        size={16}
                                                        color={selectedMediaCategory === subTab.value ? '#FFF' : '#666'}
                                                    />
                                                    <Text style={[styles.mediaSubTabText, selectedMediaCategory === subTab.value && styles.mediaSubTabTextActive]}>
                                                        {subTab.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        <View style={styles.fullMediaGallery}>
                                            <View style={styles.pinterestGrid}>
                                                <View style={styles.gridColumn}>
                                                    {[
                                                        { img: venue7, h: 220 },
                                                        { img: dfMarigold, h: 280 },
                                                        { img: venue1, h: 200 },
                                                        { img: venue6, h: 250 }
                                                    ].map((item, i) => (
                                                        <View key={i} style={[styles.galleryImageCard, { height: item.h }]}>
                                                            <Image source={item.img} style={styles.mosaicImageFull} />
                                                        </View>
                                                    ))}
                                                </View>
                                                <View style={styles.gridColumn}>
                                                    {[
                                                        { img: dfPastel, h: 260 },
                                                        { img: venue5, h: 200 },
                                                        { img: dfRoyal, h: 270 },
                                                        { img: venue8, h: 230 }
                                                    ].map((item, i) => (
                                                        <View key={i} style={[styles.galleryImageCard, { height: item.h }]}>
                                                            <Image source={item.img} style={styles.mosaicImageFull} />
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                    </View>

                                )}
                            </View>

                            <View ref={pricingRef} style={styles.profilePricingSection}>
                                <View style={styles.pricingSectionTitleRow}>
                                    <Text style={styles.profileSectionLabel}>Decoration Pricing</Text>
                                    <View style={styles.verifiedPriceBadge}>
                                        <Ionicons name="shield-checkmark" size={14} color="#D48806" />
                                        <Text style={styles.verifiedPriceText}>Best Price Guaranteed</Text>
                                    </View>
                                </View>

                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pricingCardsScroll}>
                                    {[
                                        { title: 'Floral Royal', price: '1,50,000', per: 'per event', tag: 'Most Popular', color: COLORS.primary },
                                        { title: 'Pastel Bliss', price: '75,000', per: 'per event', tag: 'Limited Offer', color: '#D48806' },
                                        { title: 'Thematic Setup', price: '50,000', per: 'starting', tag: 'Customizable', color: '#2C3E50' }
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
                                                    { icon: 'flower', label: 'Premium Fresh Flowers' },
                                                    { icon: 'bulb', label: 'Advanced Lighting' },
                                                    { icon: 'color-palette', label: 'Theme Consultation' },
                                                    { icon: 'construct', label: 'On-site Execution' }
                                                ].map((inc, i) => (
                                                    <View key={i} style={styles.inclusionLine}>
                                                        <Ionicons name={inc.icon as any} size={16} color="#999" />
                                                        <Text style={styles.inclusionText}>{inc.label}</Text>
                                                    </View>
                                                ))}
                                            </View>

                                            <TouchableOpacity style={[styles.bookNowMinBtn, { borderColor: pkg.color }]}>
                                                <Text style={[styles.bookNowMinText, { color: pkg.color }]}>Customize Plan</Text>
                                            </TouchableOpacity>

                                            <View style={styles.ticketPunchLeft} />
                                            <View style={styles.ticketPunchRight} />
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>

                            <View ref={aboutRef} style={[styles.profileAboutContainer, { marginTop: 40 }]}>
                                <Text style={styles.profileSectionLabel}>About Us</Text>

                                <View style={styles.storyQuoteSection}>
                                    <View style={styles.quoteBar} />
                                    <Text style={styles.storyQuoteText}>
                                        "Transforming spaces into floral dreams for over a decade."
                                    </Text>
                                </View>

                                <Text style={styles.profileAboutText}>
                                    With years of experience in high-end wedding decoration, {selectedVendor?.name} is dedicated to creating breathtaking environments. Our floral designers and thematic experts work tirelessly to ensure every detail matches your vision.
                                </Text>
                            </View>

                            <View ref={reviewsRef} style={styles.profileReviewsSection}>
                                <Text style={styles.profileSectionLabel}>Ratings & Reviews</Text>

                                <View style={styles.ratingOverview}>
                                    <View style={styles.bigRatingBadge}>
                                        <Text style={styles.bigRatingScore}>5.0</Text>
                                        <Text style={styles.bigRatingStatus}>Excellent</Text>
                                        <View style={styles.bigRatingStars}>
                                            {[1, 2, 3, 4, 5].map(i => <Ionicons key={i} name="star" size={14} color="#FFD700" />)}
                                        </View>
                                        <Text style={styles.bigRatingSub}>Verfied Reviews</Text>
                                    </View>

                                    <View style={styles.distributionSide}>
                                        {[
                                            { star: 5, progress: 0.95 },
                                            { star: 4, progress: 0.05 }
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

                                <TouchableOpacity style={styles.profileContactBtn} onPress={() => setIsContactModalVisible(true)}>
                                    <Text style={styles.profileContactBtnText}>Enquire Now</Text>
                                    <Ionicons name="chatbubble-ellipses" size={20} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.ScrollView>
                </View >
            </Modal >
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
                                        Schedule a tour of {selectedVendor?.name || 'Traditional Marigold'}
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
                contentContainerStyle={{ paddingBottom: 60 }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                {renderActionHero()}
                {renderLargePremiumVendorCards()}
                {renderVendorPostsFeed()}

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        style={styles.contactUsFloatingBtn}
                        onPress={() => setIsContactModalVisible(true)}
                    >
                        <Ionicons name="chatbubble-ellipses" size={22} color="#FFF" />
                        <Text style={styles.contactUsFloatingText}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
                {renderContactModal()}
            </ScrollView>

            {renderSearchOverlay()}
            {renderVendorProfileModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    backButtonDefault: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBody: { backgroundColor: COLORS.background, borderTopLeftRadius: 40, borderTopRightRadius: 40, marginTop: -40, paddingBottom: 50 },
    heroContainer: { marginBottom: 50 },
    heroImage: { width: width, height: 460, justifyContent: 'flex-end' },
    heroGradient: { flex: 1, justifyContent: 'flex-end', padding: 25, paddingBottom: 100 },
    topBar: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    backButton: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    utilityBtn: { backgroundColor: 'rgba(0,0,0,0.35)', padding: 10, borderRadius: 24 },
    heroHeadline: { fontSize: 38, color: COLORS.white, lineHeight: 46, marginBottom: 12, fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.25)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
    heroSubhead: { fontSize: 17, color: '#FFEB3B', marginBottom: 24, opacity: 0.9, fontWeight: '600', letterSpacing: 0.3 },

    premiumSearchContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        marginHorizontal: 20,
        height: 64,
        borderRadius: 22,
        alignItems: 'center',
        marginTop: -32,
        elevation: 15,
        shadowColor: '#800000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(212, 136, 6, 0.1)',
    },
    premiumSearchActive: { borderWidth: 1.5, borderColor: COLORS.secondary },
    locationSelector: { flexDirection: 'row', alignItems: 'center', gap: 6, width: 110 },
    locationTextPin: { fontSize: 15, color: '#333', fontWeight: 'bold' },
    searchDivider: { width: 1.5, height: 28, backgroundColor: '#EEE', marginHorizontal: 12 },
    searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    premiumInput: { flex: 1, fontSize: 15, color: '#333' },

    trustIndicatorRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 25 },
    trustBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 14, elevation: 1 },
    trustBadgeText: { fontSize: 12, color: COLORS.primary, fontWeight: 'bold' },

    overlayContainer: { flex: 1, backgroundColor: '#FFF' },
    overlayHeader: { paddingTop: 60, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#F5F5F5', paddingBottom: 20 },
    overlaySearchBox: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    overlayInput: { flex: 1, height: 48, backgroundColor: '#F8F8F8', borderRadius: 16, paddingHorizontal: 18, fontSize: 16 },
    cancelText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 15 },
    overlayContent: { padding: 25 },
    overlaySectionTitle: { fontSize: 18, color: '#333', marginBottom: 18, marginTop: 15, fontWeight: 'bold' },
    recentList: { gap: 15, marginBottom: 25 },
    recentItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    recentText: { color: '#555', fontSize: 15 },
    popularRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 30 },
    popularTag: { backgroundColor: '#FFF9F0', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 24, borderWidth: 1, borderColor: '#FFECB3' },
    popularTagText: { fontSize: 14, color: '#D48806', fontWeight: 'bold' },

    premiumVendorCardContainer: {
        width: width * 0.82,
        marginRight: 24,
    },
    premiumVendorCard: {
        backgroundColor: '#FFF',
        borderRadius: 28,
        elevation: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(212, 136, 6, 0.08)',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
    },
    vendorMainImg: { width: '100%', height: 200, position: 'relative', overflow: 'hidden' },
    tagWrapper: { position: 'absolute', top: 15, left: 15, zIndex: 10 },
    lustreOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    premiumTag: { backgroundColor: 'rgba(255,255,255,0.92)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.05)' },
    premiumTagText: { color: COLORS.primary, fontSize: 11, fontWeight: 'bold', letterSpacing: 0.5 },
    vendorDetails: { padding: 20, paddingTop: 15 },
    detailsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNamePremium: { fontSize: 20, color: '#222', fontWeight: 'bold' },
    ratingBadgePremium: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, gap: 4 },
    ratingTextPremium: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
    locationContainerPremium: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
    locationTextPremium: { fontSize: 13, color: '#666' },
    previewsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    miniThumb: { width: 46, height: 46, backgroundColor: '#F0F0F0', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
    followBtnGold: {
        marginLeft: 'auto',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        elevation: 3,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    followTextGold: { color: '#FFF', fontWeight: 'bold', fontSize: 13, letterSpacing: 0.5 },

    sectionContainer: { marginTop: 40 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 24, color: '#800000', fontWeight: 'bold' },
    seeAllText: { fontWeight: 'bold', fontSize: 14, color: COLORS.secondary },

    postCardCompact: {
        borderRadius: 22,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(212, 136, 6, 0.12)',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
    },
    dotContainerCompact: { position: 'absolute', bottom: 10, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 4 },
    dotSmall: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },
    dotActiveSmall: { width: 12, backgroundColor: '#FFF' },
    likeBtnSmall: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 6, borderRadius: 15 },

    infoPanelCompact: { paddingVertical: 14, paddingHorizontal: 15 },
    panelHeaderCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    vendorNameCompact: { fontSize: 13, color: '#111', flex: 1, fontWeight: 'bold' },
    ratingCompact: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#F5F5F5', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 6 },
    ratingTextCompact: { fontSize: 10, color: '#333', fontWeight: 'bold' },
    eventTypeCompact: { fontSize: 10, color: COLORS.primary, marginBottom: 1, fontWeight: 'bold' },
    locationCompact: { fontSize: 9, color: '#777', marginBottom: 10 },
    metaRowCompact: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 0.5, borderColor: '#EEE', paddingTop: 8 },
    metaLikesCompact: { fontSize: 10, color: '#999', fontWeight: 'bold' },
    premiumLikeBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    postDescriptionFull: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 12 },
    editorialRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 10, alignItems: 'flex-start' },

    profileContainer: { flex: 1, backgroundColor: '#FFF' },
    profileHeader: { height: 320, width: '100%' },
    coverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
    profileIdentityOverlay: { marginTop: -60, backgroundColor: '#FFF', borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 24, paddingTop: 20, alignItems: 'center', paddingBottom: 20 },
    avatarContainer: { width: 110, height: 110, borderRadius: 55, borderWidth: 5, borderColor: '#FFF', elevation: 15, backgroundColor: '#FFF', overflow: 'hidden', marginTop: -70 },
    avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    nameSection: { alignItems: 'center', marginTop: 10 },
    profileVendorName: { fontSize: 28, color: '#111', fontWeight: 'bold' },
    profileBusinessName: { fontSize: 16, color: COLORS.secondary, marginTop: 4, fontWeight: 'bold' },
    profileLocationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
    profileLocationText: { fontSize: 13, color: '#777' },
    stickyNavWrapper: { backgroundColor: 'rgba(253, 252, 240, 0.96)', borderBottomWidth: 1, borderBottomColor: 'rgba(212, 136, 6, 0.15)', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
    shortcutNavBar: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingVertical: 16, alignItems: 'center' },
    shortcutNavTab: { width: 70, alignItems: 'center', justifyContent: 'center' },
    shortcutNavText: { fontSize: 15, color: '#999', fontWeight: 'bold' },
    shortcutNavTextActive: { color: COLORS.secondary },
    tabUnderline: { position: 'absolute', bottom: 12, left: 20, width: 70, height: 3, backgroundColor: COLORS.secondary, borderRadius: 2 },
    profileInfoContent: { backgroundColor: '#FFF', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
    profileSectionLabel: { fontSize: 20, color: '#222', marginBottom: 16, fontWeight: 'bold' },
    mediaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    mediaMainTabs: { flexDirection: 'row', gap: 20 },
    mediaMainTab: { paddingBottom: 6 },
    mediaMainTabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.secondary },
    mTabText: { fontSize: 13, color: '#999', fontWeight: 'bold' },
    mTabTextActive: { color: COLORS.secondary },
    featuredProjectCard: { width: '100%', height: 240, borderRadius: 24, overflow: 'hidden', marginBottom: 20, elevation: 5 },
    featuredProjectImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    featuredProjectOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', padding: 20, justifyContent: 'flex-end' },
    featuredBadge: { backgroundColor: COLORS.secondary, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
    featuredBadgeText: { fontSize: 10, color: '#FFF', textTransform: 'uppercase', fontWeight: 'bold' },
    featuredProjectTitle: { fontSize: 20, color: '#FFF', fontWeight: 'bold' },
    featuredMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
    featuredMetaText: { fontSize: 13, color: '#DDD' },
    viewProjectBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#FFF' },
    viewProjectBtnText: { fontSize: 12, color: '#FFF', fontWeight: 'bold' },
    projectCard: { width: '100%', borderRadius: 20, backgroundColor: '#FFF', overflow: 'hidden', elevation: 3, marginBottom: 15 },
    projectImage: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, resizeMode: 'cover' },
    cardCarousel: { flex: 1 },
    typeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, zIndex: 10 },
    typeBadgeText: { fontSize: 9, color: '#FFF', fontWeight: 'bold' },
    projectCardFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(255,255,255,0.9)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    likesText: { fontSize: 11, color: '#333', fontWeight: 'bold' },
    miniViewProject: { padding: 4 },
    videoPlaceholder: { width: '100%', height: 200, backgroundColor: '#F9F9F9', borderRadius: 20, alignItems: 'center', justifyContent: 'center', gap: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#DDD' },
    videoPlaceholderText: { fontSize: 14, color: '#999', fontWeight: 'bold' },

    profilePricingSection: { marginTop: 35, paddingHorizontal: 0 },
    pricingSectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    verifiedPriceBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF9F0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#FFECB3' },
    verifiedPriceText: { fontSize: 11, color: '#D48806', fontWeight: 'bold' },
    pricingCardsScroll: { paddingVertical: 10 },
    eventPriceCard: {
        width: width * 0.78,
        backgroundColor: '#FFF',
        borderRadius: 28,
        marginRight: 20,
        padding: 26,
        paddingTop: 48,
        elevation: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(212, 136, 6, 0.12)',
        shadowColor: '#800000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
    },
    eventCardTopTag: { position: 'absolute', top: 0, right: 0, paddingHorizontal: 20, paddingVertical: 10, borderBottomLeftRadius: 20 },
    eventCardTagText: { color: '#FFF', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 'bold' },
    eventCardIdentity: { marginBottom: 15 },
    eventPackageTitle: { fontSize: 22, color: '#222', marginBottom: 5, fontWeight: 'bold' },
    eventPriceTag: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
    eventMainPrice: { fontSize: 32, color: COLORS.primary, fontWeight: '900' },
    eventPricePer: { fontSize: 13, color: '#888', fontWeight: '600' },
    pricingDivider: { height: 1, backgroundColor: 'rgba(212, 136, 6, 0.2)', marginVertical: 20, borderStyle: 'dotted' },
    pricingInclusions: { gap: 10, marginBottom: 25 },
    inclusionLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    inclusionText: { fontSize: 14, color: '#555' },
    bookNowMinBtn: { height: 50, borderRadius: 15, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
    bookNowMinText: { fontSize: 14, fontWeight: 'bold' },
    ticketPunchLeft: { position: 'absolute', left: -14, top: '50%', width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFF', borderWidth: 1, borderColor: 'rgba(212, 136, 6, 0.12)' },
    ticketPunchRight: { position: 'absolute', right: -14, top: '50%', width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFF', borderWidth: 1, borderColor: 'rgba(212, 136, 6, 0.12)' },

    profileAboutContainer: { marginTop: 40 },
    storyQuoteSection: { flexDirection: 'row', gap: 15, marginVertical: 20 },
    quoteBar: { width: 4, backgroundColor: COLORS.secondary, borderRadius: 2 },
    storyQuoteText: { fontSize: 18, color: COLORS.secondary, fontStyle: 'italic', flex: 1, lineHeight: 26, fontWeight: 'bold' },
    profileAboutText: { fontSize: 14, color: '#666', lineHeight: 22, marginTop: 4 },

    profileReviewsSection: { marginTop: 40 },
    ratingOverview: { flexDirection: 'row', gap: 20, alignItems: 'center', marginVertical: 30 },
    bigRatingBadge: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFF',
        borderWidth: 8,
        borderColor: 'rgba(212, 136, 6, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: COLORS.secondary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    bigRatingScore: { fontSize: 38, color: COLORS.secondary, fontWeight: 'bold' },
    bigRatingStatus: { fontSize: 12, color: COLORS.secondary, textTransform: 'uppercase', fontWeight: 'bold' },
    bigRatingStars: { flexDirection: 'row', gap: 2, marginVertical: 4 },
    bigRatingSub: { fontSize: 9, color: '#999', marginTop: 2 },
    distributionSide: { flex: 1, gap: 8 },
    distRowMini: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    distStarNumMini: { fontSize: 11, color: '#666', width: 12, fontWeight: 'bold' },
    progressBarMiniBg: { flex: 1, height: 4, backgroundColor: '#F0F0F0', borderRadius: 2, overflow: 'hidden' },
    progressBarMiniFill: { height: '100%', backgroundColor: COLORS.secondary, borderRadius: 2 },

    profileContactBtn: { backgroundColor: COLORS.secondary, marginTop: 40, height: 56, borderRadius: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, elevation: 8 },
    profileContactBtnText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },

    footerContainer: { alignItems: 'center', marginVertical: 40, paddingBottom: 40 },
    stickyButton: { backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 36, borderRadius: 36, elevation: 12 },
    stickyButtonText: { fontSize: 14, color: COLORS.white, marginRight: 12, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 'bold' },
    noResults: { padding: 60, alignItems: 'center' },
    noResultsText: { color: '#999', fontSize: 15 },

    // Media Section Styles
    mediaFieldsContainer: { paddingVertical: 10 },
    mediaFieldBlock: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    mediaFieldHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 12 },
    mediaIconCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    mediaFieldTitle: { fontSize: 18, color: '#333', fontWeight: 'bold' },
    mediaSubTabsWrapper: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    mediaSubTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#EEE'
    },
    mediaSubTabActive: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
    mediaSubTabText: { fontSize: 13, color: '#666', fontWeight: '600' },
    mediaSubTabTextActive: { color: '#FFF' },
    fullMediaGallery: { paddingTop: 10 },
    pinterestGrid: { flexDirection: 'row', gap: 15, width: '100%' },
    gridColumn: { flex: 1, gap: 15 },
    galleryImageCard: { borderRadius: 20, overflow: 'hidden', backgroundColor: '#F0F0F0' },
    mosaicImageFull: { width: '100%', height: '100%', resizeMode: 'cover' },

    // Contact Modal Styles
    contactModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    contactModalContainer: { width: '100%' },
    contactFormCard: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingTop: 24,
        maxHeight: height * 0.85,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.15,
        shadowRadius: 15
    },
    contactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    contactTitle: { fontSize: 24, color: '#C61E1A', fontWeight: 'bold' },
    contactSubTitle: { fontSize: 13, color: '#F29502', marginLeft: 6, fontWeight: '600' },
    closeContactBtn: { backgroundColor: '#F5F5F5', borderRadius: 25, padding: 8 },
    contactLabel: { fontSize: 13, color: '#C61E1A', marginTop: 12, marginBottom: 6, fontWeight: 'bold' },
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
    contactInput: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
    contactInputRow: { flexDirection: 'row', gap: 12 },
    contactActionRow: { flexDirection: 'row', gap: 15, marginTop: 25, marginBottom: 10 },
    backContactBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
    confirmContactBtn: { flex: 2, height: 52, borderRadius: 16, backgroundColor: '#C61E1A', alignItems: 'center', justifyContent: 'center' },
    backContactText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
    confirmContactText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },

    contactUsFloatingBtn: {
        backgroundColor: '#F29502',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 30,
        gap: 10,
        elevation: 8,
        shadowColor: '#F29502',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        position: 'absolute',
        bottom: 20,
    },
    contactUsFloatingText: { color: '#FFF', fontSize: 17, fontWeight: 'bold' },
    profileMediaSection: { marginTop: 20 },
});

export default DecorationFloralScreen;
