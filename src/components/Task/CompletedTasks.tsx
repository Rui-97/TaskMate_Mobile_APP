import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { ListItem } from "@rneui/themed";

import { TasksContext } from "../../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../../constants/styles";
import type { SortOptions } from "../../types";

type CompletedTasksProps = {
  listId?: string;
  sortBy: SortOptions;
};

const CompletedTasks = ({ listId, sortBy }: CompletedTasksProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getTasksByListIdAndCompletion, sortTasksBy } =
    useContext(TasksContext);
  //Get completed tasks in the given list id
  const tasks = getTasksByListIdAndCompletion(listId!, true);
  // Sort Tasks
  const sortedTasks = sortTasksBy(tasks, sortBy);

  return (
    <View style={styles.container}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 15 }}>
                Completed ({sortedTasks.length})
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        containerStyle={[
          styles.accordionHeader,
          isExpanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        <View style={styles.tasksContainer}>
          {sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} showDetails={false} />
          ))}
        </View>
      </ListItem.Accordion>
    </View>
  );
};

export default CompletedTasks;
const styles = StyleSheet.create({
  container: {
    marginVertical: paddingNmargin.standard,
  },
  accordionHeader: {
    borderRadius: 10,
    padding: paddingNmargin.small,
  },
  tasksContainer: {
    backgroundColor: "#ffffff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
