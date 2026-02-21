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


    // Using a placeholder video or the one found in assets
    const videoSource = require('../../../../assets/EventMimg/EventV.mp4');
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
                    <Text style={styles.heroHeadline}>Enhance Your Beauty with {"\n"}Professional Artistry✨</Text>
                    <Text style={styles.heroSubtext}>Bridal • Party • Editorial • HD Makeup</Text>

                    <TouchableOpacity style={styles.heroCTA} onPress={onSearchPress}>
                        <Ionicons name="sparkles" size={20} color="#fff" style={{ marginRight: 10 }} />
                        <Text style={styles.heroCTAText}>Find Artists</Text>
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
                    placeholder="Search artists, area..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
        </View>
    );
});

const makeupData = [
    { id: '1', name: 'Glamour by Gloria', location: 'Goa', locality: 'Panjim', rating: '4.9', ratingValue: 4.9, reviews: 320, guests: 'Bridal', type: 'Airbrush', wmgAward: true, price: '₹ 15k', image: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), category: 'Makeup', likes: '1.2k', description: 'Certified MUA specializing in bridal and party makeup.' },
    { id: '2', name: 'Divine Touch', location: 'Mumbai, MH', locality: 'Bandra', rating: '4.8', ratingValue: 4.8, reviews: 150, guests: 'Party', type: 'HD Makeup', wmgAward: false, price: '₹ 12k', image: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), category: 'Makeup', likes: '850', description: 'Creating flawless looks for your special occasions.' },
    { id: '3', name: 'Stories by Joseph', location: 'Delhi, DL', locality: 'Saket', rating: '4.9', ratingValue: 4.9, reviews: 210, guests: 'Bridal', type: 'Traditional', wmgAward: true, price: '₹ 20k', image: require('../../../../assets/EventMimg/Makeup/artist3.jpg'), category: 'Makeup', likes: '2.1k', description: 'Award-winning artist known for natural and elegant styles.' },
    { id: '4', name: 'Elegant Brushes', location: 'Bangalore, KA', locality: 'Indiranagar', rating: '4.7', ratingValue: 4.7, reviews: 95, guests: 'Bridal', type: 'HD Makeup', wmgAward: false, price: '₹ 18k', image: require('../../../../assets/EventMimg/Makeup/artist1.jpg'), category: 'Makeup', likes: '600', description: 'Expert in high-definition makeup for long-lasting wear.' },
    { id: '5', name: 'Radiant Glow', location: 'Pune, MH', locality: 'Koregaon Park', rating: '4.6', ratingValue: 4.6, reviews: 80, guests: 'Party', type: 'Airbrush', wmgAward: false, price: '₹ 10k', image: require('../../../../assets/EventMimg/Makeup/artist2.jpg'), category: 'Makeup', likes: '450', description: 'Enhancing your natural beauty with premium products.' },
    { id: '6', name: 'The Makeup Studio', location: 'Chennai, TN', locality: 'T. Nagar', rating: '4.8', ratingValue: 4.8, reviews: 180, guests: 'Bridal', type: 'Traditional', wmgAward: true, price: '₹ 22k', image: require('../../../../assets/EventMimg/Makeup/artist3.jpg'), category: 'Makeup', likes: '1.5k', description: 'Traditional South Indian bridal makeup specialists.' },
];

const DETAILED_FILTERS = [
    { id: 'Locality', name: 'Locality', options: ['Panjim', 'Bandra', 'Saket', 'Indiranagar', 'Koregaon Park', 'T. Nagar'] },
    { id: 'Type', name: 'Type', options: ['Airbrush', 'HD Makeup', 'Traditional', 'Party Makeup'] },
    { id: 'WMG Award', name: 'Awards', options: ['Users\' Choice Awards Winner'] },
    { id: 'Review count', name: 'Review count', options: ['<50 reviews', '50+ reviews', '100+ reviews'] },
    { id: 'Rating', name: 'Rating', options: ['All Ratings', 'Rated <4', 'Rated 4+', 'Rated 4.5+', 'Rated 4.8+'] }
];

const OUR_VENDORS = [
    {
        id: '1',
        name: 'Glamour by Gloria',
        location: 'Goa',
        rating: '4.9',
        image: require('../../../../assets/EventMimg/Makeup/artist1.jpg'),
        isLuxury: true,
        thumbnails: [
            require('../../../../assets/EventMimg/Makeup/artist1.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist2.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist3.jpg')
        ]
    },
    {
        id: '2',
        name: 'Divine Touch',
        location: 'Mumbai, MH',
        rating: '4.8',
        image: require('../../../../assets/EventMimg/Makeup/artist2.jpg'),
        isLuxury: false,
        thumbnails: [
            require('../../../../assets/EventMimg/Makeup/artist2.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist3.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist1.jpg')
        ]
    },
    {
        id: '3',
        name: 'Stories by Joseph',
        location: 'Delhi, DL',
        rating: '4.9',
        image: require('../../../../assets/EventMimg/Makeup/artist3.jpg'),
        isLuxury: true,
        thumbnails: [
            require('../../../../assets/EventMimg/Makeup/artist3.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist1.jpg'),
            require('../../../../assets/EventMimg/Makeup/artist2.jpg')
        ]
    },
];

const MakeupScreen = ({ navigation }: { navigation: any }) => {

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
    const [activeFilterTab, setActiveFilterTab] = useState('Locality');
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

    const filteredData = makeupData.filter(item => {
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
        // Simplified Review Count Logic for Demo
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

                {/* Our Vendors Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Featured Artists</Text>
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
                            <TouchableOpacity key={item.id} style={styles.vendorCard} onPress={() => navigation.navigate('MakeupArtistDetailsScreen', { item })}>
                                <View style={styles.vendorImageContainer}>
                                    <Image source={item.image} style={styles.vendorImage} resizeMode="cover" />
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
                                                <Image key={index} source={thumb} style={styles.thumbnailImage} resizeMode="cover" />
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
                                    <TouchableOpacity key={item.id} style={styles.topPickCard} onPress={() => navigation.navigate('MakeupArtistDetailsScreen', { item })}>
                                        <View style={styles.cardImageContainer}>
                                            <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
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
                                        <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('MakeupArtistDetailsScreen', { item })}>
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
                                            <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('MakeupArtistDetailsScreen', { item: nextItem })}>
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
            web: { outlineStyle: 'none' } as any
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
    sidebarText: { fontSize: 13, color: '#333' },
    activeSidebarText: { color: COLORS.kumkum, fontWeight: 'bold' },
    optionsArea: { flex: 1, padding: 15 },
    optionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    optionText: { fontSize: 14, color: '#333', marginLeft: 10, flex: 1 },
    activeOptionText: { color: COLORS.kumkum, fontWeight: 'bold' },
    modalFooter: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
    clearText: { color: '#666', fontWeight: 'bold' },
    applyButton: { backgroundColor: COLORS.kumkum, paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20 },
    applyText: { color: '#fff', fontWeight: 'bold' }
});

export default MakeupScreen;
