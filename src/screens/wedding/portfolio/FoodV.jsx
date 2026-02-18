import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import food1 from '../../../../assets/images/food1.jpg';
import food2 from '../../../../assets/images/food2.jpg';
import food3 from '../../../../assets/images/food3.jpg';
import food4 from '../../../../assets/images/food4.jpg';

const { width } = Dimensions.get('window');

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
};

const FoodV = ({ navigation, route }) => {
    const { vendor } = route.params || {};

    // Default Data (Fallback)
    const defaultVendor = {
        name: 'Royal Feast Catering',
        tag: 'Gourmet Wedding Catering Experts',
        location: 'Pune, Maharashtra',
        rating: 4.8,
        reviews: 124,
        image: food1,
        images: [food1, food2, food3, food4]
    };

    const displayVendor = vendor ? {
        ...defaultVendor,
        name: vendor.name || defaultVendor.name,
        location: vendor.location || defaultVendor.location,
        rating: vendor.rating || defaultVendor.rating,
        image: vendor.image || defaultVendor.image,
        images: vendor.images || (vendor.previews ? [vendor.image, ...vendor.previews] : defaultVendor.images)
    } : defaultVendor;
    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);

    // Profile Sections Refs
    const portfolioRef = useRef(null);
    const pricingRef = useRef(null);
    const aboutRef = useRef(null);
    const reviewsRef = useRef(null);

    const [activeSection, setActiveSection] = useState('Photos');
    // activeMediaTab removed as it is now the main activeSection
    const [activeMenuFilter, setActiveMenuFilter] = useState('Veg');

    // Tab Animation Logic
    const tabUnderlineTranslateX = useRef(new Animated.Value(0)).current;

    // Menu Entrance Animation Logic
    // Using a separate component for animated list items to handle mounting animations
    const AnimatedMenuCard = ({ item, index, isNonVeg }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const translateY = useRef(new Animated.Value(20)).current;

        useEffect(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    delay: index * 300, // Slower staggered delay
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 900,
                    delay: index * 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }, []);

        return (
            <Animated.View style={[
                styles.menuItemCard,
                { opacity: fadeAnim, transform: [{ translateY }] }
            ]}>
                <Image source={item.image} style={styles.menuItemImage} />
                <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDesc}>{item.desc}</Text>
                </View>
                <View style={[styles.vegNonVegDot, { borderColor: isNonVeg ? COLORS.primary : 'green' }]}>
                    <View style={[styles.vegNonVegInner, { backgroundColor: isNonVeg ? COLORS.primary : 'green' }]} />
                </View>
            </Animated.View>
        );
    };

    const tabWidth = (width - 20) / 3; // width minus horizontal padding divided by 3 tabs

    const handleTabPress = (section, ref, index) => {
        setActiveSection(section);
        Animated.spring(tabUnderlineTranslateX, {
            toValue: index * tabWidth,
            useNativeDriver: true,
        }).start();

        ref.current?.measureLayout(
            scrollRef.current,
            (x, y) => {
                scrollRef.current?.scrollTo({ y: y - 100, animated: true });
            }
        );
    };

    const renderPortfolioSection = () => {
        const vegMenu = [
            {
                category: 'Starters',
                items: [
                    { id: 'vs1', name: 'Paneer Tikka', desc: 'Marinated in royal spices and grilled to perfection.', image: food2 },
                    { id: 'vs2', name: 'Hara Bhara Kabab', desc: 'Crispy vegetable patties with spinach and peas.', image: food3 },
                    { id: 'vs3', name: 'Spring Rolls', desc: 'Crunchy rolls filled with seasoned Asian vegetables.', image: food4 }
                ]
            },
            {
                category: 'Main Course',
                items: [
                    { id: 'vm1', name: 'Dal Makhani', desc: 'Slow-cooked for 18 hours in a buttery tomato gravy.', image: food1 },
                    { id: 'vm2', name: 'Zaffrani Paneer', desc: 'Paneer cubes in a saffron-infused creamy sauce.', image: food2 },
                    { id: 'vm3', name: 'Vegetable Biryani', desc: 'Fragrant basmati rice with exotic spices and veggies.', image: food3 }
                ]
            },
            {
                category: 'Desserts',
                items: [
                    { id: 'vd1', name: 'Gulab Jamun', desc: 'Warm, syrup-soaked milk dumplings with nuts.', image: food4 },
                    { id: 'vd2', name: 'Rasmalai', desc: 'Saffron-flavored milk with soft cottage cheese patties.', image: food1 },
                    { id: 'vd3', name: 'Moong Dal Halwa', desc: 'Rich and traditional lentil dessert with pure ghee.', image: food2 }
                ]
            }
        ];

        const nonVegMenu = [
            {
                category: 'Starters',
                items: [
                    { id: 'nvs1', name: 'Chicken Tikka', desc: 'Tender chicken marinated in yogurt and spices.', image: food3 },
                    { id: 'nvs2', name: 'Fish Amritsari', desc: 'Crispy fried fish with carom seeds.', image: food4 },
                    { id: 'nvs3', name: 'Mutton Seekh', desc: 'Minced mutton skewers grilled in tandoor.', image: food1 }
                ]
            },
            {
                category: 'Main Course',
                items: [
                    { id: 'nvm1', name: 'Butter Chicken', desc: 'Classic tandoori chicken in a rich tomato gravy.', image: food2 },
                    { id: 'nvm2', name: 'Mutton Rogan Josh', desc: 'Aromatic lamb curry with Kashmiri spices.', image: food3 },
                    { id: 'nvm3', name: 'Chicken Biryani', desc: 'Basmati rice cooked with chicken and authentic spices.', image: food4 }
                ]
            }
        ];

        const renderMenuCategory = (menuData, isNonVeg) => (
            <View style={styles.menuTabContainer}>
                {menuData.map((cat, idx) => (
                    <View key={idx} style={styles.menuCategoryBlock}>
                        <Text style={styles.menuCategoryTitle}>{cat.category}</Text>
                        <View style={styles.menuItemsList}>
                            {cat.items.map((item, i) => (
                                <AnimatedMenuCard
                                    key={item.id}
                                    item={item}
                                    index={i}
                                    isNonVeg={isNonVeg}
                                />
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );

        const renderSubMenuFilter = () => (
            <View style={styles.subMenuContainer}>
                {['Veg', 'Non-Veg'].map(filter => (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.subMenuTab, activeMenuFilter === filter && styles.subMenuTabActive, activeMenuFilter === 'Veg' && filter === 'Veg' ? { backgroundColor: '#E8F5E9', borderColor: 'green' } : activeMenuFilter === 'Non-Veg' && filter === 'Non-Veg' ? { backgroundColor: '#FFEBEE', borderColor: COLORS.primary } : {}]}
                        onPress={() => setActiveMenuFilter(filter)}
                    >
                        <View style={[styles.vegNonVegDot, {
                            borderColor: filter === 'Non-Veg' ? COLORS.primary : 'green',
                            marginRight: 6
                        }]}>
                            <View style={[styles.vegNonVegInner, {
                                backgroundColor: filter === 'Non-Veg' ? COLORS.primary : 'green'
                            }]} />
                        </View>
                        <Text style={[styles.subMenuText, activeMenuFilter === filter && { color: '#000', fontWeight: 'bold' }]}>{filter}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );

        const renderPhotos = () => (
            <View style={styles.gridColumn}>
                {[
                    { title: 'Royal Wedding Feast', type: 'Buffet', likes: 124, images: [food1, food2, food3], height: 260 },
                    { title: 'Sangeet Night Catering', type: 'Live Counters', likes: 89, images: [food2, food4, food1], height: 220 },
                    { title: 'Reception Dinner', type: 'Plated Sit-down', likes: 156, images: [food3, food1, food4], height: 280 }
                ].map((proj, idx) => (
                    <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.cardCarousel}>
                            {proj.images.map((img, i) => (
                                <Image key={i} source={img} style={[styles.projectImage, { width: (width - 40) }]} />
                            ))}
                        </ScrollView>
                        <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                        <View style={styles.projectCardFooter}>
                            <View style={styles.likesRow}>
                                <Ionicons name="heart" size={14} color="#FF4b4b" />
                                <Text style={styles.likesText}>{proj.likes}</Text>
                            </View>
                            <Text style={styles.projectCardTitle} numberOfLines={1}>{proj.title}</Text>
                        </View>
                    </View>
                ))}

                <View style={styles.gridColumn}>
                    {[
                        { title: 'Dessert Extravaganza', type: 'Sweets', likes: 210, images: [food3, food2, food1], height: 220 },
                        { title: 'Italian Night', type: 'Continental', likes: 56, images: [food1, food4, food2], height: 240 }
                    ].map((proj, idx) => (
                        <View key={idx} style={[styles.projectCard, { height: proj.height }]}>
                            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.cardCarousel}>
                                {proj.images.map((img, i) => (
                                    <Image key={i} source={img} style={[styles.projectImage, { width: (width - 40) }]} />
                                ))}
                            </ScrollView>
                            <View style={styles.typeBadge}><Text style={styles.typeBadgeText}>{proj.type}</Text></View>
                            <View style={styles.projectCardFooter}>
                                <View style={styles.likesRow}>
                                    <Ionicons name="heart" size={14} color="#FF4b4b" />
                                    <Text style={styles.likesText}>{proj.likes}</Text>
                                </View>
                                <Text style={styles.projectCardTitle} numberOfLines={1}>{proj.title}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );

        return (
            <View ref={portfolioRef} style={styles.profileMediaSection}>
                {activeSection === 'Photos' ? (
                    renderPhotos()
                ) : activeSection === 'Videos' ? (
                    <View style={styles.videoPlaceholder}>
                        <Ionicons name="play-circle" size={60} color="#DDD" />
                        <Text style={styles.placeholderText}>Catering Highlights Videos</Text>
                    </View>
                ) : (
                    <View>
                        {renderSubMenuFilter()}
                        {renderMenuCategory(activeMenuFilter === 'Veg' ? vegMenu : nonVegMenu, activeMenuFilter === 'Non-Veg')}
                    </View>
                )}
            </View>
        );
    };

    const renderPricingSection = () => (
        <View ref={pricingRef} style={styles.profilePricingSection}>
            <Text style={styles.profileSectionLabel}>Pricing & Packages</Text>
            <View style={styles.pricingCardLarge}>
                <View style={styles.pricingHeaderRow}>
                    <Text style={styles.pricingItemTitle}>Grand Buffet Package</Text>
                    <Text style={styles.pricingValue}>₹1,200 <Text style={styles.pricePer}>/plate</Text></Text>
                </View>
                <Text style={styles.pricingDesc}>Minimum 300 guests. Includes 4 welcome drinks, 8 snacks, 2 soups, 12 main course dishes, and 6 desserts.</Text>
                <View style={styles.pricingFeaturesGrid}>
                    {['Live Chaat Counter', 'Gourmet Presentation', 'Uniformed Staff', 'Premium Cutlery'].map((feat, idx) => (
                        <View key={idx} style={styles.pricingFeatureItem}>
                            <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                            <Text style={styles.pricingFeatureText}>{feat}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.viewProposalBtn}>
                    <Text style={styles.viewProposalText}>Get Custom Proposal</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAboutSection = () => (
        <View ref={aboutRef} style={styles.profileAboutSection}>
            <Text style={styles.profileSectionLabel}>About Royal Feast</Text>
            <Text style={styles.aboutText}>
                Royal Feast Catering has been a pioneer in the luxury wedding catering industry for over 15 years.
                We specialize in creating bespoke culinary experiences that blend traditional Indian flavors with
                modern presentation techniques. Our team of world-class chefs ensures every dish is a masterpiece.
            </Text>
            <View style={styles.highlightsBadgeRow}>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="medal" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>15+ Years</Text>
                    <Text style={styles.hBadgeSub}>Experience</Text>
                </View>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="star" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>5-Star</Text>
                    <Text style={styles.hBadgeSub}>Service</Text>
                </View>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>FSSAI</Text>
                    <Text style={styles.hBadgeSub}>Certified</Text>
                </View>
            </View>
        </View>
    );

    const renderReviewsSection = () => (
        <View ref={reviewsRef} style={styles.profileReviewsSection}>
            <View style={styles.reviewsHeaderRow}>
                <View>
                    <Text style={styles.profileSectionLabel}>Guest Reviews</Text>
                    <View style={styles.overallRatingRow}>
                        <Text style={styles.overallRatingVal}>{displayVendor.rating}</Text>
                        <View style={styles.starRow}>
                            {[1, 2, 3, 4, 5].map(s => <Ionicons key={s} name="star" size={14} color={s <= Math.round(displayVendor.rating) ? COLORS.secondary : '#DDD'} />)}
                        </View>
                        <Text style={styles.totalReviewsText}>({displayVendor.reviews} reviews)</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.writeReviewBtn}>
                    <Text style={styles.writeReviewText}>Write Review</Text>
                </TouchableOpacity>
            </View>

            {[1, 2].map((rev, idx) => (
                <View key={idx} style={styles.reviewItemCard}>
                    <View style={styles.reviewUserHeader}>
                        <View style={styles.userIconSmall}><Text style={styles.userInitials}>AP</Text></View>
                        <View>
                            <Text style={styles.reviewUserName}>Ananya Pandey</Text>
                            <Text style={styles.reviewDate}>2 weeks ago • Wedding Reception</Text>
                        </View>
                        <View style={styles.itemRatingCompact}>
                            <Ionicons name="star" size={10} color={COLORS.secondary} />
                            <Text style={styles.itemRatingVal}>5.0</Text>
                        </View>
                    </View>
                    <Text style={styles.reviewContentText}>
                        "The food was absolutely amazing! All our guests specifically mentioned the live counters
                        and the dessert variety. Highly recommend Royal Feast for a hassle-free experience."
                    </Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.profileContainer}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Animated.ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
                stickyHeaderIndices={[2]}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                {/* 0: Header with Background */}
                <View style={styles.profileHeader}>
                    <Image source={displayVendor.image} style={styles.coverImage} />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.5)', 'transparent']}
                        style={styles.headerOverlay}
                    />
                    <TouchableOpacity
                        style={styles.closeBtnProfile}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* 1: Profile Identity (Floating) */}
                <View style={styles.profileIdentityOverlay}>
                    <View style={styles.avatarContainer}>
                        <Image source={displayVendor.image} style={styles.avatarImage} />
                    </View>
                    <View style={styles.nameSection}>
                        <Text style={styles.profileVendorName}>{displayVendor.name}</Text>
                        <Text style={styles.profileBusinessName}>{displayVendor.tag}</Text>
                        <View style={styles.profileLocationRow}>
                            <Ionicons name="location" size={16} color={COLORS.primary} />
                            <Text style={styles.profileLocationText}>{displayVendor.location}</Text>
                        </View>
                    </View>
                </View>

                {/* 2: Sticky Shortcut Nav Bar */}
                <View style={styles.stickyNavWrapper}>
                    <View style={styles.shortcutNavBar}>
                        <TouchableOpacity style={{ width: tabWidth, alignItems: 'center' }} onPress={() => handleTabPress('Photos', portfolioRef, 0)}>
                            <Text style={[styles.shortcutNavText, activeSection === 'Photos' && styles.shortcutNavTextActive]}>Photos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: tabWidth, alignItems: 'center' }} onPress={() => handleTabPress('Videos', portfolioRef, 1)}>
                            <Text style={[styles.shortcutNavText, activeSection === 'Videos' && styles.shortcutNavTextActive]}>Videos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: tabWidth, alignItems: 'center' }} onPress={() => handleTabPress('Menu', portfolioRef, 2)}>
                            <Text style={[styles.shortcutNavText, activeSection === 'Menu' && styles.shortcutNavTextActive]}>Menu</Text>
                        </TouchableOpacity>

                        {/* Animated Gold Underline */}
                        <Animated.View
                            style={[
                                styles.tabUnderline,
                                {
                                    width: tabWidth,
                                    left: 0,
                                    transform: [{ translateX: tabUnderlineTranslateX }]
                                }
                            ]}
                        />
                    </View>
                </View>

                {/* 3: Main Scrollable Content */}
                <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                    {renderPortfolioSection()}
                    {renderPricingSection()}
                    {renderAboutSection()}
                    {renderReviewsSection()}
                </View>
            </Animated.ScrollView>

            {/* Bottom Floating Contact Bar */}
            <View style={styles.floatingActionTier}>
                <TouchableOpacity style={styles.chatIconButton}>
                    <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainCheckAvailBtn}>
                    <Text style={styles.mainCheckBtnText}>Request Quote</Text>
                    <Ionicons name="sparkles" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: { flex: 1, backgroundColor: '#FFF' },
    profileHeader: { height: 280, width: '100%' },
    coverImage: { width: '100%', height: '100%' },
    headerOverlay: { ...StyleSheet.absoluteFillObject },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },

    profileIdentityOverlay: {
        backgroundColor: '#FFF',
        marginTop: -50,
        marginHorizontal: 15,
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    avatarContainer: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#FFF', overflow: 'hidden', backgroundColor: '#F0F0F0', elevation: 5 },
    avatarImage: { width: '100%', height: '100%' },
    nameSection: { flex: 1, marginLeft: 15 },
    profileVendorName: { fontFamily: 'Outfit_700Bold', fontSize: 22, color: '#111' },
    profileBusinessName: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#666', marginTop: 2 },
    profileLocationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
    profileLocationText: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: COLORS.primary },

    stickyNavWrapper: { backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#F0F0F0' },
    shortcutNavBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, paddingHorizontal: 10 },
    shortcutNavText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: '#999' },
    shortcutNavTextActive: { color: COLORS.primary },
    tabUnderline: { position: 'absolute', bottom: 0, height: 3, backgroundColor: COLORS.secondary, borderRadius: 3 },

    menuTabContainer: { paddingVertical: 10 },
    menuCategoryBlock: { marginBottom: 25 },
    menuCategoryTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#800000', marginBottom: 15, paddingLeft: 5 },
    menuItemsList: { gap: 15 },
    menuItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0, // Remove padding to let image take full height
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#FFD700', // Golden border
        overflow: 'hidden', // Clip image corners
    },
    menuItemImage: { width: 100, height: 100, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 },
    menuItemInfo: { flex: 1, paddingHorizontal: 15, paddingVertical: 10 },
    vegNonVegDot: { marginRight: 15 },
    menuItemName: { fontFamily: 'Outfit_700Bold', fontSize: 15, color: '#222', marginBottom: 4 },
    menuItemDesc: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#666', lineHeight: 18 },
    vegNonVegDot: { width: 14, height: 14, borderRadius: 2, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    vegNonVegInner: { width: 8, height: 8, borderRadius: 4 },

    profileInfoContent: { paddingHorizontal: 20, paddingTop: 30 },
    profileSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#111', marginBottom: 20 },

    // Media Section
    // Media Section
    profileMediaSection: { marginBottom: 40 },
    mediaHeaderRow: { marginBottom: 20 },
    mediaMainTabs: { flexDirection: 'row', backgroundColor: '#F5F5F5', borderRadius: 12, padding: 4, width: '100%' },
    mediaMainTab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
    mediaMainTabActive: { backgroundColor: '#FFF', elevation: 2 },
    mTabText: { fontFamily: 'Outfit_600SemiBold', fontSize: 13, color: '#999' },
    mTabTextActive: { color: '#111' },

    subMenuContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 15 },
    subMenuTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#EEE', backgroundColor: '#FFF' },
    subMenuTabActive: { elevation: 2 },
    subMenuText: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: '#666' },

    featuredProjectCard: { height: 200, width: '100%', borderRadius: 20, overflow: 'hidden', marginBottom: 20 },
    featuredProjectImage: { width: '100%', height: '100%' },
    featuredProjectOverlay: { ...StyleSheet.absoluteFillObject, padding: 20, justifyContent: 'flex-end' },
    featuredBadge: { backgroundColor: COLORS.secondary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8 },
    featuredBadgeText: { color: '#FFF', fontSize: 10, fontFamily: 'Outfit_700Bold', textTransform: 'uppercase' },
    featuredProjectTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#FFF', marginBottom: 6 },
    featuredMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    featuredMetaText: { color: '#EEE', fontSize: 12, fontFamily: 'Outfit_400Regular' },
    viewProjectBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    viewProjectBtnText: { color: '#FFF', fontSize: 11, fontFamily: 'Outfit_700Bold' },

    pinterestGrid: { flexDirection: 'row', gap: 15 },
    gridColumn: { flex: 1, gap: 15 },
    projectCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', borderWidth: 0.5, borderColor: '#EEE' },
    projectImage: { height: '100%', resizeMode: 'cover' },
    typeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    typeBadgeText: { fontSize: 9, fontFamily: 'Outfit_700Bold', color: COLORS.primary },
    projectCardFooter: { padding: 12 },
    likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
    likesText: { fontSize: 11, fontFamily: 'Outfit_700Bold', color: '#666' },
    projectCardTitle: { fontSize: 13, fontFamily: 'Outfit_600SemiBold', color: '#222' },

    // Pricing Section
    profilePricingSection: { marginBottom: 40 },
    pricingCardLarge: { backgroundColor: '#FFF7F0', borderRadius: 24, padding: 25, borderWidth: 1, borderColor: '#FFE0B2' },
    pricingHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    pricingItemTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#D48806' },
    pricingValue: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#111' },
    pricePer: { fontSize: 12, color: '#666', fontFamily: 'Outfit_400Regular' },
    pricingDesc: { fontFamily: 'Outfit_400Regular', fontSize: 13, color: '#886434', lineHeight: 20, marginBottom: 20 },
    pricingFeaturesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 25 },
    pricingFeatureItem: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '45%' },
    pricingFeatureText: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: '#555' },
    viewProposalBtn: { backgroundColor: '#CC0E0E', paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
    viewProposalText: { color: '#FFF', fontFamily: 'Outfit_700Bold', fontSize: 14 },

    // About Section
    profileAboutSection: { marginBottom: 40 },
    aboutText: { fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#555', lineHeight: 26, marginBottom: 25 },
    highlightsBadgeRow: { flexDirection: 'row', justifyContent: 'space-between' },
    highlightBadgeItem: { flex: 1, alignItems: 'center', backgroundColor: '#F9F9F9', paddingVertical: 15, borderRadius: 20, marginHorizontal: 5 },
    hBadgeTitle: { fontFamily: 'Outfit_700Bold', fontSize: 14, color: '#222', marginTop: 8 },
    hBadgeSub: { fontFamily: 'Outfit_400Regular', fontSize: 11, color: '#999' },

    // Reviews Section
    profileReviewsSection: { marginBottom: 20 },
    reviewsHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
    overallRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    overallRatingVal: { fontFamily: 'Outfit_700Bold', fontSize: 32, color: '#111' },
    starRow: { flexDirection: 'row', gap: 2 },
    totalReviewsText: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#999' },
    writeReviewBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: COLORS.secondary },
    writeReviewText: { color: COLORS.secondary, fontFamily: 'Outfit_700Bold', fontSize: 13 },
    reviewItemCard: { marginBottom: 20, borderBottomWidth: 1, borderColor: '#F5F5F5', paddingBottom: 20 },
    reviewUserHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    userIconSmall: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    userInitials: { color: '#1976D2', fontFamily: 'Outfit_700Bold' },
    reviewUserName: { fontFamily: 'Outfit_700Bold', fontSize: 15, color: '#222' },
    reviewDate: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#999' },
    itemRatingCompact: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF9F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    itemRatingVal: { fontSize: 12, fontFamily: 'Outfit_700Bold', color: '#D48806' },
    reviewContentText: { fontFamily: 'Outfit_400Regular', fontSize: 14, color: '#555', lineHeight: 22 },

    floatingActionTier: { position: 'absolute', bottom: 30, left: 20, right: 20, flexDirection: 'row', gap: 15, alignItems: 'center' },
    chatIconButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10 },
    mainCheckAvailBtn: { flex: 1, height: 60, borderRadius: 30, backgroundColor: COLORS.primary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, elevation: 8 },
    mainCheckBtnText: { color: '#FFF', fontFamily: 'Outfit_700Bold', fontSize: 16, letterSpacing: 0.5 },

    videoPlaceholder: { height: 250, backgroundColor: '#F9F9F9', borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#DDD' },
    placeholderText: { marginTop: 15, fontFamily: 'Outfit_600SemiBold', color: '#999' },
    cardCarousel: { height: '100%' },
});

export default FoodV;
