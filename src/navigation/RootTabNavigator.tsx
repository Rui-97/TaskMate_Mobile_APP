import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicon from "react-native-vector-icons/Ionicons";
import OcticonIcon from "react-native-vector-icons/Octicons";

import TaskStackNavigator from "./TaskStackNavigator";
import CalendarStackNavigator from "./CalendarStackNavigator";
import PomoStackNavigator from "./PomoStackNavigator";
import AccountStackNavigator from "./AccountStackNavigator";
import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const RootTabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name="TaskStack"
        component={TaskStackNavigator}
        options={{
          tabBarLabel: "Task",
          tabBarIcon: () => <Ionicon name="checkbox-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="CalendarStack"
        component={CalendarStackNavigator}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: () => <Ionicon name="calendar-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="PomoStack"
        component={PomoStackNavigator}
        options={{
          tabBarLabel: "Pomo",
          tabBarIcon: () => <Ionicon name="timer-outline" size={25} />,
        }}
      />
      <BottomTab.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: () => <Ionicon name="person-outline" size={25} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
export default RootTabNavigator;
