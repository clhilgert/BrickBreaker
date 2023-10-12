import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import CustomButton from './CustomButton';

export default function Game() {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text>GAMING</Text>
      <CustomButton title={'GO BACK'} func={() => navigate('/')} />
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
});
