import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

const recentEvents = [
    { id: 'e1', title: 'Jaipur Palace', image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop' },
    { id: 'e2', title: 'Goa Beach', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop' },
    { id: 'e3', title: 'Mumbai Grand', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop' },
];

const services = [
    {
        id: '1',
        title: 'Wedding Venues',
        subtitle: 'Palaces & Banquets',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop',
        description: 'Heritage palaces and luxury banquet halls.',
        features: ['500-2000 Pax', 'Stay Included'],
        icon: 'archway'
    },
    {
        id: '2',
        title: 'Photography',
        subtitle: 'Cinematic & Candid',
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop',
        description: 'State-of-the-art drone and candid photography.',
        features: ['Drone', 'Cinematic Video'],
        icon: 'camera'
    },
    {
        id: '3',
        title: 'Decoration',
        subtitle: 'Floral & Thematic',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2000&auto=format&fit=crop',
        description: 'Bespoke floral arrangements and theme decor.',
        features: ['Fresh Flowers', 'Themes'],
        icon: 'holly-berry'
    },
    {
        id: '4',
        title: 'Catering',
        subtitle: 'Global Cuisine',
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop',
        description: 'Authentic regional and international cuisines.',
        features: ['Live Counters', 'Tasting'],
        icon: 'utensils'
    },
    {
        id: '5',
        title: 'Gifting',
        subtitle: 'Trousseau Packing',
        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1974&auto=format&fit=crop',
        description: 'Curated return gifts and elegant packing.',
        features: ['Eco-friendly', 'Custom'],
        icon: 'gift'
    },
    {
        id: '6',
        title: 'Entertainment',
        subtitle: 'DJs & Bands',
        image: 'https://images.unsplash.com/photo-1516054575922-f0b8ee4becf1?q=80&w=2074&auto=format&fit=crop',
        description: 'Celebrity singers, folk artists, and DJs.',
        features: ['Live Band', 'Celeb Entry'],
        icon: 'music'
    },
    {
        id: '7',
        title: 'Makeup',
        subtitle: 'Bridal Styling',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop',
        description: 'Premium bridal makeup and grooming.',
        features: ['Airbrush', 'Trials'],
        icon: 'magic'
    },
];

const EventServicesScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedService, setSelectedService] = useState(null);

    // Animation Values
    const trunkAnimation = useRef(new Animated.Value(0)).current;
    // We will animate branches/leaves sequentially
    const filteredServices = services.filter(s =>
        s.title.toLowerCase().includes(searchText.toLowerCase()) ||
        s.description.toLowerCase().includes(searchText.toLowerCase())
    );

    const branchAnimations = useRef(services.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Sequence: Trunk grows -> Then Branches extend -> Then Leaves pop

        // 1. Trunk Growth
        const trunkGrow = Animated.timing(trunkAnimation, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // Layout property
        });

        // 2. Branch & Leaf Animations (Staggered)
        const branchStagger = Animated.stagger(150, branchAnimations.map(anim =>
            Animated.spring(anim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: false, // For width/layout
            })
        ));

        Animated.sequence([
            trunkGrow,
            branchStagger
        ]).start();

    }, []);

    const trunkHeight = trunkAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    const renderLeafNode = (item, index) => {
        const isLeft = index % 2 === 0;

        // Animation for specific node
        // Note: We map animations to original 'services' array index
        const animIndex = services.findIndex(s => s.id === item.id);
        const animValue = branchAnimations[animIndex] || new Animated.Value(1);

        // Branch Growth (Width)
        const branchWidth = animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 50] // Max width of branch connection
        });

        // Leaf Appearance (Scale & Rotate)
        const leafScale = animValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1.1, 1] // Pop effect
        });

        // Slight translation for 'blooming' effect
        const leafTranslateY = animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0]
        });

        return (
            <View key={item.id} style={styles.treeNodeContainer}>
                {/* Central Node Dot on Trunk */}
                <Animated.View style={[
                    styles.nodeDot,
                    { transform: [{ scale: animValue }] }
                ]} />

                {/* Growing Branch Line */}
                {/* We use a container that aligns left or right, and animate its width */}
                <View style={[
                    styles.branchContainer,
                    isLeft ? { right: '50%', alignItems: 'flex-end' } : { left: '50%', alignItems: 'flex-start' }
                ]}>
                    <Animated.View style={[
                        styles.branchLine,
                        isLeft ? styles.branchLeftCurve : styles.branchRightCurve,
                        { width: branchWidth, opacity: animValue }
                    ]} />
                </View>

                {/* Leaf Card */}
                <Animated.View
                    style={[
                        styles.leafWrapper,
                        isLeft ? { right: '50%', marginRight: 45 } : { left: '50%', marginLeft: 45 },
                        {
                            transform: [
                                { scale: leafScale },
                                { translateY: leafTranslateY }
                            ]
                        }
                    ]}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.leafCard, isLeft ? styles.leafShapeLeft : styles.leafShapeRight]}
                        onPress={() => setSelectedService(item)}
                    >
                        <LinearGradient
                            colors={['#FFF', '#FFF8E1']}
                            style={styles.leafGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={[styles.leafContentRow, isLeft ? { flexDirection: 'row-reverse' } : {}]}>
                                <View style={styles.leafImageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.leafImage} />
                                </View>
                                <View style={[styles.leafTextContainer, isLeft ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
                                    <Text style={styles.leafTitle}>{item.title}</Text>
                                    <Text style={styles.leafSubtitle}>{item.subtitle}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle="dark-content" />

            {/* Search Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tree of Services</Text>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color={colors.textLight} />
                    <TextInput
                        placeholder="Find a service..."
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.treeContainer}>
                    {/* Trunk */}
                    <View style={styles.trunkWrapper}>
                        <Animated.View style={[styles.trunkLine, { height: trunkHeight }]} />
                    </View>

                    {/* Top Sprout Icon */}
                    <Animated.View style={{ alignItems: 'center', marginBottom: 10, opacity: trunkAnimation }}>
                        <FontAwesome5 name="seedling" size={24} color={colors.success} />
                    </Animated.View>

                    {/* Render Nodes */}
                    {filteredServices.map((item, index) => renderLeafNode(item, index))}

                    {/* Bottom Roots */}
                    <Animated.View style={{ alignItems: 'center', marginTop: 10, opacity: trunkAnimation }}>
                        <MaterialCommunityIcons name="tree" size={32} color={colors.darkHaldi} />
                    </Animated.View>
                </View>

                {/* Previous Events */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Previous Memories</Text>
                    <View style={styles.sectionLine} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsScroll}>
                    {recentEvents.map(item => (
                        <View key={item.id} style={styles.eventCardSmall}>
                            <Image source={{ uri: item.image }} style={styles.eventImageSmall} />
                            <View style={styles.eventOverlay}>
                                <Text style={styles.eventNameSmall}>{item.title}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </ScrollView>

            {/* Modal Popup */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={selectedService !== null}
                onRequestClose={() => setSelectedService(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        {selectedService && (
                            <View style={{ flex: 1 }}>
                                <Image source={{ uri: selectedService.image }} style={styles.modalImage} />
                                <TouchableOpacity
                                    style={styles.closeBtn}
                                    onPress={() => setSelectedService(null)}
                                >
                                    <Ionicons name="close" size={24} color={'#fff'} />
                                </TouchableOpacity>

                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>{selectedService.title}</Text>
                                    <Text style={styles.modalSub}>{selectedService.subtitle}</Text>
                                    <View style={styles.divider} />

                                    <Text style={styles.modalDesc}>{selectedService.description}</Text>

                                    <View style={styles.modalFeatures}>
                                        {selectedService.features.map((feature, idx) => (
                                            <View key={idx} style={styles.modalBadge}>
                                                <Text style={styles.modalBadgeText}>{feature}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <TouchableOpacity
                                        style={styles.modalCta}
                                        onPress={() => {
                                            const s = selectedService;
                                            setSelectedService(null);
                                            navigation.navigate('VendorListScreen', { serviceName: s.title, serviceId: s.id });
                                        }}
                                    >
                                        <Text style={styles.modalCtaText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFEF7',
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#F0E0B0',
        elevation: 3,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.kumkum,
        fontFamily: 'serif',
        textAlign: 'center',
        marginBottom: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 15,
        paddingHorizontal: 12,
        height: 42,
        borderWidth: 1,
        borderColor: colors.haldi,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: colors.text,
    },
    scrollContent: {
        paddingBottom: 50,
        paddingTop: 20,
    },
    treeContainer: {
        paddingVertical: 10,
        position: 'relative',
        minHeight: 600,
    },
    trunkWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        marginLeft: -2,
        width: 4,
        zIndex: 0,
        alignItems: 'center',
    },
    trunkLine: {
        width: 4,
        backgroundColor: '#8B4513', // Brown trunk
        borderRadius: 2,
    },
    treeNodeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        position: 'relative',
        marginVertical: 4,
    },
    nodeDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#2E7D32', // Green leaf node
        borderWidth: 2,
        borderColor: '#FFF',
        zIndex: 10,
        position: 'absolute',
        left: '50%',
        marginLeft: -7,
    },
    branchContainer: {
        position: 'absolute',
        top: '50%',
        marginTop: -2,
        height: 4,
        width: 60, // Max branch width
        justifyContent: 'center',
    },
    branchLine: {
        height: 3,
        backgroundColor: '#8B4513',
        borderRadius: 2,
    },
    branchLeftCurve: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    branchRightCurve: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },

    leafWrapper: {
        position: 'absolute',
        width: width * 0.42,
        zIndex: 5,
    },
    leafCard: {
        height: 85,
        backgroundColor: colors.white,
        elevation: 4,
        shadowColor: '#2E7D32',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    leafShapeLeft: {
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
    },
    leafShapeRight: {
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    leafGradient: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
    },
    leafContentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leafImageContainer: {
        padding: 2,
        backgroundColor: '#FFF',
        borderRadius: 25,
        elevation: 2,
    },
    leafImage: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    leafTextContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    leafTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#388E3C', // Green Title
    },
    leafSubtitle: {
        fontSize: 10,
        color: colors.text,
    },

    // Events
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8B4513',
        marginRight: 10,
        fontFamily: 'serif',
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F0E0B0',
    },
    eventsScroll: {
        paddingLeft: 20,
        paddingBottom: 20,
    },
    eventCardSmall: {
        width: 150,
        height: 100,
        marginRight: 15,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
    },
    eventImageSmall: {
        width: '100%',
        height: '100%',
    },
    eventOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 6,
    },
    eventNameSmall: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalCard: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 20,
    },
    modalImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    closeBtn: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 5,
    },
    modalContent: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2E7D32',
        fontFamily: 'serif',
    },
    modalSub: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginBottom: 10,
    },
    modalDesc: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 20,
    },
    modalFeatures: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    modalBadge: {
        backgroundColor: '#E8F5E9',
        borderWidth: 1,
        borderColor: '#C8E6C9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    modalBadgeText: {
        fontSize: 12,
        color: '#2E7D32',
        fontWeight: '600',
    },
    modalCta: {
        marginTop: 10,
        backgroundColor: '#2E7D32',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalCtaText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EventServicesScreen;
