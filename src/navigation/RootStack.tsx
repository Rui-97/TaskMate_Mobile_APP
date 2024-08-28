import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../types";
import AddTaskScreen from "../screens/AddTaskScreen";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";
import RootTab from "./RootTab";
import TaskCalendarScreen from "../screens/TaskCalendarScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={RootTab} />
      <Stack.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <Stack.Screen
        name="UpdateTaskScreen"
        component={UpdateTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <Stack.Screen
        name="TaskCalendarScreen"
        component={TaskCalendarScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
