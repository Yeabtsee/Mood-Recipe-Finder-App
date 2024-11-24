// /src/services/RecipeAPI.js
import axios from 'axios';

const API_KEY = '4ad75aedf5d24222a9dc4e5040024a9e';
const BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * Fetch recipes from Spoonacular based on mood (used as a keyword).
 * @param {string} mood
 * @returns {Promise<Array>} Array of recipe objects
 */
export const fetchRecipesByMood = async (mood) => {
    try {
        const response = await axios.get(`${BASE_URL}/complexSearch`, {
            params: {
                q: mood,
                number: 10, // Number of recipes to fetch
                apiKey: API_KEY,
            },
        });

        const recipes = response.data.results.map((recipe) => ({
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
        }));

        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        throw new Error('Failed to fetch recipes. Please try again later.');
    }
};

/**
 * Fetch detailed recipe information by recipe ID.
 * @param {number} recipeId
 * @returns {Promise<Object>} Recipe details object
 */
export const fetchRecipeDetails = async (recipeId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${recipeId}/information`, {
            params: {
                apiKey: API_KEY,
            },
        });

        return {
            name: response.data.title,
            image: response.data.image,
            description: response.data.summary.replace(/<[^>]+>/g, ''), // Remove HTML tags
            ingredients: response.data.extendedIngredients.map((ing) => ing.original),
            steps: response.data.analyzedInstructions[0]?.steps.map((step) => step.step) || [],
        };
    } catch (error) {
        console.error('Error fetching recipe details:', error.message);
        throw new Error('Failed to fetch recipe details. Please try again later.');
    }
};
