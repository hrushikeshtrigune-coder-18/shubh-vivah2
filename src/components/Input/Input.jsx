import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { spacing } from '../../theme/spacing';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, error, ...props }) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={colors.textLight}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: fonts.sizes.sm,
        color: colors.text,
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.sm,
        fontSize: fonts.sizes.md,
        color: colors.text,
        backgroundColor: colors.white,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        fontSize: fonts.sizes.xs,
        color: colors.error,
        marginTop: spacing.xs,
    },
});

export default Input;
