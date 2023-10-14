import {
  StyleSheet,
  Text,
  View,
  Button,
  useWindowDimensions,
} from 'react-native';
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

const FPS = 60;
const DELTA = 1000 / FPS;
const SPEED = 10;
const BALL_WIDTH = 25;

type Vector = {
  x: number;
  y: number;
};

const normalizeVector = (vector: Vector) => {
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
  };
};

export default function Game() {
  const { height, width } = useWindowDimensions();

  const [gameOver, setGameOver] = useState(false);

  const targetPositionX = useSharedValue(width / 2);
  const targetPositionY = useSharedValue(height / 2);
  const direction = useSharedValue(
    normalizeVector({ x: Math.random(), y: Math.random() })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        update();
      }
    }, DELTA);

    return () => clearInterval(interval);
  }, [gameOver]);

  const update = () => {
    let nextPos = getNextPos(direction.value);
    let newDirection = direction.value;

    if (nextPos.y < 0 || nextPos.y > height) {
      newDirection = { x: direction.value.x, y: -direction.value.y };
    }

    if (nextPos.x < 0 || nextPos.x > width - BALL_WIDTH) {
      newDirection = { x: -direction.value.x, y: direction.value.y };
    }

    direction.value = newDirection;
    nextPos = getNextPos(newDirection);

    targetPositionX.value = withTiming(nextPos.x, {
      duration: DELTA,
      easing: Easing.linear,
    });
    targetPositionY.value = withTiming(nextPos.y, {
      duration: DELTA,
      easing: Easing.linear,
    });
  };

  type Direction = {
    x: number;
    y: number;
  };

  const getNextPos = (direction: Direction) => {
    return {
      x: targetPositionX.value + direction.x * SPEED,
      y: targetPositionY.value + direction.y * SPEED,
    };
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    backgroundColor: 'blue',
    width: 25,
    aspectRatio: 1,
    borderRadius: 25,
    position: 'absolute',
  },
});
