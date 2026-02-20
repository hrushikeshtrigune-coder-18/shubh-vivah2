import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { spacing } from '../../theme/spacing';

const Button = ({ title, onPress, type = 'primary', outline, disabled, loading, style }) => {
    const containerStyle = [
        styles.container,
        type === 'primary' && styles.primary,
        type === 'secondary' && styles.secondary,
        outline && styles.outline,
        disabled && styles.disabled,
        style,
    ];

    const textStyle = [
        styles.text,
        type === 'primary' && styles.primaryText,
        type === 'secondary' && styles.secondaryText,
        outline && styles.outlineText,
        disabled && styles.disabledText,
    ];

    return (
        <TouchableOpacity onPress={onPress} style={containerStyle} disabled={disabled || loading}>
            {loading ? (
                <ActivityIndicator color={outline ? colors.primary : colors.white} />
            ) : (
                <Text style={textStyle}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.sm + 4,
        paddingHorizontal: spacing.lg,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.xs,
    },
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    disabled: {
        backgroundColor: colors.border,
    },
    text: {
        fontSize: fonts.sizes.md,
        fontWeight: '600',
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.white,
    },
    outlineText: {
        color: colors.primary,
    },
    disabledText: {
        color: colors.textLight,
    },
});

export default Button;
