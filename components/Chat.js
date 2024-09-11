import { useState, useEffect } from "react";
import CustomActions from "./CustomActions";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  storage,
} from "react-native-gifted-chat";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView from "react-native-maps";

const ChatScreen = ({ route, navigation, db, isConnected }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  // in order to diplsay the user's name as a title and the chosen color as the background color
  useEffect(() => {
    navigation.setOptions({ title: name, color: background });
  }, []);

  // sets the state with a static message. Like this, the element will be displayed on the screen right away.
  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      //  fetch messages from the Firestore Database only if there’s a network connection
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      // if there is not a network connection, fetch the data from the AsyncStorage
      loadCachedMessages();
    }
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // called when a user sends a message
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
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

  // render or not the InputTool depending on the connection status
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // creates the circle button
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        storage={storage}
        {...props}
        accessible={true}
        accesssibilityLabel="More options"
        accessibilityHint="Lets you take and send photos and your current location"
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    //console.log("current Message", currentMessage);
    if (currentMessage?.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
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
