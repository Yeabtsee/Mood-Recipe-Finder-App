// filepath: /e:/MoodRecipeFinder/src/components/Footer.js
import React from 'react';
import { View,Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.footerContainer}>
            {/* Home Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="home" size={24} color="white" />
            </TouchableOpacity>

            {/* Favorites Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <FontAwesome name="heart" size={24} color="white" />   
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#333',
        padding: 10,
    },
    footerIcon: {
        fontSize: 24,
        color: 'white',
    },
});

export default Footer;