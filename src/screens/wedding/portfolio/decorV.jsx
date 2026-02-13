import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
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

const { width, height } = Dimensions.get('window');

// --- DATA CONFIG ---
const STORY_CATEGORIES = [
    { id: 'haldi', label: 'Haldi', icon: '☀️', image: require('../../../../assets/DF images/Traditional Marigold.jpg') },
    { id: 'mehendi', label: 'Mehendi', icon: '🌿', image: require('../../../../assets/DF images/Floral Pastel.jpg') },
    { id: 'reception', label: 'Reception', icon: '✨', image: require('../../../../assets/DF images/Royal Heritage.jpg') },
    { id: 'mandap', label: 'Mandap', icon: '🛖', image: require('../../../../assets/DF images/Modern Minimal.jpg') },
    { id: 'entry', label: 'Entry Decor', icon: '🚪', image: require('../../../../assets/images/decor.jpg') },
];

const SIMILAR_VENDORS = [
    { id: '1', name: 'Floral Fantasy', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=400', rating: 4.8, category: 'Luxury' },
    { id: '2', name: 'Royal Decor', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400', rating: 4.7, category: 'Trending' },
    { id: '3', name: 'Elite Petals', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400', rating: 4.9, category: 'Premium' },
];

const DECOR_PHOTOS = [
    { id: '1', source: require('../../../../assets/DF images/Royal Heritage.jpg') },
    { id: '2', source: require('../../../../assets/DF images/Floral Pastel.jpg') },
    { id: '3', source: require('../../../../assets/DF images/Modern Minimal.jpg') },
    { id: '4', source: require('../../../../assets/DF images/Traditional Marigold.jpg') },
    { id: '5', source: require('../../../../assets/images/decor.jpg') },
];

const VENDOR_PLANS = [
    {
        id: '1',
        name: 'Classic Bloom',
        price: '₹25,000',
        features: ['Entrance Decor', 'Mandap Basics', 'Chair Ties'],
        icon: 'flower-outline',
        color: '#95afc0'
    },
    {
        id: '2',
        name: 'Royal Heritage',
        price: '₹75,000',
        features: ['Full Floral Mandap', 'Stage Lighting', 'Pathway Decor'],
        icon: 'diamond',
        color: '#eb4d4b'
    },
    {
        id: '3',
        name: 'Grand Signature',
        price: '₹1,50,000',
        features: ['Imported Florals', '3D Mockups', 'Theme Stylist'],
        icon: 'sparkles',
        color: '#f29502'
    }
];

const REVIEWS = [
    { id: '1', name: 'Ananya S.', review: 'Transformed our venue into a literal fairytale! The attention to detail was 10/10.', rating: 5, image: 'https://i.pravatar.cc/150?u=a1' },
    { id: '2', name: 'Rahul M.', review: 'Very professional team. They understood our "Royal" theme perfectly.', rating: 5, image: 'https://i.pravatar.cc/150?u=a2' },
];

const DecorPortfolio = ({ navigation, route }) => {
    const params = route.params || {};
    const vendor = params.vendor || {
        name: 'Rohan Mehta',
        type: 'Floral Artist',
        image: require('../../../../assets/images/photo.jpg'),
        rating: 4.9,
        reviews: 128,
        location: 'Mumbai, MH',
        experience: '8+ Years',
        title: 'Master Floral Designer',
        description: 'Luxury Floral Styling'
    };

    const [activeTab, setActiveTab] = useState('gallery'); // Keeping state just in case, but tabs removed
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Hero Carousel Auto-scroll
    const heroCarouselRef = useRef(null);
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (heroCarouselRef.current) {
                let nextIndex = heroIndex + 1;
                if (nextIndex >= DECOR_PHOTOS.length) {
                    nextIndex = 0;
                }
                setHeroIndex(nextIndex);
                heroCarouselRef.current.scrollTo({ x: nextIndex * width, animated: true });
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [heroIndex]);

    // Auto-scroll for suggested vendors
    const suggestedRef = useRef(null);
    useEffect(() => {
        let scrollVal = 0;
        const interval = setInterval(() => {
            if (suggestedRef.current) {
                scrollVal += 95;
                if (scrollVal > 95 * SIMILAR_VENDORS.length - width) scrollVal = 0;
                suggestedRef.current.scrollTo({ x: scrollVal, animated: true });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

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
                {DECOR_PHOTOS.map((photo, index) => (
                    <View key={index} style={{ width: width, height: 350 }}>
                        <Image source={photo.source} style={styles.heroImage} />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.paginationContainer}>
                {DECOR_PHOTOS.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === heroIndex && styles.paginationDotActive
                        ]}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    const renderProfileRow = () => (
        <View style={styles.profileSectionRow}>
            <View style={styles.profileHeaderRow}>
                <View style={styles.profileImageContainerStatic}>
                    <Image source={vendor.image} style={styles.profileImage} />
                </View>
                <View style={styles.profileInfoSide}>
                    <Text style={styles.vendorName}>{vendor.name}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={14} color="#666" />
                        <Text style={styles.locationText}>{vendor.location}</Text>
                    </View>
                    <Text style={styles.shortDescription}>{vendor.description || 'Premium Wedding Decor'}</Text>
                    <Text style={styles.vendorTitle}>{vendor.title}</Text>
                    <View style={styles.statsRow}>
                        <Ionicons name="star" size={14} color="#F29502" />
                        <Text style={styles.statText}>{vendor.rating} ({vendor.reviews} Reviews)</Text>
                    </View>
                </View>
            </View>

            {/* Suggested Vendors */}
            <View style={styles.suggestedSection}>
                <Text style={styles.sectionTitleSmall}>Suggested Decorators</Text>
                <ScrollView ref={suggestedRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestedScroll}>
                    {SIMILAR_VENDORS.map((v) => (
                        <TouchableOpacity key={v.id} style={styles.suggestedCard}>
                            <Image source={{ uri: v.image }} style={styles.suggestedImage} />
                            <Text style={styles.suggestedName} numberOfLines={1}>{v.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    const renderGallery = () => (
        <View style={styles.galleryGrid}>
            <Text style={styles.sectionTitle}>Portfolio Showcase</Text>
            {DECOR_PHOTOS.map((photo, index) => (
                <View key={index} style={[styles.galleryItem, index % 3 === 0 && styles.galleryLarge]}>
                    <Image source={photo.source} style={styles.galleryImage} />
                </View>
            ))}
        </View>
    );

    const renderBookingModal = () => (
        <Modal
            visible={showBookingModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBookingModal(false)}
        >
            <View style={styles.modalOverlay}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContent}
                >
                    <View style={styles.modalHeader}>
                        <View>
                            <Text style={styles.modalTitle}>Book a Visit</Text>
                            <Text style={styles.modalSubtitle}>Schedule a tour of {vendor.name}</Text>
                        </View>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setShowBookingModal(false)}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={styles.formScroll}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                                <TextInput placeholder="Enter your full name" style={styles.input} placeholderTextColor="#999" />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Mobile Number (OTP optional)</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                                <TextInput placeholder="Enter mobile number" style={styles.input} keyboardType="phone-pad" placeholderTextColor="#999" />
                            </View>
                        </View>

                        <View style={styles.inputGrid}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Event Type</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="list-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput placeholder="e.g. Wedding" style={styles.input} placeholderTextColor="#999" />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>City</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="business-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput placeholder="Enter city" style={styles.input} placeholderTextColor="#999" />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGrid}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Preferred Date</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput placeholder="DD/MM/YYYY" style={styles.input} placeholderTextColor="#999" />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Time Slot</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="time-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput placeholder="e.g. 2:00 PM" style={styles.input} placeholderTextColor="#999" />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.addNoteBtn}>
                            <Text style={styles.addNoteText}>Add a Note</Text>
                        </TouchableOpacity>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.backFormBtn} onPress={() => setShowBookingModal(false)}>
                                <Text style={styles.backFormBtnText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmBtn} onPress={() => setShowBookingModal(false)}>
                                <Text style={styles.confirmBtnText}>Confirm Visit</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {renderHeroCarousel()}
                <View style={styles.content}>
                    {renderProfileRow()}
                    {renderGallery()}

                    {/* End of page CTA Actions */}
                    <View style={styles.footerActions}>
                        <TouchableOpacity style={styles.contactBtnBottom}>
                            <Text style={styles.contactBtnText}>Contact Vendor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookBtnBottom} onPress={() => setShowBookingModal(true)}>
                            <Text style={styles.bookBtnText}>Book Consultation</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {renderBookingModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFF0' },
    heroCarouselContainer: { height: 350, width: width, backgroundColor: '#000' },
    heroImage: { width: width, height: 350, resizeMode: 'cover' },
    paginationContainer: { position: 'absolute', bottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 6 },
    paginationDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.4)' },
    paginationDotActive: { backgroundColor: '#FFF', width: 16 },
    backBtn: { position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 30, zIndex: 10 },
    content: { backgroundColor: '#FFFFF0', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -20, paddingHorizontal: 20, paddingTop: 30 },
    profileSectionRow: { marginBottom: 30 },
    profileHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    profileImageContainerStatic: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#FFF', overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    profileImage: { width: '100%', height: '100%' },
    profileInfoSide: { flex: 1, marginLeft: 15 },
    vendorName: { fontSize: 22, fontWeight: 'bold', color: '#CC0E0E' },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    locationText: { fontSize: 13, color: '#666' },
    shortDescription: { fontSize: 13, color: '#444', fontWeight: '500', marginTop: 2 },
    vendorTitle: { fontSize: 13, color: '#888', marginTop: 2, fontStyle: 'italic' },
    statsRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statText: { fontSize: 12, color: '#F29502', fontWeight: 'bold' },
    suggestedSection: { marginTop: 10 },
    sectionTitleSmall: { fontSize: 13, fontWeight: 'bold', color: '#CC0E0E', marginBottom: 10 },
    suggestedScroll: { gap: 15 },
    suggestedCard: { width: 80, height: 112, borderRadius: 12, backgroundColor: '#FFF', overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3 },
    suggestedImage: { width: 80, height: 80 },
    suggestedName: { fontSize: 10, color: '#333', textAlign: 'center', marginTop: 4, paddingHorizontal: 2 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
    galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
    galleryItem: { width: (width - 50) / 2, height: 150, borderRadius: 12, overflow: 'hidden' },
    galleryLarge: { width: width - 40, height: 200 },
    galleryImage: { width: '100%', height: '100%' },
    footerActions: { flexDirection: 'row', gap: 12, marginTop: 20, paddingBottom: 20 },
    contactBtnBottom: { flex: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CC0E0E', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    bookBtnBottom: { flex: 1, backgroundColor: '#CC0E0E', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
    bookBtnText: { color: '#FFF', fontWeight: 'bold' },

    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: height * 0.85, padding: 24 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
    modalTitle: { fontSize: 28, fontWeight: 'bold', color: '#CC0E0E' },
    modalSubtitle: { fontSize: 14, color: '#F29502', marginTop: 4 },
    closeBtn: { backgroundColor: '#F5F5F5', padding: 8, borderRadius: 20 },
    formScroll: { flex: 1 },
    inputGroup: { marginBottom: 15 },
    inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#CC0E0E', marginBottom: 8 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#F29502', borderRadius: 12, paddingHorizontal: 15, height: 50 },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, color: '#333', fontSize: 14 },
    inputGrid: { flexDirection: 'row', gap: 15 },
    addNoteBtn: { marginTop: 10, marginBottom: 25 },
    addNoteText: { color: '#CC0E0E', fontWeight: 'bold', fontSize: 14 },
    modalFooter: { flexDirection: 'row', gap: 15, paddingBottom: 30 },
    backFormBtn: { flex: 0.8, backgroundColor: '#F5F5F5', borderRadius: 12, height: 55, alignItems: 'center', justifyContent: 'center' },
    backFormBtnText: { color: '#666', fontWeight: 'bold', fontSize: 16 },
    confirmBtn: { flex: 1.2, backgroundColor: '#CC0E0E', borderRadius: 12, height: 55, alignItems: 'center', justifyContent: 'center' },
    confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default DecorPortfolio;
