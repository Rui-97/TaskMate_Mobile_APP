import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CalendarScreen from "../screens/CalendarScreen";
import CalendarMonthlyScreen from "../screens/CalendarMonthlyScreen";
import CalendarWeeklyScreen from "../screens/CalendarWeeklyScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import { CalendarStackParamList } from "../types";

const CalendarStack = createNativeStackNavigator<CalendarStackParamList>();
// const CalendarStack = createNativeStackNavigator();

const CalendarStackNavigator = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="CalendarScreen" component={CalendarScreen} />
      <CalendarStack.Screen
        name="CalendarMonthlyScreen"
        component={CalendarMonthlyScreen}
      />
      <CalendarStack.Screen
        name="CalendarWeeklyScreen"
        component={CalendarWeeklyScreen}
      />
      <CalendarStack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    </CalendarStack.Navigator>
  );
};
export default CalendarStackNavigator;
