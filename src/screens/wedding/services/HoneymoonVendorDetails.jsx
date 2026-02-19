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

const { width } = Dimensions.get('window');

const COLORS = {
    background: '#FFFFF0', // Ivory
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#CC0E0E',
};

const HoneymoonVendorDetails = ({ navigation, route }) => {
    const { vendor } = route.params || {};

    // Default Data with Type classification
    const defaultVendor = {
        name: 'Luxe Escapes',
        tag: 'Gourmet Honeymoon Planning Experts',
        location: 'Maldives',
        rating: 4.9,
        reviews: 128,
        image: { uri: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop' },
        images: [
            { uri: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop' }
        ],
        locations: [
            { name: 'Maldives', price: '₹2.5L', duration: '5 Nights', type: 'International', image: { uri: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop' } },
            { name: 'Bali', price: '₹1.8L', duration: '6 Nights', type: 'International', image: { uri: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop' } },
            { name: 'Goa', price: '₹60K', duration: '4 Nights', type: 'Domestic', image: { uri: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop' } },
            { name: 'Kerala', price: '₹80K', duration: '5 Nights', type: 'Domestic', image: { uri: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop' } }
        ]
    };

    const displayVendor = vendor ? {
        ...defaultVendor,
        name: vendor.name || defaultVendor.name,
        location: vendor.location || defaultVendor.location,
        rating: vendor.rating || defaultVendor.rating,
        image: vendor.image || defaultVendor.image,
        images: vendor.images || (vendor.previews ? [vendor.image, ...vendor.previews] : defaultVendor.images),
        locations: vendor.locations || defaultVendor.locations
    } : defaultVendor;

    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);

    const portfolioRef = useRef(null);
    const pricingRef = useRef(null);
    const aboutRef = useRef(null);
    const reviewsRef = useRef(null);

    const [activeSection, setActiveSection] = useState('Photos');
    const tabUnderlineTranslateX = useRef(new Animated.Value(0)).current;
    const tabWidth = (width - 20) / 3;
    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    // Contact Form States
    const [contactName, setContactName] = useState('');
    const [contactMobile, setContactMobile] = useState('');
    const [contactEventType, setContactEventType] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactDate, setContactDate] = useState('');
    const [contactTime, setContactTime] = useState('');
    const [contactNote, setContactNote] = useState('');

    // Filter States
    const [packageTypeFilter, setPackageTypeFilter] = useState('International');
    const availableTypes = Array.from(new Set(displayVendor.locations.map(l => l.type || 'International')));

    // Auto-select first location of current type
    const [activeLocationFilter, setActiveLocationFilter] = useState('');

    useEffect(() => {
        const firstLoc = displayVendor.locations.find(l => (l.type || 'International') === packageTypeFilter);
        if (firstLoc) setActiveLocationFilter(firstLoc.name);
    }, [packageTypeFilter]);

    const AnimatedDestinationCard = ({ item, index }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current;
        const translateY = useRef(new Animated.Value(20)).current;

        useEffect(() => {
            Animated.parallel([
                Animated.timing(fadeAnim, { toValue: 1, duration: 800, delay: index * 200, useNativeDriver: true }),
                Animated.timing(translateY, { toValue: 0, duration: 900, delay: index * 200, useNativeDriver: true }),
            ]).start();
        }, [item]); // Re-animate when item changes

        return (
            <Animated.View style={[styles.menuItemCard, { opacity: fadeAnim, transform: [{ translateY }] }]}>
                <Image source={item.image || displayVendor.image} style={styles.menuItemImage} />
                <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDesc}>{item.duration} • Starting from {item.price || displayVendor.startPrice}</Text>
                </View>
                <Ionicons name="airplane" size={20} color={COLORS.primary} style={{ marginRight: 15 }} />
            </Animated.View>
        );
    };

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

    const renderPhotos = () => (
        <View style={styles.gridColumn}>
            {[
                { title: 'Romantic Getaways', type: 'Island', likes: 245, images: displayVendor.images, height: 260 },
                { title: 'Luxury Stays', type: 'Premium', likes: 189, images: displayVendor.images, height: 220 },
                { title: 'Adventure Together', type: 'Experience', likes: 312, images: displayVendor.images, height: 280 }
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
    );

    const renderPortfolioSection = () => (
        <View ref={portfolioRef} style={styles.profileMediaSection}>
            {activeSection === 'Photos' ? (
                renderPhotos()
            ) : activeSection === 'Videos' ? (
                <View style={styles.videoPlaceholder}>
                    <Ionicons name="play-circle" size={60} color="#DDD" />
                    <Text style={styles.placeholderText}>Honeymoon Highlights Videos</Text>
                </View>
            ) : (
                <View>
                    {/* Main Category Filter (International / Domestic) */}
                    <View style={styles.mainTypeFilterRow}>
                        {['International', 'Domestic'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.typeFilterBtn, packageTypeFilter === type && styles.typeFilterBtnActive]}
                                onPress={() => setPackageTypeFilter(type)}
                            >
                                <Ionicons
                                    name={type === 'International' ? 'globe-outline' : 'map-outline'}
                                    size={18}
                                    color={packageTypeFilter === type ? '#FFF' : '#666'}
                                />
                                <Text style={[styles.typeFilterText, packageTypeFilter === type && styles.typeFilterTextActive]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sub-Location Filter */}
                    <View style={styles.subMenuContainer}>
                        {displayVendor.locations
                            ?.filter(l => (l.type || 'International') === packageTypeFilter)
                            .map((loc, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[styles.subMenuTab, activeLocationFilter === loc.name && styles.subMenuTabActive]}
                                    onPress={() => setActiveLocationFilter(loc.name)}
                                >
                                    <Text style={[styles.subMenuText, activeLocationFilter === loc.name && { color: COLORS.primary, fontWeight: 'bold' }]}>{loc.name}</Text>
                                </TouchableOpacity>
                            ))}
                    </View>

                    <View style={styles.menuTabContainer}>
                        <View style={styles.menuCategoryBlock}>
                            <Text style={styles.menuCategoryTitle}>{packageTypeFilter} Packages</Text>
                            <View style={styles.menuItemsList}>
                                {displayVendor.locations
                                    ?.filter(l => l.name === activeLocationFilter)
                                    .map((item, i) => (
                                        <AnimatedDestinationCard key={i} item={item} index={i} />
                                    ))}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );

    const renderPricingSection = () => (
        <View ref={pricingRef} style={styles.profilePricingSection}>
            <Text style={styles.profileSectionLabel}>Trip Planning Fees</Text>
            <View style={styles.pricingCardLarge}>
                <View style={styles.pricingHeaderRow}>
                    <Text style={styles.pricingItemTitle}>Standard Concierge</Text>
                    <Text style={styles.pricingValue}>₹15,000 <Text style={styles.pricePer}>/service</Text></Text>
                </View>
                <Text style={styles.pricingDesc}>Full itinerary planning, booking assistance, and 24/7 on-trip support for your dream honeymoon.</Text>
                <View style={styles.pricingFeaturesGrid}>
                    {['24/7 Support', 'Custom Itinerary', 'Visa Assistance', 'Best Rate Guarantee'].map((feat, idx) => (
                        <View key={idx} style={styles.pricingFeatureItem}>
                            <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                            <Text style={styles.pricingFeatureText}>{feat}</Text>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.viewProposalBtn}>
                    <Text style={styles.viewProposalText}>Refine My Journey</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAboutSection = () => (
        <View ref={aboutRef} style={styles.profileAboutSection}>
            <Text style={styles.profileSectionLabel}>About {displayVendor.name}</Text>
            <Text style={styles.aboutText}>
                We specialize in creating bespoke honeymoon experiences that blend luxury with adventure.
                Our team has personally vetted every destination to ensure your first journey together is nothing short of magical.
            </Text>
            <View style={styles.highlightsBadgeRow}>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="airplane" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>Global Access</Text>
                    <Text style={styles.hBadgeSub}>50+ Countries</Text>
                </View>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="heart" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>Couples Only</Text>
                    <Text style={styles.hBadgeSub}>Pure Romance</Text>
                </View>
                <View style={styles.highlightBadgeItem}>
                    <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
                    <Text style={styles.hBadgeTitle}>ATOL</Text>
                    <Text style={styles.hBadgeSub}>Protected</Text>
                </View>
            </View>
        </View>
    );

    const renderReviewsSection = () => (
        <View ref={reviewsRef} style={styles.profileReviewsSection}>
            <View style={styles.reviewsHeaderRow}>
                <View>
                    <Text style={styles.profileSectionLabel}>Couple Reviews</Text>
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
            {[1, 2, 3].map((rev, idx) => (
                <View key={idx} style={styles.reviewItemCard}>
                    <View style={styles.reviewUserHeader}>
                        <View style={[styles.userIconSmall, { backgroundColor: idx % 2 === 0 ? '#E3F2FD' : '#F3E5F5' }]}>
                            <Text style={[styles.userInitials, { color: idx % 2 === 0 ? '#1976D2' : '#7B1FA2' }]}>
                                {idx === 0 ? 'RS' : idx === 1 ? 'AK' : 'MP'}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.reviewUserName}>{idx === 0 ? 'Rahul & Sneha' : idx === 1 ? 'Ankit & Kavya' : 'Mehul & Priya'}</Text>
                            <Text style={styles.reviewDate}>{idx + 1} months ago • {idx === 0 ? 'Maldives' : idx === 1 ? 'Santorini' : 'Bali'} Trip</Text>
                        </View>
                        <View style={styles.itemRatingCompact}>
                            <Ionicons name="star" size={10} color={COLORS.secondary} />
                            <Text style={styles.itemRatingVal}>5.0</Text>
                        </View>
                    </View>
                    <Text style={styles.reviewContentText}>
                        {idx === 0 ? '"An absolutely flawless experience from start to finish. The overwater villa recommended by Luxe Escapes was paradise."' :
                            idx === 1 ? '"Everything was perfectly organized. The sunset dinner cruise in Santorini was the highlight of our trip."' :
                                '"Exceptional service! They handled everything from flights to private tours seamlessly. Highly recommend Coastal Charms!"'}
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
                                        Schedule a tour of {displayVendor?.name || 'Luxe Escapes'}
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
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                <View style={styles.profileHeader}>
                    <Image source={displayVendor.image} style={styles.coverImage} />
                    <LinearGradient colors={['rgba(0,0,0,0.5)', 'transparent']} style={styles.headerOverlay} />
                    <TouchableOpacity style={styles.closeBtnProfile} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>

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

                <View style={styles.stickyNavWrapper}>
                    <View style={styles.shortcutNavBar}>
                        {['Photos', 'Videos', 'Packages'].map((tab, idx) => (
                            <TouchableOpacity key={tab} style={{ width: tabWidth, alignItems: 'center' }} onPress={() => handleTabPress(tab, portfolioRef, idx)}>
                                <Text style={[styles.shortcutNavText, activeSection === tab && styles.shortcutNavTextActive]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                        <Animated.View style={[styles.tabUnderline, { width: tabWidth, left: 0, transform: [{ translateX: tabUnderlineTranslateX }] }]} />
                    </View>
                </View>

                <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                    {renderPortfolioSection()}
                    {renderPricingSection()}
                    {renderAboutSection()}
                    {renderReviewsSection()}
                </View>
            </Animated.ScrollView>

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
    profileHeader: { height: 280, width: '100%' },
    coverImage: { width: '100%', height: '100%' },
    headerOverlay: { ...StyleSheet.absoluteFillObject },
    closeBtnProfile: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },

    profileIdentityOverlay: { backgroundColor: '#FFF', marginTop: -50, marginHorizontal: 15, borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 10 },
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

    mainTypeFilterRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 20 },
    typeFilterBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 15, backgroundColor: '#F5F5F5', gap: 8, borderWeight: 1, borderColor: '#EEE' },
    typeFilterBtnActive: { backgroundColor: COLORS.primary, elevation: 5, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6 },
    typeFilterText: { fontFamily: 'Outfit_600SemiBold', fontSize: 14, color: '#666' },
    typeFilterTextActive: { color: '#FFF' },

    menuTabContainer: { paddingVertical: 10 },
    menuCategoryBlock: { marginBottom: 25 },
    menuCategoryTitle: { fontFamily: 'Outfit_700Bold', fontSize: 18, color: '#800000', marginBottom: 15, paddingLeft: 5 },
    menuItemsList: { gap: 15 },
    menuItemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, marginBottom: 15, elevation: 3, borderWeight: 1, borderColor: '#FFD700', overflow: 'hidden' },
    menuItemImage: { width: 100, height: 100 },
    menuItemInfo: { flex: 1, paddingHorizontal: 15, paddingVertical: 10 },
    menuItemName: { fontFamily: 'Outfit_700Bold', fontSize: 15, color: '#222', marginBottom: 4 },
    menuItemDesc: { fontFamily: 'Outfit_400Regular', fontSize: 12, color: '#666', lineHeight: 18 },

    profileSectionLabel: { fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#111', marginBottom: 20 },
    profileMediaSection: { marginBottom: 40 },
    subMenuContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 10, flexWrap: 'wrap' },
    subMenuTab: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#EEE', backgroundColor: '#FFF' },
    subMenuTabActive: { elevation: 2, borderColor: COLORS.primary },
    subMenuText: { fontFamily: 'Outfit_500Medium', fontSize: 12, color: '#666' },

    gridColumn: { flex: 1, gap: 15 },
    projectCard: { width: '100%', backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', borderWidth: 0.5, borderColor: '#EEE' },
    projectImage: { height: '100%', resizeMode: 'cover' },
    typeBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    typeBadgeText: { fontSize: 9, fontFamily: 'Outfit_700Bold', color: COLORS.primary },
    projectCardFooter: { padding: 12 },
    likesRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
    likesText: { fontSize: 11, fontFamily: 'Outfit_700Bold', color: '#666' },
    projectCardTitle: { fontSize: 13, fontFamily: 'Outfit_600SemiBold', color: '#222' },

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

    profileAboutSection: { marginBottom: 40 },
    aboutText: { fontFamily: 'Outfit_400Regular', fontSize: 15, color: '#555', lineHeight: 26, marginBottom: 25 },
    highlightsBadgeRow: { flexDirection: 'row', justifyContent: 'space-between' },
    highlightBadgeItem: { flex: 1, alignItems: 'center', backgroundColor: '#F9F9F9', paddingVertical: 15, borderRadius: 20, marginHorizontal: 5 },
    hBadgeTitle: { fontFamily: 'Outfit_700Bold', fontSize: 14, color: '#222', marginTop: 8 },
    hBadgeSub: { fontFamily: 'Outfit_400Regular', fontSize: 11, color: '#999' },

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

export default HoneymoonVendorDetails;
