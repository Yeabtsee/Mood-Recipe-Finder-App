import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MoodScreen = ({ navigation }) => {
  const handleMoodSelection = (mood) => {
    // Pass mood data to RecipeScreen
    navigation.navigate('Recipe', { mood });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>How are you feeling today?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Happy" onPress={() => handleMoodSelection('dessert')} />
        <Button title="Sad" onPress={() => handleMoodSelection('Whole grains')} />
        <Button title="Weak" onPress={() => handleMoodSelection('maxCalories')} />
        <Button title="Calm" onPress={() => handleMoodSelection('vitamins')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-between',
    height: 200,
  },
});

export default MoodScreen;
