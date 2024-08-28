import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";

import TaskStack from "./TaskStack";
import CalendarStack from "./CalendarStack";
import PomoStack from "./PomoStack";
import AccountStack from "./AccountStack";
import type { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const RootTab = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="TaskStack"
        component={TaskStack}
        options={{
          tabBarLabel: "Task",
          tabBarIcon: () => <Ionicon name="checkbox-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: () => <Ionicon name="calendar-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="PomoStack"
        component={PomoStack}
        options={{
          tabBarLabel: "Pomo",
          tabBarIcon: () => <Ionicon name="timer-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: () => <Ionicon name="person-outline" size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
export default RootTab;
