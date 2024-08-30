import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import RootStack from "./src/navigation/RootStack";
import GuestStack from "./src/navigation/GuestStack";
import TasksContextProvider from "./context/TasksContext";
import ListsContextProvider from "./context/ListsContext";
import { auth } from "./firebaseConfig";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //Set observer to listen for auth status changes
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <GestureHandlerRootView>
          <TasksContextProvider>
            <ListsContextProvider>
              <RootStack />
            </ListsContextProvider>
          </TasksContextProvider>
        </GestureHandlerRootView>
      ) : (
        <GuestStack />
      )}
    </NavigationContainer>
  );
}
