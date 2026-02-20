import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { spacing } from '../../theme/spacing';

const Navbar = ({ title, leftIcon, onLeftPress, rightIcon, onRightPress }) => {
    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    {leftIcon && (
                        <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
                            {leftIcon}
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.rightContainer}>
                    {rightIcon && (
                        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                            {rightIcon}
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.primary,
    },
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        backgroundColor: colors.primary,
    },
    title: {
        color: colors.white,
        fontSize: fonts.sizes.lg,
        fontWeight: 'bold',
    },
    leftContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    iconButton: {
        padding: spacing.xs,
    },
});

export default Navbar;
