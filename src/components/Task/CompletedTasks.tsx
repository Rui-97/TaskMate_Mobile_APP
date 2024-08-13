import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { ListItem } from "@rneui/themed";

import { TasksContext } from "../../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../../constants/styles";

type CompletedTasksProps = {
  listId?: string;
};

const CompletedTasks = ({ listId = "2" }: CompletedTasksProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getTasksByListIdAndCompletion } = useContext(TasksContext);
  //Get completed tasks in the given list id
  const tasksToBeDisplayed = getTasksByListIdAndCompletion(listId, true);

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
        containerStyle={[
          styles.accordionHeader,
          isExpanded && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        {tasksToBeDisplayed.map((task) => (
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
    borderRadius: 10,
    padding: paddingNmargin.small,
  },
});
