import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootTabNavigator from "./src/navigation/RootTabNavigator";
import TasksContextProvider from "./context/TasksContext";

export default function App() {
  return (
    <GestureHandlerRootView>
      <TasksContextProvider>
        <NavigationContainer>
          <RootTabNavigator />
        </NavigationContainer>
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
