import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#4caf50',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
