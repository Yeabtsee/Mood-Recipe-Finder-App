import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles.js';
import ScreenBackground from '../components/ScreenBackground.js';
import Footer from '../components/Footer.js';

const MoodScreen = ({ navigation }) => {
    const handleMoodSelection = (mood) => {
        navigation.navigate('Recipe', { mood });
    };

    const moods = [
        { mood: 'dessert', displayText: 'Happy', emoji: '😊' },
        { mood: 'Energizing', displayText: 'Tired', emoji: '😴' },
        { mood: 'spicy', displayText: 'Excited', emoji: '🔥' },
        { mood: 'Light', displayText: 'Calm', emoji: '🌿' },
    ];

    return (
        <ScreenBackground>
            <View style={[GlobalStyles.container, styles.moodContainer]}>
                <View style={styles.header}>
                    <Text style={styles.title}>How are you feeling today?</Text>
                    <Text style={styles.subtitle}>
                        Select your mood, and we'll find the perfect recipe for you!
                    </Text>
                </View>

                <View style={styles.buttonGroup}>
                    {moods.map(({ mood, displayText, emoji }) => (
                        <TouchableOpacity
                            key={mood}
                            style={styles.moodButton}
                            onPress={() => handleMoodSelection(mood.toLowerCase())}
                        >
                            <Text style={styles.buttonEmoji}>{emoji}</Text>
                            <Text style={styles.buttonText}>{displayText}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.funSection}>
                    <Image
                        source={require('../Assets/images/chefff.jpg')}
                        style={styles.chefImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.funText}>
                        Feeling adventurous? Try something new today! 🧑‍🍳
                    </Text>
                </View>
            </View>

            <Footer />
        </ScreenBackground>
    );
};

export default MoodScreen;

const styles = StyleSheet.create({
    moodContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    moodButton: {
        backgroundColor: GlobalStyles.colors.secondary,
        paddingVertical: 15,
        paddingHorizontal: 25,
        margin: 10,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 5,
        flexDirection: 'row',
    },
    buttonEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    funSection: {
        marginTop: 30,
        alignItems: 'center',
    },
    chefImage: {
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    funText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
