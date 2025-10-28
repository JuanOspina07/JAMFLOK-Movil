import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import stylesGlobal from "../styles/stylesGlobal";

export default function ProgressBar({ step, totalSteps }) {
  const progress = step / totalSteps;
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Progreso {step}/{totalSteps}</Text>

      <View style={styles.barContainer}>
        <View style={styles.barBackground} />
        <Animated.View style={[styles.barFill, { width: animatedWidth }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,            
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  label: {
    textAlign: "center",
    marginBottom: 8,
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  barContainer: {
    width: "100%",
    height: 12,
    borderRadius: 20,
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
  },
  barBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E6E6E6",
  },
  barFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.secundary,
    borderRadius: 20,
  },
});
