import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button/Button';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../theme/colors';

const HomeScreen = () => {
    const { logout, user } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user?.name}!</Text>
            <Text style={styles.text}>HomeScreen</Text>
            <Button title="Logout" onPress={logout} />
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
        marginBottom: 20,
    },
});

export default HomeScreen;
