import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 300; // Slightly taller for more elegance
const CARD_MARGIN = 60; // Tighter margin
const FULL_CARD_HEIGHT = CARD_HEIGHT + CARD_MARGIN;
const CARD_WIDTH = (width / 2) - 25;

// Data ordered to achieve the column layout
const inviteTypes = [
    {
        id: '1',
        title: 'Ring Ceremony',
        subtitle: 'The Promise',
        image: require('../../../../assets/EventMimg/Einvite/Ring.png'),
        icon: 'ring',
        accentColor: '#FF69B4',
        theme: ['rgba(255, 105, 180, 0.6)', 'rgba(75, 0, 130, 0.4)']
    },
    {
        id: '2',
        title: 'Haldi',
        subtitle: 'Golden Hue',
        image: require('../../../../assets/EventMimg/Einvite/Haldi.png'),
        icon: 'sunny',
        accentColor: '#FFD700',
        theme: ['rgba(255, 215, 0, 0.6)', 'rgba(255, 140, 0, 0.4)']
    },
    {
        id: '3',
        title: 'Sangeet',
        subtitle: 'Melodic Night',
        image: require('../../../../assets/EventMimg/Einvite/Sanget.png'),
        icon: 'musical-notes',
        accentColor: '#4B0082',
        theme: ['rgba(75, 0, 130, 0.6)', 'rgba(138, 43, 226, 0.4)']
    },
    {
        id: '4',
        title: 'Mehndi',
        subtitle: 'Artistic Henna',
        image: require('../../../../assets/EventMimg/Einvite/Mehandi.png'),
        icon: 'brush',
        accentColor: '#228B22',
        theme: ['rgba(34, 139, 34, 0.6)', 'rgba(0, 100, 0, 0.4)']
    },
    {
        id: '5',
        title: 'Wedding',
        subtitle: 'Eternal Union',
        image: require('../../../../assets/EventMimg/Einvite/wedding.png'),
        icon: 'heart',
        accentColor: '#CC0E0E',
        theme: ['rgba(204, 14, 14, 0.6)', 'rgba(128, 0, 0, 0.4)']
    },
    {
        id: '6',
        title: 'Reception',
        subtitle: 'Grand Celebration',
        image: require('../../../../assets/EventMimg/Einvite/Reception.png'),
        icon: 'wine',
        accentColor: '#000080',
        theme: ['rgba(0, 0, 128, 0.6)', 'rgba(0, 0, 50, 0.4)']
    }
];

const InviteCard = React.memo(({ item, index, scrollY, navigation }) => {
    // Calculated position based on grid logic
    const isRightColumn = index % 2 !== 0;
    const staggerOffset = isRightColumn ? (FULL_CARD_HEIGHT / 2) : 0;
    const row = Math.floor(index / 2);
    const cardCenterY = (row * FULL_CARD_HEIGHT) + (CARD_HEIGHT / 2) + 10 + staggerOffset;

    const shimmerValue = useSharedValue(-1);

    useEffect(() => {
        shimmerValue.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
            -1,
            false
        );
    }, []);

    const rStyle = useAnimatedStyle(() => {
        const viewportTarget = scrollY.value + (height * 0.45);
        const distanceFromCenter = viewportTarget - cardCenterY;

        // Enhanced 3D Tilt & Z-Perspective
        const rotateX = interpolate(
            distanceFromCenter,
            [-height * 0.5, 0, height * 0.5],
            [20, 0, -20],
            Extrapolate.CLAMP
        );

        const rotateY = interpolate(
            distanceFromCenter,
            [-height * 0.5, 0, height * 0.5],
            [-5, 0, 5],
            Extrapolate.CLAMP
        );

        const translateZ = interpolate(
            Math.abs(distanceFromCenter),
            [0, height * 0.4],
            [50, -20],
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            Math.abs(distanceFromCenter),
            [0, height * 0.4],
            [1.08, 0.85],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            Math.abs(distanceFromCenter),
            [0, height * 0.5],
            [1, 0.6],
            Extrapolate.CLAMP
        );

        return {
            transform: [
                { translateY: staggerOffset },
                { perspective: 1200 },
                { rotateX: `${rotateX}deg` },
                { rotateY: `${rotateY}deg` },
                { scale },
                { translateZ }
            ],
            opacity
        };
    });

    // Light Refraction Beam (Moving highlight)
    const rShimmerStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            shimmerValue.value,
            [-1, 1],
            [-CARD_WIDTH * 1.5, CARD_WIDTH * 1.5]
        );
        return {
            transform: [{ translateX }, { rotate: '35deg' }]
        };
    });

    const rImageStyle = useAnimatedStyle(() => {
        const viewportCenter = scrollY.value + (height / 2);
        const distanceFromCenter = viewportCenter - cardCenterY;

        const translateY = interpolate(
            distanceFromCenter,
            [-height, height],
            [-25, 25],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }, { scale: 1.15 }]
        };
    });

    const handlePress = () => {
        let screenName = 'InviteStudioScreen';
        switch (item.title) {
            case 'Haldi': screenName = 'HaldiInviteScreen'; break;
            case 'Sangeet': screenName = 'SangitInviteScreen'; break;
            case 'Mehndi': screenName = 'MehndiInviteScreen'; break;
            case 'Wedding': screenName = 'WeddingInviteScreen'; break;
            case 'Reception': screenName = 'ReceptionInviteScreen'; break;
            default: screenName = 'InviteStudioScreen'; break;
        }
        navigation.navigate(screenName, { eventType: item.title });
    };

    return (
        <Animated.View style={[styles.cardWrapper, rStyle]}>
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={handlePress}
                style={styles.cardInner}
            >
                {/* 3D Liquid Glass Body */}
                <BlurView intensity={45} tint="light" style={StyleSheet.absoluteFill}>
                    <LinearGradient
                        colors={['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={[styles.innerGlow, { borderColor: item.accentColor + '30' }]} />

                    <View style={styles.imageContainer}>
                        <Animated.Image
                            source={item.image}
                            style={[StyleSheet.absoluteFillObject, styles.cardImage, rImageStyle]}
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.5)']}
                            style={StyleSheet.absoluteFill}
                        />
                    </View>

                    <View style={styles.cardContent}>
                        <View style={[styles.iconCircle, { backgroundColor: item.accentColor + '15', borderColor: item.accentColor + '40' }]}>
                            <Ionicons name={item.icon} size={18} color={item.accentColor} />
                        </View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </View>

                    <Animated.View style={[styles.glassRefraction, rShimmerStyle]}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.5)', 'transparent']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFill}
                        />
                    </Animated.View>
                </BlurView>
            </TouchableOpacity>
        </Animated.View>
    );
});

const AuraBlob = ({ color, index, size, top, left, bottom, right }) => {
    const anim = useSharedValue(0);
    useEffect(() => {
        anim.value = withRepeat(
            withTiming(1, { duration: 12000 + index * 2000, easing: Easing.inOut(Easing.sin) }),
            -1,
            true
        );
    }, []);

    const rStyle = useAnimatedStyle(() => {
        const translateX = interpolate(anim.value, [0, 1], [-50, 50]);
        const translateY = interpolate(anim.value, [0, 1], [-30, 80]);
        const scale = interpolate(anim.value, [0, 1], [1, 1.3]);
        return { transform: [{ translateX }, { translateY }, { scale }] };
    });

    return (
        <Animated.View style={[
            styles.aura,
            { backgroundColor: color, width: size, height: size, borderRadius: size / 2, top, left, bottom, right },
            rStyle
        ]} />
    );
};

const BackgroundAura = () => {
    const auras = [
        { color: '#FFD700', size: 400, top: '10%', left: '-10%' },
        { color: '#FF69B4', size: 350, bottom: '20%', right: '-10%' },
        { color: '#4B0082', size: 450, top: '40%', right: '10%' },
        { color: '#CC0E0E', size: 380, bottom: '5%', left: '20%' },
    ];

    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient colors={['#FDFCF0', '#FFF8F0', '#FFF5EE']} style={StyleSheet.absoluteFill} />
            {auras.map((aura, i) => <AuraBlob key={i} index={i} {...aura} />)}
            <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        </View>
    );
};

const EInvite = ({ navigation }) => {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" transparent />
                <BackgroundAura />

                <View style={styles.headerContainer}>
                    <BlurView intensity={20} tint="light" style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={22} color="#5C3332" />
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerTitle}>Studio</Text>
                            <Text style={styles.headerSubtitle}>AI CRAFTED INVITES</Text>
                        </View>
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="options-outline" size={22} color="#5C3332" />
                        </TouchableOpacity>
                    </BlurView>
                </View>

                <Animated.FlatList
                    data={inviteTypes}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <InviteCard item={item} index={index} scrollY={scrollY} navigation={navigation} />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFCF0',
    },
    aura: {
        position: 'absolute',
        opacity: 0.15,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.1)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        color: '#332121',
        fontFamily: 'PlayfairDisplay_700Bold',
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 9,
        color: '#8A6E6E',
        fontFamily: 'Outfit_600SemiBold',
        letterSpacing: 3,
        marginTop: -2,
    },
    listContent: {
        paddingTop: 140,
        paddingBottom: height * 0.4,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginBottom: CARD_MARGIN,
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 25,
        elevation: 15,
    },
    cardInner: {
        flex: 1,
        borderRadius: 32,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    innerGlow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
        borderWidth: 1,
        margin: 2,
    },
    imageContainer: {
        height: '62%',
        width: '100%',
        overflow: 'hidden',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardContent: {
        padding: 16,
        paddingTop: 12,
        alignItems: 'center',
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 14,
        color: '#1a1a1a',
        fontFamily: 'Outfit_700Bold',
        letterSpacing: 0.2,
    },
    cardSubtitle: {
        fontSize: 10,
        color: '#666',
        fontFamily: 'Outfit_400Regular',
        marginTop: 1,
    },
    glassRefraction: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 100,
        opacity: 0.6,
    },
});

export default EInvite;
