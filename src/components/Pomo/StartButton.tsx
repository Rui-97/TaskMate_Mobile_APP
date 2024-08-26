import { Pressable, Text, StyleSheet } from "react-native";

const StartButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.text}>Start</Text>
    </Pressable>
  );
};

export default StartButton;
const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#687dcc",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },

  text: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
