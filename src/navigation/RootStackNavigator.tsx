import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "../types";
import AddTaskScreen from "../screens/AddTaskScreen";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";
import RootTabNavigator from "./RootTabNavigator";
import TaskCalendarScreen from "../screens/TaskCalendarScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="SignupScreen" component={SignupScreen} />
      <RootStack.Screen name="BottomTab" component={RootTabNavigator} />
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
