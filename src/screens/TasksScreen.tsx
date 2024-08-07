import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import PressableListTitle from "../components/List/PressableListTitle";
import AddTaskBtn from "../components/Task/AddTaskBtn";
import Tasks from "../components/Task/Tasks";
import CompletedTasks from "../components/Task/CompletedTasks";
import { fontSize, paddingNmargin } from "../../constants/styles";

const TasksScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        <View style={styles.titleRow}>
          <View style={styles.title}>
            <PressableListTitle title="Today" />
          </View>
          <Icon name="more-horizontal" size={25} />
        </View>
        <Tasks />
        <CompletedTasks />
        <AddTaskBtn />
      </View>
    </SafeAreaView>
  );
};

export default TasksScreen;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: paddingNmargin.standard,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
});
