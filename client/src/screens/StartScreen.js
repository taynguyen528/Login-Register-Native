import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Logo />
      <Header>Đăng nhập</Header>
      <Paragraph>
        Cách dễ nhất để bắt đầu với ứng dụng tuyệt vời của bạn.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Đăng nhập
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Đăng kí
      </Button>
      </KeyboardAvoidingView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})