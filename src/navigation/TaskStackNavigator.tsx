import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TasksScreen from "../screens/TasksScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import ListsScreen from "../screens/ListsScreen";
import TaskCalendarScreen from "../screens/TaskCalendarScreen";
import { TaskStackParamList } from "../types";

const TaskStack = createNativeStackNavigator<TaskStackParamList>();
// const TaskStack = createNativeStackNavigator();

const TaskStackNavigator = () => {
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{ headerShown: false }}
      />
      <TaskStack.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{
          presentation: "modal",
          headerShown: false,
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <TaskStack.Screen
        name="TaskCalendarScreen"
        component={TaskCalendarScreen}
        options={{
          presentation: "modal",
          headerShown: false,
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
      <TaskStack.Screen
        name="ListsScreen"
        component={ListsScreen}
        options={{ presentation: "modal", headerTitle: "Lists" }}
      />
    </TaskStack.Navigator>
  );
};

export default TaskStackNavigator;
