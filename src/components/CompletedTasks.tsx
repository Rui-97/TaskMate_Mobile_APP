import { View, FlatList, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { ListItem } from "@rneui/themed";

import { TasksContext } from "../../context/TasksContext";
import TaskItem from "./TaskItem";
import { paddingNmargin } from "../../constants/styles";

const CompletedTasks = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { completedTasks } = useContext(TasksContext);
  // return (
  //   <FlatList
  //     style={styles.container}
  //     data={completedTasks}
  //     renderItem={({ item }) => (
  //       <TaskItem id={item.id} name={item.name} date={item.date} isCompleted />
  //     )}
  //     keyExtractor={(item) => item.id}
  //   />
  // );
  return (
    <View style={styles.container}>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 15 }}>
                Completed ({completedTasks.length})
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        containerStyle={styles.accordionHeader}
      >
        {completedTasks.map((task, i) => (
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
    flex: 1,
    // borderWidth: 2,
    marginVertical: paddingNmargin.standard,
  },
  accordionHeader: {
    borderColor: "#d3d3d3",
    borderWidth: 0.5,
    borderRadius: 6,
    padding: paddingNmargin.small,
  },
});
