import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { TaskStackParamList } from "../types";
import TasksScreen from "../screens/TasksScreen";
import ListsScreen from "../screens/ListsScreen";
import ManageListScreen from "../screens/ManageListScreen";

const Stack = createNativeStackNavigator<TaskStackParamList>();

const TaskStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen
        name="ListsScreen"
        component={ListsScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <Stack.Screen
        name="ManageListScreen"
        component={ManageListScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
    </Stack.Navigator>
  );
};

export default TaskStack;
