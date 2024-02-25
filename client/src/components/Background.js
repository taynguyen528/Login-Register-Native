import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: 'auto',
    backgroundColor: theme.colors.surface,
  },
})
