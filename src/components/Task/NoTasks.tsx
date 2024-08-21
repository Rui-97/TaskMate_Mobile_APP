import { View, Image, Text, StyleSheet } from "react-native";
import { paddingNmargin } from "../../../constants/styles";

const NoTasks = () => {
  return (
    <View style={styles.noTaskBodyContainer}>
      <Image
        source={require("../../../assets/noTask.png")}
        style={styles.img}
      />
      <Text style={styles.noTaskText}>No Tasks</Text>
      <Text style={styles.addText}>Tap the + to add</Text>
    </View>
  );
};

export default NoTasks;

const styles = StyleSheet.create({
  noTaskBodyContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 100,
  },
  img: {
    width: 120,
    height: 120,
  },
  noTaskText: {
    marginTop: paddingNmargin.standard,
    fontSize: 16,
    fontWeight: "500",
  },
  addText: { marginTop: paddingNmargin.small, color: "#687dcc" },
});
