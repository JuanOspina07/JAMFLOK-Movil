import React, { useRef } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";

export default function AnimatedCard({ children, style, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      speed: 20,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <TouchableWithoutFeedback
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
      >
        <View>{children}</View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}
