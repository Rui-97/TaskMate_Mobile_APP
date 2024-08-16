import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TaskStackParamList } from "../types";
import TasksScreen from "../screens/TasksScreen";
import ListsScreen from "../screens/ListsScreen";
import ManageListScreen from "../screens/ManageListScreen";

const TaskStack = createNativeStackNavigator<TaskStackParamList>();

const TaskStackNavigator = () => {
  return (
    <TaskStack.Navigator screenOptions={{ headerShown: false }}>
      <TaskStack.Screen name="TasksScreen" component={TasksScreen} />
      <TaskStack.Screen
        name="ListsScreen"
        component={ListsScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <TaskStack.Screen
        name="ManageListScreen"
        component={ManageListScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
    </TaskStack.Navigator>
  );
};

export default TaskStackNavigator;
