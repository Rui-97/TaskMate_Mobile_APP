import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";

import PressableListTitle from "../components/Task/PressableListTitle";
import AddTaskBtn from "../components/Task/AddTaskBtn";
import IncompletedTasks from "../components/Task/IncompetedTasks";
import CompletedTasks from "../components/Task/CompletedTasks";
import { fontSize, paddingNmargin } from "../../constants/styles";
import { TaskStackParamList } from "../types";

type TasksScreenProps = {
  route: RouteProp<TaskStackParamList, "TasksScreen">;
};
const TasksScreen = ({ route }: TasksScreenProps) => {
  const list = route.params?.list;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        <View style={styles.titleRow}>
          <View style={styles.title}>
            <PressableListTitle list={list} />
          </View>
          <Icon name="more-horizontal" size={25} />
        </View>
        <IncompletedTasks list={list} />
        <CompletedTasks list={list} />
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
