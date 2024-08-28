import { View, SafeAreaView, Text, Pressable } from "react-native";
import { signOut } from "firebase/auth";

import { FIREBASE_AUTH } from "../../firebaseConfig";

const AccountScreen = () => {
  const logOut = async () => {
    try {
      const res = await signOut(FIREBASE_AUTH);
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
