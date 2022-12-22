import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://masterclassenglish.com/wp-content/uploads/2019/05/noimage-placeholderpng.png",
        });
      })
      .catch((error) => alert(error.message));

    // console.log(auth);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Text
        style={{
          marginBottom: 35,
          textAlign: "center",
          fontSize: 23,
          fontWeight: "bold",
        }}
      >
        Tạo tài khoản!
      </Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Họ tên"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Mật khẩu"
          type="text"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="URL avatar (không bắt buộc)"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        containerStyle={styles.btn}
        title="Đăng ký"
        onPress={register}
        raised
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: { width: 300, marginTop: 10 },
  btn: { width: 200 },
});
