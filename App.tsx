import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootStackNavigator from "./src/navigation/RootStackNavigator";
import TasksContextProvider from "./context/TasksContext";
import ListsContextProvider from "./context/ListsContext";

export default function App() {
  return (
    <GestureHandlerRootView>
      <TasksContextProvider>
        <ListsContextProvider>
          <NavigationContainer>
            <RootStackNavigator />
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
