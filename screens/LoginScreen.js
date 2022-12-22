import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));

    console.log(auth);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBK8Cnrx7kfQ-jYc6q2wFwf3mp-VXNskTwGQ&usqp=CAU",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Mật khẩu"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={handleLogin}
        />
      </View>
      <Button
        title="Đăng nhập"
        containerStyle={styles.btn}
        onPress={handleLogin}
      />
      <Button
        title="Đăng ký"
        containerStyle={styles.btn}
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  inputContainer: { width: 300 },

  btn: { width: 200, marginTop: 10 },
});
