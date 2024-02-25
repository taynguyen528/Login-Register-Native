import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

export default function ResetPasswordScreen({ navigation }) {
    const [email, setEmail] = useState({ value: "", error: "" });

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }
        await axios
            .post("http://192.168.1.24:5000/api/reset-password", {
                email: email.value,
            })
            .then((response) => {
                if (response.status == 200) {
                    showMessage({
                        message: "Mật khẩu mới đã được gửi đến e-mail",
                        type: "success",
                    });
                    navigation.navigate("LoginScreen");
                }
            })
            .catch((error) => {
                showMessage({
                    message: error.response.data.message,
                    type: "danger",
                });
            });
    };

    return (
        <Background>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Khôi phục mật khẩu</Header>
                <TextInput
                    label="Địa chỉ E-mail"
                    returnKeyType="done"
                    value={email.value}
                    onChangeText={(text) =>
                        setEmail({ value: text, error: "" })
                    }
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    description="Mật khẩu mới sẽ được gửi đến E-mail"
                />
                <Button
                    mode="contained"
                    onPress={sendResetPasswordEmail}
                    style={{ marginTop: 16 }}
                >
                    Gửi
                </Button>
            </KeyboardAvoidingView>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});
