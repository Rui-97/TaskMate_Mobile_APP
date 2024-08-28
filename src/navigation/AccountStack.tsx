import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import type { AccountStackParamList } from "../types";

const Stack = createNativeStackNavigator<AccountStackParamList>();

const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};
export default AccountStack;
