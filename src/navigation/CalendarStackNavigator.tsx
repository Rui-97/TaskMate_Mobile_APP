import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarDefaultScreen from "../screens/CalendarDefaultScreen";
import CalendarMonthlyScreen from "../screens/CalendarMonthlyScreen";
import CalendarWeeklyScreen from "../screens/CalendarWeeklyScreen";
import { CalendarStackParamList } from "../types";

const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarStackNavigator = () => {
  return (
    <CalendarStack.Navigator screenOptions={{ headerShown: false }}>
      <CalendarStack.Screen
        name="CalendarDefaultScreen"
        component={CalendarDefaultScreen}
      />
      <CalendarStack.Screen
        name="CalendarMonthlyScreen"
        component={CalendarMonthlyScreen}
      />
      <CalendarStack.Screen
        name="CalendarWeeklyScreen"
        component={CalendarWeeklyScreen}
      />
    </CalendarStack.Navigator>
  );
};
export default CalendarStackNavigator;
