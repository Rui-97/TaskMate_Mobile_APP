import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PomoScreen from "../screens/PomoScreen";
import PomoCompleteScreen from "../screens/PomoCompleteScreen";
import { PomoStackParamList } from "../types";

const PomoStack = createNativeStackNavigator<PomoStackParamList>();
// const PomoStack = createNativeStackNavigator();

const PomoStackNavigator = () => {
  return (
    <PomoStack.Navigator>
      <PomoStack.Screen name="PomoScreen" component={PomoScreen} />
      <PomoStack.Screen
        name="PomoCompleteScreen"
        component={PomoCompleteScreen}
      />
    </PomoStack.Navigator>
  );
};
export default PomoStackNavigator;
