import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles.js';
import ScreenBackground from '../components/ScreenBackground.js';
import Footer from '../components/Footer.js';


const MoodScreen = ({ navigation }) => {
    const handleMoodSelection = (mood) => {
        navigation.navigate('Recipe', { mood });
    };
    const moods = [
        { mood: 'dessert', displayText: 'Happy' },
        { mood: 'Energizing', displayText: 'Tired' },
        { mood: 'spicy', displayText: 'Excited' },
        { mood: 'Light', displayText: 'Calm' },
    ];

    return (
      <ScreenBackground
       >
        <View style={[GlobalStyles.container, styles.moodContainer]}>
            <Text style={styles.title}>How are you feeling today</Text>
            <View style={styles.buttonGroup}>
                {moods.map(({mood,displayText}) => (
                    <TouchableOpacity
                        key={mood}
                        style={styles.moodButton}
                        onPress={() => handleMoodSelection(mood.toLowerCase())}
                    >
                        <Text style={styles.buttonText}>{displayText}</Text>
                    </TouchableOpacity>
                ))}
            </View>
         </View>
         <Footer/>
        </ScreenBackground>
    );
};

export default MoodScreen;

const styles = StyleSheet.create({
 
    moodContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: GlobalStyles.colors.primary,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    moodButton: {
        backgroundColor: GlobalStyles.colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
