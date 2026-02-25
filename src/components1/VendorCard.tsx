import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Vendor {
    id: string;
    name: string;
    rating: number;
    tag: string;
    location: string;
    city?: string;
    image: any;
    previews: any[];
}


interface VendorCardProps {
    vendor: Vendor;
    onPress: () => void;
    onFollowPress?: () => void;
    onFavoritePress?: () => void;
    containerStyle?: any;
    cardWidth?: number;
}

const COLORS = {
    primary: '#CC0E0E',    // Red
    secondary: '#F29502',  // Gold
    white: '#FFFFFF',
    textDark: '#222',
    textLight: '#666',
    shadow: '#000',
};

const VendorCard: React.FC<VendorCardProps> = ({
    vendor,
    onPress,
    onFollowPress,
    onFavoritePress,
    containerStyle,
    cardWidth = width * 0.82,
}) => {
    // The provided code snippet for handleTabPress uses variables (setActiveSection, tabUnderlineTranslateX, scrollRef, Animated)
    // that are not defined within the scope of this VendorCard component.
    // To make the file syntactically correct, this function definition should be placed outside of JSX.
    // However, without the context of these variables, the function itself would cause runtime errors.
    // For the purpose of strictly applying the edit and maintaining syntactic correctness for the function definition placement,
    // it is placed here. Please ensure the necessary hooks and variables are defined if this function is intended to be used.
    const handleTabPress = (section: string, ref: React.RefObject<View | null>, index: number) => {
        // setActiveSection(section); // This variable is not defined in VendorCard
        // Animated.spring(tabUnderlineTranslateX, { // Animated and tabUnderlineTranslateX are not defined
        //     toValue: index * 90, // Adjusted for new tab width
        //     useNativeDriver: true,
        // }).start();

        // if (ref.current && scrollRef.current) { // scrollRef is not defined
        //     ref.current.measureLayout(
        //         (scrollRef.current as any), // scrollRef is not defined
        //         (x: number, y: number) => {
        //             scrollRef.current?.scrollTo({ y: y - 100, animated: true }); // scrollRef is not defined
        //         },
        //         () => {}
        //     );
        // }
    };

    return (
        <TouchableOpacity
            style={[styles.card, { width: cardWidth }, containerStyle]}
            activeOpacity={0.9}
            onPress={onPress}
        >
            {/* Hero Image Section */}
            <ImageBackground
                source={vendor.image}
                style={styles.heroImage}
                imageStyle={styles.heroImageBorder}
                resizeMode="cover"
            >
                <View style={styles.topRow}>
                    <View style={styles.tagBadge}>
                        <Text style={styles.tagText}>{vendor.tag}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.favoriteBtn}
                        onPress={onFavoritePress}
                    >
                        <Ionicons name="heart-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* Content Section */}
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.name} numberOfLines={1}>
                        {vendor.name}
                    </Text>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFF" />
                        <Text style={styles.ratingText}>{vendor.rating}</Text>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={COLORS.textLight} />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {vendor.location}
                    </Text>
                </View>

                {/* Bottom Row: Previews & Follow */}
                <View style={styles.bottomRow}>
                    <View style={styles.previewsContainer}>
                        {vendor.previews.slice(0, 3).map((img, idx) => (
                            <Image key={idx} source={img} style={styles.miniThumb} resizeMode="cover" />
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.followBtn}
                        onPress={onFollowPress}
                    >
                        <Text style={styles.followBtnText}>Follow</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 32,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        marginBottom: 20,
    },
    heroImage: {
        width: '100%',
        height: 200,
    },
    heroImageBorder: {
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tagBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        color: '#333',
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 12,
    },
    favoriteBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        paddingTop: 15,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 22,
        color: COLORS.textDark,
        flex: 1,
        marginRight: 10,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 13,
        fontFamily: 'Outfit_700Bold',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 20,
    },
    locationText: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        color: COLORS.textLight,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    previewsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    miniThumb: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    followBtn: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 16,
        elevation: 2,
    },
    followBtnText: {
        color: '#FFF',
        fontFamily: 'Outfit_700Bold',
        fontSize: 14,
    },
});

export default VendorCard;
