import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Mood Screen" onPress={() => navigation.navigate('Mood')} />
        <Button title="Go to Recipe Screen" onPress={() => navigation.navigate('Recipe')} />
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
    marginBottom: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer:{
    backgroundColor: 'rgb(134,123,22)',
    marginTop: 10,
  }
});

export default HomeScreen;
