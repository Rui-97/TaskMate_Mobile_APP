import { View, FlatList, StyleSheet } from "react-native";
import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../constants/styles";

const CompletedTasks = () => {
  const { completedTasks } = useContext(TasksContext);
  return (
    <FlatList
      style={styles.container}
      data={completedTasks}
      renderItem={({ item }) => (
        <TaskItem id={item.id} name={item.name} date={item.date} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default CompletedTasks;
const styles = StyleSheet.create({
  container: {
    marginVertical: paddingNmargin.standard,
  },
});
