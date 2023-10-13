import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


// export default function Game() {
//   const navigate = useNavigate();

//   return (
//     <View style={styles.container}>
//       <Text>GAMING</Text>
//       <CustomButton title={'GO BACK'} func={() => navigate('/')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default function Game() {
  const navigate = useNavigate();

  const targetPositionX = useSharedValue(0);
  const targetPositionY = useSharedValue(0);

  useEffect(() => {
    setInterval(update, 50);
  }, []);

  const update = () => {
    targetPositionX.value = withTiming(targetPositionX.value + 10, { duration: 50, easing: Easing.linear });
    targetPositionY.value = withTiming(targetPositionY.value + 10, { duration: 50, easing: Easing.linear });
  };

  const ballAnimatedStyles = useAnimatedStyle(() => {
    return {
      top: targetPositionY.value,
      left: targetPositionX.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ball, ballAnimatedStyles]} />
      <StatusBar style="auto" />
      <CustomButton title={'GO BACK'} func={() => navigate('/')} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    backgroundColor: 'white',
    width: 25,
    aspectRatio: 1,
    borderRadius: 25,
    position: 'absolute',
  },
});
