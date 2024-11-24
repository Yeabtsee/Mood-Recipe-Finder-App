// /src/screens/RecipeDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchRecipeDetails } from '../services/RecipeAPI';

const RecipeDetailsScreen = ({ route }) => {
    const { recipeId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRecipeDetails = async () => {
            try {
                const fetchedDetails = await fetchRecipeDetails(recipeId);
                setRecipe(fetchedDetails);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecipeDetails();
    }, [recipeId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.title}>{recipe.name}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
            <Text style={styles.subheading}>Ingredients:</Text>
            {recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredient}>
                    - {ingredient}
                </Text>
            ))}
            <Text style={styles.subheading}>Steps:</Text>
            {recipe.steps.map((step, index) => (
                <Text key={index} style={styles.step}>
                    {index + 1}. {step}
                </Text>
                
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f8f8f8' },
    image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
    description: { fontSize: 16, color: '#666', marginBottom: 16 },
    subheading: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
    ingredient: { fontSize: 16, color: '#333', marginVertical: 2 },
    step: { fontSize: 16, color: '#333', marginBottom: 30 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { color: 'red', fontSize: 16 },
});

export default RecipeDetailsScreen;
