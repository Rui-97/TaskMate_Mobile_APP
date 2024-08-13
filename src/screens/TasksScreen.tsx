import {
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import { useContext } from "react";

import PressableListTitle from "../components/Task/PressableListTitle";
import AddTaskBtn from "../components/Task/AddTaskBtn";
import IncompletedTasks from "../components/Task/IncompetedTasks";
import CompletedTasks from "../components/Task/CompletedTasks";
import { paddingNmargin } from "../../constants/styles";
import { TaskStackParamList } from "../types";
import { TasksContext } from "../../context/TasksContext";

type TasksScreenProps = {
  route: RouteProp<TaskStackParamList, "TasksScreen">;
};
const TasksScreen = ({ route }: TasksScreenProps) => {
  const { getTasksByListIdAndCompletion } = useContext(TasksContext);
  const listId = route.params?.listId;
  const TasksNumInList =
    listId && getTasksByListIdAndCompletion(listId!, false).length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        {/* Header */}
        <View style={styles.titleRow}>
          <View style={styles.title}>
            <PressableListTitle listId={listId} />
          </View>
          <Pressable>
            <Icon name="more-horizontal" size={25} />
          </Pressable>
        </View>
        {/* Body */}
        {TasksNumInList === 0 ? (
          <View style={styles.noTaskBodyContainer}>
            <Image
              source={require("../../assets/noTask.png")}
              style={styles.img}
            />
            <Text style={styles.noTaskText}>No Tasks</Text>
            <Text style={styles.addText}>Tap the + to add</Text>
          </View>
        ) : (
          <View>
            <IncompletedTasks listId={listId} />
            <CompletedTasks listId={listId} />
          </View>
        )}
        <AddTaskBtn destinationListId={listId!} />
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
  noTaskBodyContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 200,
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
