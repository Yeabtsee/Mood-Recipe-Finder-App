// /src/screens/RecipeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchRecipesByMood } from '../services/RecipeAPI';

const RecipeScreen = ({ route, navigation }) => {
    const { mood } = route.params;
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const fetchedRecipes = await fetchRecipesByMood(mood);
                setRecipes(fetchedRecipes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadRecipes();
    }, [mood]);

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
        <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })}
                >
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { color: 'red', fontSize: 16 },
    card: { margin: 8, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 3 },
    image: { width: '100%', height: 150 },
    title: { padding: 8, fontSize: 18, fontWeight: 'bold' },
});

export default RecipeScreen;
