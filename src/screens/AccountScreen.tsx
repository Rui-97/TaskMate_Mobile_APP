import { View, SafeAreaView, Text, Pressable } from "react-native";
import { signOut } from "firebase/auth";

import { auth } from "../../firebaseConfig";

const AccountScreen = () => {
  const logOut = async () => {
    try {
      const res = await signOut(auth);
      console.log(res);
    } catch {}
  };

  return (
    <SafeAreaView>
      <Pressable onPress={logOut}>
        <Text>Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AccountScreen;
