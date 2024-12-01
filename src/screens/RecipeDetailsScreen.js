// /src/screens/RecipeDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchRecipeDetails } from '../services/RecipeAPI';
import ScreenBackground from '../components/ScreenBackground';

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
            <ScreenBackground>
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
            </ScreenBackground>
        </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
       marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
        lineHeight: 24,
        textAlign: 'justify',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 10,
        elevation: 1,
    },
    subheading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#444',
        marginTop: 20,
        marginBottom: 12,
        textAlign: 'left',
        borderBottomWidth: 2,
        borderBottomColor: '#ff7043',
        paddingBottom: 5,
    },
    ingredient: {
        fontSize: 16,
        color: '#444',
        marginVertical: 3,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#e8f5e9',
        borderRadius: 5,
        marginBottom: 4,
        elevation: 1,
    },
    step: {
        fontSize: 16,
        color: '#444',
        marginVertical: 8,
        lineHeight: 22,
        backgroundColor: 'aliceblue',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        elevation: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default RecipeDetailsScreen;