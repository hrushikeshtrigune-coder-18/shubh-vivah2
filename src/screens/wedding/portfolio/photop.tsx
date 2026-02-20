import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
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

const { width } = Dimensions.get('window');

// Mock data for similar photographers
const SIMILAR_PHOTOGRAPHERS = [
    {
        id: '1',
        name: 'The Wedding Filmer',
        image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=400&auto=format&fit=crop',
        rating: 4.8,
    },
    {
        id: '2',
        name: 'Stories by Joseph',
        image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=400&auto=format&fit=crop',
        rating: 4.7,
    },
    {
        id: '3',
        name: 'Twogether Studios',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop',
        rating: 4.9,
    },
    {
        id: '4',
        name: 'Wedding Tales',
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop',
        rating: 4.6,
    },
    {
        id: '5',
        name: 'Candid Shots',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
        rating: 4.5,
    },
];

// Mock data for photography showcase with categories
const PHOTOGRAPHY_PHOTOS = [
    { id: '1', category: 'Candid', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600' } },
    { id: '2', category: 'Cinematic', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600' } },
    { id: '3', category: 'Videos', type: 'video', source: { uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600' } },
    { id: '4', category: 'Candid', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600' } },
    { id: '5', category: 'Cinematic', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600' } },
    { id: '6', category: 'Videos', type: 'video', source: { uri: 'https://images.unsplash.com/photo-1522673607200-164883eeba44?q=80&w=600' } },
    { id: '7', category: 'Candid', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600' } },
    { id: '8', category: 'Cinematic', type: 'image', source: { uri: 'https://images.unsplash.com/photo-1465495910483-0d674b17906d?q=80&w=600' } },
];

const GALLERY_CATEGORIES = ['All', 'Candid', 'Cinematic', 'Videos'];

const PACKAGES = [
    {
        id: '1',
        name: 'Standard Package',
        price: '₹50,000',
        features: ['1 Day Coverage', 'Digital Delivery', '100 Edited Photos'],
        icon: 'camera-outline',
        color: '#95afc0'
    },
    {
        id: '2',
        name: 'Premium Package',
        price: '₹1,20,000',
        features: ['2 Days Coverage', 'Cinematography', 'Album Included', 'Drone Shots'],
        icon: 'camera',
        color: '#eb4d4b'
    },
    {
        id: '3',
        name: 'Signature Package',
        price: '₹2,50,000',
        features: ['Pre-wedding Shoot', 'Luxury Album', 'Same-day Edit Video', 'Drone + Crane'],
        icon: 'videocam',
        color: '#f0932b'
    }
];

const AnimatedCard = ({ children, style, delay = 0 }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(60)).current; // Increased offset for more "pop"
    const scaleAnim = useRef(new Animated.Value(0.75)).current; // Smaller starting point

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                friction: 5, // Bouncier
                tension: 30,
                delay: delay,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4, // Even bouncier for the pop effect
                tension: 40,
                delay: delay,
                useNativeDriver: true,
            }),
        ]).start();
    }, [delay]);

    return (
        <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY }, { scale: scaleAnim }] }]}>
            {children}
        </Animated.View>
    );
};

const PhotographerPortfolio = ({ navigation, route }) => {
    // Default data if no params provided
    const params = route.params || {};
    const photographer = params.vendor || {
        name: 'Stories by Joseph',
        type: 'Photographer',
        image: null,
        rating: 4.9,
        reviews: 320,
        location: 'Goa, India',
    };

    const [activeShowcaseTab, setActiveShowcaseTab] = React.useState('photos');
    const [activeCategory, setActiveCategory] = React.useState('All');
    const [showBookingModal, setShowBookingModal] = React.useState(false);
    const [bookingForm, setBookingForm] = React.useState({
        name: '',
        mobile: '',
        date: '',
        timeSlot: '',
        eventType: '',
        city: '',
        note: ''
    });

    // Auto-scroll logic for similar vendors
    const suggestedVendorsRef = useRef(null);
    React.useEffect(() => {
        let scrollValue = 0;
        const intervalId = setInterval(() => {
            if (suggestedVendorsRef.current) {
                scrollValue += 95;
                if (scrollValue > 95 * SIMILAR_PHOTOGRAPHERS.length - width) {
                    scrollValue = 0;
                }
                if (suggestedVendorsRef.current.scrollTo) {
                    suggestedVendorsRef.current.scrollTo({ x: scrollValue, animated: true });
                }
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const tabTranslateX = useRef(new Animated.Value(0)).current;
    const heroImageScale = useRef(new Animated.Value(1)).current;
    const galleryFadeAnim = useRef(new Animated.Value(0)).current;

    const heroCarouselRef = useRef(null);
    const [heroIndex, setHeroIndex] = React.useState(0);

    // Auto-scroll logic for Hero Carousel
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            if (heroCarouselRef.current) {
                let nextIndex = heroIndex + 1;
                if (nextIndex >= PHOTOGRAPHY_PHOTOS.length) {
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

    React.useEffect(() => {
        startHeroZoom();
    }, [heroIndex]);

    const handleTabPress = (tab) => {
        setActiveShowcaseTab(tab);
        const toValue = tab === 'photos' ? 0 : 1;

        Animated.parallel([
            Animated.timing(tabTranslateX, {
                toValue,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    React.useEffect(() => {
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
                {PHOTOGRAPHY_PHOTOS.map((photo, index) => (
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
                {PHOTOGRAPHY_PHOTOS.map((_, index) => (
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
            <Text style={styles.suggestedTitle}>Similar Photographers</Text>
            <ScrollView
                ref={suggestedVendorsRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.suggestedScrollContent}
            >
                {SIMILAR_PHOTOGRAPHERS.map((v) => (
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
                        source={photographer.image ? (typeof photographer.image === 'number' ? photographer.image : { uri: photographer.image }) : { uri: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=200' }}
                        style={styles.profileImage}
                    />
                </View>

                <View style={styles.profileInfoColumn}>
                    <Text style={styles.vendorName}>{photographer.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Ionicons name="location-outline" size={12} color="#666" style={{ marginRight: 4 }} />
                        <Text style={[styles.locationText, { marginBottom: 0 }]} numberOfLines={1}>
                            {photographer.location || photographer.city}
                        </Text>
                    </View>
                    <Text style={styles.descriptionTextHero} numberOfLines={2}>
                        Preserving your most cherished memories with artistic storytelling and candid captures.
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color="#F29502" />
                            <Text style={styles.statText}>{photographer.rating} ({photographer.reviews})</Text>
                        </View>
                    </View>
                </View>
            </View>

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
                            <Text style={styles.modalTitle}>Book a Session</Text>
                            <Text style={styles.modalSubtitle}>Inquire about session with {photographer.name}</Text>
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
                            <Text style={styles.inputLabel}>Mobile Number</Text>
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
                                    <Ionicons name="camera-outline" size={18} color="#666" style={styles.inputIcon} />
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
                                <Text style={styles.inputLabel}>Event Date</Text>
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
                                <Text style={styles.inputLabel}>Preferred Time</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="time-outline" size={18} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="e.g. 10:00 AM"
                                        placeholderTextColor="#888"
                                        value={bookingForm.timeSlot}
                                        onChangeText={(val) => setBookingForm({ ...bookingForm, timeSlot: val })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Tell us more</Text>
                            <View style={[styles.inputWrapper, styles.noteInputWrapper]}>
                                <Ionicons name="document-text-outline" size={18} color="#666" style={[styles.inputIcon, { alignSelf: 'flex-start', marginTop: 15 }]} />
                                <TextInput
                                    style={[styles.textInput, styles.noteInput]}
                                    placeholder="Any theme or specific requirements?"
                                    placeholderTextColor="#888"
                                    multiline={true}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={bookingForm.note}
                                    onChangeText={(val) => setBookingForm({ ...bookingForm, note: val })}
                                />
                            </View>
                        </View>
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
                            onPress={() => setShowBookingModal(false)}
                        >
                            <LinearGradient
                                colors={['#CC0E0E', '#E31E1E']}
                                style={styles.confirmGradient}
                            >
                                <Text style={styles.confirmButtonText}>Send Inquiry</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );

    const renderGallery = () => {
        const microBadges = [
            { icon: "📷", text: "High Res" },
            { icon: "✨", text: "Signature" },
            { icon: "🎬", text: "Cinematic" },
            { icon: "🖤", text: "Mono" },
            { icon: "🌅", text: "Golden" },
            { icon: "🏰", text: "Palatial" }
        ];

        const tabWidth = 100;
        const translateX = tabTranslateX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, tabWidth + 12],
        });

        const filteredPhotos = activeCategory === 'All'
            ? PHOTOGRAPHY_PHOTOS
            : PHOTOGRAPHY_PHOTOS.filter(p => p.category === activeCategory);

        const renderCard = (photo, variant) => {
            if (!photo) return null;
            const badge = microBadges[Math.floor(Math.random() * microBadges.length)];

            let cardStyle = styles.minimalCard;
            let imageStyle = styles.minimalImage;

            if (variant === 'tall') cardStyle = [styles.minimalCard, styles.tallCard];
            if (variant === 'wide' || variant === 'video') cardStyle = [styles.minimalCard, styles.videoCard];
            if (variant === 'square') cardStyle = [styles.minimalCard, styles.squareCard];
            if (variant === 'circle') {
                return (
                    <AnimatedCard key={photo.id || Math.random()} style={styles.circleFrame} delay={100}>
                        <View style={styles.circularCard}>
                            <Image source={photo.source} style={styles.minimalImage} />
                        </View>
                        <Text style={styles.circleTitle}>{photo.category || 'Featured'} Spotlight</Text>
                    </AnimatedCard>
                );
            }

            return (
                <AnimatedCard key={photo.id || Math.random()} style={cardStyle} delay={100}>
                    <View style={styles.minimalImageWrapper}>
                        <Image source={photo.source} style={imageStyle} />
                        <View style={styles.minimalTag}>
                            <Text style={styles.minimalTagText}>{badge.text}</Text>
                        </View>
                        {photo.type === 'video' && (
                            <View style={styles.minimalPlayIcon}>
                                <Ionicons name="play" size={16} color="#FFF" />
                            </View>
                        )}
                    </View>
                    <View style={styles.minimalTitleArea}>
                        <Text style={styles.minimalCardTitle}>{photo.category || 'Portfolio'} Selection</Text>
                    </View>
                </AnimatedCard>
            );
        };

        const getGridData = () => {
            const rows = [];
            let i = 0;
            const data = filteredPhotos || [];

            while (i < data.length) {
                const currentItem = data[i];
                if (!currentItem) {
                    i++;
                    continue;
                }

                // If it's a video, it gets a full row
                if (currentItem.type === 'video') {
                    rows.push({
                        id: `video-row-${currentItem.id || i}`,
                        type: 'video_row',
                        content: renderCard(data[i], 'video', i)
                    });
                    i++;
                    continue;
                }

                // Grid pattern for images
                // Row 1: Tall Rectangle + Square
                if (i < data.length && data[i] && data[i].type !== 'video') {
                    const row1Items = [];
                    row1Items.push({ item: data[i], variant: 'tall', index: i });
                    i++;
                    if (i < data.length && data[i] && data[i].type !== 'video') {
                        row1Items.push({ item: data[i], variant: 'square', index: i });
                        i++;
                    }
                    rows.push({
                        id: `row-1-${i}`,
                        type: 'grid_row',
                        content: row1Items.map(ri => renderCard(ri.item, ri.variant, ri.index))
                    });
                }

                // Featured Circle (every few items)
                if (i < data.length && i % 4 === 0 && data[i] && data[i].type !== 'video') {
                    rows.push({
                        id: `featured-${i}`,
                        type: 'featured_highlight',
                        content: renderCard(data[i], 'circle', i)
                    });
                    i++;
                }

                // Row 2: Two Squares
                if (i < data.length && data[i] && data[i].type !== 'video') {
                    const row2Items = [];
                    row2Items.push({ item: data[i], variant: 'square', index: i });
                    i++;
                    if (i < data.length && data[i] && data[i].type !== 'video') {
                        row2Items.push({ item: data[i], variant: 'square', index: i });
                        i++;
                    }
                    rows.push({
                        id: `row-2-${i}`,
                        type: 'grid_row',
                        content: row2Items.map(ri => renderCard(ri.item, ri.variant, ri.index))
                    });
                }

                // Row 3: Wide Rectangle
                if (i < data.length && data[i] && data[i].type !== 'video') {
                    rows.push({
                        id: `row-3-${i}`,
                        type: 'grid_row',
                        content: renderCard(data[i], 'wide', i)
                    });
                    i++;
                }
            }
            return rows;
        };

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.showcaseHeader}>
                    <Text style={styles.sectionTitle}>Portfolio Showcase</Text>

                    <View style={styles.showcaseTabsContainer}>
                        <Animated.View style={[
                            styles.slidingIndicator,
                            { transform: [{ translateX }] }
                        ]} />

                        <TouchableOpacity
                            style={styles.showcaseTabItemNew}
                            onPress={() => handleTabPress('photos')}
                        >
                            <Ionicons
                                name="images-outline"
                                size={14}
                                color={activeShowcaseTab === 'photos' ? '#FFF' : '#666'}
                                style={{ marginRight: 6 }}
                            />
                            <Text style={[styles.showcaseTabTextNew, activeShowcaseTab === 'photos' && styles.activeShowcaseTabTextNew]}>
                                Photos
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
                                Packages
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {activeShowcaseTab === 'photos' && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoryBar}
                        contentContainerStyle={styles.categoryBarContent}
                    >
                        {GALLERY_CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryItem,
                                    activeCategory === cat && styles.categoryItemActive
                                ]}
                                onPress={() => setActiveCategory(cat)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    activeCategory === cat && styles.categoryTextActive
                                ]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                <Animated.View style={[styles.galleryContainer, { opacity: galleryFadeAnim }]}>
                    {activeShowcaseTab === 'photos' ? (
                        <FlatList
                            data={getGridData()}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                if (item.type === 'featured_highlight') {
                                    return (
                                        <View style={styles.featuredHighlight}>
                                            {item.content}
                                        </View>
                                    );
                                }
                                return (
                                    <View style={styles.gridRow}>
                                        {item.content}
                                    </View>
                                );
                            }}
                            scrollEnabled={false} // Managed by parent ScrollView
                            contentContainerStyle={styles.minimalGridContainer}
                        />
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.packagesScroll}
                            contentContainerStyle={styles.packagesScrollContent}
                        >
                            {PACKAGES.map((plan) => {
                                const isPremium = plan.id === '2';
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
                                            {plan.features.slice(0, 4).map((f, i) => (
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
                            <Text style={styles.contactButtonTextOutline}>Contact Photographer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bookButtonPremium}
                            onPress={() => setShowBookingModal(true)}
                        >
                            <Text style={styles.bookButtonTextPremium}>Book a Session</Text>
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
        bottom: 40,
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
        paddingBottom: 30,
        zIndex: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    profileImageContainer: {
        marginRight: 15,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        marginTop: 15,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#FFFFF0',
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
        position: 'absolute',
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
    profileInfoColumn: {
        flex: 1,
        paddingTop: 35,
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
        color: '#f29502',
        marginBottom: 4,
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
        gap: 15,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        color: '#f29502',
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
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
        color: '#f29502',
    },
    activeShowcaseTabTextNew: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
    },
    minimalGridContainer: {
        marginTop: 10,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        gap: 15,
    },
    minimalCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 2.5, // Thicker for more impact
        borderColor: '#FFD700', // Vibrant Gold/Yellow
        elevation: 8,
        shadowColor: '#f29502', // Colored shadow for extra depth
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    tallCard: {
        flex: 1.2,
        height: 280,
    },
    squareCard: {
        flex: 1,
        aspectRatio: 1,
    },
    wideCard: {
        flex: 1,
        height: 180,
    },
    videoCard: {
        flex: 1,
        height: 220,
    },
    featuredHighlight: {
        alignItems: 'center',
        marginVertical: 20,
    },
    circleFrame: {
        alignItems: 'center',
    },
    circularCard: {
        width: 160,
        height: 160,
        borderRadius: 80,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#FFD700', // Standardized Vibrant Yellow
    },
    circleTitle: {
        marginTop: 10,
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 14,
        color: '#CC0E0E',
    },
    minimalImageWrapper: {
        flex: 1,
        overflow: 'hidden',
    },
    minimalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    minimalTag: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(255, 235, 59, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    minimalTagText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 10,
        color: '#333',
    },
    minimalPlayIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    minimalTitleArea: {
        padding: 10,
        backgroundColor: '#FFF',
    },
    minimalCardTitle: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        color: '#333',
    },
    galleryContainer: {
        marginTop: 5,
    },
    categoryBar: {
        marginBottom: 15,
        marginTop: 5,
    },
    categoryBarContent: {
        paddingRight: 20,
        gap: 10,
    },
    categoryItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#EEE',
    },
    categoryItemActive: {
        backgroundColor: '#CC0E0E',
        borderColor: '#CC0E0E',
    },
    categoryText: {
        fontFamily: 'Outfit_500Medium',
        fontSize: 13,
        color: '#666',
    },
    categoryTextActive: {
        color: '#FFF',
        fontFamily: 'Outfit_600SemiBold',
    },
    playButtonOverlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    },
    plansTabContent: {
        gap: 15,
        paddingTop: 10,
    },
    planDetailsExpanded: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 15,
    },
    planCardShowcase: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        borderWidth: 1.5,
        borderColor: '#f29502',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    planCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    planIconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    planNameShowcase: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        color: '#CC0E0E',
    },
    planPriceShowcase: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 18,
        color: '#CC0E0E',
    },
    planFeaturesShowcase: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 15,
    },
    featureItemShowcase: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    featureTextShowcase: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 11,
        color: '#f29502',
    },
    selectPlanSmallBtn: {
        width: '100%',
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1.5,
        alignItems: 'center',
    },
    selectPlanSmallText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 13,
    },
    galleryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
    },
    masonryColumn: {
        width: (width - 50) / 2,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
    footerActions: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 30,
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    contactButtonOutline: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderRadius: 30,
        borderWidth: 1.5,
        borderColor: '#f29502',
    },
    contactButtonTextOutline: {
        color: '#f29502',
        fontFamily: 'Outfit_500Medium',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    bookButtonPremium: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CC0E0E',
        paddingVertical: 10,
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
        fontSize: 12,
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
        elevation: 20,
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
        color: '#f29502',
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
        borderColor: '#f29502',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    noteInputWrapper: {
        alignItems: 'flex-start',
        paddingVertical: 5,
    },
    noteInput: {
        height: 100,
        paddingTop: 12,
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
    modalFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 10,
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

    // Package Comparison Card Styles
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
        borderColor: '#FFD700', // Yellow/Gold border for all cards
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
        shadowColor: '#f29502',
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
        backgroundColor: '#CC0E0E', // Red background
    },
    viewDetailsBtnText: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 15,
        color: '#FFF', // White text
    },
});

export default PhotographerPortfolio;