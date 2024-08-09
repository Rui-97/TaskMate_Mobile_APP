import { FlatList, StyleSheet } from "react-native";
import { useContext } from "react";

import { TasksContext } from "../../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../../constants/styles";

type IncompletedTasksProps = {
  list?: string;
};
const IncompletedTasks = ({ list = "inbox" }: IncompletedTasksProps) => {
  const { getTasksByListAndCompletion } = useContext(TasksContext);
  //Get incompleted tasks in the give list
  const tasksToBeDisplayed = getTasksByListAndCompletion(list, false);

  return (
    <FlatList
      style={styles.container}
      data={tasksToBeDisplayed}
      renderItem={({ item }) => (
        <TaskItem
          name={item.name}
          date={item.date}
          id={item.id}
          isCompleted={false}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default IncompletedTasks;
const styles = StyleSheet.create({
  container: {
    marginVertical: paddingNmargin.standard,
  },
});
