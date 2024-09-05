import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
  const { username, background } = route.params;
  const [messages, setMessages] = useState([]);
  // called when a user sends a message
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // to specify the colors of the message sender's speech bubble and the reciever sender's speech bubble
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };
  // sets the state with a static message. Like this, the element will be displayed on the screen right away.
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Welcome to the chat!",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);
  // in order to diplsay the user's name as a title
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        style={{ backgroundColor: background }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
