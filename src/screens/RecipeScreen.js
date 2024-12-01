import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import ScreenBackground from '../components/ScreenBackground';
import {fetchRecipesByMood} from '../services/RecipeAPI';

const RecipeScreen = ({ route, navigation }) => {
    const { mood } = route.params;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetchRecipesByMood(mood);
            setRecipes(response);
            setLoading(false);
        };
        fetchRecipes();
    }, [mood]);

    const renderRecipe = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
        >
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <View style={styles.cardContent}>
                <Text style={styles.recipeTitle}>{item.name}</Text>
                <Text style={styles.recipeDetails}>
                    ⏱ {item.readyInMinutes} mins | 🍴 {item.servings} servings
                </Text>
            </View>
        </TouchableOpacity>
    );

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
});
