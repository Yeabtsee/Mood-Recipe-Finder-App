import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenBackground from '../components/ScreenBackground';
import { fetchRecipesByMood } from '../services/RecipeAPI';
import Footer from '../components/Footer';
import Header from '../components/Header';

const RecipeScreen = ({ route, navigation }) => {
    const { mood } = route.params;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetchRecipesByMood(mood);
            setRecipes(response);
            setLoading(false);
        };
        fetchRecipes();
    }, [mood]);

    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (recipe) => {
        try {
            const isFavorite = favorites.some((item) => item.id === recipe.id);
            let updatedFavorites;

            if (isFavorite) {
                updatedFavorites = favorites.filter((item) => item.id !== recipe.id);
            } else {
                updatedFavorites = [...favorites, recipe];
            }

            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const renderRecipe = ({ item }) => {
        const isFavorite = favorites.some((recipe) => recipe.id === item.id);
        return (
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
                        <TouchableOpacity onPress={() => toggleFavorite(item)}>
                            <FontAwesome
                                name="heart"
                                size={24}
                                color={isFavorite ? 'red' : 'rgb(214, 214, 214)'}
                                style={styles.likeButton}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    if (loading) {
        return (
            <ScreenBackground>
                <View style={[GlobalStyles.container, styles.center]}>
                    <ActivityIndicator size="large" color={GlobalStyles.colors.primary} />
                    <Text style={styles.loadingText}>Fetching Recipes...</Text>
                </View>
            </ScreenBackground>
        );
    }

    return (
        <ScreenBackground>
           
            <View style={[GlobalStyles.container, styles.recipeContainer]}>
                <Text style={styles.header}>Delicious Recipes for Your Mood: {mood}</Text>
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRecipe}
                    contentContainerStyle={styles.list}
                />
            </View>
            <Footer />
        </ScreenBackground>
    );
};

export default RecipeScreen;

const styles = StyleSheet.create({
    recipeContainer: {
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    likeButton: {
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: '600',
        color: GlobalStyles.colors.secondary,
        marginTop: 10,
    },
    heartIcon: {
        fontSize: 24,
    },
});
