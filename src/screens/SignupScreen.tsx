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
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

import { paddingNmargin } from "../../constants/styles";
import ContinuwWithThirdPartyButton from "../components/Auth/ContinueWithThirdPartyButton";
import { auth } from "../../firebaseConfig";
import type { GuestStackParamList } from "../types";
import { db } from "../../firebaseConfig";

type Prop = {
  navigation: NativeStackNavigationProp<GuestStackParamList, "LoginScreen">;
};
const SignupScreen = ({ navigation }: Prop) => {
  const [email, setEmial] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const google = new GoogleAuthProvider();

  const isPasswordValid = () => {
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return false;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  const signupButtonPressHandler = async () => {
    if (!isPasswordValid()) return;

    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const uid = user.uid;

      // Create a document in the 'users' collection with the user's UID as the document ID
      await setDoc(doc(db, "users", uid), { email: user.email });
      // Add default lists to the user's 'lists' subcollection
      const userListsRef = collection(db, "users", uid, "lists");
      await addDoc(userListsRef, {
        name: "inbox",
        isDefault: true,
      });
      await addDoc(userListsRef, {
        name: "today",
        isDefault: true,
      });

      setIsLoading(false);
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
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrorMessage("");
            }}
            autoCapitalize="none"
            secureTextEntry
          />
          {errorMessage && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
          <Pressable style={styles.button} onPress={signupButtonPressHandler}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}

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
  block: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  errorMessage: {
    color: "#e21f1f",
    fontSize: 13,
  },
});
