import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 50;
const CIRCLE_RADIUS = 25;
const BORDER_WIDTH = 5;

// Light Yellow Background
const FOOTER_BG_COLOR = '#f2f2a6';

const Footer = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    const MARGIN_HORIZONTAL = 20;
    const FOOTER_WIDTH = width - (MARGIN_HORIZONTAL * 2);
    const TAB_WIDTH = FOOTER_WIDTH / state.routes.length;

    const translateX = useSharedValue(0);

    // Lowered footer as requested ("take footer liltely bit lower")
    // Now sitting almost flush with bottom safe area (0 padding added to inset).
    const bottomMargin = insets.bottom > 0 ? insets.bottom : 5;

    const backgroundHeight = TAB_HEIGHT;

    useEffect(() => {
        translateX.value = state.index * TAB_WIDTH;
    }, [state.index]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <View style={[styles.container, { bottom: bottomMargin, left: MARGIN_HORIZONTAL, right: MARGIN_HORIZONTAL }]}>
            {/* Main Footer Bar (Capsule) */}
            <View style={[styles.backgroundBar, { height: backgroundHeight, backgroundColor: FOOTER_BG_COLOR }]} />

            {/* Moving Circle Container */}
            <Animated.View
                style={[
                    styles.cursorContainer,
                    {
                        width: TAB_WIDTH,
                        bottom: 0,
                        height: backgroundHeight + 30
                    },
                    animatedStyle
                ]}
            >
                {/* Floating Circle with Thick Border */}
                <View style={[styles.circle, {
                    // Position maintained
                    bottom: backgroundHeight - CIRCLE_RADIUS + 1
                }]}>
                    {/* Circle Background */}
                </View>
            </Animated.View>

            {/* Tabs */}
            <View style={[styles.tabsContainer, { height: backgroundHeight }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const animatedIconStyle = useAnimatedStyle(() => {
                        return {
                            // Adjusted Translation for Centering
                            // Circle Center Y = 61px. Icon Start Center Y = 30px.
                            // Required Shift = 31px. 
                            transform: [
                                { translateY: withTiming(isFocused ? -21 : 0, { duration: 150 }) }
                            ],
                            opacity: withTiming(isFocused ? 1 : 0, { duration: 150 })
                        };
                    });

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            style={styles.tabButton}
                            activeOpacity={1}
                        >
                            {/* Icon Logic */}
                            <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                                {options.tabBarIcon({
                                    focused: isFocused,
                                    color: colors.secondary,
                                    size: 24,
                                })}
                            </Animated.View>

                            {/* Label Logic */}
                            <Text style={[
                                styles.label,
                                {
                                    color: colors.secondary,
                                    opacity: 1,
                                }
                            ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'transparent',
        elevation: 0,
        overflow: 'visible',
    },
    backgroundBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 35,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    cursorContainer: {
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1,
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: colors.primary,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 6,
        borderWidth: BORDER_WIDTH,
        borderColor: '#f2f2a6',
    },
    tabsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 35,
        // overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 8
    },
    iconContainer: {
        marginBottom: 4,
        zIndex: 10,
        position: 'absolute',
        bottom: 18
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

export default Footer;
