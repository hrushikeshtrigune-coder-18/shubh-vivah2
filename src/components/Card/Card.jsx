import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../../theme/colors';

const Card = ({ item, index, scrollX, itemWidth, itemHeight, onPress }) => {
    const inputRange = [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth];

    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.7, 1, 0.7],
        extrapolate: 'clamp',
    });

    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [50, 0, 50], // Side cards move down by 50px
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={{
            width: itemWidth,
            height: itemHeight,
            // transform: [{ scale }, { translateY }], // Animation disabled to fix Android touch issue
            opacity, // We keep opacity for fade effect, or remove it if requested. Keeping for now as it doesn't affect layout.
        }}>
            <Pressable
                style={({ pressed }) => [
                    styles.container,
                    { opacity: pressed ? 0.9 : 1, zIndex: 1 }
                ]}
                onPress={onPress}
            >
                {/* 1. Image Section (The "Card" - Bordered) */}
                <View style={styles.imageContainer}>
                    <Image
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={styles.carouselImage}
                        resizeMode="cover"
                    />
                </View>

                {/* 2. Content Section (Outside the framed image) */}
                <View style={styles.contentContainer}>
                    <View style={styles.iconWrapper}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name={item.icon} size={20} color="#D4AF37" />
                        </View>
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={styles.carouselTitle}>{item.title}</Text>
                        <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>

                        <View style={styles.divider} />

                        <Text style={styles.carouselDesc} numberOfLines={2}>
                            {item.description}
                        </Text>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 25,
        marginHorizontal: 10,
        backgroundColor: 'transparent', // Container is transparent
    },
    imageContainer: {
        flex: 0.65, // Takes up 65% of the height
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.kumkum, // Kumkum Border on Image only
        backgroundColor: '#fff',
        // elevation: 5, // Removing elevation to fix Android touch issue
        marginBottom: 10, // Space between image and content
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover', // Moved to component prop
    },
    contentContainer: {
        flex: 0.35, // Remaining 35%
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
    },
    iconWrapper: {
        alignItems: 'center',
        marginTop: -33, // Pull icon up to overlap/bridge
        marginBottom: 5,
        zIndex: 10,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF', // White background to highlight the Gold icon
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.haldi, // Haldi Border for premium contrast
        // elevation: 8, // Removing elevation to fix Android touch issue
        shadowColor: colors.kumkum,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    textWrapper: {
        backgroundColor: colors.akshada, // Akshid (#FFFFE4)
        borderRadius: 20,
        padding: 15,
        paddingTop: 25, // More space for icon
        borderWidth: 1.5,
        borderColor: colors.haldi, // Haldi Border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // elevation: 3, // Removing elevation to fix Android touch issue
    },
    carouselTitle: {
        color: colors.kumkum,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'serif',
        textAlign: 'center',
    },
    carouselSubtitle: {
        color: colors.textRed,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
    },
    divider: {
        height: 1,
        backgroundColor: colors.haldi,
        width: '60%',
        alignSelf: 'center',
        marginVertical: 5,
        opacity: 0.6,
    },
    carouselDesc: {
        color: colors.textRed,
        fontSize: 11,
        lineHeight: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default Card;
