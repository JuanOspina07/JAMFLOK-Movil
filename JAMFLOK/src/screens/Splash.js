import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import GradientBackground from '../hooks/gradientBackground';

const { width, height } = Dimensions.get('window');

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const moveY = useRef(new Animated.Value(50)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;

  // Partículas
  const particleCount = 15;
  const particles = useRef(
    [...Array(particleCount)].map(() => ({
      x: Math.random() * width,
      y: new Animated.Value(Math.random() * height),
      size: Math.random() * 6 + 4,
      opacity: Math.random(),
      speed: 2000 + Math.random() * 3000,
    }))
  ).current;

  useEffect(() => {
    // Animación principal logo y texto
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(moveY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();

    // Animación de brillo continuo en el texto
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
        Animated.timing(shineAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
          easing: Easing.linear,
        }),
      ])
    ).start();

    // Animación de partículas
    particles.forEach(p => {
      const animateParticle = () => {
        p.y.setValue(-50);
        Animated.timing(p.y, {
          toValue: height + 50,
          duration: p.speed,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(() => animateParticle());
      };
      animateParticle();
    });
  }, []);

  const shine = shineAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      'rgba(255,255,255,0.8)',
      'rgba(255,255,255,1)',
      'rgba(255,255,255,0.8)',
    ],
  });

  return (
    <GradientBackground>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: moveY }],
          },
        ]}
      >
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Animated.Text style={[styles.title, { color: shine }]}>
          JAMFLOK
        </Animated.Text>
        <Text style={styles.subtitle}>Tu app de confianza</Text>
      </Animated.View>

      {/* Partículas flotantes */}
      <View style={styles.particles}>
        {particles.map((p, i) => (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: 'rgba(255,255,255,0.3)',
              opacity: p.opacity,
              transform: [{ translateY: p.y }, { translateX: p.x }],
            }}
          />
        ))}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 35,
    resizeMode: 'contain',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    marginTop: 6,
    letterSpacing: 1,
  },
  particles: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});
