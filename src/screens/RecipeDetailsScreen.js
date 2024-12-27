// /src/screens/RecipeDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { fetchRecipeDetails } from '../services/RecipeAPI';
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/Header';

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
                <ActivityIndicator size="large" color={GlobalStyles.colors.primary}/>
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
            
            <View style={styles.headerContainer}>
                <Image source={{ uri: recipe.image }} style={styles.image} />
                <View style={styles.overlay}>
                    <Text style={styles.title}>{recipe.name}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Icon name="clock-o" size={20} color={GlobalStyles.colors.primary}/>
                    <Text style={styles.infoText}>{recipe.readyInMinutes} mins</Text>
                </View>
                <View style={styles.infoRow}>
                    <Icon name="cutlery" size={20} color={GlobalStyles.colors.primary}/>
                    <Text style={styles.infoText}>{recipe.servings} servings</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.listItem}>
                        <Icon name="check-circle" size={18} color="#4caf50" />
                        <Text style={styles.listText}>{ingredient}</Text>
                    </View>
                ))}
                <Text style={styles.sectionTitle}>Steps</Text>
                {recipe.steps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                        <Text style={styles.stepText}>{step}</Text>
                    </View>
                ))}
                <Text style={styles.lastText}>Enjoy Your Meal!</Text>
            </View>
        </ScrollView>
    );
};

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    headerContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 250,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    content: {
        padding: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: GlobalStyles.colors.primary,
        paddingBottom: 5,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    listText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#555',
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        marginRight: 10,
    },
    stepText: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 18,
        color: 'red',
    },
    lastText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary,
        textAlign: 'center',
        marginVertical: 20,
    },
});
