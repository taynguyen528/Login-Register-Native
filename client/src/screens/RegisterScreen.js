import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import Paragraph from '../components/Paragraph'
import PickerSelect from '../components/PickerSelect';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [firstname, setFirstName] = useState({ value: '', error: '' })
  const [lastname, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mssv, setMSSV] = useState({ value: '', error: '' })
  const [faculty, setFaculty] = useState({ value: '', error: '' })
  const [department, setDepartment] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const firstnameError = nameValidator(firstname.value)
    const lastnameError = nameValidator(lastname.value)
    const emailError = emailValidator(email.value)
    const phoneError = nameValidator(phone.value)
    const passwordError = passwordValidator(password.value)
    const mssvError = nameValidator(mssv.value)
    const facultyError = nameValidator(faculty.value)
    const departmentError = nameValidator(department.value)

    if (emailError || passwordError || firstnameError || lastnameError || phoneError || mssvError || facultyError || departmentError) {
      setFirstName({ ...firstname, error: firstnameError })
      setLastName({ ...lastname, error: lastnameError })
      setEmail({ ...email, error: emailError })
      setPhone({ ...phone, error: phoneError })
      setPassword({ ...password, error: passwordError })
      setMSSV({ ...mssv, error: mssvError })
      setFaculty({ ...faculty, error: facultyError })
      setDepartment({ ...department, error: departmentError })
      return;
    }
    await axios.post('http://192.168.1.24:5000/api/register',
      {
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
        phone: phone.value,
        email: email.value,
        student_id: mssv.value,
        faculty: faculty.value,
        department: department.value
      })
      .then((response) => {
        if (response.status == 200) {
          showMessage({
            message: "Đăng kí thành công",
            type: "success",
          });
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
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
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Paragraph style={{ width: 160, textAlign: 'center', marginVertical: 10 }}>Đăng kí để xem ảnh và video từ bạn bè của bạn.</Paragraph>

          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ width: 300 }}
          >
            Đăng nhập bằng số điện thoại
          </Button>
          <View style={styles.row}>
            <View style={[styles.line, styles.column]}></View>
            <View style={styles.column}>
              <Text>Hoặc</Text>
            </View>
            <View style={[styles.line, styles.column]}></View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <TextInput
                label="Họ (*)"
                returnKeyType="next"
                value={firstname.value}
                onChangeText={(text) => setFirstName({ value: text, error: '' })}
                error={!!firstname.error}
                errorText={firstname.error}
                style={{ width: '90%' }}
              />
            </View>
            <View style={styles.column}>
              <TextInput
                label="Tên (*)"
                returnKeyType="next"
                value={lastname.value}
                onChangeText={(text) => setLastName({ value: text, error: '' })}
                error={!!lastname.error}
                errorText={lastname.error}
              />
            </View>
          </View>
          <TextInput
            label="Gmail (*)"
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
            label="Số điện thoại (*)"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
          />
          <TextInput
            label="Mật khẩu (*)"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <TextInput
            label="MSSV (*)"
            returnKeyType="next"
            value={mssv.value}
            onChangeText={(text) => setMSSV({ value: text, error: '' })}
            error={!!mssv.error}
            errorText={mssv.error}
          />
          <PickerSelect
            error={!!faculty.error}
            errorText={faculty.error}
            placeholder={{
              label: 'Chọn khoa (*)',
              value: '',
              color: '#414757',
            }}
            onValueChange={(value) => setFaculty({ value: value, error: '' })}
            items={[
              { label: 'Khoa Y', value: 'Khoa Y' },
              { label: 'Khoa Kỹ thuật', value: 'Khoa Kỹ thuật' },
              { label: 'Khoa Nghệ thuật', value: 'Khoa Nghệ thuật' },
              { label: 'Khoa Khoa học', value: 'Khoa Khoa học' },
              { label: 'Khoa Luật học', value: 'Khoa Luật học' },
            ]}
          />
          <PickerSelect
            error={!!department.error}
            errorText={department.error}
            placeholder={{
              label: 'Chọn phòng ban (*)',
              value: '',
              color: '#414757',
            }}
            onValueChange={(value) => setDepartment({ value: value, error: '' })}
            items={[
              { label: 'Phòng nhân sự', value: 'Phòng nhân sự' },
              { label: 'Phòng công nghệ thông tin', value: 'Phòng công nghệ thông tin' },
              { label: 'Phòng nghiên cứu và phát triển', value: 'Phòng nghiên cứu và phát triển' },
              { label: 'Phòng hành chính', value: 'Phòng hành chính' },
              { label: 'Phòng tài chính', value: 'Phòng tài chính' },
            ]}
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ width: 200 }}
          >
            Đăng kí
          </Button>
          <View style={styles.row}>
            <Text>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  )
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
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
    paddingBottom: 40,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})