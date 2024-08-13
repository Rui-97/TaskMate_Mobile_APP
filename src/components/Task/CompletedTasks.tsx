import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { ListItem } from "@rneui/themed";

import { TasksContext } from "../../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../../constants/styles";

type CompletedTasksProps = {
  list?: string;
};

const CompletedTasks = ({ list = "inbox" }: CompletedTasksProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getTasksByListAndCompletion } = useContext(TasksContext);
  //Get completed tasks in the give list
  const tasksToBeDisplayed = getTasksByListAndCompletion(list, true);

  return (
    <View style={styles.container}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 15 }}>
                Completed ({tasksToBeDisplayed.length})
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        containerStyle={styles.accordionHeader}
      >
        {tasksToBeDisplayed.map((task, i) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            date={task.date}
            isCompleted
          />
        ))}
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
    borderColor: "#d3d3d3",
    borderWidth: 0.5,
    borderRadius: 6,
    padding: paddingNmargin.small,
  },
});
