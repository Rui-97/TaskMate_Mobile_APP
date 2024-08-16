import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import AddTaskScreen from "../screens/AddTaskScreen";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";
import RootTabNavigator from "./RootTabNavigator";
import TaskCalendarScreen from "../screens/TaskCalendarScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="BottomTab"
        component={RootTabNavigator}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <RootStack.Screen
        name="UpdateTaskScreen"
        component={UpdateTaskScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "35%", borderRadius: 5 },
        }}
      />
      <RootStack.Screen
        name="TaskCalendarScreen"
        component={TaskCalendarScreen}
        options={{
          presentation: "modal",
          contentStyle: { top: "30%", borderRadius: 5 },
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
