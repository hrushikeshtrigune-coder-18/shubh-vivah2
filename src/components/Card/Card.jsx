import { StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const Card = ({ children, style, padding = true }) => {
    return (
        <View style={[styles.container, padding && styles.padding, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 12,
        marginVertical: spacing.xs,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android
    },
    padding: {
        padding: spacing.md,
    },
});

export default Card;
