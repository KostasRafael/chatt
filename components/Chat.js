import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";

const ChatScreen = ({ route, navigation, db }) => {
  const { username, background } = route.params;
  const [messages, setMessages] = useState([]);
  const [lists, setLists] = useState([]);
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
    const unsubMessages = onSnapshot(
      collection(db, "messages"),
      (documentsSnapshot) => {
        let newLists = [];
        documentsSnapshot.forEach((doc) => {
          newLists.push({ id: doc.id, ...doc.data() });
        });
        setLists(newLists);
      }
    );

    // Clean up code
    return () => {
      if (unsubShoppinglists) unsubShoppinglists();
    };
  }, []);
  // in order to diplsay the user's name as a title
  useEffect(() => {
    navigation.setOptions({ title: username });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <Text>
            {item.name}: {item.items.join(", ")}
          </Text>
        )}
      />
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
