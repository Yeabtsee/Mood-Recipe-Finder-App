import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenBackground from '../components/ScreenBackground';

const HomeScreen = ({ navigation }) => {
    return (
        <ScreenBackground>
            <View style={[GlobalStyles.container, styles.homeContainer]}>
                <Text style={styles.welcomeText}>Welcome to Mood Recipe Finder</Text>
                <Text style={styles.descriptionText}>
                    Explore delicious recipes tailored to your mood!
                </Text>

                {/* Highlights Section */}
                <View style={styles.highlights}>
                    <Text style={styles.highlightsTitle}>Why Use This App?</Text>
                    <Text style={styles.highlightsText}>
                        🍳 Personalized recipes based on your mood.
                    </Text>
                    <Text style={styles.highlightsText}>
                        🌟 Easy-to-follow instructions for every dish.
                    </Text>
                    <Text style={styles.highlightsText}>
                        🥗 Perfect for any occasion or craving.
                    </Text>
                </View>

                {/* Start Button */}
                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => navigation.navigate('Mood')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ScreenBackground>
    );
};

export default HomeScreen;

 const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adds a dark overlay to make text more visible
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 16,
    },
    descriptionText: {
        fontSize: 16,
        color: '#dcdcdc',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    highlights: {
        marginBottom: 32,
        alignItems: 'center',
    },
    highlightsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
    },
    highlightsText: {
        fontSize: 16,
        color: '#f0f0f0',
        marginVertical: 4,
    },
    startButton: {
        backgroundColor: GlobalStyles.colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
