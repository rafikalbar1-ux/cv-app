import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

// Animasi masuk (dipakai sekali pada hero halaman Home).
export default function FadeIn({ delay = 0, children, style }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 650, delay, useNativeDriver: true }).start();
  }, [v, delay]);
  return (
    <Animated.View style={[{ opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }, style]}>
      {children}
    </Animated.View>
  );
}
