import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AiTabScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>AI Tab</Text>
            <Text>Welcome to the AI tab!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
});

export default AiTabScreen;