import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/AccountScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { AccountStackParamList } from "../types";

const AccountStack = createNativeStackNavigator<AccountStackParamList>();
// const AccountStack = createNativeStackNavigator();

const AccountStackNavigator = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </AccountStack.Navigator>
  );
};
export default AccountStackNavigator;
