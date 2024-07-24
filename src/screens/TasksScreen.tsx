import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";

import type { TaskStackParamList } from "../types";
import PressableListTitle from "../components/PressableListTitle";
import AddTaskBtn from "../components/AddTaskBtn";
import Tasks from "../components/Tasks";
import CompletedTasks from "../components/CompletedTasks";
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
        <Text>complete</Text>
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
