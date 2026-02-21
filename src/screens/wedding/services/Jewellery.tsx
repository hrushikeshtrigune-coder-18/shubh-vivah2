import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    LayoutAnimation,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const { width, height } = Dimensions.get('window');

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

interface VideoHeroProps {
    insets: { top: number; bottom: number; left: number; right: number };
    onSearchPress: () => void;
    navigation: any;
    searchQuery: string;
    setSearchQuery: (text: string) => void;
    selectedLocation: string;
    onLocationPress: () => void;
}

// Isolated Hero Component for DOM Stability on Web
const VideoHero = memo(({ insets, onSearchPress, navigation, searchQuery, setSearchQuery, selectedLocation, onLocationPress }: VideoHeroProps) => {

    const videoSource = require('../../../../assets/videos/jewelaryV (2).mp4');
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    return (
        <View style={styles.heroWrapper}>
            <View style={styles.heroContainer}>
                <View style={StyleSheet.absoluteFill}>
                    <VideoView
                        style={styles.heroVideo}
                        player={player}
                        nativeControls={false}
                        contentFit="cover"
                    />
                </View>
                <View style={styles.heroOverlay} />

                <View style={[styles.headerIconsRow, { top: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnWrapper}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.heroContent}>
                    <Text style={styles.heroHeadline}>We Don't Just Sell Jewellery — {"\n"}We Create Legacies✨</Text>
                    <Text style={styles.heroSubtext}>Traditional • Modern • Destination Experiences</Text>

                    <TouchableOpacity style={styles.heroCTA} onPress={onSearchPress}>
                        <Ionicons name="sparkles" size={20} color="#fff" style={{ marginRight: 10 }} />
                        <Text style={styles.heroCTAText}>Explore Collections</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.locationButton} onPress={onLocationPress}>
                    <Ionicons name="location-sharp" size={20} color={COLORS.kumkum} />
                    <Text style={styles.locationText}>{selectedLocation || 'Mumbai'}</Text>
                    <Ionicons name="chevron-down" size={16} color={COLORS.gold} />
                </TouchableOpacity>
                <View style={styles.searchDivider} />
                <TextInput
                    placeholder="Search venues, areas..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
        </View>
    );
});

const jewelleryData = [
    { id: '1', name: 'Royal Kundan Set', location: 'Jaipur, RJ', locality: 'Pimpri Chinchwad', rating: '4.8', ratingValue: 4.8, reviews: 45, guests: 'Bridal Set, Gemstone', type: 'Gold, Kundan', wmgAward: true, price: '₹ 1.5L', image: require('../../../../assets/EventMimg/Jewellery folder/bridalJewelary.jpg.jpeg'), category: 'Jewellery', likes: '1.2k', description: 'Handcrafted Kundan set with precious stones, perfect for your big day.' },
    { id: '12', name: 'Diamond Choker', location: 'Mumbai, MH', locality: 'Chinchwad', rating: '4.9', ratingValue: 4.9, reviews: 120, guests: 'Necklace', type: 'Diamond', wmgAward: true, price: '₹ 2.25L', image: require('../../../../assets/EventMimg/Jewellery folder/Djewellery.jpg.jpeg'), category: 'Jewellery', likes: '2.5k', description: 'Exquisite diamond choker with solitary emerald center piece.' },
    { id: '3', name: 'Temple Gold Set', location: 'Chennai, TN', locality: 'Pimpri', rating: '4.7', ratingValue: 4.7, reviews: 25, guests: 'Traditional', type: 'Gold', wmgAward: false, price: '₹ 3.0L', image: require('../../../../assets/EventMimg/Jewellery folder/jewelary.jpg.jpeg'), category: 'Jewellery', likes: '850', description: 'Traditional Temple jewellery with intricate god and goddess motifs.' },
    { id: '4', name: 'Polki Earrings', location: 'Hyderabad, TS', locality: 'Kothrud', rating: '4.6', ratingValue: 4.6, reviews: 8, guests: 'Earrings', type: 'Artificial', wmgAward: false, price: '₹ 75k', image: require('../../../../assets/EventMimg/Jewellery folder/jewelry4.jpg.jpeg'), category: 'Accessories', likes: '450', description: 'Statement Polki earrings to add a touch of royalty to your look.' },
    { id: '15', name: 'Antique Bangles', location: 'Kolkata, WB', locality: 'Alephata', rating: '4.8', ratingValue: 4.8, reviews: 60, guests: 'Bangles', type: 'Gold', wmgAward: true, price: '₹ 1.2L', image: require('../../../../assets/EventMimg/Jewellery folder/RING 3.jpeg'), category: 'Jewellery', likes: '1.8k', description: 'Antique gold bangles with intricate filigree work.' },
    { id: '6', name: 'Floral Hathphool', location: 'Delhi, DL', locality: 'Ashok Nagar', rating: '4.5', ratingValue: 4.5, reviews: 12, guests: 'Floral', type: 'Flower Jewellery', wmgAward: false, price: '₹ 15k', image: require('../../../../assets/EventMimg/Jewellery folder/flowerlJewelary.jpg.jpeg'), category: 'Flower Jewellery', likes: '320', description: 'Fresh floral hathphool for Haldi and Mehendi ceremonies.' },
    { id: '7', name: 'Rent: Kundan Set', location: 'Pune, MH', locality: 'Pimpri Chinchwad', rating: '4.2', ratingValue: 4.2, reviews: 35, guests: 'Rental, Gemstone', type: 'Bridal Jewellery on Rent', wmgAward: false, price: '₹ 25k', image: require('../../../../assets/EventMimg/Jewellery folder/jewelry1.jpg.jpeg'), category: 'Bridal Jewellery on Rent', likes: '210', description: 'Premium Kundan bridal set available for rent at affordable rates.' },
    { id: '8', name: 'Ruby Gemstone Ring', location: 'Mumbai, MH', locality: 'Kothrud', rating: '4.9', ratingValue: 4.9, reviews: 50, guests: 'Gemstone', type: 'Gold, Diamond', wmgAward: true, price: '₹ 85k', image: require('../../../../assets/EventMimg/Jewellery folder/RING4.jpg.jpeg'), category: 'Jewellery', likes: '980', description: 'Stunning ruby gemstone ring surrounded by diamonds.' },
    { id: '9', name: 'Emerald Necklace', location: 'Delhi, DL', locality: 'Ashok Nagar', rating: '4.7', ratingValue: 4.7, reviews: 22, guests: 'Necklace, Gemstone', type: 'Gold', wmgAward: false, price: '₹ 1.8L', image: require('../../../../assets/EventMimg/Jewellery folder/Djewellery1.jpg.jpeg'), category: 'Jewellery', likes: '650', description: 'Elegant emerald necklace set in 18k gold.' },
    { id: '10', name: 'Pearl Drop Earrings', location: 'Jaipur, RJ', locality: 'Chinchwad', rating: '4.5', ratingValue: 4.5, reviews: 18, guests: 'Earrings', type: 'Artificial', wmgAward: false, price: '₹ 12k', image: require('../../../../assets/EventMimg/Jewellery folder/accessories.jpg.jpeg'), category: 'Accessories', likes: '150', description: 'Classic pearl drop earrings suitable for any occasion.' },
    { id: '11', name: 'Diamond Bangle Set', location: 'Surat, GJ', locality: 'Pimpri', rating: '4.8', ratingValue: 4.8, reviews: 42, guests: 'Bangles, Diamond', type: 'Diamond', wmgAward: true, price: '₹ 3.5L', image: require('../../../../assets/EventMimg/Jewellery folder/Djewellery2.jpg.jpeg'), category: 'Jewellery', likes: '3.1k', description: 'Luxurious diamond bangle set with intricate detailing.' },
];

const DETAILED_FILTERS = [
    { id: 'Locality', name: 'Locality', options: ['Pimpri Chinchwad', 'Chinchwad', 'Pimpri', 'Kothrud', 'Alephata', 'Ashok Nagar'] },
    { id: 'Type', name: 'Type', options: ['Gold', 'Diamond', 'Artificial', 'Flower Jewellery', 'Bridal Jewellery on Rent'] },
    { id: 'WMG Award', name: 'WMG Award', options: ['Users\' Choice Awards Winner'] },
    { id: 'Review count', name: 'Review count', options: ['<5 reviews', '5+ reviews', '15+ reviews', '30+ reviews'] },
    { id: 'Rating', name: 'Rating', options: ['All Ratings', 'Rated <4', 'Rated 4+', 'Rated 4.5+', 'Rated 4.8+'] }
];

const OUR_VENDORS = [
    {
        id: '1',
        name: 'Tanishq Jewellers',
        location: 'Pimpri Chinchwad, Pune',
        rating: '4.9',
        image: require('../../../../assets/EventMimg/Jewellery folder/bridalJewelary.jpg.jpeg'),
        isLuxury: true,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/jewelry1.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/jewelry4.jpg.jpeg')
        ]
    },
    {
        id: '2',
        name: 'Kalyan Jewellers',
        location: 'Kothrud, Pune',
        rating: '4.8',
        image: require('../../../../assets/EventMimg/Jewellery folder/jewelary.jpg.jpeg'),
        isLuxury: true,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/jewelry4.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING 3.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING1.jpg.jpeg')
        ]
    },
    {
        id: '3',
        name: 'Malabar Gold & Diamonds',
        location: 'Ashok Nagar, Pune',
        rating: '4.7',
        image: require('../../../../assets/EventMimg/Jewellery folder/Djewellery.jpg.jpeg'),
        isLuxury: false,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/Djewellery1.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/Djewellery2.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING2.jpg.jpeg')
        ]
    },
    {
        id: '4',
        name: 'PNG Jewellers',
        location: 'Laxmi Road, Pune',
        rating: '4.8',
        image: require('../../../../assets/EventMimg/Jewellery folder/jewelry1.jpg.jpeg'),
        isLuxury: true,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/accessories.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING4.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/flowerlJewelary.jpg.jpeg')
        ]
    },
    {
        id: '5',
        name: 'Ranka Jewellers',
        location: 'Hadapsar, Pune',
        rating: '4.6',
        image: require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'),
        isLuxury: false,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/jewelry3.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/jewelry4.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING 3.jpeg')
        ]
    },
    {
        id: '6',
        name: 'BlueStone Jewellery',
        location: 'Viman Nagar, Pune',
        rating: '4.5',
        image: require('../../../../assets/EventMimg/Jewellery folder/Djewellery.jpg.jpeg'),
        isLuxury: false,
        thumbnails: [
            require('../../../../assets/EventMimg/Jewellery folder/Djewellery1.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/Djewellery2.jpg.jpeg'),
            require('../../../../assets/EventMimg/Jewellery folder/RING1.jpg.jpeg')
        ]
    },
    {
        id: '7',
        name: 'CaratLane',
        location: 'Phoenix Mall, Pune',
        rating: '4.7',
        image: { uri: 'https://images.unsplash.com/photo-1599643477877-53135311f9ae?q=80&w=2070&auto=format&fit=crop' },
        isLuxury: false,
        thumbnails: [
            { uri: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1589139169229-87588019685a?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' }
        ]
    },
    {
        id: '8',
        name: 'TBZ - The Original',
        location: 'Bund Garden, Pune',
        rating: '4.8',
        image: { uri: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop' },
        isLuxury: true,
        thumbnails: [
            { uri: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1588661845173-982163b2255e?q=80&w=1974&auto=format&fit=crop' },
            { uri: 'https://images.unsplash.com/photo-1605100804763-ebea243bc612?q=80&w=2070&auto=format&fit=crop' }
        ]
    }
];



const JewelleryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

    const safeInsets = useSafeAreaInsets();
    const insets = useMemo(() => ({
        top: safeInsets?.top || 0,
        bottom: safeInsets?.bottom || 0,
        left: safeInsets?.left || 0,
        right: safeInsets?.right || 0
    }), [safeInsets]);

    const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const mainScrollViewRef = useRef<ScrollView>(null);

    const [topPicksY, setTopPicksY] = useState(0);

    const scrollToCollections = () => {
        if (mainScrollViewRef.current && topPicksY > 0) {
            mainScrollViewRef.current.scrollTo({ y: topPicksY, animated: true });
        }
    };

    // Auto-Scroll Logic for Vendors
    const vendorScrollRef = useRef<ScrollView>(null);
    const scrollInterval = useRef<NodeJS.Timeout | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [currentIndex]);

    const startAutoScroll = () => {
        stopAutoScroll();
        scrollInterval.current = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= OUR_VENDORS.length) {
                nextIndex = 0;
            }

            if (vendorScrollRef.current) {
                vendorScrollRef.current.scrollTo({
                    x: nextIndex * (width * 0.75 + 15), // Card width + margin
                    animated: true,
                });
                setCurrentIndex(nextIndex);
            }
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
        }
    };

    const handleMomentumScrollEnd = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / (width * 0.75 + 15));
        setCurrentIndex(index);
        startAutoScroll(); // Restart timer after manual scroll
    };



    const [modalVisible, setModalVisible] = useState(false);
    const [activeFilterTab, setActiveFilterTab] = useState<string>('Locality');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({ Locality: [], Type: [], 'WMG Award': [], 'Review count': [], 'Rating': [] });


    const toggleLike = (id: string) => {

        if (Platform.OS !== 'web') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleFilterOption = (category: string, option: string) => {

        setSelectedFilters(prev => {
            const currentOptions = prev[category] || [];
            return currentOptions.includes(option) ? { ...prev, [category]: currentOptions.filter(o => o !== option) } : { ...prev, [category]: [...currentOptions, option] };
        });
    };

    const clearFilters = () => setSelectedFilters({ Locality: [], Type: [], 'WMG Award': [], 'Review count': [], 'Rating': [] });

    const handleLocationPress = () => {
        setActiveFilterTab('Locality');
        setModalVisible(true);
    };

    const filteredData = jewelleryData.filter(item => {
        // Text Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(query);
            const matchLocality = item.locality.toLowerCase().includes(query);
            const matchLocation = item.location.toLowerCase().includes(query);
            if (!matchName && !matchLocality && !matchLocation) return false;
        }

        if (selectedCategory !== 'All') {
            const search = selectedCategory.toLowerCase();
            if (!(item.category.toLowerCase().includes(search) || item.type.toLowerCase().includes(search) || (item.guests && item.guests.toLowerCase().includes(search)) || item.name.toLowerCase().includes(search))) return false;
        }
        const { Locality, Type, 'WMG Award': wmg, 'Review count': reviews, Rating } = selectedFilters;
        if (Locality.length > 0 && !Locality.includes(item.locality)) return false;
        if (Type.length > 0 && !Type.includes(item.type)) return false;
        if (wmg.length > 0 && wmg.includes('Users\' Choice Awards Winner') && !item.wmgAward) return false;
        if (reviews.length > 0) {
            const reviewOption = reviews[0];
            if (reviewOption === '<5 reviews' && item.reviews >= 5) return false;
            if (reviewOption === '5+ reviews' && item.reviews < 5) return false;
        }
        if (Rating.length > 0 && Rating[0] === 'Rated 4+' && item.ratingValue < 4) return false;
        return true;
    });

    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' && <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />}

            <ScrollView
                ref={mainScrollViewRef}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >
                {/* Hero Section */}
                <VideoHero
                    insets={insets}
                    onSearchPress={scrollToCollections}
                    navigation={navigation}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedLocation={selectedFilters.Locality.length > 0 ? selectedFilters.Locality[0] : 'All Localities'}
                    onLocationPress={handleLocationPress}
                />



                {/* Featured Collections */}
                {/* Our Vendors Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Our Vendors</Text>
                        <TouchableOpacity>
                            <Text style={styles.browseMoreText}>Browse More</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        ref={vendorScrollRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalScroll}
                        onScrollBeginDrag={stopAutoScroll}
                        onMomentumScrollEnd={handleMomentumScrollEnd}
                        snapToInterval={width * 0.75 + 15}
                        decelerationRate="fast"
                    >
                        {OUR_VENDORS.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.vendorCard} onPress={() => navigation.navigate('JewelleryDetailsScreen', { item })}>
                                <View style={styles.vendorImageContainer}>
                                    <Image source={item.image} style={styles.vendorImage} />
                                    {item.isLuxury && (
                                        <View style={styles.luxuryTag}>
                                            <Text style={styles.luxuryText}>Luxury</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.vendorContent}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.vendorName}>{item.name}</Text>
                                        <View style={styles.ratingPill}>
                                            <Ionicons name="star" size={12} color="#fff" />
                                            <Text style={styles.ratingValue}>{item.rating}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.locationRow}>
                                        <Ionicons name="location-outline" size={14} color="#666" />
                                        <Text style={styles.vendorLocation}>{item.location}</Text>
                                    </View>

                                    <View style={styles.thumbnailRowContainer}>
                                        <View style={styles.thumbnailRow}>
                                            {item.thumbnails?.slice(0, 3).map((thumb, index) => (
                                                <Image key={index} source={thumb} style={styles.thumbnailImage} />
                                            ))}
                                        </View>
                                        <TouchableOpacity style={styles.followButton}>
                                            <Text style={styles.followText}>Follow</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Top Picks Grid */}
                {/* Top Picks Grid */}
                <View
                    style={styles.sectionContainer}
                    onLayout={(event) => {
                        const layout = event.nativeEvent.layout;
                        setTopPicksY(layout.y);
                    }}
                >
                    <Text style={styles.sectionTitle}>Top Picks For You</Text>
                    <View style={{ paddingBottom: 20 }}>
                        {filteredData.map((item, index) => {
                            if (index % 3 === 0) {
                                // Hero Card (Every 3rd item starting at 0)
                                return (
                                    <TouchableOpacity key={item.id} style={styles.topPickCard} onPress={() => navigation.navigate('JewelleryDetailsScreen', { item })}>
                                        <View style={styles.cardImageContainer}>
                                            <Image source={item.image} style={styles.cardImage} />
                                            <View style={styles.cardOverlay}>
                                                <TouchableOpacity style={styles.heartButton} onPress={() => toggleLike(item.id)}>
                                                    <Ionicons name={likedItems[item.id] ? "heart" : "heart-outline"} size={22} color={likedItems[item.id] ? "red" : "#fff"} />
                                                </TouchableOpacity>
                                                <View style={styles.imageDots}>
                                                    <View style={[styles.dot, styles.activeDot]} />
                                                    <View style={styles.dot} />
                                                    <View style={styles.dot} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.cardContent}>
                                            <View style={styles.headerRow}>
                                                <Text style={styles.cardTitle}>{item.name}</Text>
                                                <View style={styles.ratingBadge}>
                                                    <Ionicons name="star" size={12} color="#F29502" />
                                                    <Text style={styles.ratingText}>{item.ratingValue}</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
                                            <View style={{ marginTop: 8 }}>
                                                <Text style={styles.cardMeta}>{item.category} • {item.location}</Text>
                                                <Text style={styles.cardLocality}>{item.locality}</Text>
                                            </View>
                                            <View style={styles.cardFooter}>
                                                <Text style={styles.likesText}>{item.likes} likes</Text>
                                                <Ionicons name="bookmark-outline" size={22} color="#888" />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            } else if (index % 3 === 1) {
                                // Start of a Grid Pair (Index 1, 4, 7...)
                                // Render this item and the next one (if exists) in a row
                                const nextItem = filteredData[index + 1];
                                return (
                                    <View key={`grid-row-${index}`} style={styles.gridContainer}>
                                        {/* Current Item (Left Grid) - Height 210 */}
                                        <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('JewelleryDetailsScreen', { item })}>
                                            <View style={[styles.gridImageContainer, { height: 200 }]}>
                                                <Image source={item.image} style={styles.gridImage} resizeMode="cover" />
                                                <TouchableOpacity style={styles.gridHeartBtn} onPress={() => toggleLike(item.id)}>
                                                    <Ionicons name={likedItems[item.id] ? "heart" : "heart-outline"} size={18} color={likedItems[item.id] ? "red" : "#333"} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.gridContent}>
                                                <View style={styles.gridHeaderRow}>
                                                    <Text style={styles.gridTitle} numberOfLines={1}>{item.name}</Text>
                                                    <View style={styles.gridRatingContainer}>
                                                        <Ionicons name="star" size={10} color="#F29502" />
                                                        <Text style={styles.gridRatingText}>{item.ratingValue}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 6 }}>
                                                    <Text style={styles.gridMeta} numberOfLines={1}>{item.category} • {item.location}</Text>
                                                    <Text style={styles.gridLocality} numberOfLines={1}>{item.locality}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                                    <Text style={{ fontSize: 10, color: '#888' }}>{item.likes} likes</Text>
                                                    <Ionicons name="bookmark-outline" size={16} color="#888" />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        {/* Next Item (Right Grid) - Only if it exists and is part of the pair - Height 260 */}
                                        {nextItem && (
                                            <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('JewelleryDetailsScreen', { item: nextItem })}>
                                                <View style={[styles.gridImageContainer, { height: 260 }]}>
                                                    <Image source={nextItem.image} style={styles.gridImage} resizeMode="cover" />
                                                    <TouchableOpacity style={styles.gridHeartBtn} onPress={() => toggleLike(nextItem.id)}>
                                                        <Ionicons name={likedItems[nextItem.id] ? "heart" : "heart-outline"} size={18} color={likedItems[nextItem.id] ? "red" : "#333"} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.gridContent}>
                                                    <View style={styles.gridHeaderRow}>
                                                        <Text style={styles.gridTitle} numberOfLines={1}>{nextItem.name}</Text>
                                                        <View style={styles.gridRatingContainer}>
                                                            <Ionicons name="star" size={10} color="#F29502" />
                                                            <Text style={styles.gridRatingText}>{nextItem.ratingValue}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 6 }}>
                                                        <Text style={styles.gridMeta} numberOfLines={1}>{nextItem.category} • {nextItem.location}</Text>
                                                        <Text style={styles.gridLocality} numberOfLines={1}>{nextItem.locality}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                                        <Text style={{ fontSize: 10, color: '#888' }}>{nextItem.likes} likes</Text>
                                                        <Ionicons name="bookmark-outline" size={16} color="#888" />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            } else {
                                // Index % 3 === 2 (Already rendered as 'nextItem', skip)
                                return null;
                            }
                        })}
                    </View>
                </View>
            </ScrollView>

            {
                modalVisible && (
                    <View style={[styles.modalOverlay, { zIndex: 999 }]}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Filters</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={24} color={COLORS.textDark} /></TouchableOpacity>
                            </View>
                            <View style={styles.modalBody}>
                                <View style={styles.sidebar}>
                                    {DETAILED_FILTERS.map(filter => (
                                        <TouchableOpacity key={filter.id} style={[styles.sidebarItem, activeFilterTab === filter.id && styles.activeSidebarItem]} onPress={() => setActiveFilterTab(filter.id)}>
                                            <Text style={[styles.sidebarText, activeFilterTab === filter.id && styles.activeSidebarText]}>{filter.name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <ScrollView style={styles.optionsArea}>
                                    {DETAILED_FILTERS.find(f => f.id === activeFilterTab)?.options.map(option => {
                                        const isSelected = selectedFilters[activeFilterTab].includes(option);
                                        return (
                                            <TouchableOpacity key={option} style={styles.optionItem} onPress={() => toggleFilterOption(activeFilterTab, option)}>
                                                <Ionicons name={isSelected ? 'checkbox' : 'square-outline'} size={20} color={isSelected ? COLORS.kumkum : '#888'} />
                                                <Text style={[styles.optionText, isSelected && styles.activeOptionText]}>{option}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                            <View style={styles.modalFooter}>
                                <TouchableOpacity onPress={clearFilters}><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}><Text style={styles.applyText}>Apply</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFE4' },
    scrollContent: { paddingBottom: 100 },

    // Scroll Indicator Styles - Removed
    heroWrapper: { height: 550, marginBottom: 20, position: 'relative', zIndex: 10 },
    heroContainer: { width: '100%', height: '100%', overflow: 'hidden', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    heroVideo: { width: '100%', height: '100%' },
    heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
    headerIconsRow: { position: 'absolute', left: 20, zIndex: 30 },
    backBtnWrapper: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    heroContent: { position: 'absolute', bottom: 100, left: 25, right: 25, zIndex: 10 },
    heroHeadline: { color: '#fff', fontSize: 28, fontWeight: '800', lineHeight: 36, marginBottom: 10 },
    heroSubtext: { color: '#eee', fontSize: 13, fontWeight: '500', marginBottom: 25 },
    heroCTA: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.kumkum, alignSelf: 'flex-start', paddingVertical: 14, paddingHorizontal: 35, borderRadius: 30, elevation: 4 },
    heroCTAText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
    searchContainer: {
        position: 'absolute',
        bottom: -30,
        alignSelf: 'center',
        width: '92%',
        maxWidth: 600,
        backgroundColor: '#fff',
        borderRadius: 40,
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 20,
        elevation: 8,
        zIndex: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        alignItems: 'center',
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    locationText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 5,
    },
    searchDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#ddd',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        paddingVertical: 0,
        ...Platform.select({
            web: { outlineStyle: 'none' as any }
        })
    },

    sectionContainer: { marginTop: 30, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textRed, marginBottom: 10 },
    horizontalScroll: { paddingRight: 20 },
    browseMoreText: { color: '#F29502', fontWeight: 'bold', fontSize: 13 },
    vendorCard: {
        width: width * 0.75,
        backgroundColor: '#fff',
        borderRadius: 20,
        marginRight: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 10
    },
    vendorImageContainer: { height: 180, position: 'relative' },
    vendorImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    luxuryTag: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        elevation: 3
    },
    luxuryText: { color: COLORS.kumkum, fontWeight: 'bold', fontSize: 12 },
    vendorContent: { padding: 15 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    vendorName: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
    ratingPill: {
        backgroundColor: '#F29502',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15
    },
    ratingValue: { color: '#fff', fontWeight: 'bold', fontSize: 13, marginLeft: 4 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 15 },
    vendorLocation: { fontSize: 13, color: '#666', marginLeft: 4 },
    thumbnailRowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    thumbnailRow: { flexDirection: 'row' },
    thumbnailImage: { width: 45, height: 45, borderRadius: 12, marginRight: 8 },
    followButton: {
        borderColor: '#F29502',
        borderWidth: 1.5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#fff'
    },
    followText: { color: '#F29502', fontWeight: 'bold', fontSize: 13 },
    vibeScroll: { paddingRight: 20 },
    vibeItem: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#f29502', justifyContent: 'center', alignItems: 'center' },
    activeVibeItem: { backgroundColor: '#FFF8E1' },
    vibeText: { fontSize: 11, color: COLORS.textRed, marginTop: 5, fontWeight: '700', textAlign: 'center' },

    topPickCard: {
        backgroundColor: '#fff',
        borderRadius: 25,
        marginBottom: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 1,
        borderColor: '#f29502',
        overflow: 'hidden'
    },
    cardImageContainer: { height: 220, position: 'relative' },
    cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    cardOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between', padding: 15 },
    heartButton: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 20
    },
    imageDots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5
    },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 3 },
    activeDot: { backgroundColor: '#fff', width: 18 },
    cardContent: { padding: 20 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        elevation: 2,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },
    ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 13, color: '#333' },
    cardDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
    cardMeta: { fontSize: 13, fontWeight: 'bold', color: COLORS.textRed, marginBottom: 2 },
    cardLocality: { fontSize: 12, color: '#888' },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },
    likesText: { fontSize: 14, color: '#888' },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' },
    gridCard: {
        width: (width - 50) / 2,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f29502',
        padding: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    }, // width calculation: (screen width - padding*2 - gap)/2
    gridImageContainer: { borderRadius: 12, overflow: 'hidden', marginBottom: 8, width: '100%' },
    gridImage: { width: '100%', height: '100%' },
    gridHeartBtn: { position: 'absolute', top: 8, right: 8, backgroundColor: '#fff', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', elevation: 2 },
    gridContent: { paddingHorizontal: 2 },
    gridHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    gridTitle: { fontSize: 13, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 5 },
    gridRatingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
    gridRatingText: { fontSize: 10, fontWeight: 'bold', color: '#F29502', marginLeft: 3 },
    gridMeta: { color: COLORS.textRed, fontWeight: '700', fontSize: 10, marginBottom: 2 },
    gridLocality: { color: '#666', fontSize: 10 },
    modalOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContainer: { backgroundColor: '#fff', height: '65%', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    modalTitle: { fontWeight: 'bold', color: COLORS.textDark },
    modalBody: { flex: 1, flexDirection: 'row' },
    sidebar: { width: '30%', backgroundColor: '#f5f5f5' },
    sidebarItem: { padding: 15 },
    activeSidebarItem: { backgroundColor: '#fff' },
    sidebarText: { fontSize: 12, color: '#666' },
    activeSidebarText: { color: COLORS.kumkum, fontWeight: 'bold' },
    optionsArea: { flex: 1, padding: 15 },
    optionItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    optionText: { marginLeft: 10, color: '#444' },
    activeOptionText: { color: COLORS.kumkum, fontWeight: 'bold' },
    modalFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
    applyButton: { backgroundColor: COLORS.kumkum, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 25 },
    applyText: { color: '#fff', fontWeight: 'bold' },
    clearText: { color: '#666', fontWeight: '500' }
});

export default JewelleryScreen;