import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { AuthContext } from '../../context/AuthContext';
import { colors } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Input label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" />
            <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button title="Login" onPress={() => login(email, password)} />
            <Button
                title="Register"
                type="secondary"
                onPress={() => navigation.navigate('Register')}
            />
            <Button
                title="Forgot Password?"
                type="secondary"
                outline
                onPress={() => navigation.navigate('ForgotPassword')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.primary,
    },
});

export default LoginScreen;
