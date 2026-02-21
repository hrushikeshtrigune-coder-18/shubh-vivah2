import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    button: { padding: 10, backgroundColor: '#CC0E0E', borderRadius: 5 },
    buttonText: { color: '#FFF' },
});

export default RegisterScreen;
