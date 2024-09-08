import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Title,
  ImageBackground,
  LogBox,
  Alert,
} from "react-native";
import StartScreen from "./components/Start";
import ChatScreen from "./components/Chat";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Create the navigator
const Stack = createNativeStackNavigator();
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAhW5CbRm__A3OKBkkQOwjSWWtwiumB6u4",
    authDomain: "chatapp-cf188.firebaseapp.com",
    projectId: "chatapp-cf188",
    storageBucket: "chatapp-cf188.appspot.com",
    messagingSenderId: "1011508160945",
    appId: "1:1011508160945:web:9752aa4a25f797213ab590",
  };

  const connectionStatus = useNetInfo();
  // Display an alert when connection is lost
  // disable or  enable connection yo the firestore database, dapending on the connection status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize the storage handler
  const storage = getStorage(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ChatScreen">
          {(props) => (
            <ChatScreen
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default App;
