import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password Screen</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonText}>Back</Text>
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

export default ForgotPasswordScreen;
