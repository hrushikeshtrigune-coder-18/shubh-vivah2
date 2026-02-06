import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 280;
const CARD_MARGIN = 95;
const FULL_CARD_HEIGHT = CARD_HEIGHT + CARD_MARGIN;
const CARD_WIDTH = (width / 2) - 25;

// Data ordered to achieve the column layout:
// Left: Ring, Sangeet, Wedding
// Right: Haldi, Mehndi, Reception
// Order in array: Ring, Haldi, Sangeet, Mehndi, Wedding, Reception
const inviteTypes = [
    {
        id: '1',
        title: 'Ring Ceremony',
        subtitle: 'Engagement',
        image: require('../../../../assets/EventMimg/Einvite/Ring.png'),
        icon: 'ring',
        overlayColor: 'rgba(255, 105, 180, 0.2)'
    },
    {
        id: '2',
        title: 'Haldi',
        subtitle: 'Yellow Hue',
        image: require('../../../../assets/EventMimg/Einvite/Haldi.png'),
        icon: 'sun',
        overlayColor: 'rgba(255, 215, 0, 0.2)'
    },
    {
        id: '3',
        title: 'Sangeet',
        subtitle: 'Musical Night',
        image: require('../../../../assets/EventMimg/Einvite/Sanget.png'),
        icon: 'music',
        overlayColor: 'rgba(75, 0, 130, 0.2)'
    },
    {
        id: '4',
        title: 'Mehndi',
        subtitle: 'Henna Designs',
        image: require('../../../../assets/EventMimg/Einvite/Mehandi.png'),
        icon: 'paint-brush',
        overlayColor: 'rgba(34, 139, 34, 0.2)'
    },
    {
        id: '5',
        title: 'Wedding',
        subtitle: 'The Big Day',
        image: require('../../../../assets/EventMimg/Einvite/wedding.png'),
        icon: 'heart',
        overlayColor: 'rgba(255, 0, 0, 0.2)'
    },
    {
        id: '6',
        title: 'Reception',
        subtitle: 'Grand Feast',
        image: require('../../../../assets/EventMimg/Einvite/Reception.png'),
        icon: 'wine-glass',
        overlayColor: 'rgba(0, 0, 128, 0.2)'
    }
];

const InviteCard = React.memo(({ item, index, scrollY, navigation }) => {
    // Calculated position based on grid logic
    const isRightColumn = index % 2 !== 0;
    const staggerOffset = isRightColumn ? (FULL_CARD_HEIGHT / 2) : 0;

    // Calculated position based on grid logic
    const row = Math.floor(index / 2);
    // Approximate Y position of the card's center relative to the top of the list
    const cardCenterY = (row * FULL_CARD_HEIGHT) + (CARD_HEIGHT / 2) + 10 + staggerOffset;

    const rStyle = useAnimatedStyle(() => {
        const viewportTarget = scrollY.value + (height * 0.33); // Target 1/3 down the screen
        const distanceFromCenter = Math.abs(viewportTarget - cardCenterY);

        // Zoom Effect - slightly wider range to catch ends
        const scale = interpolate(
            distanceFromCenter,
            [0, height * 0.22], // Widened slightly
            [1.15, 0.9],
            Extrapolate.CLAMP
        );

        // Opacity Effect
        const opacity = interpolate(
            distanceFromCenter,
            [0, height * 0.25],
            [1, 0.6],
            Extrapolate.CLAMP
        );

        // Shadow Intensity
        const shadowOpacity = interpolate(
            distanceFromCenter,
            [0, height * 0.3],
            [0.3, 0.05],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }, { translateY: staggerOffset }],
            opacity,
            shadowOpacity
        };
    });

    // Parallax for Image
    const rImageStyle = useAnimatedStyle(() => {
        const viewportCenter = scrollY.value + (height / 2);
        const distanceFromCenter = viewportCenter - cardCenterY;

        const translateY = interpolate(
            distanceFromCenter,
            [-height, height],
            [-20, 20], // Move image slightly opposite to scroll
            Extrapolate.CLAMP
        );

        return {
            transform: [{ translateY }]
        };
    });

    const handlePress = () => {
        navigation.navigate('InviteStudioScreen', { eventType: item.title });
    };



    return (
        <Animated.View style={[styles.cardWrapper, rStyle]}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePress}
                style={styles.cardInner}
            >
                {/* Image Container with Parallax */}
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={item.image}
                        style={[StyleSheet.absoluteFillObject, styles.cardImage, rImageStyle]}
                        resizeMode="cover"
                    />

                </View>


            </TouchableOpacity>
        </Animated.View>
    );
});

const EInvite = ({ navigation }) => {
    const scrollY = useSharedValue(0);

    // Scroll Handler
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFF0" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#5C3332" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>E-Invites</Text>
                        <Text style={styles.headerSubtitle}>Invites for Every Occasion</Text>
                    </View>
                    <View style={{ width: 40 }} />
                </View>

                {/* Grid List with Animation */}
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
        backgroundColor: '#FFFFF0', // Soft Ivory
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FFFFF0',
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerTextContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#5C3332',
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#8A6E6E',
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
        marginTop: 2,
    },
    listContent: {
        paddingTop: 10,
        paddingBottom: height * 0.35, // Reduced from 0.85
    },

    // Card Styles
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginBottom: CARD_MARGIN,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F29502',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 15,
        elevation: 6, // Android shadow
    },
    cardInner: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    cardImage: {
        width: '100%',
        height: '110%', // Taller for parallax
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F5F5DC', // Beige
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
});

export default EInvite;
