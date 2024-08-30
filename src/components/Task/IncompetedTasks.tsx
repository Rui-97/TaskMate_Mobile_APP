import { FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import { TasksContext } from "../../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../../constants/styles";
import type { SortOptions } from "../../types";

type IncompletedTasksProps = {
  listId?: string;
  sortBy: SortOptions;
  showDetails: boolean;
};

const IncompletedTasks = ({
  listId,
  sortBy,
  showDetails,
}: IncompletedTasksProps) => {
  const { getTasksByListIdAndCompletion, sortTasksBy } =
    useContext(TasksContext);

  //Get incompleted tasks in the give list id
  const tasks = getTasksByListIdAndCompletion(listId!, false);
  // Sort Tasks
  const sortedTasks = sortTasksBy(tasks, sortBy);

  return (
    <FlatList
      style={styles.container}
      data={sortedTasks}
      renderItem={({ item }) => (
        <TaskItem key={item.id} task={item} showDetails={showDetails} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default IncompletedTasks;
const styles = StyleSheet.create({
  container: {
    marginVertical: paddingNmargin.standard,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
});
