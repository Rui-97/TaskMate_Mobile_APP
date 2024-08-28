import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PomoScreen from "../screens/PomoScreen";
import PomoCompleteScreen from "../screens/PomoCompleteScreen";
import type { PomoStackParamList } from "../types";

const Stack = createNativeStackNavigator<PomoStackParamList>();

const PomoStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PomoScreen" component={PomoScreen} />
      <Stack.Screen name="PomoCompleteScreen" component={PomoCompleteScreen} />
    </Stack.Navigator>
  );
};
export default PomoStack;
