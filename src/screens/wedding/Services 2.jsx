import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    ImageBackground,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');



// Global Color System (Based on User Request)
const COLORS = {
    saffron: '#FF9933',
    gold: '#D4AF37',
    maroon: '#800000',
    ivory: '#FFFFF0',
    textMain: '#800000', // Kumkum Color (Maroon)
    textLight: '#5D4037',
    white: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.85)',
    surface: '#FFF8E1', // Very light cream
};

// Data: Services with Suggestion Data
const serviceCategories = [
    {
        id: '1',
        title: 'E-Invites',
        icon: require('../../../assets/images/invite.jpg'),
        screen: 'EInviteScreen',
        suggestions: [
            { id: 's1', title: 'Video Invites', icon: 'videocam-outline' },
            { id: 's2', title: 'Save the Date', icon: 'calendar-outline' },
            { id: 's3', title: 'Caricature', icon: 'happy-outline' },
        ]
    },
    {
        id: '2',
        title: 'Event Management',
        icon: { uri: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069' },
        screen: 'EventManagementScreen',
        suggestions: [
            { id: 's1', title: 'Full Planning', icon: 'list-outline' },
            { id: 's2', title: 'Day-of Coord', icon: 'time-outline' },
        ]
    },
    {
        id: '3',
        title: 'Venues',
        icon: require('../../../assets/images/venue1.jpg'),
        screen: 'WeddingVenue',
        suggestions: [
            { id: 's1', title: 'Resorts', icon: 'business-outline' },
            { id: 's2', title: 'Banquet Halls', icon: 'home-outline' },
            { id: 's3', title: 'Lawns', icon: 'leaf-outline' },
        ]
    },
    {
        id: '4',
        title: 'Catering',
        icon: require('../../../assets/images/Food.jpg'),
        screen: 'Food',
        suggestions: [
            { id: 's1', title: 'Buffet', icon: 'restaurant-outline' },
            { id: 's2', title: 'Live Counters', icon: 'flame-outline' },
        ]
    },
    {
        id: '5',
        title: 'Photography',
        icon: require('../../../assets/images/photo.jpg'),
        screen: 'Photography',
        suggestions: [
            { id: 's1', title: 'Candid', icon: 'camera-outline' },
            { id: 's2', title: 'Cinematic', icon: 'film-outline' },
            { id: 's3', title: 'Drone', icon: 'airplane-outline' },
        ]
    },
    {
        id: '6',
        title: 'Decor',
        icon: require('../../../assets/images/decor.jpg'),
        screen: 'DecorationFloral',
        suggestions: [
            { id: 's1', title: 'Floral', icon: 'rose-outline' },
            { id: 's2', title: 'Themed', icon: 'color-palette-outline' },
        ]
    },
    {
        id: '7',
        title: 'Jewellery',
        icon: require('../../../assets/images/Jewellery.jpg'),
        screen: 'JewelleryScreen',
        suggestions: [
            { id: 's1', title: 'Bridal Sets', icon: 'diamond-outline' },
            { id: 's2', title: 'Rings', icon: 'radio-button-on-outline' },
        ]
    },
    {
        id: '8',
        title: 'Mehandi',
        icon: require('../../../assets/images/mehandi.jpg'),
        screen: 'MehandiScreen',
        suggestions: [
            { id: 's1', title: 'Bridal', icon: 'flower-outline' },
            { id: 's2', title: 'Guest', icon: 'people-outline' },
        ]
    },
    {
        id: '9',
        title: 'Makeup',
        icon: require('../../../assets/images/makeup.jpg'),
        screen: 'VendorListScreen',
        params: { serviceName: 'Bridal Makeup' },
        suggestions: [
            { id: 's1', title: 'HD Makeup', icon: 'brush-outline' },
            { id: 's2', title: 'Airbrush', icon: 'color-wand-outline' },
        ]
    },
    {
        id: '10',
        title: 'Entertainment',
        icon: require('../../../assets/images/entertenment.jpg'),
        screen: 'VendorListScreen',
        params: { serviceName: 'Entertainment' },
        suggestions: [
            { id: 's1', title: 'DJ', icon: 'musical-notes-outline' },
            { id: 's2', title: 'Live Band', icon: 'mic-outline' },
        ]
    },
    {
        id: '11',
        title: 'Honeymoon',
        icon: require('../../../assets/images/honeymoon planning.jpg'),
        screen: 'Honeymoon',
        suggestions: [
            { id: 's1', title: 'International', icon: 'earth-outline' },
            { id: 's2', title: 'Domestic', icon: 'car-outline' },
        ]
    },
    {
        id: '12',
        title: 'Gifts & Returns',
        icon: { uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000' },
        screen: 'VendorListScreen',
        params: { serviceName: 'Return Gifts' },
        suggestions: [
            { id: 's1', title: 'Luxury Hampers', icon: 'gift-outline' },
            { id: 's2', title: 'Customized', icon: 'create-outline' },
        ]
    },
];

const popularSearches = ['Photography', 'E-Invites', 'Catering', 'Venues', 'Makeup', 'Decor'];

// Data: Planning Tools (Saffron, Gold, Maroon Theme)
const planningTools = [
    { id: 't1', title: 'Budget', desc: 'Track expenses', icon: 'calculator', color: '#FFF8E1', iconColor: '#D4AF37' }, // Gold Tint
    { id: 't2', title: 'Guest List', desc: 'Manage invites', icon: 'people', color: '#FFF3E0', iconColor: '#FF9933' }, // Saffron Tint
    { id: 't3', title: 'Checklist', desc: 'Stay organized', icon: 'checkbox', color: '#FFEBEE', iconColor: '#800000' }, // Maroon Tint
    { id: 't4', title: 'Inspiration', desc: 'Discover trends', icon: 'bulb', color: '#F3E5F5', iconColor: '#7B1FA2' }, // Purple Tint (Accent)
];

const AnimatedToolCard = ({ tool, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.toolCardWrapper}
        >
            <Animated.View style={[styles.toolCard, { backgroundColor: tool.color, transform: [{ scale: scaleAnim }] }]}>
                <View style={[styles.toolIconContainer, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
                    <Ionicons name={tool.icon} size={28} color={tool.iconColor} />
                </View>
                <View style={styles.toolTextContainer}>
                    <Text style={[styles.toolTitle, { color: tool.iconColor }]}>{tool.title}</Text>
                    <Text style={styles.toolDesc}>{tool.desc}</Text>
                </View>
                <Ionicons name="arrow-forward-circle" size={24} color={tool.iconColor} style={{ opacity: 0.5 }} />
            </Animated.View>
        </TouchableOpacity>
    );
};

// ... inside Services2 component ...

const renderPlanningTools = () => (
    <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Wedding Tools</Text>
        </View>
        <View style={styles.toolsGrid}>
            {planningTools.map((tool) => (
                <AnimatedToolCard key={tool.id} tool={tool} />
            ))}
        </View>
    </View>
);

// Data: Recommendations (Updated as per User Request)
const recommendations = [
    { id: 'r1', title: 'E-Invites', subtitle: 'Digital & Animated', image: require('../../../assets/images/invite.jpg'), screen: 'EInviteScreen' },
    { id: 'r2', title: 'Event Management', subtitle: 'Planning & Execution', image: require('../../../assets/images/Gust Mangment.jpg'), screen: 'EventManagementScreen' },
    { id: 'r3', title: 'Wedding Venue', subtitle: 'Luxury Locations', image: require('../../../assets/images/venue1.jpg'), screen: 'WeddingVenue' },
    { id: 'r4', title: 'Food & Catering', subtitle: 'Gourmet Menu', image: require('../../../assets/images/Food.jpg'), screen: 'Food' },
    { id: 'r5', title: 'Photography', subtitle: 'Capture Moments', image: require('../../../assets/images/photo.jpg'), screen: 'Photography' },
    { id: 'r6', title: 'Honeymoon Planning', subtitle: 'Romantic Getaways', image: require('../../../assets/images/honeymoon planning.jpg'), screen: 'Honeymoon' },
];

const Services2 = () => {
    const navigation = useNavigation();
    const searchAnim = useRef(new Animated.Value(0)).current;

    // State
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Filter State
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    const filterCategories = ['All', 'Planning', 'Venue', 'Food', 'Fashion', 'Media', 'Decor', 'Entertainment'];

    // Mapping Services to Categories
    const getCategory = (title) => {
        if (['Event Management', 'Honeymoon', 'Gifts & Returns'].includes(title)) return 'Planning';
        if (['Venues'].includes(title)) return 'Venue';
        if (['Catering'].includes(title)) return 'Food';
        if (['Jewellery', 'Mehandi', 'Makeup'].includes(title)) return 'Fashion';
        if (['Photography', 'E-Invites'].includes(title)) return 'Media';
        if (['Decor'].includes(title)) return 'Decor';
        if (['Entertainment'].includes(title)) return 'Entertainment';
        return 'Other';
    };

    // Countdown & Progress State
    const [configModalVisible, setConfigModalVisible] = useState(false);
    const [weddingDate, setWeddingDate] = useState(new Date()); // Default: Today (0 days left)
    const [bookedServices, setBookedServices] = useState([]); // IDs of booked services (Initially zero)

    // Filter Logic
    const filteredServices = serviceCategories.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.suggestions && item.suggestions.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())));

        if (activeCategory === 'All') return matchesSearch;
        return matchesSearch && getCategory(item.title) === activeCategory;
    });

    const filteredRecommendations = recommendations.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const scrollViewRef = useRef(null);

    // Fade In Animation for Tools
    const toolsFadeAnim = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(toolsFadeAnim, {
            toValue: 1,
            duration: 800,
            delay: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    // Search Animation
    const toggleSearch = () => {
        const toValue = isSearchExpanded ? 0 : 1;
        setIsSearchExpanded(!isSearchExpanded);

        Animated.timing(searchAnim, {
            toValue,
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: false,
        }).start();

        if (isSearchExpanded) setSearchQuery('');
    };

    // Modal Handler
    const handleServicePress = (item) => {
        if (item.suggestions && item.suggestions.length > 0) {
            setSelectedService(item);
            setModalVisible(true);
        } else if (item.screen) {
            navigation.navigate(item.screen, item.params);
        }
    };

    const handleSuggestionPress = (suggestion) => {
        setModalVisible(false);
        if (selectedService?.screen) {
            // Pass suggestion as param if needed, for now just navigate
            navigation.navigate(selectedService.screen, {
                ...selectedService.params,
                suggestion: suggestion.title
            });
        }
    };

    const renderConfigModal = () => {
        const toggleService = (id) => {
            if (bookedServices.includes(id)) {
                setBookedServices(bookedServices.filter(sId => sId !== id));
            } else {
                setBookedServices([...bookedServices, id]);
            }
        };

        const changeDate = (field, value) => {
            const newDate = new Date(weddingDate);
            if (field === 'month') newDate.setMonth(newDate.getMonth() + value);
            if (field === 'day') newDate.setDate(newDate.getDate() + value);
            if (field === 'year') newDate.setFullYear(newDate.getFullYear() + value);
            setWeddingDate(newDate);
        };

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={configModalVisible}
                onRequestClose={() => setConfigModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <BlurView intensity={90} tint="light" style={styles.configModalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Setup Wedding Details</Text>
                            <TouchableOpacity onPress={() => setConfigModalVisible(false)}>
                                <Ionicons name="close" size={24} color={COLORS.maroon} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Date Picker Section */}
                            <Text style={styles.configSectionTitle}>When is the Big Day? 📅</Text>
                            <View style={styles.datePickerContainer}>
                                <View style={styles.dateControl}>
                                    <TouchableOpacity onPress={() => changeDate('day', -1)}><Ionicons name="remove-circle-outline" size={28} color={COLORS.maroon} /></TouchableOpacity>
                                    <Text style={styles.dateValue}>{weddingDate.getDate()}</Text>
                                    <TouchableOpacity onPress={() => changeDate('day', 1)}><Ionicons name="add-circle-outline" size={28} color={COLORS.maroon} /></TouchableOpacity>
                                </View>
                                <View style={styles.dateControl}>
                                    <TouchableOpacity onPress={() => changeDate('month', -1)}><Ionicons name="chevron-back" size={24} color={COLORS.maroon} /></TouchableOpacity>
                                    <Text style={styles.dateValue}>{weddingDate.toLocaleString('default', { month: 'short' })}</Text>
                                    <TouchableOpacity onPress={() => changeDate('month', 1)}><Ionicons name="chevron-forward" size={24} color={COLORS.maroon} /></TouchableOpacity>
                                </View>
                                <View style={styles.dateControl}>
                                    <TouchableOpacity onPress={() => changeDate('year', -1)}><Ionicons name="remove-circle-outline" size={28} color={COLORS.maroon} /></TouchableOpacity>
                                    <Text style={styles.dateValue}>{weddingDate.getFullYear()}</Text>
                                    <TouchableOpacity onPress={() => changeDate('year', 1)}><Ionicons name="add-circle-outline" size={28} color={COLORS.maroon} /></TouchableOpacity>
                                </View>
                            </View>

                            {/* Service Checklist Section */}
                            <Text style={styles.configSectionTitle}>Mark Booked Services ✅</Text>
                            <View style={styles.checklistContainer}>
                                {serviceCategories.map((service) => (
                                    <View key={service.id} style={styles.checklistItem}>
                                        <Text style={styles.checklistLabel}>{service.title}</Text>
                                        <Switch
                                            trackColor={{ false: "#767577", true: COLORS.gold }}
                                            thumbColor={bookedServices.includes(service.id) ? COLORS.maroon : "#f4f3f4"}
                                            onValueChange={() => toggleService(service.id)}
                                            value={bookedServices.includes(service.id)}
                                        />
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.saveConfigButton}
                                onPress={() => setConfigModalVisible(false)}
                            >
                                <Text style={styles.saveConfigText}>Save Details</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </BlurView>
                </View>
            </Modal>
        );
    };

    const renderFilterModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={filterModalVisible}
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <BlurView intensity={90} tint="light" style={styles.configModalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filter Services</Text>
                        <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                            <Ionicons name="close" size={24} color={COLORS.maroon} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.configSectionTitle}>Category</Text>
                        <View style={styles.filterChipContainer}>
                            {filterCategories.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
                                    onPress={() => setActiveCategory(cat)}
                                >
                                    <Text style={[styles.filterChipText, activeCategory === cat && styles.filterChipTextActive]}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.saveConfigButton}
                            onPress={() => setFilterModalVisible(false)}
                        >
                            <Text style={styles.saveConfigText}>Apply Filters</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </BlurView>
            </View>
        </Modal>
    );

    const renderHeader = () => {
        const searchWidth = searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [45, width - 40],
        });

        const titleOpacity = searchAnim.interpolate({
            inputRange: [0, 0.5],
            outputRange: [1, 0],
        });

        return (
            <View style={styles.headerContainer}>
                <Animated.View style={[styles.titleContainer, { opacity: titleOpacity }]}>
                    <Text style={styles.headerTitle}>Services</Text>
                    <Text style={styles.headerSubtitle}>Because every love story deserves perfection</Text>
                </Animated.View>

                <View style={[
                    styles.headerRight,
                    isSearchExpanded && {
                        position: 'absolute',
                        right: 20,
                        top: Platform.OS === 'android' ? 50 : 60,
                        zIndex: 20
                    }
                ]}>
                    <Animated.View style={[styles.searchContainer, { width: searchWidth }, isSearchExpanded && { height: 'auto' }]}>
                        {isSearchExpanded ? (
                            <BlurView intensity={30} tint="light" style={styles.glassSearchExpanded}>
                                <View style={styles.searchRow}>
                                    <Ionicons name="search" size={20} color={COLORS.maroon} style={styles.searchIconInside} />
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder="Search services..."
                                        placeholderTextColor={COLORS.textLight}
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        autoFocus={true}
                                    />
                                    <TouchableOpacity onPress={toggleSearch} style={styles.closeButton}>
                                        <Ionicons name="close-circle" size={20} color={COLORS.textLight} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.suggestionContainer}>
                                    <Text style={styles.suggestionHeader}>Suggestions:</Text>
                                    <View style={styles.suggestionChipsWrapper}>
                                        {serviceCategories
                                            .filter(service => popularSearches.includes(service.title))
                                            .map((service) => (
                                                <TouchableOpacity
                                                    key={service.id}
                                                    style={styles.suggestionItemCircle}
                                                    onPress={() => {
                                                        if (service.screen) {
                                                            toggleSearch(); // Close search
                                                            navigation.navigate(service.screen, service.params);
                                                        } else {
                                                            setSearchQuery(service.title);
                                                        }
                                                    }}
                                                >
                                                    <View style={styles.suggestionIconContainer}>
                                                        <Image
                                                            source={typeof service.icon === 'string' ? { uri: service.icon } : service.icon}
                                                            style={styles.suggestionIconImage}
                                                        />
                                                    </View>
                                                    <Text style={styles.suggestionTextCircle} numberOfLines={1}>{service.title}</Text>
                                                </TouchableOpacity>
                                            ))}
                                    </View>
                                </View>
                            </BlurView>
                        ) : (
                            <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
                                <Ionicons name="search" size={22} color={COLORS.maroon} />
                            </TouchableOpacity>
                        )}
                    </Animated.View>

                    {!isSearchExpanded && (
                        <TouchableOpacity
                            style={[styles.iconButton, { marginLeft: 10 }]}
                            onPress={() => setFilterModalVisible(true)}
                        >
                            <Ionicons name="filter" size={22} color={COLORS.maroon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    const renderProgressTracker = () => {
        const today = new Date();
        const timeDiff = weddingDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const progress = Math.round((bookedServices.length / serviceCategories.length) * 100);

        return (
            <View style={styles.progressSection}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setConfigModalVisible(true)}
                >
                    <LinearGradient
                        colors={[COLORS.maroon, '#500000']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.progressCard}
                    >
                        <View style={styles.progressContent}>
                            <View>
                                <Text style={styles.progressLabel}>Wedding Countdown</Text>
                                <Text style={styles.progressValue}>
                                    {daysLeft > 0 ? `${daysLeft} Days Left` : daysLeft === 0 ? 'Today is the Day!' : 'Just Married!'}
                                </Text>
                            </View>
                            <View style={styles.progressCircle}>
                                <Text style={styles.progressPercent}>{progress}%</Text>
                                <Text style={styles.progressDone}>Done</Text>
                            </View>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, { width: `${progress}%` }]} />
                        </View>
                        <Text style={styles.progressFooter}>
                            {bookedServices.length} of {serviceCategories.length} Services Booked
                            {daysLeft > 0 ? ' • Tap to Edit' : ''}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    };

    const renderRecommendations = () => {
        if (filteredRecommendations.length === 0) return null;

        return (
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {searchQuery ? 'Matching Recommendations' : 'Recommended For You'}
                    </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                    {filteredRecommendations.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.recCard}
                            activeOpacity={0.9}
                            onPress={() => item.screen && navigation.navigate(item.screen, item.params)}
                        >
                            <ImageBackground
                                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                                style={styles.recImage}
                                imageStyle={{ borderRadius: 16 }}
                            >
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                                    style={styles.recGradient}
                                >
                                    <Text style={styles.recTitle}>{item.title}</Text>
                                    <Text style={styles.recSubtitle}>{item.subtitle}</Text>
                                </LinearGradient>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    const renderServiceGrid = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    {searchQuery ? 'Matching Services' : 'All Services'}
                </Text>
                {!searchQuery && <TouchableOpacity><Text style={styles.seeAllText}></Text></TouchableOpacity>}
            </View>

            {filteredServices.length > 0 ? (
                <View style={styles.grid}>
                    {filteredServices.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.gridItem}
                            onPress={() => handleServicePress(item)}
                        >
                            <View style={styles.gridIconContainer}>
                                <Image
                                    source={typeof item.icon === 'string' ? { uri: item.icon } : item.icon}
                                    style={styles.gridIconImage}
                                />
                            </View>
                            <Text style={styles.gridLabel} numberOfLines={1}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <Text style={{ textAlign: 'center', color: '#888', marginTop: 10, fontFamily: 'serif' }}>
                    {searchQuery && filteredRecommendations.length > 0 ? 'No matching services.' : ''}
                </Text>
            )}

            {searchQuery && filteredServices.length === 0 && filteredRecommendations.length === 0 && (
                <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 50 }}>
                    <Ionicons name="search-outline" size={64} color="#ccc" />
                    <Text style={{ marginTop: 10, color: '#888', fontWeight: '500' }}>
                        No results found for "{searchQuery}"
                    </Text>
                </View>
            )}
        </View>
    );

    const renderPlanningTools = () => (
        <Animated.View style={[styles.sectionContainer, { opacity: toolsFadeAnim, transform: [{ translateY: toolsFadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Wedding Tools</Text>
            </View>
            <View style={styles.toolsGrid}>
                {planningTools.map((tool, index) => (
                    <AnimatedToolCard
                        key={tool.id}
                        tool={tool}
                        onPress={() => {
                            // Example interaction
                        }}
                    />
                ))}
            </View>
        </Animated.View>
    );

    const renderSuggestionModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <Pressable style={styles.modalDismiss} onPress={() => setModalVisible(false)} />
                <BlurView intensity={80} tint="light" style={styles.glassModal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{selectedService?.title} Options</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color={COLORS.textMain} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.modalSubtitle}>Select a category to explore:</Text>

                    <View style={styles.suggestionsList}>
                        {selectedService?.suggestions?.map((suggestion) => (
                            <TouchableOpacity
                                key={suggestion.id}
                                style={styles.suggestionItem}
                                onPress={() => handleSuggestionPress(suggestion)}
                            >
                                <View style={[styles.suggestionIcon, { backgroundColor: COLORS.ivory }]}>
                                    <Ionicons name={suggestion.icon} size={24} color={COLORS.maroon} />
                                </View>
                                <Text style={styles.suggestionText}>{suggestion.title}</Text>
                                <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} />
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => {
                                setModalVisible(false);
                                if (selectedService?.screen) navigation.navigate(selectedService.screen, selectedService.params);
                            }}
                        >
                            <Text style={styles.viewAllBtnText}>View All {selectedService?.title}</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            {renderHeader()}

            <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {renderProgressTracker()}
                {renderRecommendations()}
                {renderServiceGrid()}
                {renderPlanningTools()}
            </ScrollView>

            {/* Configuration Modal */}
            {renderConfigModal()}

            {/* Filter Modal */}
            {renderFilterModal()}

            {/* Service Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <BlurView intensity={90} tint="light" style={styles.glassModal}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectedService?.title} Options</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
                                <Ionicons name="close" size={24} color={COLORS.maroon} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalSubtitle}>Select a category to explore:</Text>

                        <ScrollView contentContainerStyle={styles.modalGrid}>
                            {selectedService?.suggestions?.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.modalItem}
                                    onPress={() => handleSuggestionPress(item)}
                                >
                                    <View style={styles.modalIconContainer}>
                                        <Ionicons name={item.icon} size={28} color={COLORS.maroon} />
                                    </View>
                                    <Text style={styles.modalItemText}>{item.title}</Text>
                                    <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.viewAllButton}
                            onPress={() => {
                                setModalVisible(false);
                                if (selectedService?.screen) navigation.navigate(selectedService.screen, selectedService.params);
                            }}
                        >
                            <Text style={styles.viewAllText}>View All {selectedService?.title}</Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.ivory, // Ivory Background
    },
    scrollView: {
        flex: 1,
    },

    // Header
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.ivory,
        zIndex: 100,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.maroon,
        fontFamily: 'serif',
    },
    headerSubtitle: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flex: 1, // Removed to let title take more space
    },
    searchContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    glassSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.gold, // Gold Border
        flex: 1,
        paddingHorizontal: 12,
        width: '100%',
    },
    glassSearchExpanded: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.gold,
        width: '100%',
        padding: 10,
        overflow: 'hidden',
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        paddingBottom: 8,
        marginBottom: 8,
    },
    suggestionContainer: {
        paddingTop: 5,
    },
    suggestionHeader: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 8,
        marginLeft: 4,
        fontWeight: '600',
    },
    suggestionChipsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribute evenly
        paddingHorizontal: 5,
    },
    suggestionItemCircle: {
        alignItems: 'center',
        marginBottom: 15,
        width: '30%', // 3 items per row approx
    },
    suggestionIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: COLORS.gold,
    },
    suggestionIconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    suggestionTextCircle: {
        fontSize: 11,
        color: COLORS.textMain,
        fontWeight: '600',
        textAlign: 'center',
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textMain,
        paddingVertical: 5,
        marginLeft: 8,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        elevation: 2,
        shadowColor: COLORS.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    // Progress
    progressSection: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    progressCard: {
        borderRadius: 25,
        padding: 20,
        elevation: 6,
        shadowColor: COLORS.maroon,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    progressContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    progressLabel: {
        color: COLORS.gold,
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    progressValue: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 4,
    },
    progressCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: COLORS.gold,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    progressPercent: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    progressDone: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        marginBottom: 8,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.gold,
        borderRadius: 4,
    },
    progressFooter: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        fontWeight: '500',
    },

    // Recommendations
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.textMain,
        fontFamily: 'serif',
    },
    seeAllText: {
        fontSize: 14,
        color: COLORS.maroon,
        fontWeight: '600',
    },
    horizontalScroll: {
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    recCard: {
        width: 200,
        height: 250, // Vertical Stance
        marginRight: 15,
        borderRadius: 24, // More rounded
        elevation: 4,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        overflow: 'hidden', // Added to clip image
    },
    recImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    recGradient: {
        padding: 15,
        paddingTop: 40,
    },
    recTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recSubtitle: {
        color: COLORS.gold,
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
    },

    // Grid (Circular)
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
    },
    gridItem: {
        width: '25%',
        alignItems: 'center',
        marginBottom: 20,
    },
    gridIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: COLORS.gold,
    },
    gridIconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    gridLabel: {
        fontSize: 11,
        color: COLORS.textMain,
        textAlign: 'center',
        fontWeight: '600',
        maxWidth: 70,
    },

    // Tools
    toolsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    // Config Modal
    configModalContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 100, // Sheet style
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        paddingBottom: 40,
        elevation: 20,
    },
    configSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginTop: 20,
        marginBottom: 15,
        fontFamily: 'serif',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.gold,
    },
    dateControl: {
        alignItems: 'center',
    },
    dateValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.maroon,
        marginVertical: 5,
    },
    checklistContainer: {
        backgroundColor: '#FFF',
    },
    checklistItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    filterChipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    filterChip: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    filterChipActive: {
        backgroundColor: COLORS.maroon,
        borderColor: COLORS.maroon,
    },
    filterChipText: {
        fontSize: 14,
        color: COLORS.textMain,
    },
    filterChipTextActive: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    checklistLabel: {
        fontSize: 16,
        color: COLORS.textMain,
    },
    saveConfigButton: {
        backgroundColor: COLORS.maroon,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50,
        elevation: 5,
    },
    saveConfigText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toolCardWrapper: {
        width: '48%',
        marginBottom: 15,
    },
    toolCard: {
        borderRadius: 24,
        padding: 20,
        height: 160,
        justifyContent: 'space-between',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    toolIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    toolTextContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    toolTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 4,
        fontFamily: 'serif',
    },
    toolDesc: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: '500',
        opacity: 0.8,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalDismiss: {
        flex: 1,
    },
    glassModal: {
        backgroundColor: 'rgba(255,255,255,0.95)', // Whiter background
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        overflow: 'hidden',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.maroon,
        fontFamily: 'serif',
    },
    modalSubtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 20,
    },
    closeModalButton: {
        padding: 5,
    },
    modalGrid: {
        paddingBottom: 20,
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    modalIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFEBEE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    modalItemText: {
        fontSize: 16,
        color: COLORS.textMain,
        fontWeight: '600',
        flex: 1,
    },
    viewAllButton: {
        backgroundColor: COLORS.maroon,
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    viewAllText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    suggestionsList: {
        marginBottom: 20,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    suggestionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    suggestionText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textMain,
        fontWeight: '500',
    },
    // Remapping duplications if any, keeping unique styles
});

export default Services2;
