import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { paddingNmargin } from "../../constants/styles";
import ContinueWithThirdPartyButton from "../components/Auth/ContinueWithThirdPartyButton";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import type { GuestStackParamList } from "../types";

type Prop = {
  navigation: NativeStackNavigationProp<GuestStackParamList, "LoginScreen">;
};

const LoginScreen = ({ navigation }: Prop) => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = FIREBASE_AUTH;
  const google = new GoogleAuthProvider();

  const loginButtonPressHandler = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      setIsLoading(false);
    } catch (error: any) {
      console.log("error.code: " + error.code);
      setIsLoading(false);

      if (error.code === "auth/invalid-eamil") {
        setErrorMessage("Invalid email. Please try again.");
      } else if (error.code === "auth/invalid-credential") {
        setErrorMessage("Invalid credential. Please try again.");
      } else if (error.code === "auth/missing-password") {
        setErrorMessage("Missing password. Please enter your password.");
      }
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
        source={require("../../assets/welcome.png")}
        style={styles.image}
      />

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.block}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmial(text);
              setErrorMessage("");
            }}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
            autoCapitalize="none"
            secureTextEntry
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <Pressable style={styles.button} onPress={loginButtonPressHandler}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.orText}>OR</Text>

      <View style={styles.block}>
        <ContinueWithThirdPartyButton
          provider="google"
          onPress={signupWithGoogle}
        />
        <ContinueWithThirdPartyButton
          provider="apple"
          onPress={signupWithGoogle}
        />
      </View>

      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={{ color: "#687dcc" }}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: paddingNmargin.small,
    gap: 30,
  },
  block: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  image: {
    width: "80%",
    height: 250,
    resizeMode: "stretch",
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
  errorMessage: {
    color: "#e21f1f",
    fontSize: 13,
  },
});
