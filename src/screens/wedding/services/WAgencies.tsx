import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
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
    saffron: '#FF9933',
    gold: '#D4AF37',
    maroon: '#800000',
    ivory: '#FFFFF0',
    textMain: '#800000',
    textLight: '#5D4037',
    white: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.15)',
    surface: '#FFF8E1',
};

const serviceCategories = [
    { id: '1', title: 'E-Invites', icon: require('../../../../assets1/images/invite.jpg'), screen: 'routes/einvite', params: {} },
    { id: '2', title: 'Event Management', icon: require('../../../../assets1/images/venue1.jpg'), screen: 'routes/DAngenciesScreen', params: {} }, // Leads to Agency Discovery
    { id: '3', title: 'Venues', icon: require('../../../../assets1/images/venue1.jpg'), screen: 'routes/wedding-venue', params: {} },
    { id: '4', title: 'Catering', icon: require('../../../../assets1/images/Food.jpg'), screen: 'routes/food', params: {} },
    { id: '5', title: 'Photography', icon: require('../../../../assets1/images/photo.jpg'), screen: 'routes/photography', params: {} },
    { id: '6', title: 'Decor', icon: require('../../../../assets1/images/decor.jpg'), screen: 'routes/DecorationFloral', params: {} },
    { id: '7', title: 'Jewellery', icon: require('../../../../assets1/images/Jewellery.jpg'), screen: 'routes/JewelleryScreen', params: {} },
    { id: '8', title: 'Mehandi', icon: require('../../../../assets1/images/mehandi.jpg'), screen: 'routes/MehandiScreen', params: {} },
    { id: '9', title: 'Makeup', icon: require('../../../../assets1/images/makeup.jpg'), screen: 'routes/MakeupScreen', params: {} },
    { id: '10', title: 'Honeymoon', icon: require('../../../../assets1/images/honeymoon planning.jpg'), screen: 'routes/honeymoon', params: {} },
];


const slideshowImages = [
    require('../../../../assets1/images/venue1.jpg'),
    require('../../../../assets1/images/photo.jpg'),
    require('../../../../assets1/images/Food.jpg'),
];

const locations = ['Pune', 'Mumbai', 'Goa', 'Udaipur', 'Jaipur'];

const WAgencies = (props: { navigation?: any }) => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { agency } = route.params || {};


    // Dynamic Data Fallbacks
    const agencyName = agency?.name || "Shubh Vivah Agencies";
    const agencyRating = agency?.rating || 4.8;
    const agencyLocation = agency?.location || "Pune, Maharashtra";
    const agencyImages = agency?.image ? [agency.image] : slideshowImages;
    const agencyDesc = agency?.description || "Redefining weddings with a decadal expertise in royal luxury management and coordination.";

    const scrollY = useRef(new Animated.Value(0)).current;

    // Slideshow logic
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Enquiry Modal State
    const [isEnquiryModalVisible, setIsEnquiryModalVisible] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactMobile, setContactMobile] = useState('');
    const [contactEventType, setContactEventType] = useState('');
    const [contactCity, setContactCity] = useState('');
    const [contactDate, setContactDate] = useState('');
    const [contactTime, setContactTime] = useState('');
    const [contactNote, setContactNote] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                setCurrentImageIndex((prev) => (prev + 1) % agencyImages.length);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }).start();
            });
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Entrance Animations
    const fadeAnims = useRef(serviceCategories.map(() => new Animated.Value(0))).current;
    const slideAnim = useRef(new Animated.Value(20)).current;
    const headerFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerFade, { toValue: 1, duration: 800, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
            Animated.stagger(80, fadeAnims.map(anim =>
                Animated.spring(anim, { toValue: 1, friction: 9, tension: 45, useNativeDriver: true })
            ))
        ]).start();
    }, []);

    const heroScale = scrollY.interpolate({
        inputRange: [-150, 0, 150],
        outputRange: [1.1, 1, 1],
        extrapolate: 'clamp',
    });

    const heroTranslate = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [0, -50],
        extrapolate: 'clamp',
    });

    const renderEnquiryModal = () => (
        <Modal
            visible={isEnquiryModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsEnquiryModalVisible(false)}
        >
            <View style={styles.contactModalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.contactModalContainer}
                >
                    <View style={styles.contactFormCard}>
                        <View style={styles.contactHeader}>
                            <View>
                                <Text style={styles.contactTitle}>Enquire Now</Text>
                                <Text style={styles.contactSubTitle}>
                                    Get in touch with {agencyName}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.closeContactBtn}
                                onPress={() => setIsEnquiryModalVisible(false)}
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

                            <Text style={styles.contactLabel}>Mobile Number</Text>
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
                                    onPress={() => setIsEnquiryModalVisible(false)}
                                >
                                    <Text style={styles.backContactText}>Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.confirmContactBtn}
                                    onPress={() => {
                                        alert('Enquiry Sent!');
                                        setIsEnquiryModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.confirmContactText}>Send Enquiry</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );

    const renderBentoBox = () => (
        <View style={styles.bentoGrid}>
            <View style={styles.bentoLeftColumn}>
                <Animated.View style={[styles.bentoCard, styles.visionCard, { opacity: fadeAnims[0], transform: [{ translateY: slideAnim }] }]}>
                    <BlurView intensity={25} tint="light" style={StyleSheet.absoluteFill} />
                    <LinearGradient colors={['rgba(255,255,255,0.8)', 'transparent']} style={StyleSheet.absoluteFill} />
                    <View style={styles.bentoIconBox}>
                        <Ionicons name="eye" size={20} color={COLORS.maroon} />
                    </View>
                    <Text style={styles.bentoTitle}>Vision</Text>
                    <Text style={styles.bentoText}>Timeless memories with royal perfection.</Text>
                </Animated.View>

                <Animated.View style={[styles.bentoCard, styles.locationCard, { opacity: fadeAnims[1], transform: [{ translateY: slideAnim }] }]}>
                    <BlurView intensity={15} tint="light" style={StyleSheet.absoluteFill} />
                    <View style={styles.bentoIconBox}>
                        <Ionicons name="earth" size={20} color={COLORS.maroon} />
                    </View>
                    <Text style={styles.bentoTitle}>Reach</Text>
                    <Text style={styles.bentoText}>5+ Luxury Destinations.</Text>
                </Animated.View>
            </View>

            <View style={styles.bentoRightColumn}>
                <Animated.View style={[styles.bentoCard, styles.uspCard, { opacity: fadeAnims[2], transform: [{ translateY: slideAnim }] }]}>
                    <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill} />
                    <LinearGradient colors={['rgba(212, 175, 55, 0.1)', 'transparent']} style={StyleSheet.absoluteFill} />
                    <View style={styles.bentoIconBox}>
                        <Ionicons name="diamond" size={20} color={COLORS.maroon} />
                    </View>
                    <Text style={styles.bentoTitle}>Signature USP</Text>
                    <Text style={styles.bentoText}>24/7 Royal Concierge & Logistics Expert.</Text>
                    <View style={styles.cardAccent} />
                </Animated.View>

                <Animated.View style={[styles.bentoCard, styles.styleCard, { opacity: fadeAnims[3], transform: [{ translateY: slideAnim }] }]}>
                    <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
                    <Text style={styles.bentoTitle}>Luxury Style</Text>
                    <View style={styles.tagGrid}>
                        {['Royal', 'Ethnic', 'Modern'].map(tag => (
                            <View key={tag} style={styles.miniTag}><Text style={styles.miniTagText}>{tag}</Text></View>
                        ))}
                    </View>
                </Animated.View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />


            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Hero Slideshow Section */}
                <Animated.View style={[styles.heroContainer, { transform: [{ scale: heroScale }, { translateY: heroTranslate }] }]}>
                    <View style={styles.slideshowWrapper}>
                        <Animated.Image
                            source={agencyImages[currentImageIndex]}
                            style={[styles.heroImageFull, { opacity: fadeAnim }]}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.95)']}
                            style={StyleSheet.absoluteFill}
                        />

                        <View style={styles.heroContent}>
                            <Animated.Text style={[styles.agencyName, { opacity: headerFade }]}>{agencyName}</Animated.Text>
                            <Animated.Text style={[styles.tagline, { opacity: headerFade }]}>“Curating Royal Experiences”</Animated.Text>

                            <View style={styles.mainStats}>
                                <BlurView intensity={25} tint="light" style={styles.statChip}>
                                    <Ionicons name="ribbon" size={14} color={COLORS.gold} />
                                    <Text style={styles.statChipText}>10+ Years</Text>
                                </BlurView>
                                <BlurView intensity={25} tint="light" style={styles.statChip}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.statChipText}>{agencyRating} Rating</Text>
                                </BlurView>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Back Button Container */}
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <BlurView intensity={25} tint="dark" style={styles.backBlur}>
                            <Ionicons name="arrow-back" size={20} color="#FFF" />
                        </BlurView>
                    </TouchableOpacity>
                </View>

                {/* Content Overlay - Flat Layout */}
                <View style={styles.contentOverlayFlat}>
                    {/* 3. Global Services Grid */}
                    <View style={styles.section}>
                        <View style={styles.modernHeader}>
                            <View style={styles.titleMarkerPremium}>
                                <View style={styles.titleCircle} />
                                <View style={styles.titleLineLong} />
                            </View>
                            <Text style={styles.sectionTitle}> Services</Text>
                        </View>

                        <View style={styles.grid}>
                            {serviceCategories.map((item, index) => (
                                <Animated.View
                                    key={item.id}
                                    style={[styles.gridItem, { opacity: fadeAnims[index], transform: [{ scale: fadeAnims[index] }] }]}
                                >
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.gridItemContent}
                                        onPress={() => item.screen && navigation.navigate(item.screen, item.params)}
                                    >
                                        <View style={styles.gridIconBox}>
                                            <Image source={item.icon} style={styles.gridIconImage} />
                                        </View>
                                        <Text style={styles.gridLabel} numberOfLines={1}>{item.title}</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </View>
                    </View>

                    {/* 4. Service Footprint */}
                    <View style={styles.section}>
                        <View style={styles.modernHeader}>
                            <View style={styles.titleMarkerPremium}>
                                <View style={styles.titleCircle} />
                                <View style={styles.titleLineLong} />
                            </View>
                            <Text style={styles.sectionTitle}>Our Footprint</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.footprintContent}>
                            {locations.map((loc, idx) => (
                                <View key={idx} style={styles.locationCircleOuter}>
                                    <BlurView intensity={25} tint="light" style={styles.locationCircle}>
                                        <LinearGradient
                                            colors={['rgba(255,255,255,0.9)', 'rgba(255,248,225,0.7)']}
                                            style={styles.locationCircleGradient}
                                        >
                                            <Ionicons name="location" size={16} color={COLORS.maroon} />
                                            <Text style={styles.locationTextCircular}>{loc}</Text>
                                        </LinearGradient>
                                    </BlurView>
                                </View>
                            ))}
                        </ScrollView>
                    </View>


                    {/* 3. Legacy - Bento Box Layout */}
                    <View style={styles.sectionHeaderWrap}>
                        <View style={styles.modernHeader}>
                            <View style={styles.titleMarkerPremium}>
                                <View style={styles.titleCircle} />
                                <View style={styles.titleLineLong} />
                            </View>
                            <Text style={styles.sectionTitle}>The Legacy</Text>
                        </View>
                        <Text style={styles.descriptionText}>
                            {agencyDesc}
                        </Text>
                    </View>

                    <View style={styles.legacySection}>
                        {renderBentoBox()}
                    </View>

                    {/* Enquire Button */}
                    <View style={styles.enquireSection}>
                        <TouchableOpacity
                            style={styles.enquireBtn}
                            activeOpacity={0.88}
                            onPress={() => setIsEnquiryModalVisible(true)}
                        >
                            <LinearGradient
                                colors={[COLORS.maroon, '#500000']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.enquireBtnGradient}
                            >
                                <Ionicons name="mail-outline" size={22} color={COLORS.gold} />
                                <Text style={styles.enquireBtnText}>Enquire Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>

            {renderEnquiryModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroContainer: {
        height: 320,
    },
    enquireSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    enquireBtn: {
        borderRadius: 30,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
    },
    enquireBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 12,
    },
    enquireBtnText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    // Contact Modal Styles
    contactModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
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
        shadowRadius: 15,
    },
    contactHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    contactTitle: { fontSize: 24, fontWeight: '800', color: COLORS.maroon },
    contactSubTitle: { fontSize: 14, fontWeight: '500', color: COLORS.gold, marginTop: 4 },
    closeContactBtn: { backgroundColor: '#F5F5F5', borderRadius: 25, padding: 8 },
    contactLabel: { fontWeight: '800', fontSize: 13, color: COLORS.maroon, marginTop: 12, marginBottom: 6 },
    contactInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FBFBFB',
        borderWidth: 1.5,
        borderColor: COLORS.gold,
        borderRadius: 16,
        paddingHorizontal: 15,
        height: 48,
        gap: 12,
    },
    contactInput: { flex: 1, fontSize: 15, color: '#333' },
    contactInputRow: { flexDirection: 'row', gap: 12 },
    contactActionRow: { flexDirection: 'row', gap: 15, marginTop: 25, marginBottom: 10 },
    backContactBtn: { flex: 1, height: 52, borderRadius: 16, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
    confirmContactBtn: { flex: 2, height: 52, borderRadius: 16, backgroundColor: COLORS.maroon, alignItems: 'center', justifyContent: 'center' },
    backContactText: { fontWeight: '700', fontSize: 16, color: '#666' },
    confirmContactText: { fontWeight: '700', fontSize: 16, color: '#FFF' },
    slideshowWrapper: {
        flex: 1,
        backgroundColor: '#000',
    },
    heroImageFull: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    heroContent: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 40,
    },
    agencyName: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFF',
        fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'serif',
    },
    tagline: {
        fontSize: 16,
        color: COLORS.gold,
        fontStyle: 'italic',
        fontWeight: '600',
        marginTop: 4,
        marginBottom: 15,
    },
    mainStats: {
        flexDirection: 'row',
        gap: 8,
    },
    statChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        gap: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    statChipText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: '700',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 50,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        overflow: 'hidden',
    },
    backBlur: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentOverlayFlat: {
        backgroundColor: COLORS.surface,
        paddingTop: 10,
        // Removed curves and negative margin as requested
    },
    section: {
        padding: 24,
        paddingTop: 5,
        paddingBottom: 5,
    },
    sectionHeaderWrap: {
        paddingHorizontal: 24,
        paddingTop: 10,
        marginBottom: 10,
    },
    legacySection: {
        paddingHorizontal: 24,
        marginBottom: 10,
    },
    modernHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 12,
    },
    titleMarkerPremium: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleCircle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.maroon,
        borderWidth: 2,
        borderColor: COLORS.gold,
    },
    titleLineLong: {
        width: 2,
        height: 22,
        backgroundColor: COLORS.gold,
        borderRadius: 1,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.maroon,
        fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'serif',
    },
    descriptionText: {
        fontSize: 14,
        color: COLORS.textLight,
        lineHeight: 20,
        fontWeight: '500',
    },
    bentoGrid: {
        flexDirection: 'row',
        height: 310,
        gap: 12,
    },
    bentoLeftColumn: {
        flex: 1.1,
        gap: 12,
    },
    bentoRightColumn: {
        flex: 1,
        gap: 12,
    },
    bentoCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 14,
        borderWidth: 1.5,
        borderColor: 'rgba(212, 175, 55, 0.15)',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    visionCard: {
        flex: 1.4,
    },
    locationCard: {
        flex: 1,
    },
    uspCard: {
        flex: 1.8,
    },
    styleCard: {
        flex: 1,
        justifyContent: 'center',
    },
    cardAccent: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
    },
    bentoIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(128,0,0,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    bentoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.maroon,
        marginBottom: 4,
    },
    bentoText: {
        fontSize: 11,
        color: COLORS.textLight,
        lineHeight: 16,
        fontWeight: '500',
    },
    tagGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    miniTag: {
        backgroundColor: 'rgba(212, 175, 55, 0.15)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    miniTagText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.maroon,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    gridItem: {
        width: '33.33%',
        padding: 6,
    },
    gridItemContent: {
        alignItems: 'center',
    },
    gridIconBox: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#FFF',
        elevation: 4,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        padding: 3,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.15)',
    },
    gridIconImage: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
    },
    gridLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.textMain,
        textAlign: 'center',
    },
    locationScroll: {
        marginHorizontal: -24,
        paddingHorizontal: 24,
    },
    locationCircleOuter: {
        marginRight: 15,
        alignItems: 'center',
    },
    locationCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        elevation: 4,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    locationCircleGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    locationTextCircular: {
        fontSize: 11,
        fontWeight: '900',
        color: COLORS.maroon,
        marginTop: 2,
    },
    footprintContent: {
        paddingHorizontal: 24,
        paddingBottom: 10,
    }
});

export default WAgencies;
