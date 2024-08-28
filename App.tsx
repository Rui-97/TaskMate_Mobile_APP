import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import RootStack from "./src/navigation/RootStack";
import GuestStack from "./src/navigation/GuestStack";
import TasksContextProvider from "./context/TasksContext";
import ListsContextProvider from "./context/ListsContext";
import { FIREBASE_AUTH } from "./firebaseConfig";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //Set observer to listen for auth status changes
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <GestureHandlerRootView>
      <TasksContextProvider>
        <ListsContextProvider>
          <NavigationContainer>
            {user ? <RootStack /> : <GuestStack />}
          </NavigationContainer>
        </ListsContextProvider>
      </TasksContextProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
