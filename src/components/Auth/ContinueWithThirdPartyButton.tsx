import { Pressable, Text, StyleSheet, Image } from "react-native";

import { capitalizeWord } from "../../utils/utils";

const ContinueWithThirdPartyButton = ({
  provider,
  onPress,
}: {
  provider: "google" | "apple";
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image
        source={
          provider === "google"
            ? require(`../../../assets/logo_google.png`)
            : require(`../../../assets/logo_apple.png`)
        }
        style={styles.logo}
      />
      <Text style={styles.buttonText}>
        Continue with {capitalizeWord(provider)}
      </Text>
    </Pressable>
  );
};

export default ContinueWithThirdPartyButton;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
  logo: {
    width: 20,
    height: 22,
    resizeMode: "stretch",
  },
});
