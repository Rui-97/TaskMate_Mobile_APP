import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Image,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { paddingNmargin } from "../../constants/styles";
import ContinuwWithThirdPartyButton from "../components/Auth/ContinueWithThirdPartyButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import type { RootStackParamList } from "../types";

type Prop = {
  navigation: NativeStackNavigationProp<RootStackParamList, "LoginScreen">;
};
const SignupScreen = ({ navigation }: Prop) => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = FIREBASE_AUTH;
  const google = new GoogleAuthProvider();

  const signupWithEmail = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signupWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, google);
      console.log(res);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={require("../../assets/welcome2.png")}
        style={styles.image}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmial(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        autoCapitalize="none"
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={signupWithEmail}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Text style={styles.orText}>OR</Text>
      <ContinuwWithThirdPartyButton
        provider="google"
        onPress={signupWithGoogle}
      />
      <ContinuwWithThirdPartyButton
        provider="apple"
        onPress={signupWithGoogle}
      />
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={{ color: "#687dcc" }}>Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: paddingNmargin.small,
    gap: 15,
  },
  image: {
    width: "80%",
    height: 280,
    resizeMode: "stretch",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  button: {
    width: "80%",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#687dcc",
  },
  buttonText: {
    color: "#ffffff",
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  orText: {
    color: "#a7a7a7",
  },
  row: {
    flexDirection: "row",
    gap: 5,
  },
});
