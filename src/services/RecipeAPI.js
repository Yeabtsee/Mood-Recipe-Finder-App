// /src/services/RecipeAPI.js
import axios from 'axios';

// const API_KEY ='4891863f5a714fb49aa44930fe5c8b24'
const API_KEY = '5f0540979bf4493aa1308ecd24336945';
// const API_KEY = '439f8f619326438c8ff96351bf84b9c8';

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
                query: mood,
                number: 10, // Number of recipes to fetch
                apiKey: API_KEY,
            },
        });

        const recipes = await Promise.all(response.data.results.map(async (recipe) => {
            const details = await fetchRecipeDetails(recipe.id);
            return {
                id: recipe.id,
                name: recipe.title,
                image: recipe.image,
                servings: details.servings,
                readyInMinutes: details.readyInMinutes,
            };
        }));

        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
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
            servings: response.data.servings,
            readyInMinutes: response.data.readyInMinutes,
            description: response.data.summary.replace(/<[^>]+>/g, ''), // Remove HTML tags
            ingredients: response.data.extendedIngredients.map((ing) => ing.original),
            steps: response.data.analyzedInstructions[0]?.steps.map((step) => step.step) || [],
        };
    } catch (error) {
        console.error('Error fetching recipe details:', error.message);
        throw new Error('Failed to fetch recipe details. Please try again later.');
    }
};