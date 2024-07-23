import { Pressable, View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const TaskItemRightActions = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("delete")} style={styles.trash}>
        <FontAwesome5Icon name="trash-alt" size={15} color={"white"} />
      </Pressable>
      <Pressable onPress={() => console.log("delete")} style={styles.calendar}>
        <FontAwesome5Icon name="calendar-alt" size={15} color={"white"} />
      </Pressable>
    </View>
  );
};

export default TaskItemRightActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  trash: { padding: 8, backgroundColor: "#cb1e1e" },
  calendar: { padding: 8, backgroundColor: "#e69819" },
});
