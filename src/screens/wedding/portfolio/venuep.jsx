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
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Local Image Imports
const venue1 = require('../../../../assets/images/venue1.jpg');
const venue2 = require('../../../../assets/images/venue2.jpg');
const venue3 = require('../../../../assets/images/venue3.jpg');

const { width } = Dimensions.get('window');

// Mock data for similar vendors (Suggested)
const SIMILAR_VENDORS = [
    {
        id: '1',
        name: 'Royal Heritage',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&auto=format&fit=crop',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'Grand Bloom',
        image: 'https://images.unsplash.com/photo-1561026483-edab5b0eee37?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Elite Gardens',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=400&auto=format&fit=crop',
        rating: 4.9,
    },
    {
        id: '4',
        name: 'The Grandeur',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400&auto=format&fit=crop',
        rating: 4.6,
    },
    {
        id: '5',
        name: 'Sapphire Inn',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop',
        rating: 4.5,
    },
    {
        id: '6',
        name: 'Crystal Ballroom',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
    },
];

// Local assets for venue photos
const VENUE_PHOTOS = [
    { id: '1', source: venue1 },
    { id: '2', source: venue2 },
    { id: '3', source: venue3 },
    { id: '4', source: { uri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600' } },
    { id: '5', source: { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600' } },
    { id: '6', source: { uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600' } },
    { id: '7', source: { uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600' } },
];

const VENDOR_PLANS = [
    {
        id: '1',
        name: 'Pearl Plan',
        price: '₹25,000',
        features: ['Basic Decoration', 'Sound System', 'Standard Lighting'],
        icon: 'diamond-outline',
        color: '#95afc0'
    },
    {
        id: '2',
        name: 'Ruby Plan',
        price: '₹50,000',
        features: ['Premium Decoration', 'DJ System', 'Stage Lighting', 'Photography'],
        icon: 'diamond',
        color: '#eb4d4b'
    },
    {
        id: '3',
        name: 'Diamond Plan',
        price: '₹1,00,000',
        features: ['Luxury Decoration', 'Live Band', 'Cinematography', 'Catering Support'],
        icon: 'sparkles',
        color: '#f29502'
    }
];

const VenuePortfolio = ({ navigation, route }) => {
    // Default data if no params provided
    const params = route.params || {};
    const vendor = params.vendor || {
        name: 'Royal Orchid Palace',
        type: 'Venue',
        image: null,
        amenities: ['Outdoor', 'Alcohol'],
        rating: 4.8,
        reviews: 320,
        location: 'Pune, MH',
    };

    const [activeShowcaseTab, setActiveShowcaseTab] = useState('venue');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        mobile: '',
        date: '',
        timeSlot: '',
        eventType: '',
        city: '',
        note: ''
    });

    // Auto-scroll logic for similar vendors (Suggested)
    const suggestedVendorsRef = useRef(null);
    useEffect(() => {
        let scrollValue = 0;
        const intervalId = setInterval(() => {
            if (suggestedVendorsRef.current) {
                scrollValue += 95; // 80 card width + 15 gap
                if (scrollValue > 95 * SIMILAR_VENDORS.length - width) {
                    scrollValue = 0;
                }
                if (suggestedVendorsRef.current.scrollTo) {
                    suggestedVendorsRef.current.scrollTo({ x: scrollValue, animated: true });
                }
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    // --- ANIMATION STATES ---
    const tabTranslateX = useRef(new Animated.Value(0)).current;
    const heroImageScale = useRef(new Animated.Value(1)).current;
    const galleryFadeAnim = useRef(new Animated.Value(0)).current;

    const heroCarouselRef = useRef(null);
    const [heroIndex, setHeroIndex] = useState(0);

    // Auto-scroll logic for Hero Carousel
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (heroCarouselRef.current) {
                let nextIndex = heroIndex + 1;
                if (nextIndex >= VENUE_PHOTOS.length) {
                    nextIndex = 0;
                }
                setHeroIndex(nextIndex);
                if (heroCarouselRef.current.scrollTo) {
                    heroCarouselRef.current.scrollTo({ x: nextIndex * width, animated: true });
                }
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [heroIndex]);

    const startHeroZoom = () => {
        heroImageScale.setValue(1);
        Animated.timing(heroImageScale, {
            toValue: 1.1,
            duration: 4000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        startHeroZoom();
    }, [heroIndex]);

    const handleTabPress = (tab) => {
        setActiveShowcaseTab(tab);
        const toValue = tab === 'venue' ? 0 : 1;
        Animated.timing(tabTranslateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        galleryFadeAnim.setValue(0);
        Animated.timing(galleryFadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();
    }, [activeShowcaseTab]);

    const renderHeroCarousel = () => (
        <View style={styles.heroCarouselContainer}>
            <ScrollView
                ref={heroCarouselRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setHeroIndex(newIndex);
                }}
            >
                {VENUE_PHOTOS.map((photo, index) => (
                    <View key={index} style={{ width: width, height: 280, overflow: 'hidden' }}>
                        <Animated.Image
                            source={photo.source}
                            style={[
                                styles.heroImage,
                                index === heroIndex && { transform: [{ scale: heroImageScale }] }
                            ]}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.paginationContainer}>
                {VENUE_PHOTOS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === heroIndex && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.bookmarkButton}>
                <Ionicons name="bookmark-outline" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderSuggestedVendors = () => (
        <View style={styles.suggestedContainer}>
            <Text style={styles.suggestedTitle}>Suggested Vendors</Text>
            <ScrollView
                ref={suggestedVendorsRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestedScrollContent}
            >
                {SIMILAR_VENDORS.map((v) => (
                    <TouchableOpacity key={v.id} style={styles.suggestedCard}>
                        <Image source={{ uri: v.image }} style={styles.suggestedImage} />
                        <View style={styles.suggestedInfo}>
                            <Text style={styles.suggestedName} numberOfLines={1}>{v.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderProfileSection = () => (
        <View style={styles.profileSection}>
            <View style={styles.profileRow}>
                <View style={[styles.profileImageContainer, { zIndex: 100 }]}>
                    <Image
                        source={vendor.image ? vendor.image : { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=200' }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.profileInfoColumn}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="location-outline" size={12} color="#666" style={{ marginRight: 4 }} />
                        <Text style={styles.locationText} numberOfLines={1}>
                            Udaipur, Rajasthan
                        </Text>
                    </View>
                    <Text style={styles.descriptionTextHero} numberOfLines={2}>
                        Offering a royal experience with curated luxury events.
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#F29502" />
                            <Text style={styles.statText}>{vendor.rating} ({vendor.reviews})</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Suggested Vendors Carousel */}
            {renderSuggestedVendors()}
        </View>
    );

    const renderBookingModal = () => (
        <Modal
            visible={showBookingModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBookingModal(false)}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalOverlay}
            >
                <Pressable
                    style={styles.modalDismissArea}
                    onPress={() => setShowBookingModal(false)}
                />
                <View style={styles.bookingModalContent}>
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitle}>Book a Visit</Text>
                            <Text style={styles.modalSubtitle}>Schedule a tour of {vendor.name}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowBookingModal(false)}
                            style={styles.modalCloseButton}
                        >
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.modalForm}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={18} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#888"
                                    value={bookingForm.name}
                                    onChangeText={(val) => setBookingForm({ ...bookingForm, name: val })}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Mobile Number (OTP optional)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="call-outline" size={18} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter mobile number"
                                    placeholderTextColor="#888"
                                    keyboardType="phone-pad"
                                    value={bookingForm.mobile}
                                    onChangeText={(val) => setBookingForm({ ...bookingForm, mobile: val })}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.inputLabel}>Event Type</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="list-outline" size={18} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="e.g. Wedding"
                                        placeholderTextColor="#888"
                                        value={bookingForm.eventType}
                                        onChangeText={(val) => setBookingForm({ ...bookingForm, eventType: val })}
                                    />
                                </View>
                            </View>

                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>City</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="business-outline" size={18} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter city"
                                        placeholderTextColor="#888"
                                        value={bookingForm.city}
                                        onChangeText={(val) => setBookingForm({ ...bookingForm, city: val })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.inputLabel}>Preferred Date</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="calendar-outline" size={18} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="DD/MM/YYYY"
                                        placeholderTextColor="#888"
                                        value={bookingForm.date}
                                        onChangeText={(val) => setBookingForm({ ...bookingForm, date: val })}
                                    />
                                </View>
                            </View>

                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Time Slot</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="time-outline" size={18} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="e.g. 2:00 PM"
                                        placeholderTextColor="#888"
                                        value={bookingForm.timeSlot}
                                        onChangeText={(val) => setBookingForm({ ...bookingForm, timeSlot: val })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Add a Note</Text>
                            <View style={[styles.inputWrapper, styles.noteInputWrapper]}>
                                <Ionicons name="document-text-outline" size={18} color="#666" style={[styles.inputIcon, { alignSelf: 'flex-start', marginTop: 15 }]} />
                                <TextInput
                                    style={[styles.textInput, styles.noteInput]}
                                    placeholder="Any special requests or instructions?"
                                    placeholderTextColor="#888"
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={bookingForm.note}
                                    onChangeText={(val) => setBookingForm({ ...bookingForm, note: val })}
                                />
                            </View>
                        </View>

                        <Text style={styles.bookingNote}>
                            * Our relationship manager will call you to confirm the appointment.
                        </Text>
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowBookingModal(false)}
                        >
                            <Text style={styles.cancelButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmBookingBtn}
                            onPress={() => {
                                setShowBookingModal(false);
                            }}
                        >
                            <LinearGradient
                                colors={['#CC0E0E', '#E31E1E']}
                                style={styles.confirmGradient}
                            >
                                <Text style={styles.confirmButtonText}>Confirm Visit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    const renderGallery = () => {
        const galleryLabels = [
            "Wedding Decor", "Entrance Setup", "Evening Lighting",
            "Mandap View", "Stage Setup", "Buffet Area"
        ];

        const microBadges = [
            { icon: "🌸", text: "Floral Theme" }, { icon: "✨", text: "Premium Setup" },
            { icon: "🌙", text: "Night Event" }, { icon: "💍", text: "Bridal Suite" },
            { icon: "🎉", text: "Grand Entry" }, { icon: "🏰", text: "Heritage Look" }
        ];

        const tabWidth = 100;
        const translateX = tabTranslateX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, tabWidth + 12],
        });

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.showcaseHeaderRadial} />
                <View style={styles.blobShape} />

                <View style={styles.showcaseHeader}>
                    <Text style={styles.sectionTitle}>Venue Showcase</Text>

                    <View style={styles.showcaseTabsContainer}>
                        <Animated.View style={[
                            styles.slidingIndicator,
                            { transform: [{ translateX }] }
                        ]} />

                        <TouchableOpacity
                            style={styles.showcaseTabItemNew}
                            onPress={() => handleTabPress('venue')}
                        >
                            <Ionicons
                                name="image-outline"
                                size={14}
                                color={activeShowcaseTab === 'venue' ? '#FFF' : '#666'}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={[styles.showcaseTabTextNew, activeShowcaseTab === 'venue' && styles.activeShowcaseTabTextNew]}>
                                Venue
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.showcaseTabItemNew}
                            onPress={() => handleTabPress('plans')}
                        >
                            <Ionicons
                                name="pricetags-outline"
                                size={14}
                                color={activeShowcaseTab === 'plans' ? '#FFF' : '#666'}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={[styles.showcaseTabTextNew, activeShowcaseTab === 'plans' && styles.activeShowcaseTabTextNew]}>
                                Plans
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Animated.View style={[styles.galleryContainer, { opacity: galleryFadeAnim }]}>
                    {activeShowcaseTab === 'venue' ? (
                        <View style={styles.galleryGrid}>
                            <View style={styles.masonryColumn}>
                                {VENUE_PHOTOS.filter((_, i) => i % 2 === 0).map((photo, index) => {
                                    const originalIndex = index * 2;
                                    const height = 240;
                                    const badge = microBadges[originalIndex % microBadges.length];

                                    return (
                                        <View key={originalIndex} style={[styles.storyCardLuxury, { height }]}>
                                            <Image source={photo.source} style={styles.galleryImage} />
                                            <View style={styles.microBadge}>
                                                <Text style={styles.microBadgeText}>{badge.icon} {badge.text}</Text>
                                            </View>
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.85)']}
                                                style={styles.storyGradientLuxury}
                                            >
                                                <View style={styles.stylisticLine} />
                                                <Text style={styles.storyLabelLuxury}>{galleryLabels[originalIndex % galleryLabels.length]}</Text>
                                            </LinearGradient>
                                        </View>
                                    );
                                })}
                            </View>
                            <View style={styles.masonryColumn}>
                                {VENUE_PHOTOS.filter((_, i) => i % 2 !== 0).map((photo, index) => {
                                    const originalIndex = index * 2 + 1;
                                    const height = 240;
                                    const badge = microBadges[originalIndex % microBadges.length];
                                    return (
                                        <View key={originalIndex} style={[styles.storyCardLuxury, { height }]}>
                                            <Image source={photo.source} style={styles.galleryImage} />
                                            <View style={styles.microBadge}>
                                                <Text style={styles.microBadgeText}>{badge.icon} {badge.text}</Text>
                                            </View>
                                            <LinearGradient
                                                colors={['transparent', 'rgba(0,0,0,0.85)']}
                                                style={styles.storyGradientLuxury}
                                            >
                                                <View style={styles.stylisticLine} />
                                                <Text style={styles.storyLabelLuxury}>{galleryLabels[originalIndex % galleryLabels.length]}</Text>
                                            </LinearGradient>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.packagesScroll}
                            contentContainerStyle={styles.packagesScrollContent}
                        >
                            {VENDOR_PLANS.map((plan) => {
                                const isPremium = plan.id === '3'; // Diamond Plan is premium
                                return (
                                    <View
                                        key={plan.id}
                                        style={[
                                            styles.comparisonCard,
                                            isPremium && styles.premiumCardHighlight
                                        ]}
                                    >
                                        <Text style={styles.packageName}>{plan.name.split(' ')[0]}</Text>
                                        <Text style={styles.packageHeroPrice}>{plan.price}</Text>

                                        <View style={styles.packageDivider} />

                                        <View style={styles.packageHighlights}>
                                            {plan.features.map((f, i) => (
                                                <View key={i} style={styles.packageHighlightItem}>
                                                    <Ionicons name="checkmark-circle" size={14} color={isPremium ? '#FFD700' : plan.color} />
                                                    <Text style={styles.packageHighlightText} numberOfLines={1}>{f}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        <TouchableOpacity
                                            style={styles.viewDetailsBtn}
                                            onPress={() => setShowBookingModal(true)}
                                        >
                                            <Text style={styles.viewDetailsBtnText}>View Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    )}
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderHeroCarousel()}

                <View style={styles.mainContentWrapper}>
                    {renderProfileSection()}
                    {renderGallery()}

                    <View style={styles.footerActions}>
                        <TouchableOpacity style={styles.contactButtonOutline} onPress={() => { }}>
                            <Text style={styles.contactButtonTextOutline}>Contact Vendor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bookButtonPremium}
                            onPress={() => setShowBookingModal(true)}
                        >
                            <Text style={styles.bookButtonTextPremium}>Book a Visit</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {renderBookingModal()}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF0',
    },
    mainContentWrapper: {
        backgroundColor: '#FFFFF0',
        zIndex: 1,
        paddingTop: 10,
    },
    heroCarouselContainer: {
        height: 280,
        width: width,
    },
    heroImage: {
        width: width,
        height: 280,
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#FFF',
        width: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    bookmarkButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 10,
        borderRadius: 30,
        zIndex: 10,
    },
    profileSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        zIndex: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    profileImageContainer: {
        marginRight: 15,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#FFFFF0',
    },
    profileInfoColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    vendorName: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: '#CC0E0E',
        marginBottom: 2,
    },
    locationText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 13,
        color: '#CC0E0E',
    },
    descriptionTextHero: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#777',
        lineHeight: 16,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: '#F29502',
    },
    suggestedContainer: {
        marginTop: 20,
    },
    suggestedTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#CC0E0E',
        marginBottom: 10,
    },
    suggestedScrollContent: {
        gap: 15,
        paddingRight: 20,
    },
    suggestedCard: {
        width: 80,
        height: 112,
        borderRadius: 12,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#f29502',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    suggestedImage: {
        width: '100%',
        height: '100%',
    },
    suggestedInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
    suggestedName: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 10,
        color: '#FFF',
        textAlign: 'center',
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
        position: 'relative',
    },
    sectionTitle: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 20,
        color: '#CC0E0E',
        letterSpacing: 0.5,
    },
    showcaseHeader: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 15,
        gap: 10,
    },
    showcaseTabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        borderRadius: 30,
        padding: 4,
        position: 'relative',
        width: 220,
    },
    slidingIndicator: {
        position: 'absolute',
        top: 4,
        left: 4,
        width: 100,
        height: 34,
        borderRadius: 25,
        backgroundColor: '#CC0E0E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    showcaseTabItemNew: {
        width: 100,
        height: 34,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    showcaseTabTextNew: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        color: '#CC0E0E',
    },
    activeShowcaseTabTextNew: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
    },
    showcaseHeaderRadial: {
        position: 'absolute',
        top: -40,
        left: -20,
        width: width,
        height: 180,
        backgroundColor: 'rgba(212, 175, 55, 0.08)',
        borderRadius: width / 2,
        transform: [{ scaleX: 1.5 }],
        zIndex: -1,
    },
    blobShape: {
        position: 'absolute',
        top: -20,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(212, 175, 55, 0.05)',
        zIndex: -1,
    },
    galleryContainer: {
        marginTop: 5,
    },
    galleryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    masonryColumn: {
        width: (width - 50) / 2,
    },
    storyCardLuxury: {
        borderRadius: 20,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        marginBottom: 15,
        backgroundColor: '#EEE',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    microBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.8)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        zIndex: 10,
    },
    microBadgeText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 10,
        color: '#333',
    },
    storyGradientLuxury: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '45%',
        justifyContent: 'flex-end',
        padding: 15,
    },
    stylisticLine: {
        width: 30,
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginBottom: 8,
    },
    storyLabelLuxury: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 15,
        color: '#FFF',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginBottom: 5,
    },
    packagesScroll: {
        marginTop: 10,
        paddingBottom: 20,
    },
    packagesScrollContent: {
        paddingHorizontal: 20,
        gap: 15,
    },
    comparisonCard: {
        width: width * 0.65,
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        borderWidth: 2,
        borderColor: '#FFD700',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        minHeight: 320,
        justifyContent: 'space-between',
    },
    premiumCardHighlight: {
        borderColor: '#FFD700',
        transform: [{ scale: 1.02 }],
        elevation: 12,
        shadowColor: '#F29502',
        shadowOpacity: 0.2,
    },
    packageName: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    packageHeroPrice: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 32,
        color: '#CC0E0E',
        marginBottom: 15,
    },
    packageDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 20,
    },
    packageHighlights: {
        marginBottom: 20,
        flex: 1,
    },
    packageHighlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    packageHighlightText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#444',
        marginLeft: 10,
    },
    viewDetailsBtn: {
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 'auto',
        backgroundColor: '#CC0E0E',
    },
    viewDetailsBtnText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15,
        color: '#FFF',
    },
    footerActions: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    contactButtonOutline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 14,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#F29502',
    },
    contactButtonTextOutline: {
        color: '#F29502',
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    bookButtonPremium: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CC0E0E',
        paddingVertical: 14,
        borderRadius: 30,
        shadowColor: '#CC0E0E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    bookButtonTextPremium: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalDismissArea: {
        flex: 1,
    },
    bookingModalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        maxHeight: '85%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    modalTitle: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 24,
        color: '#CC0E0E',
        marginBottom: 4,
    },
    modalSubtitle: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: '#F29502',
    },
    modalCloseButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalForm: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#CC0E0E',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#F29502',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        height: 48,
        fontFamily: 'Outfit_400Regular',
        fontSize: 15,
        color: '#333',
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noteInputWrapper: {
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
    noteInput: {
        height: 100,
        paddingTop: 12,
    },
    bookingNote: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
    },
    modalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 15,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '#666',
    },
    confirmBookingBtn: {
        flex: 2,
        borderRadius: 15,
        overflow: 'hidden',
    },
    confirmGradient: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '#FFF',
    },
});

export default VenuePortfolio;