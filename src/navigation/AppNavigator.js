import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MoodScreen from '../screens/MoodScreen';
import RecipeScreen from '../screens/RecipeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import GlobalStyles from '../styles/GlobalStyles';

const CustomHeader = ({ title }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
);

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator
                screenOptions={{
                    header: ({ navigation, route, options }) => (
                        <CustomHeader title={options.title || route.name} />
                    ),
                }}
                initialRouteName='Home'
            >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mood" component={MoodScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{ title: 'Recipe Details' }}/>
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  headerContainer: {
      backgroundColor: 'rgb(22, 33, 27)',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
  },
  headerTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
  },
});
