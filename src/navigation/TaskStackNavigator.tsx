import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TaskStackParamList } from "../types";
import TasksScreen from "../screens/TasksScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";
import ListsScreen from "../screens/ListsScreen";
import TaskCalendarScreen from "../screens/TaskCalendarScreen";
import ManageListScreen from "../screens/ManageListScreen";

const TaskStack = createNativeStackNavigator<TaskStackParamList>();

const TaskStackNavigator = () => {
  return (
    <TaskStack.Navigator screenOptions={{ headerShown: false }}>
      <TaskStack.Screen name="TasksScreen" component={TasksScreen} />
      <TaskStack.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <TaskStack.Screen
        name="UpdateTaskScreen"
        component={UpdateTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <TaskStack.Screen
        name="TaskCalendarScreen"
        component={TaskCalendarScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
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
