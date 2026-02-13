import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    Share,
    FlatList,
    Modal,
    TextInput
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

// --- Colors & Theme ---
const COLORS = {
    primary: '#D4AF37', // Gold
    secondary: '#800000', // Maroon
    background: '#FFFBE6', // Light Ivory
    white: '#FFFFFF',
    textDark: '#2D2D2D',
    textLight: '#757575',
    accent: '#E6C68C',
    success: '#4CAF50',
    overlay: 'rgba(0,0,0,0.5)',
    cardBg: '#FFFFFF',
};

// --- Mock Data ---
const FILTERS = ['All', 'Bridal', 'Party', 'HD Makeup', 'Airbrush'];

const MOCK_DATA = {
    artists: [
        {
            id: '1',
            name: 'Glamour by Gloria',
            location: 'Mumbai',
            rating: 4.9,
            reviews: 120,
            experience: '8 Years',
            specialization: 'Bridal & Airbrush',
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071',
            price: '₹15,000+',
            type: 'Airbrush'
        },
        {
            id: '2',
            name: 'Divine Touch',
            location: 'Delhi',
            rating: 4.8,
            reviews: 85,
            experience: '5 Years',
            specialization: 'HD & Party',
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935',
            price: '₹12,000+',
            type: 'HD Makeup'
        },
        {
            id: '3',
            name: 'Elegant Brushes',
            location: 'Bangalore',
            rating: 4.7,
            reviews: 200,
            experience: '10 Years',
            specialization: 'Traditional Bridal',
            image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069',
            price: '₹20,000+',
            type: 'Bridal'
        },
    ],
    packages: {
        Bridal: [
            { id: 'b1', title: 'Classic Bridal', price: '₹15,000', features: ['HD Base', '2 Looks', 'Touch-ups', 'Jewellery Setting'] },
            { id: 'b2', title: 'Royal Airbrush', price: '₹25,000', features: ['Airbrush Base', '3 Looks', 'Hair & Draping', 'Premium Lashes'] },
        ],
        Engagement: [
            { id: 'e1', title: 'Ring Ceremony Glow', price: '₹10,000', features: ['Light Makeup', '1 Look', 'Hairstyling'] },
        ],
        Party: [
            { id: 'p1', title: 'Party Glam', price: '₹5,000', features: ['Basic Makeup', 'Blow Dry'] },
        ]
    },
    gallery: [
        { id: 'g1', uri: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070', category: 'Traditional' },
        { id: 'g2', uri: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1887', category: 'Glam' },
        { id: 'g3', uri: 'https://images.unsplash.com/photo-1595959183082-7bce70752531?q=80&w=1887', category: 'Before-After' },
        { id: 'g4', uri: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070', category: 'Minimal' },
        { id: 'g5', uri: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935', category: 'South Indian' },
    ],
    reviews: [
        { id: 'r1', user: 'Ananya S.', rating: 5, text: 'Absolutely loved my look! Felt like a princess.', date: '2d ago', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887' },
        { id: 'r2', user: 'Priya M.', rating: 4, text: 'Great service, but started a bit late.', date: '1w ago', image: null },
    ],
    addons: [
        { id: 'a1', name: 'Hairstyling', price: '₹2,000', icon: 'cut' },
        { id: 'a2', name: 'Saree Draping', price: '₹1,000', icon: 'body' },
        { id: 'a3', name: 'Lashes Extension', price: '₹1,500', icon: 'eye' },
    ]
};

const MakupArtistsPage = () => {
    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [modalVisible, setModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Packages'); // Inner tab for bottom section

    // --- Render Helpers ---

    const renderHeader = () => (
        <View style={styles.header}>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2070' }}
                style={styles.headerImage}
            />
            <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.8)']} style={styles.headerOverlay} />

            <View style={styles.headerTopRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="heart-outline" size={24} color="#FFF" /></TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}><Ionicons name="share-social-outline" size={24} color="#FFF" /></TouchableOpacity>
                </View>
            </View>

            <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Premium Makeup Services</Text>
                <Text style={styles.headerSubtitle}>Bridal • Party • Editorial • HD • Airbrush</Text>
                <View style={styles.headerRatingContainer}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.headerRatingText}>4.9 (500+ Reviews)</Text>
                </View>
            </View>
        </View>
    );

    const renderFilters = () => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
            {FILTERS.map((filter, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.filterChip, selectedCategory === filter && styles.activeFilterChip]}
                    onPress={() => setSelectedCategory(filter)}
                >
                    <Text style={[styles.filterText, selectedCategory === filter && styles.activeFilterText]}>{filter}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderArtistCard = ({ item }) => (
        <TouchableOpacity style={styles.artistCard} onPress={() => { }}>
            <Image source={{ uri: item.image }} style={styles.artistImage} />
            <View style={styles.artistInfo}>
                <View style={styles.artistHeader}>
                    <Text style={styles.artistName}>{item.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Ionicons name="star" size={10} color="#FFF" />
                    </View>
                </View>
                <Text style={styles.artistLoc}>{item.location} • {item.experience} Exp.</Text>
                <Text style={styles.artistSpec}>{item.specialization}</Text>
                <View style={styles.artistFooter}>
                    <Text style={styles.artistPrice}>Starts {item.price}</Text>
                    <TouchableOpacity style={styles.bookBtnSmall} onPress={() => setModalVisible(true)}>
                        <Text style={styles.bookBtnTextSmall}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderPackageSection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Curated Packages</Text>
            {Object.entries(MOCK_DATA.packages).map(([category, packs]) => (
                <View key={category} style={{ marginTop: 15 }}>
                    <Text style={styles.subCategoryTitle}>{category}</Text>
                    {packs.map(pkg => (
                        <View key={pkg.id} style={styles.packageCard}>
                            <View style={styles.packageHeader}>
                                <Text style={styles.packageTitle}>{pkg.title}</Text>
                                <Text style={styles.packagePrice}>{pkg.price}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.featureList}>
                                {pkg.features.map((feat, i) => (
                                    <View key={i} style={styles.featureItem}>
                                        <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                                        <Text style={styles.featureText}>{feat}</Text>
                                    </View>
                                ))}
                            </View>
                            <TouchableOpacity style={styles.packageBtn} onPress={() => setModalVisible(true)}>
                                <Text style={styles.packageBtnText}>Consult Now</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );

    const renderGallerySection = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Transformation Gallery</Text>
            <View style={styles.galleryGrid}>
                {MOCK_DATA.gallery.map(img => (
                    <Image key={img.id} source={{ uri: img.uri }} style={styles.galleryImage} />
                ))}
            </View>
        </View>
    );

    const renderAddons = () => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Add-ons & Extras</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {MOCK_DATA.addons.map(addon => (
                    <View key={addon.id} style={styles.addonCard}>
                        <View style={styles.addonIconBox}>
                            <Ionicons name={addon.icon} size={24} color={COLORS.secondary} />
                        </View>
                        <Text style={styles.addonName}>{addon.name}</Text>
                        <Text style={styles.addonPrice}>{addon.price}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    const renderTrialSection = () => (
        <View style={styles.trialCard}>
            <View style={styles.trialContent}>
                <Text style={styles.trialTitle}>Not sure yet?</Text>
                <Text style={styles.trialDesc}>Book a trial session starting at just ₹2,000 and get it adjusted in your final booking.</Text>
                <TouchableOpacity style={styles.trialBtn} onPress={() => setModalVisible(true)}>
                    <Text style={styles.trialBtnText}>Book a Trial</Text>
                </TouchableOpacity>
            </View>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069' }}
                style={styles.trialImage}
            />
        </View>
    );

    const BookingModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Request Booking</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color={COLORS.textDark} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.modalSub}>Select your preferred date & time</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Event Date</Text>
                        <View style={styles.inputBox}>
                            <Ionicons name="calendar-outline" size={20} color={COLORS.textLight} />
                            <Text style={styles.inputText}>Select Date</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Service Type</Text>
                        <View style={styles.inputBox}>
                            <Ionicons name="brush-outline" size={20} color={COLORS.textLight} />
                            <Text style={styles.inputText}>Bridal Makeup</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Venue</Text>
                        <TextInput style={styles.textInput} placeholder="Enter venue location" />
                    </View>

                    <TouchableOpacity style={styles.confirmBtn} onPress={() => { setModalVisible(false); alert('Request Sent!'); }}>
                        <Text style={styles.confirmBtnText}>Send Request</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {renderHeader()}

                <View style={styles.bodyContainer}>
                    <Text style={styles.sectionHeader}>Top Artists</Text>
                    {renderFilters()}

                    <FlatList
                        data={MOCK_DATA.artists}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderArtistCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                    />

                    {renderTrialSection()}

                    {/* Tab Navigation for Details */}
                    <View style={styles.tabBar}>
                        {['Packages', 'Gallery', 'Reviews'].map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {activeTab === 'Packages' && (
                        <>
                            {renderPackageSection()}
                            {renderAddons()}
                        </>
                    )}

                    {activeTab === 'Gallery' && renderGallerySection()}

                    {activeTab === 'Reviews' && (
                        <View style={styles.sectionContainer}>
                            {MOCK_DATA.reviews.map(rev => (
                                <View key={rev.id} style={styles.reviewCard}>
                                    <View style={styles.reviewTop}>
                                        <Text style={styles.reviewName}>{rev.user}</Text>
                                        <View style={{ flexDirection: 'row' }}>{[...Array(rev.rating)].map((_, i) => <Ionicons key={i} name="star" size={14} color="#F29502" />)}</View>
                                    </View>
                                    <Text style={styles.reviewBody}>{rev.text}</Text>
                                    <Text style={styles.reviewDate}>{rev.date}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            <BookingModal />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { height: 320, width: '100%', position: 'relative' },
    headerImage: { width: '100%', height: '100%' },
    headerOverlay: { ...StyleSheet.absoluteFillObject },
    headerTopRow: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 },
    headerIcons: { flexDirection: 'row', gap: 15 },
    iconBtn: { padding: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20 },
    headerContent: { position: 'absolute', bottom: 30, left: 20, right: 20 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#FFF', fontFamily: 'serif', marginBottom: 5 },
    headerSubtitle: { fontSize: 14, color: '#EEE', marginBottom: 10 },
    headerRatingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    headerRatingText: { color: '#FFD700', marginLeft: 5, fontWeight: 'bold', fontSize: 12 },

    bodyContainer: { flex: 1, marginTop: -20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: COLORS.background, paddingTop: 25 },
    sectionHeader: { fontSize: 20, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 15, color: COLORS.textDark, fontFamily: 'serif' },

    filterContainer: { paddingHorizontal: 20, marginBottom: 20 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', marginRight: 10 },
    activeFilterChip: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
    filterText: { color: COLORS.textDark, fontSize: 13 },
    activeFilterText: { color: '#FFF', fontWeight: 'bold' },

    artistCard: { width: 280, backgroundColor: '#FFF', borderRadius: 15, marginRight: 15, elevation: 3, marginBottom: 10, overflow: 'hidden' },
    artistImage: { width: '100%', height: 160 },
    artistInfo: { padding: 12 },
    artistHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    artistName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
    ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.success, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    ratingText: { color: '#FFF', fontSize: 10, fontWeight: 'bold', marginRight: 2 },
    artistLoc: { fontSize: 12, color: COLORS.textLight, marginBottom: 2 },
    artistSpec: { fontSize: 12, color: COLORS.secondary, fontWeight: '600', marginBottom: 10 },
    artistFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    artistPrice: { fontSize: 14, fontWeight: 'bold', color: COLORS.textDark },
    bookBtnSmall: { backgroundColor: COLORS.secondary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
    bookBtnTextSmall: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

    trialCard: { marginHorizontal: 20, marginTop: 20, backgroundColor: '#FFF0F0', borderRadius: 15, flexDirection: 'row', padding: 0, overflow: 'hidden', borderWidth: 1, borderColor: '#FFD700' },
    trialContent: { flex: 1, padding: 20, justifyContent: 'center' },
    trialTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 5 },
    trialDesc: { fontSize: 12, color: COLORS.textLight, marginBottom: 15, lineHeight: 18 },
    trialBtn: { backgroundColor: COLORS.secondary, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, alignSelf: 'flex-start' },
    trialBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    trialImage: { width: 120, height: '100%' },

    tabBar: { flexDirection: 'row', marginHorizontal: 20, marginTop: 30, marginBottom: 20, borderRadius: 12, backgroundColor: '#FFF', elevation: 2, padding: 5 },
    tabItem: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    activeTabItem: { backgroundColor: COLORS.secondary },
    tabText: { color: COLORS.textLight, fontWeight: '600' },
    activeTabText: { color: '#FFF', fontWeight: 'bold' },

    sectionContainer: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 15, fontFamily: 'serif' },
    subCategoryTitle: { fontSize: 16, fontWeight: '600', color: COLORS.secondary, marginBottom: 10, marginTop: 5 },

    packageCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE', elevation: 2 },
    packageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    packageTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
    packagePrice: { fontSize: 16, fontWeight: 'bold', color: COLORS.secondary },
    divider: { height: 1, backgroundColor: '#EEE', marginBottom: 10 },
    featureList: { marginBottom: 15 },
    featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    featureText: { fontSize: 13, color: '#555', marginLeft: 8 },
    packageBtn: { backgroundColor: COLORS.textDark, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    packageBtnText: { color: '#E6C68C', fontWeight: 'bold', fontSize: 14, textTransform: 'uppercase' },

    galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    galleryImage: { width: (width - 50) / 2, height: 150, borderRadius: 10 },

    addonCard: { width: 120, backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginRight: 15, alignItems: 'center', elevation: 2, marginBottom: 10 },
    addonIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF8E1', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    addonName: { fontSize: 12, fontWeight: 'bold', color: COLORS.textDark, textAlign: 'center', marginBottom: 5 },
    addonPrice: { fontSize: 12, color: COLORS.secondary, fontWeight: '600' },

    reviewCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1 },
    reviewTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    reviewName: { fontWeight: 'bold', fontSize: 14 },
    reviewBody: { fontSize: 13, color: '#555', lineHeight: 20, marginBottom: 5 },
    reviewDate: { fontSize: 11, color: '#999' },

    modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 25, minHeight: 400 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
    modalSub: { fontSize: 13, color: COLORS.textLight, marginBottom: 20 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 12, fontWeight: '600', color: COLORS.textDark, marginBottom: 8, textTransform: 'uppercase' },
    inputBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 10, backgroundColor: '#F9F9F9' },
    inputText: { marginLeft: 10, color: '#333' },
    textInput: { padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 10, backgroundColor: '#F9F9F9' },
    confirmBtn: { backgroundColor: COLORS.secondary, paddingVertical: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
    confirmBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default MakupArtistsPage;
