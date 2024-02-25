import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios';
import { showMessage, hideMessage } from "react-native-flash-message";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    await axios.post('http://192.168.1.24:5000/api/login', { email: email.value, password: password.value })
      .then((response) => {
        if (response.status == 200) {
          showMessage({
            message: "Đăng nhập thành công",
            type: "success",
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }
      })
      .catch((error) => {
        showMessage({
          message: error.response.data.message,
          type: "danger",
        });
      });
  }

  return (
    <Background>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <TextInput
          label="Tài khoản"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Mật khẩu"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLoginPressed}>
          Đăng nhập
        </Button>
        <View style={styles.row}>
          <View style={[styles.line, styles.column]}></View>
          <View style={styles.column}>
            <Text>Hoặc</Text>
          </View>
          <View style={[styles.line, styles.column]}></View>
        </View>
        <View style={styles.row}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>Đăng kí</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  line: {
    width: '100%',
    height: 0.8,
    backgroundColor: '#414757',
  },
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
