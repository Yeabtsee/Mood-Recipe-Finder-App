import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenBackground from '../components/ScreenBackground';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const HomeScreen = ({ navigation }) => {
    return (
        <ScreenBackground>
            <View style={[GlobalStyles.container, styles.homeContainer]}>
                <View style={styles.header}>
                    <Image
                        source={require('../Assets/images/chefs-hat.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.welcomeText}>Welcome to Mood Recipe Finder</Text>
                    <Text style={styles.descriptionText}>
                        Explore delicious recipes tailored to your mood!
                    </Text>
                </View>

                <View style={styles.highlights}>
                    <Text style={styles.highlightsTitle}>Why Use This App?</Text>
                    <View style={styles.highlightsItem}>
                        <Icon name="emoji-food-beverage" size={24} color={GlobalStyles.colors.primary} />
                        <Text style={styles.highlightsText}>Personalized recipes</Text>
                    </View>
                    <View style={styles.highlightsItem}>
                        <Icon name="star" size={24} color={GlobalStyles.colors.primary} />
                        <Text style={styles.highlightsText}>Easy-to-follow instructions</Text>
                    </View>
                    <View style={styles.highlightsItem}>
                        <Icon name="eco" size={24} color={GlobalStyles.colors.primary} />
                        <Text style={styles.highlightsText}>Perfect for any occasion</Text>
                    </View>
                </View>

                <View style={styles.callToAction}>
                    {/* <Text style={styles.ctaText}>Ready to find your perfect recipe?</Text> */}
                    <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => navigation.navigate('Mood')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </ScreenBackground>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        textAlign: 'center',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 16,
        color: '#6c757d',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    highlights: {
        marginVertical: 32,
        width: '100%',
        paddingHorizontal: 20,
    },
    highlightsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        marginBottom: 16,
        textAlign: 'center',
    },
    highlightsItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
    },
    highlightsText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 8,
    },
    callToAction: {
        marginTop: 20,
        alignItems: 'center',
    },
    ctaText: {
        fontSize: 18,
        color: '#ddd',
        marginBottom: 12,
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: GlobalStyles.colors.primary,
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
