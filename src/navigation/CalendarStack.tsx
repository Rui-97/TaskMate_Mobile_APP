import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarDefaultScreen from "../screens/CalendarDefaultScreen";
import CalendarMonthlyScreen from "../screens/CalendarMonthlyScreen";
import CalendarWeeklyScreen from "../screens/CalendarWeeklyScreen";
import type { CalendarStackParamList } from "../types";

const Stack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CalendarDefaultScreen"
        component={CalendarDefaultScreen}
      />
      <Stack.Screen
        name="CalendarMonthlyScreen"
        component={CalendarMonthlyScreen}
      />
      <Stack.Screen
        name="CalendarWeeklyScreen"
        component={CalendarWeeklyScreen}
      />
    </Stack.Navigator>
  );
};
export default CalendarStack;
