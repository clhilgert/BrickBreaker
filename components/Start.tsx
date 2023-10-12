import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
// interface ButtonProps {
//   title: string,
//   onPress: () => void;
// }



// Remove the following line since useNavigate is already imported above
// import { useNavigate } from 'react-router-native';

export default function Start() {
  const navigate = useNavigate();

  return (
    // <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <Button
        title={'ASDFASDF'}
        onPress={() => navigate('/gaming')}
      />

      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#000', // Set the background color to match the container
  },
});
