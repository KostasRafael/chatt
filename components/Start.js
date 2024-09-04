import { Button, TextInput, ImageBackground } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

const StartScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [background, setBackground] = useState("");
  return (
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.imageBackground}
    >
      <TextInput
        style={styles.textInput}
        value={username}
        onChangeText={setUserName}
        placeholder="Your Name"
      />

      <Text>Choose Background Color</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {colors.map((color, index) => (
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityHint="Lets you choose background color for your chat screen"
            style={{
              backgroundColor: color,
              width: 50,
              height: 50,
              borderRadius: 25,
              margin: 5,
            }}
            onPress={() => setBackground(color)}
          />
        ))}
      </View>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Lets you choose to enter the chat room"
        style={styles.touchableOpacity}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            username: username,
            background: background,
          })
        }
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: "88%",
    height: "44%",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  touchableOpacity: {
    alignItems: "center",
    backgroundColor: "#757083",
    borderRadius: 4,
    height: "20%",
    justifyContent: "center",
    padding: 10,
    width: "88%",
  },
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  Button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default StartScreen;
