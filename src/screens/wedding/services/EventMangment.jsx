import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    LayoutAnimation,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    useWindowDimensions,
    View
} from 'react-native';
import Reanimated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// Team Card Constants
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // Increased width for better visibility
const SPACING = 15;
const SIDECARD_LENGTH = (width - CARD_WIDTH) / 2;

const COLORS = {
    kumkum: '#A70002',
    akshid: '#FFFFE4',
    textRed: '#CC0E0E',
    haldi: '#F3D870',
    darkHaldi: '#f29502',
};

const EventManagement = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [expandedService, setExpandedService] = useState(null);

    // Scroll Animation for Team Section
    const scrollX = useRef(new Animated.Value(0)).current;

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const scrollViewRef = useAnimatedRef();
    const teamSectionY = useSharedValue(0);

    const scrollToTeam = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: teamSectionY.value, animated: true });
        }
    };

    const toggleService = (id) => {
        if (Platform.OS !== 'web') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        setExpandedService(expandedService === id ? null : id);
    };

    const renderScrollContent = () => (
        <>
            {/* 1. Hero Section */}
            <View style={styles.heroSection}>
                <Video
                    source={require('../../../../assets/EventMimg/EventV.mp4')}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                    isLooping
                    shouldPlay
                    isMuted
                />

                {/* Header with Back Button */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.heroContent}>
                    <Text style={styles.heroHeadline}>We Don’t Just Plan Events — We Create Experiences ✨</Text>
                    <Text style={styles.heroSubtext}>Weddings • Social Events • Corporate Experiences • Destination Events</Text>

                    <TouchableOpacity style={styles.primaryCTA} onPress={scrollToTeam}>
                        <Text style={styles.ctaText}>💬 Plan My Event</Text>
                    </TouchableOpacity>

                    {/* Trust Highlights */}
                    <View style={styles.trustRow}>
                        <TrustItem icon="calendar-check" text="1,000+ Events" />
                        <TrustItem icon="users" text="Expert Managers" />
                        <TrustItem icon="star" text="Satisfaction Guaranteed" />
                    </View>
                </View>
            </View>

            {/* 2. Process Section */}
            <View style={styles.sectionContainer}>
                <AnimatedSectionHeader
                    scrollY={scrollY}
                    title="Our Event Planning Process"
                    subtitle="From Vision to Reality"
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                    <ProcessStep scrollY={scrollY} step="1" title="Understanding Your Vision" desc="Theme, budget, and guest experience planning." isLast={false} color={COLORS.textRed} stringHeight={20} />
                    <ProcessStep scrollY={scrollY} step="2" title="Design & Concept" desc="Mood boards, layouts, and flow visualization." isLast={false} color="#00BCD4" stringHeight={60} />
                    <ProcessStep scrollY={scrollY} step="3" title="Vendor Curation" desc="Sourcing the best venues, food, and artists." isLast={false} color={COLORS.darkHaldi} stringHeight={40} />
                    <ProcessStep scrollY={scrollY} step="4" title="Execution" desc="On-ground team managing every detail flawlessly." isLast={true} color="#673AB7" stringHeight={70} />
                </ScrollView>
            </View>

            {/* 3. Services We Manage (Accordion) */}
            <View style={[styles.sectionContainer, { backgroundColor: COLORS.akshid }]}>
                <Text style={styles.sectionTitle}>Services We Manage</Text>

                {servicesData.map((service) => (
                    <ServiceItem
                        key={service.id}
                        item={service}
                        expanded={expandedService === service.id}
                        onPress={() => toggleService(service.id)}
                    />
                ))}
            </View>

            {/* 4. Real Stories */}
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Real Events, Real Stories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScroll}>
                    <StoryCard
                        image={require('../../../../assets/images/decor.jpg')}
                        title="Royal Jaipur Wedding"
                        quote="Everything felt effortless — they handled it all."
                    />
                    <StoryCard
                        image={require('../../../../assets/images/entertenment.jpg')}
                        title="Sangeet Night"
                        quote="The best musical experience we ever had!"
                    />
                    <StoryCard
                        image={require('../../../../assets/images/Food.jpg')}
                        title="Grand Reception"
                        quote="Food and hospitality were top notch."
                    />
                </ScrollView>
            </View>

            {/* 5. Meet Your Team (Revamped) */}
            <View
                style={[styles.sectionContainer, { backgroundColor: '#fff', paddingBottom: 40 }]}
                onLayout={(event) => {
                    teamSectionY.value = event.nativeEvent.layout.y;
                }}
            >
                <View style={styles.sectionHeaderCentered}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.6, marginTop: 5 }}>
                        <View style={{ height: 1, backgroundColor: COLORS.haldi, width: 40, marginRight: 10 }} />
                        <FontAwesome5 name="spa" size={14} color={COLORS.haldi} />
                        <View style={{ height: 1, backgroundColor: COLORS.haldi, width: 40, marginLeft: 10 }} />
                    </View>
                </View>

                <Animated.FlatList
                    data={teamData}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH + SPACING * 2}
                    decelerationRate="fast"
                    contentContainerStyle={{
                        paddingHorizontal: SIDECARD_LENGTH - SPACING,
                        paddingBottom: 20
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        const inputRange = [
                            (index - 1) * (CARD_WIDTH + SPACING * 2),
                            index * (CARD_WIDTH + SPACING * 2),
                            (index + 1) * (CARD_WIDTH + SPACING * 2),
                        ];

                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 1.1, 0.9], // Center card scales up to 1.1x
                            extrapolate: 'clamp',
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.6, 1, 0.6], // Side cards fade out
                            extrapolate: 'clamp',
                        });

                        return (
                            <TeamCard
                                item={item}
                                scale={scale}
                                opacity={opacity}
                            />
                        );
                    }}
                />
            </View>

            {/* 6. Emotional Storytelling */}
            <View style={styles.emotionalSection}>
                <Text style={styles.emotionalText}>“Your moments matter.</Text>
                <Text style={styles.emotionalText}>We take care of everything, so you can live them fully.” 💫</Text>
            </View>

            {/* Space for bottom CTA */}
            <View style={{ height: 100 }} />
        </>
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.akshid} />

                {Platform.OS === 'web' ? (
                    <ScrollView
                        ref={scrollViewRef}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        onScroll={(e) => {
                            scrollY.value = e.nativeEvent.contentOffset.y;
                        }}
                        scrollEventThrottle={16}
                    >
                        {renderScrollContent()}
                    </ScrollView>
                ) : (
                    <Reanimated.ScrollView
                        ref={scrollViewRef}
                        onScroll={scrollHandler}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {renderScrollContent()}
                    </Reanimated.ScrollView>
                )}
            </View>
        </View>

    );
};

// --- Components ---

const TeamCard = ({ item, scale, opacity }) => {
    const [liked, setLiked] = useState(false);
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={{ width: CARD_WIDTH, marginHorizontal: SPACING }}
        >
            <Animated.View style={[styles.teamCardContainer, { transform: [{ scale }], opacity }]}>
                {/* Full Image Background */}
                <Image
                    source={item.image}
                    style={styles.teamImageBg}
                    resizeMode="cover"
                />

                {/* Top Row: Rating & Heart */}
                <View style={styles.cardTopRow}>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>

                {/* Bottom Overlay */}
                <View style={styles.cardBottomOverlay}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome5 name={item.roleIcon} size={10} color={COLORS.darkHaldi} style={{ marginRight: 5 }} />
                            <Text style={styles.cardSubtitle}>{item.role}</Text>
                        </View>
                        <Text style={styles.cardPrice}>{item.experience}</Text>
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

// Reused components from before...
const TrustItem = ({ icon, text }) => (
    <View style={styles.trustItem}>
        <View style={styles.trustIconCircle}>
            <FontAwesome5 name={icon} size={24} color={COLORS.kumkum} />
        </View>
        <Text style={styles.trustText}>{text}</Text>
    </View>
);

const ProcessStep = ({ step, title, desc, isLast, scrollY, color, stringHeight }) => {
    // Shared value for Y position of this item
    const itemY = useSharedValue(0);
    const hasTriggered = useSharedValue(false);

    const { height: screenHeight } = useWindowDimensions();

    const rStyle = useAnimatedStyle(() => {
        const viewportBottom = scrollY.value + screenHeight;
        const triggerPoint = viewportBottom - 100;

        if (triggerPoint > itemY.value && itemY.value !== 0 && !hasTriggered.value) {
            hasTriggered.value = true;
        }

        return {
            opacity: withTiming(hasTriggered.value ? 1 : 0, { duration: 800 }),
            transform: [{
                translateY: withTiming(hasTriggered.value ? 0 : 20, { duration: 800 })
            }],
        };
    });

    // Bell & Chain Animation (Swing)
    const rIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: withTiming(hasTriggered.value ? 1 : 0.8, { duration: 600 }) },
                { rotate: withTiming(hasTriggered.value ? '0deg' : '10deg', { duration: 1500 }) } // Bell swing
            ]
        };
    });

    const rTextStyle = useAnimatedStyle(() => {
        return {
            opacity: withDelay(150, withTiming(hasTriggered.value ? 1 : 0, { duration: 600 })),
            transform: [{ translateY: withDelay(150, withTiming(hasTriggered.value ? 0 : 10, { duration: 600 })) }]
        };
    });

    // Conditional Wrapper for Web Compatibility
    const Container = Platform.OS === 'web' ? View : Reanimated.View;
    const IconContainer = Platform.OS === 'web' ? View : Reanimated.View;
    const TextContainer = Platform.OS === 'web' ? View : Reanimated.View;

    // Web-safe styles: remove animated styles on web
    const containerStyle = Platform.OS === 'web' ? styles.processStepContainer : [styles.processStepContainer, rStyle];
    const iconStyle = Platform.OS === 'web' ? [styles.processIconCenter, { height: 'auto', marginBottom: 15 }] : [styles.processIconCenter, rIconStyle, { height: 'auto', marginBottom: 15 }];
    const textStyle = Platform.OS === 'web' ? styles.processTextBottom : [styles.processTextBottom, rTextStyle];

    return (
        <Container
            onLayout={(e) => {
                // Only track layout if needed for animations (Native) or if checking visibility
                itemY.value = e.nativeEvent.layout.y + 580;
            }}
            style={containerStyle}
        >
            {/* The Hook (Top anchor) */}
            <View style={{ position: 'absolute', top: -45, left: '50%', marginLeft: -10, zIndex: -1 }}>
                <MaterialCommunityIcons name="hook" size={20} color={COLORS.haldi} style={{ transform: [{ rotate: '-90deg' }] }} />
            </View>

            {/* Hanging Chain */}
            <View style={{
                position: 'absolute',
                top: -25,
                left: '50%',
                marginLeft: -2,
                width: 4,
                height: stringHeight + 55,
                // Chain effect - dashed looks like links
                borderLeftWidth: 4,
                borderLeftColor: COLORS.haldi, // Matching Bell
                borderStyle: 'dashed',
                zIndex: -1,
                alignItems: 'center',
            }}>
                {/* Decorative Links/Knots on Chain */}
                <View style={{
                    position: 'absolute', top: '20%',
                    width: 8, height: 12, borderRadius: 4,
                    backgroundColor: COLORS.textRed, elevation: 1
                }} />
                <View style={{
                    position: 'absolute', top: '50%',
                    width: 8, height: 12, borderRadius: 4,
                    backgroundColor: COLORS.textRed, elevation: 1
                }} />
                <View style={{
                    position: 'absolute', top: '80%',
                    width: 8, height: 12, borderRadius: 4,
                    backgroundColor: COLORS.textRed, elevation: 1
                }} />
            </View>

            {/* Spacer */}
            <View style={{ height: stringHeight }} />

            {/* Gold Bell Icon Area */}
            <IconContainer style={iconStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    {/* Ring/Loop at top of bell */}
                    <View style={{ width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: '#B8860B', marginBottom: -5, zIndex: 1, backgroundColor: COLORS.haldi }} />

                    {/* The Gold Bell */}
                    <MaterialCommunityIcons name="bell" size={60} color={COLORS.haldi} style={{
                        shadowColor: '#B8860B', shadowOpacity: 0.8, shadowRadius: 5, elevation: 6
                    }} />

                    {/* Number Badge (On the bell body) */}
                    <View style={{
                        position: 'absolute',
                        top: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(184, 134, 11, 0.1)', // Subtle shading
                        width: 30, height: 30, borderRadius: 15
                    }}>
                        <Text style={{
                            color: COLORS.textRed, // User specified Red text
                            fontWeight: 'bold',
                            fontSize: 16,
                            textShadowColor: 'rgba(255,255,255,0.3)', textShadowRadius: 1
                        }}>{step}</Text>
                    </View>
                </View>
            </IconContainer>

            {/* Text Content */}
            <TextContainer style={textStyle}>
                <Text style={[styles.processTitle, { color: COLORS.textRed, marginBottom: 4, fontSize: 15 }]}>{title}</Text>
                <Text style={styles.processDesc}>{desc}</Text>
            </TextContainer>
        </Container>
    );
};

const ServiceItem = ({ item, expanded, onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5 name={item.icon} size={20} color={COLORS.kumkum} style={{ width: 30 }} />
                <Text style={styles.serviceTitle}>{item.title}</Text>
            </View>
            <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#666" />
        </View>
        {expanded && (
            <View style={styles.serviceBody}>
                {item.details.map((detail, idx) => (
                    <Text key={idx} style={styles.serviceDetail}>• {detail}</Text>
                ))}
            </View>
        )}
    </TouchableOpacity>
);

const StoryCard = ({ image, title, quote }) => (
    <View style={styles.storyCard}>
        <Image source={image} style={styles.storyImage} />
        <View style={styles.storyContent}>
            <Text style={styles.storyTitle}>{title}</Text>
            <Text style={styles.storyQuote}>"{quote}"</Text>
        </View>
    </View>
);


const AnimatedSectionHeader = ({ title, subtitle, scrollY }) => {
    const itemY = useSharedValue(0);
    const hasTriggered = useSharedValue(false);

    const { height: screenHeight } = useWindowDimensions();

    const rStyle = useAnimatedStyle(() => {
        const viewportBottom = scrollY.value + screenHeight;
        const triggerPoint = viewportBottom - 100;

        if (triggerPoint > itemY.value && itemY.value !== 0 && !hasTriggered.value) {
            hasTriggered.value = true;
        }

        return {
            opacity: withTiming(hasTriggered.value ? 1 : 0, { duration: 800 }),
            transform: [{
                translateY: withTiming(hasTriggered.value ? 0 : 20, { duration: 800 })
            }],
        };
    });

    return (
        <Reanimated.View
            onLayout={(e) => {
                // Same heuristic/logic as ProcessStep since they are in the same scroll context
                itemY.value = e.nativeEvent.layout.y + 580;
            }}
            style={[rStyle, { marginBottom: 20 }]}
        >
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </Reanimated.View>
    );
};


// --- Data ---
const servicesData = [
    { id: '1', title: 'Venue Sourcing', icon: 'building', details: ['Shortlisting best venues', 'Negotiation & Booking', 'Layout Planning'] },
    { id: '2', title: 'Decor & Styling', icon: 'paint-brush', details: ['Theme-based decor', 'Floral & Lighting', 'Custom Installations'] },
    { id: '3', title: 'Food & Hospitality', icon: 'utensils', details: ['Catering coordination', 'Menu curation', 'VIP Management'] },
    { id: '4', title: 'Entertainment', icon: 'music', details: ['DJs & Live Bands', 'Celebrity Bookings', 'Sound & Tech'] },
    { id: '5', title: 'Logistics', icon: 'bus', details: ['Transport management', 'Vendor coordination', 'On-ground support'] },
];

const teamData = [
    {
        id: '1',
        name: 'Aarav Planner',
        role: 'Event Planner',
        roleIcon: 'clipboard-list',
        experience: '10+ Years',
        rating: '4.9',
        phone: '9876543210',
        image: require('../../../../assets/images/decor.jpg')
    },
    {
        id: '2',
        name: 'Sneha Event Management',
        role: 'Event Planner',
        roleIcon: 'palette',
        experience: '8+ Years',
        rating: '4.8',
        phone: '9876543211',
        image: require('../../../../assets/images/decor.jpg')
    },
    {
        id: '3',
        name: 'Rohan Event Management',
        role: 'Event Planner',
        roleIcon: 'cogs',
        experience: '6+ Years',
        rating: '4.7',
        phone: '9876543212',
        image: require('../../../../assets/images/decor.jpg')
    },
    {
        id: '4',
        name: 'Priya Event Management',
        role: 'Event Planner',
        roleIcon: 'users',
        experience: '5+ Years',
        rating: '4.9',
        phone: '9876543213',
        image: require('../../../../assets/images/decor.jpg')
    },
];


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.akshid,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    heroSection: {
        height: 500,
        justifyContent: 'flex-end',
    },
    heroContent: {
        padding: 20,
        paddingBottom: 40,
    },
    headerRow: {
        position: 'absolute',
        top: 20, // Adjusted top margin
        left: 20,
        zIndex: 10
    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    },
    heroHeadline: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'serif',
        marginBottom: 10,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    heroSubtext: {
        fontSize: 14,
        color: '#f0f0f0',
        marginBottom: 20,
        fontWeight: '500',
    },
    primaryCTA: {
        backgroundColor: COLORS.kumkum,
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 5,
        shadowColor: COLORS.kumkum,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 }
    },
    ctaText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    trustRow: {
        position: 'absolute',
        bottom: -60, // Moved down further
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 20, // ensure above hero and next section items
    },
    trustItem: {
        alignItems: 'center',
        width: 90,
    },
    trustIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        marginBottom: 8,
        borderWidth: 1.5,
        borderColor: COLORS.haldi,
    },
    trustText: {
        color: '#333',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'transparent',
    },

    // Section Common
    sectionContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingTop: 80, // Increased space for the overlapping trust icons
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },

    // Process - Horizontal Redesign
    processStepContainer: {
        alignItems: 'center',
        width: 160,
        marginRight: 15,
    },
    processIconCenter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    // processTextTop removed
    // stepCircle, stepNum, stepLine removed
    processTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    processDesc: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
    },

    // Services
    serviceCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    serviceBody: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f5f5f5',
    },
    serviceDetail: {
        fontSize: 13,
        color: '#555',
        marginBottom: 5,
        paddingLeft: 10,
    },

    // Stories
    storiesScroll: {
        marginTop: 10,
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    storyCard: {
        width: 250,
        marginRight: 15,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },
    storyImage: {
        width: '100%',
        height: 140,
    },
    storyContent: {
        padding: 15,
    },
    storyTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    storyQuote: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#666',
    },

    // TEAM SECTION - NEW STYLES
    sectionHeaderCentered: {
        alignItems: 'center',
        marginBottom: 25,
    },
    sectionTitleCenter: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E1E2D',
        fontFamily: 'serif',
        marginBottom: 5,
        textAlign: 'center',
    },
    sectionSubtitleCenter: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
        marginBottom: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    dividerDivider: {
        width: 150,
        height: 20,
        tintColor: '#D4AF37', // Gold
        opacity: 0.8,
    },
    teamCardContainer: {
        width: '100%',
        height: 380, // Taller card for image
        borderRadius: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    teamImageBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        zIndex: 10,
    },
    ratingBadge: {
        backgroundColor: '#F29502',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    heartBtn: {
        backgroundColor: '#fff',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBottomOverlay: {
        position: 'absolute',
        bottom: 15,
        left: 15,
        right: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textRed,
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    cardPrice: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.kumkum,
        marginTop: 4,
    },
    bookBtn: {
        backgroundColor: COLORS.kumkum,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    bookBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // Emotional
    emotionalSection: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
    },
    emotionalText: {
        fontSize: 18,
        fontFamily: 'serif',
        color: '#333',
        textAlign: 'center',
        lineHeight: 28,
        fontStyle: 'italic',
    },

    // Sticky Bottom
    stickyBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        alignItems: 'center',
    },
    stickyBtnPrimary: {
        flex: 1,
        backgroundColor: '#A70002',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 10,
    },
    stickyTextPrimary: {
        color: '#fff',
        fontWeight: 'bold',
    },
    stickyBtnSecondary: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A70002',
    },
});

export default EventManagement;
