import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import Card from '../../components/Card/Card';
import { colors } from '../../theme/colors';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.75;
const ITEM_HEIGHT = height * 0.5; // Restored to 0.5
const SPACING = 10;
const EMPTY_ITEM_SIZE = (width - ITEM_WIDTH) / 2;

const services = [
    {
        id: '1',
        title: 'Wedding Venue',
        subtitle: 'Heritage & Luxury',
        image: require('../../../assets/images/decor.jpg'),
        description: 'Experience royalty with our curated selection of heritage palaces and luxury banquet halls.',
        features: ['500-2000 Pax', 'Royal Stay'],
        icon: 'archway'
    },
    {
        id: '2',
        title: 'Photography',
        subtitle: 'Drone & Candid',
        image: require('../../../assets/images/photo.jpg'),
        description: 'Capture every emotion with our cinematic storytelling and expert drone shots.',
        features: ['4K Drone', 'Same Day Edit'],
        icon: 'camera'
    },
    {
        id: '3',
        title: 'Decoration',
        subtitle: 'Floral & Thematic',
        image: require('../../../assets/images/decor.jpg'),
        description: 'Transform your venue with bespoke floral arrangements and immersive themes.',
        features: ['Exotic Flowers', 'Custom Props'],
        icon: 'holly-berry'
    },
    {
        id: '4',
        title: 'Food & Catering',
        subtitle: 'Gourmet Feasts',
        image: require('../../../assets/images/Food.jpg'),
        description: 'Exquisite culinary experiences with multi-cuisine menus from top chefs.',
        features: ['Live Counters', 'Global Cuisine'],
        icon: 'utensils'
    },
    {
        id: '5',
        title: 'Gifts & Return',
        subtitle: 'Memorable Tokens',
        image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000&auto=format&fit=crop',
        description: 'Exclusive gift hampers and return favors to thank your guests.',
        features: ['Custom Packing', 'Eco-friendly'],
        icon: 'gift'
    },
    {
        id: '6',
        title: 'Entertainment',
        subtitle: 'Live & DJ',
        image: require('../../../assets/images/entertenment.jpg'),
        description: 'Electrifying performances, live bands, and DJs to keep the party alive.',
        features: ['Celebrity Artists', 'Live Band'],
        icon: 'music'
    },
    {
        id: '7',
        title: 'Makeup & Grooming',
        subtitle: 'Bridal & Groom',
        image: require('../../../assets/images/makeup.jpg'),
        description: 'Expert makeup artists to give you the perfect look for your big day.',
        features: ['HD Makeup', 'Trial Included'],
        icon: 'magic'
    },
    {
        id: '8',
        title: 'E-Invites',
        subtitle: 'Digital & Animated',
        image: require('../../../assets/images/invite.jpg'),
        description: 'Eco-friendly and animated digital invitations to impress your guests instantly.',
        features: ['Video Invites', 'RSVP Tracking'],
        icon: 'envelope-open-text'
    },
];

// Backdrop Component (Restored)
const Backdrop = ({ scrollX }) => {
    const { width, height } = useWindowDimensions();
    const ITEM_WIDTH = width * 0.75; // Must match main component

    return (
        <View style={{ position: 'absolute', width, height }}>
            {services.map((item, index) => {
                const inputRange = [
                    (index - 1) * ITEM_WIDTH,
                    index * ITEM_WIDTH,
                    (index + 1) * ITEM_WIDTH,
                ];

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.Image
                        key={index}
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={{
                            width: width,
                            height: height,
                            position: 'absolute',
                            opacity,
                        }}
                        blurRadius={20} // Strong blur for focus
                    />
                );
            })}
            {/* Dark overlay for contrast */}
            {/* Overlay Removed as per request */}
        </View>
    );
};

// CarouselItem moved to components/Card/Card.jsx

const EventServicesScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedService, setSelectedService] = useState(null);

    // Auto-scroll Carousel Logic
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (services.length > 0) {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= services.length) {
                    nextIndex = 0;
                }
                setCurrentIndex(nextIndex);
                flatListRef.current?.scrollToOffset({
                    offset: nextIndex * ITEM_WIDTH,
                    animated: true
                });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    // 2. Render Item moved to useCallback
    const renderItem = React.useCallback(({ item, index }) => {
        return (
            <Card
                item={item}
                index={index}
                scrollX={scrollX}
                itemWidth={ITEM_WIDTH}
                itemHeight={ITEM_HEIGHT}
                onPress={() => setSelectedService(item)}
            />
        );
    }, [ITEM_WIDTH, ITEM_HEIGHT]);

    const getItemLayout = (data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
    });

    const onMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={false} barStyle="light-content" />

            {/* Dynamic Background */}
            <Backdrop scrollX={scrollX} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wedding Services</Text>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={colors.haldi} style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Find a service..."
                        value={searchText}
                        onChangeText={setSearchText}
                        style={styles.searchInput}
                        placeholderTextColor={colors.haldi}
                    />
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', paddingTop: 80 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ITEM_WIDTH}
                    snapToAlignment="start"
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingHorizontal: EMPTY_ITEM_SIZE
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    getItemLayout={getItemLayout}
                    onMomentumScrollEnd={onMomentumScrollEnd}
                />
            </View>

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
        backgroundColor: colors.white, // White Background to remove red shadow
    },
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.kumkum, // Kumkum Header
        borderBottomWidth: 2,
        borderBottomColor: colors.haldi,
        elevation: 8,
        zIndex: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.haldi, // Haldi Title
        fontFamily: 'serif',
        textAlign: 'center',
        marginBottom: 15,
        textTransform: 'uppercase',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.kumkum, // Kumkum Search Bar
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 48,
        borderWidth: 1.5,
        borderColor: colors.haldi, // Haldi Border
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: colors.haldi, // Haldi Input Text
        fontWeight: '600',
    },
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
