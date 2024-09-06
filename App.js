import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Title, ImageBackground } from "react-native";
import StartScreen from "./components/Start";
import ChatScreen from "./components/Chat";
// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Create the navigator
const Stack = createNativeStackNavigator();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAhW5CbRm__A3OKBkkQOwjSWWtwiumB6u4",
    authDomain: "chatapp-cf188.firebaseapp.com",
    projectId: "chatapp-cf188",
    storageBucket: "chatapp-cf188.appspot.com",
    messagingSenderId: "1011508160945",
    appId: "1:1011508160945:web:9752aa4a25f797213ab590",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="ChatScreen">
          {(props) => <ChatScreen db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
