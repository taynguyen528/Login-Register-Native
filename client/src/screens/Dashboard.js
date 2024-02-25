import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { StyleSheet, KeyboardAvoidingView } from "react-native";

export default function Dashboard({ navigation }) {
    return (
        <Background>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Logo />
                <Header>Hãy bắt đầu</Header>
                <Paragraph>
                    Ứng dụng tuyệt vời của bạn bắt đầu từ đây.
                </Paragraph>
                <Button
                    mode="outlined"
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "StartScreen" }],
                        })
                    }
                >
                    Đăng xuất
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
