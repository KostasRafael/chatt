import { Button, TextInput, ImageBackground } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";

const StartScreen = ({ navigation }) => {
  const auth = getAuth();
  const [username, setUserName] = useState("");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];
  const [background, setBackground] = useState("");

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("ChatScreen", {
          userID: result.user.uid,
          name: username,
          background: background,
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };
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
            key={index}
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
        onPress={signInUser}
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
