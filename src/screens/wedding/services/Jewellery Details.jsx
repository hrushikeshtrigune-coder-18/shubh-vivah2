import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#f29502',
    gold: '#D4AF37',
    ivory: '#FFFFF0',
    white: '#FFFFFF',
    textDark: '#333333',
    textLight: '#666666',
};

const PORTFOLIO_IMAGES = [
    { id: '1', uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', uri: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' },
    { id: '3', uri: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop' },
    { id: '4', uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' },
    { id: '5', uri: 'https://images.unsplash.com/photo-1588661845173-982163b2255e?q=80&w=1974&auto=format&fit=crop' },
    { id: '6', uri: 'https://images.unsplash.com/photo-1589139169229-87588019685a?q=80&w=1974&auto=format&fit=crop' },
    { id: '7', uri: 'https://images.unsplash.com/photo-1605100804763-ebea243bc612?q=80&w=2070&auto=format&fit=crop' },
    { id: '8', uri: 'https://images.unsplash.com/photo-1599643477877-53135311f9ae?q=80&w=2070&auto=format&fit=crop' }
];

const JewelleryDetails = ({ route, navigation }) => {
    const { item } = route.params || {};
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState('PORTFOLIO');

    const renderHeader = () => (
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            {/* <Text style={styles.headerTitle} numberOfLines={1}>{item?.name || 'Details'}</Text> */}
            <View style={{ width: 40 }} />
        </View>
    );

    const renderHero = () => (
        <View style={styles.heroContainer}>
            <Image source={item?.image} style={styles.heroImage} resizeMode="cover" />
            <View style={styles.heroOverlay} />
        </View>
    );

    const renderInfoCard = () => (
        <View style={styles.infoCard}>
            <View style={styles.infoRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.vendorName}>{item?.name}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={16} color="#666" />
                        <Text style={styles.locationText}>{item?.location || 'Pune, MH'}</Text>
                    </View>
                </View>
                <View style={styles.ratingBox}>
                    <Text style={styles.ratingValue}>{item?.ratingValue || '5.0'} ★</Text>
                    <Text style={styles.reviewCount}>{item?.reviews || '0'} reviews</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="call" size={18} color={COLORS.kumkum} />
                <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>

            <View style={styles.horizontalDivider} />

            <View style={styles.actionsRow}>
                <ActionItem icon="images-outline" label="60 Photos" />
                <ActionItem icon="heart-outline" label="Shortlist" />
                <ActionItem icon="create-outline" label="Write a Review" />
                <ActionItem icon="share-social-outline" label="Share" />
            </View>
        </View>
    );

    const ActionItem = ({ icon, label }) => (
        <TouchableOpacity style={styles.actionItem}>
            <Ionicons name={icon} size={22} color="#555" />
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' && <StatusBar barStyle="dark-content" backgroundColor="#fff" />}
            {renderHeader()}

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                {renderHero()}
                {renderInfoCard()}

                <View style={styles.tabsContainer}>
                    <TabButton title="PORTFOLIO (58)" active={activeTab === 'PORTFOLIO'} onPress={() => setActiveTab('PORTFOLIO')} />
                    <TabButton title="ALBUMS (2)" active={activeTab === 'ALBUMS'} onPress={() => setActiveTab('ALBUMS')} />
                    <TabButton title="VIDEOS (0)" active={activeTab === 'VIDEOS'} onPress={() => setActiveTab('VIDEOS')} />
                </View>

                {activeTab === 'PORTFOLIO' && (
                    <View style={styles.portfolioGrid}>
                        {/* Always show the main item image first if available */}
                        {item?.image && (
                            <TouchableOpacity style={styles.portfolioItem}>
                                <Image source={item.image} style={styles.portfolioImage} />
                            </TouchableOpacity>
                        )}
                        {PORTFOLIO_IMAGES.map((img, index) => (
                            <TouchableOpacity key={img.id} style={styles.portfolioItem}>
                                <Image source={{ uri: img.uri }} style={styles.portfolioImage} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <TouchableOpacity style={styles.viewMoreButton}>
                    <Text style={styles.viewMoreText}>View 46 more</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const TabButton = ({ title, active, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton, active && styles.activeTabButton]}>
        <Text style={[styles.tabText, active && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: '#fff',
        zIndex: 10
    },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    heroContainer: { height: 250, width: '100%', position: 'relative' },
    heroImage: { width: '100%', height: '100%' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.1)' },
    infoCard: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5
    },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    vendorName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    locationText: { color: '#666', marginLeft: 4, fontSize: 14 },
    ratingBox: {
        backgroundColor: '#5BA829',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    ratingValue: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    reviewCount: { color: '#fff', fontSize: 10 },
    contactButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    contactText: { color: COLORS.kumkum, fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
    horizontalDivider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
    actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
    actionItem: { alignItems: 'center', flex: 1 },
    actionLabel: { fontSize: 11, color: '#555', marginTop: 4 },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginTop: 10,
        backgroundColor: '#fff'
    },
    tabButton: { flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeTabButton: { borderBottomColor: COLORS.kumkum },
    tabText: { color: '#999', fontWeight: 'bold', fontSize: 13 },
    activeTabText: { color: COLORS.kumkum },
    portfolioGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, justifyContent: 'space-between' },
    portfolioItem: { width: (width - 30) / 2, height: 160, marginBottom: 10, borderRadius: 8, overflow: 'hidden' },
    portfolioImage: { width: '100%', height: '100%' },
    viewMoreButton: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.kumkum,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 30
    },
    viewMoreText: { color: COLORS.kumkum, fontWeight: '600' }
});

export default JewelleryDetails;