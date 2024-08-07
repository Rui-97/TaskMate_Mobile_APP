import { Pressable, Text, StyleSheet } from "react-native";

import { paddingNmargin } from "../../../constants/styles";

type SimpleBtnProps = {
  buttonName: string;
  border: boolean;
  onPress: () => void;
};

const SimpleBtn = ({ buttonName, border, onPress }: SimpleBtnProps) => {
  return (
    <Pressable
      style={[styles.container, border && styles.border]}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={styles.buttonName}>{buttonName}</Text>
    </Pressable>
  );
};

export default SimpleBtn;

const styles = StyleSheet.create({
  container: {
    paddingVertical: paddingNmargin.small,
    paddingHorizontal: paddingNmargin.standard,
  },
  buttonName: {
    color: "#687dcc",
    fontWeight: "500",
  },
  border: {
    borderWidth: 0.5,
    borderColor: "#687dcc",
    borderRadius: 15,
  },
});
