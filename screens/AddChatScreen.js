import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Input } from "react-native-elements";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thêm trò chuyện mới",
      headerBackTitle: "Chats",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Input
        containerStyle={styles.inputContainer}
        placeholder="Nhập tên cuộc trò chuyện"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        maxLength={15}
      />

      <Button
        disabled={!input}
        containerStyle={styles.btn}
        onPress={createChat}
        title="Tạo cuộc trò chuyện mới"
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  inputContainer: { width: 350, padding: 20 },
  btn: { padding: 20 },
});
