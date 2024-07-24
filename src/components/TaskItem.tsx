import { View, Text, StyleSheet } from "react-native";
import { useState, useContext } from "react";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Swipeable } from "react-native-gesture-handler";

import renderRightAtions from "./renderRightActions";
import { TasksContext } from "../../context/TasksContext";
import { formatDateBasedOnVal, formatDate } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";

type TaskItemProps = {
  id: string;
  name: string;
  date: Date | undefined;
};

const TaskItem = ({ id, name, date }: TaskItemProps) => {
  const { moveToCompletedTasks } = useContext(TasksContext);

  const checkboxSelectHandler = (isChecked: boolean) => {
    if (isChecked) {
      moveToCompletedTasks(id);
    }
  };
  return (
    <Swipeable renderRightActions={renderRightAtions}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            onPress={(isChecked: boolean) => {
              checkboxSelectHandler(isChecked);
            }}
          />
        </View>
        <View style={styles.taskContainer}>
          <Text>{name}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text>{date && formatDate(date)}</Text>
          {/* <Text>date{date.toDateString()}</Text>
          <Text>{date && formatDateBasedOnVal(date)}</Text> */}
        </View>
      </View>
    </Swipeable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 0.5,
    borderRadius: 6,
    padding: paddingNmargin.small,
    marginBottom: paddingNmargin.small,
    backgroundColor: "#ffffff",
  },
  checkboxContainer: { flex: 1 },
  taskContainer: {
    flex: 6,
    alignItems: "flex-start",
  },
  timeContainer: {
    flex: 2,
    alignItems: "flex-end",
  },
});
