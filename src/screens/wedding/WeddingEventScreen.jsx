import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

const WeddingEventScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>WeddingEventScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    text: {
        color: colors.text,
        fontSize: 18,
    },
});

export default WeddingEventScreen;
