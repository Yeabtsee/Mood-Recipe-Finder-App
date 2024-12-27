import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenBackground from '../components/ScreenBackground';

const FavoritesScreen = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from AsyncStorage
    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setFavorites(parsedFavorites.reverse()); // Show the latest liked first
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    // Remove a favorite item
    const removeFavorite = async (recipeId) => {
        try {
            const updatedFavorites = favorites.filter((item) => item.id !== recipeId);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
            // Alert.alert('Removed', 'The recipe has been removed from your favorites.');
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    useEffect(() => {
        // Load favorites when the screen is focused
        const unsubscribe = navigation.addListener('focus', () => {
            loadFavorites();
        });

        return unsubscribe;
    }, [navigation]);

    const renderFavorite = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.cardContent}>
                <Text style={styles.recipeTitle}>{item.name}</Text>
                <Text style={styles.recipeDetails}>
                    ⏱ {item.readyInMinutes} mins | 🍴 {item.servings} servings
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.detailsButton}
                        onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
                    >
                        <FontAwesome name="eye" size={30} color= {GlobalStyles.colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFavorite(item.id)}
                    >
                        <FontAwesome name="trash" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <ScreenBackground>
            <View style={[GlobalStyles.container, styles.favoritesContainer]}>
                <Text style={styles.header}>Your Favorite Recipes</Text>
                {favorites.length === 0 ? (
                    <Text style={styles.emptyText}>No favorite recipes found. Start adding some!</Text>
                ) : (
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderFavorite}
                        contentContainerStyle={styles.list}
                    />
                )}
            </View>
        </ScreenBackground>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    favoritesContainer: {
        padding: 10,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        marginVertical: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        letterSpacing: 1.2,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    emptyText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#777',
        textAlign: 'center',
        marginTop: 50,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    recipeImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 15,
        backgroundColor: 'linear-gradient(180deg, #ffffff, #f8f8f8)',
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
        marginBottom: 5,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    recipeDetails: {
        fontSize: 16,
        color: '#777',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    detailsButton: {
        backgroundColor: "transparent",
        color: 'rgb(0, 0, 0)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeButton: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
