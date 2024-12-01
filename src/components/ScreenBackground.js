import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const ScreenBackground = ({ children }) => {
    return (
        <ImageBackground
            source={require('../Assets/images/food-background.jpg')} // Ensure the image exists in the assets folder
            style={styles.background}
        >
            <View style={styles.overlay}>
                {children}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0)', // Dark overlay for text visibility
        
    },
});

export default ScreenBackground;
