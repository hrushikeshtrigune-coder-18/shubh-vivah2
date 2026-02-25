import { Ionicons } from '@expo/vector-icons';
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

const FoodV = ({ navigation, route }: { navigation?: any; route?: any }) => {
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
    const scrollRef = useRef<ScrollView>(null);

    // Profile Sections Refs
    const portfolioRef = useRef<View>(null);
    const pricingRef = useRef<View>(null);
    const aboutRef = useRef<View>(null);
    const reviewsRef = useRef<View>(null);

    const [activeSection, setActiveSection] = useState('Projects');
    const [activeMediaTab, setActiveMediaTab] = useState('Photos');
    // activeMediaTab removed as it is now the main activeSection
    const [activeMenuFilter, setActiveMenuFilter] = useState('Veg');
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Contact Form States
    const [contactName, setContactName] = useState('');
    const [contactMobile, setContactMobile] = useState('');
    const [contactEventType, setContactEventType] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactDate, setContactDate] = useState('');
    const [contactTime, setContactTime] = useState('');
    const [contactNote, setContactNote] = useState('');

    // Tab Animation Logic
    const tabUnderlineTranslateX = useRef(new Animated.Value(0)).current;

    // Menu Entrance Animation Logic
    // Using a separate component for animated list items to handle mounting animations
    const AnimatedMenuCard = ({ item, index, isNonVeg }: { item: any, index: number, isNonVeg: boolean }) => {
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

    const handleTabPress = (section: string, ref: any, index: number) => {
        setActiveSection(section);
        Animated.spring(tabUnderlineTranslateX, {
            toValue: index * 90, // Adjusted for new tab width
            useNativeDriver: true,
        }).start();

        ref.current?.measureLayout(
            scrollRef.current,
            (x: number, y: number) => {
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

        const renderMenuCategory = (menuData: any[], isNonVeg: boolean) => (
            <View style={styles.menuTabContainer}>
                {menuData.map((cat, idx) => (
                    <View key={idx} style={styles.menuCategoryBlock}>
                        <Text style={styles.menuCategoryTitle}>{cat.category}</Text>
                        <View style={styles.menuItemsList}>
                            {cat.items.map((item: any, i: number) => (
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
                            {proj.images.map((img: any, i: number) => (
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
        );

        return (
            <View ref={portfolioRef} style={styles.profileMediaSection}>
                <View style={styles.mediaHeaderRow}>
                    <Text style={styles.sectionTitle}>Portfolio</Text>
                    <View style={styles.mediaMainTabs}>
                        {['Photos', 'Videos', 'Menu'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.mediaMainTab, activeMediaTab === tab && styles.mediaMainTabActive]}
                                onPress={() => setActiveMediaTab(tab)}
                            >
                                <Text style={[styles.mTabText, activeMediaTab === tab && styles.mTabTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {activeMediaTab === 'Photos' ? (
                    renderPhotos()
                ) : activeMediaTab === 'Videos' ? (
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
                    <Text style={styles.pricingValue}>1,200 <Text style={styles.pricePer}>/plate</Text></Text>
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
                            <Text style={styles.reviewDate}>2 weeks ago Wedding Reception</Text>
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
                                        Schedule a tour of {displayVendor?.name || 'Vandana Catering'}
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
                        colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.4)']}
                        style={styles.headerOverlay}
                    />
                    <TouchableOpacity
                        style={styles.closeBtnProfile}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-down" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* 1: Profile Identity (Premium) */}
                <View style={styles.profileIdentityOverlay}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                        style={styles.identityBgGradient}
                    />
                    <View style={styles.avatarContainer}>
                        <Image source={displayVendor.image} style={styles.avatarImage} />
                    </View>
                    <View style={styles.nameSection}>
                        <Text style={styles.profileVendorName}>{displayVendor.name}</Text>
                        <Text style={styles.profileBusinessName}>{displayVendor.tag}</Text>
                        <View style={styles.profileLocationRow}>
                            <Ionicons name="location" size={16} color={COLORS.secondary} />
                            <Text style={styles.profileLocationText}>{displayVendor.location}</Text>
                        </View>
                    </View>
                </View>

                {/* 2: Premium Sticky Tab Bar */}
                <View style={styles.stickyNavWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.shortcutNavBar}
                    >
                        {['Projects', 'Pricing', 'About', 'Reviews'].map((tab, idx) => (
                            <TouchableOpacity
                                key={tab}
                                style={styles.shortcutNavTab}
                                onPress={() => handleTabPress(tab,
                                    tab === 'Projects' ? portfolioRef :
                                        tab === 'Pricing' ? pricingRef :
                                            tab === 'About' ? aboutRef : reviewsRef,
                                    idx)}
                            >
                                <Text style={[
                                    styles.shortcutNavText,
                                    activeSection === tab && styles.shortcutNavTextActive
                                ]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                        <Animated.View
                            style={[
                                styles.tabUnderline,
                                {
                                    transform: [{ translateX: tabUnderlineTranslateX }]
                                }
                            ]}
                        />
                    </ScrollView>
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
                <TouchableOpacity style={styles.contactUsBtn} onPress={() => setIsContactModalVisible(true)}>
                    <Text style={styles.contactUsBtnText}>Contact Us</Text>
                    <Ionicons name="chatbubble-ellipses" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
            {renderContactModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: { flex: 1, backgroundColor: '#FFF' },
    profileHeader: { height: 320, width: '100%' },
    coverImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerOverlay: { ...StyleSheet.absoluteFillObject },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, zIndex: 10, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },

    profileIdentityOverlay: {
        marginTop: -60,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
        position: 'relative'
    },
    identityBgGradient: { ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 40, borderTopRightRadius: 40 },
    avatarContainer: { width: 110, height: 110, borderRadius: 55, borderWidth: 5, borderColor: '#FFF', elevation: 15, backgroundColor: '#FFF', overflow: 'hidden', marginTop: -70 },
    avatarImage: { width: '100%', height: '100%' },
    nameSection: { alignItems: 'center', marginTop: 10 },
    profileVendorName: { fontSize: 28, color: '#111', fontWeight: 'bold' },
    profileBusinessName: { fontSize: 16, color: COLORS.secondary, marginTop: 4, fontWeight: 'bold' },
    profileLocationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
    profileLocationText: { fontSize: 13, color: '#777' },

    stickyNavWrapper: { backgroundColor: 'rgba(253, 252, 240, 0.96)', borderBottomWidth: 1, borderBottomColor: 'rgba(212, 136, 6, 0.15)', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8 },
    shortcutNavBar: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, paddingVertical: 16, alignItems: 'center' },
    shortcutNavTab: { width: 90, alignItems: 'center', justifyContent: 'center' },
    shortcutNavText: { fontSize: 15, color: '#999', fontWeight: 'bold' },
    shortcutNavTextActive: { color: COLORS.secondary },
    tabUnderline: { position: 'absolute', bottom: 12, left: 20, width: 90, height: 3, backgroundColor: COLORS.secondary, borderRadius: 2 },

    sectionTitle: { fontSize: 24, color: '#800000', fontWeight: 'bold' },
    profileMediaSection: { marginBottom: 40 },
    mediaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    mediaMainTabs: { flexDirection: 'row', gap: 15 },
    mediaMainTab: { paddingBottom: 6 },
    mediaMainTabActive: { borderBottomWidth: 2, borderBottomColor: COLORS.secondary },
    mTabText: { fontSize: 13, color: '#999', fontWeight: 'bold' },
    mTabTextActive: { color: COLORS.secondary },

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
    menuItemName: { fontFamily: 'Outfit_700Bold', fontSize: 15, color: '#222', marginBottom: 4 },
    menuItemDesc: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#666', lineHeight: 18 },
    vegNonVegDot: { width: 14, height: 14, borderRadius: 2, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    vegNonVegInner: { width: 8, height: 8, borderRadius: 4 },

    profileInfoContent: { paddingHorizontal: 20, paddingTop: 30 },
    profileSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#111', marginBottom: 20 },

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

    floatingActionTier: { position: 'absolute', bottom: 30, left: 20, right: 20, alignItems: 'center' },
    contactUsBtn: { width: '100%', height: 65, borderRadius: 35, backgroundColor: '#F29502', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, elevation: 12, shadowColor: '#F29502', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10 },
    contactUsBtnText: { color: '#FFF', fontFamily: 'Outfit_700Bold', fontSize: 20, letterSpacing: 0.5 },

    videoPlaceholder: { height: 250, backgroundColor: '#F9F9F9', borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#DDD' },
    placeholderText: { marginTop: 15, fontFamily: 'Outfit_600SemiBold', color: '#999' },
    cardCarousel: { height: '100%' },

    // Contact Modal Styles
    contactModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
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
    contactTitle: { fontFamily: 'Outfit_700Bold', fontSize: 24, color: '#CC0E0E' },
    contactSubTitle: { fontFamily: 'Outfit_500Medium', fontSize: 13, color: '#F29502', marginLeft: 6 },
    closeContactBtn: { backgroundColor: '#F5F5F5', borderRadius: 25, padding: 8 },
    contactLabel: { fontFamily: 'Outfit_700Bold', fontSize: 13, color: '#CC0E0E', marginTop: 12, marginBottom: 6 },
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
    confirmContactBtn: { flex: 2, height: 52, borderRadius: 16, backgroundColor: '#CC0E0E', alignItems: 'center', justifyContent: 'center' },
    backContactText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#666' },
    confirmContactText: { fontFamily: 'Outfit_700Bold', fontSize: 16, color: '#FFF' },
});

export default FoodV;
