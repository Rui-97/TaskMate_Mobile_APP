import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

import TaskStack from "./TaskStack";
import CalendarStack from "./CalendarStack";
import PomoScreen from "../screens/PomoScreen";
import AccountScreen from "../screens/AccountScreen";
import type { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const RootTab = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="TaskStack"
        component={TaskStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 11, color: focused ? "#687dcc" : "#000000" }}
            >
              Tasks
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name={focused ? "checkbox" : "checkbox-outline"}
              size={25}
              color={focused ? "#687dcc" : "#000000"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 11, color: focused ? "#687dcc" : "#000000" }}
            >
              Calendar
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name={focused ? "calendar" : "calendar-outline"}
              size={25}
              color={focused ? "#687dcc" : "#000000"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="PomoScreen"
        component={PomoScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 11, color: focused ? "#687dcc" : "#000000" }}
            >
              Pomo
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name={focused ? "timer" : "timer-outline"}
              size={28}
              color={focused ? "#687dcc" : "#000000"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{ fontSize: 11, color: focused ? "#687dcc" : "#000000" }}
            >
              Account
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicon
              name={focused ? "person" : "person-outline"}
              size={25}
              color={focused ? "#687dcc" : "#000000"}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
export default RootTab;
