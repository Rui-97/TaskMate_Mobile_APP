import { FlatList, StyleSheet } from "react-native";
import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../constants/styles";

const Tasks = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <FlatList
      style={styles.container}
      data={tasks}
      renderItem={({ item }) => <TaskItem name={item.name} date={item.date} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Tasks;
const styles = StyleSheet.create({
  container: {
    marginVertical: paddingNmargin.standard,
  },
});
