import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../../firebaseConfig";
import SettingsItem from "../components/Account/SettingsItem";
import { paddingNmargin } from "../../constants/styles";
import { SETTINGS } from "../components/data";

const AccountScreen = () => {
  const [email, setEmial] = useState("");
  useEffect(() => {
    const user = auth.currentUser;
    if (user !== null) {
      setEmial(user.email!);
    }
  }, []);

  const logOut = async () => {
    try {
      const res = await signOut(auth);
      console.log(res);
    } catch {}
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.screen}>
        <View style={styles.user}>
          <Image
            source={require("../../assets/defaultAvatar.png")}
            style={styles.avatat}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.eami}>{email}</Text>
          </View>
        </View>
        <FlatList
          data={SETTINGS}
          renderItem={({ item }) => (
            <SettingsItem icon={item.icon} name={item.name} />
          )}
          style={styles.settingsContainer}
        />
        <Pressable onPress={logOut} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    padding: paddingNmargin.standard,
    gap: paddingNmargin.standard,
  },
  header: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
  },
  user: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  avatat: {
    width: 80,
    height: 80,
    resizeMode: "stretch",
  },
  userInfoContainer: {
    alignSelf: "center",
  },
  eami: {
    fontSize: 17,
    fontWeight: "500",
  },
  settingsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
  },
  logoutBtn: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: paddingNmargin.standard,
  },
  logoutText: {
    textAlign: "center",
    color: "#d42828",
  },
});
