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
  isCompleted: boolean;
};

const TaskItem = ({ id, name, date, isCompleted }: TaskItemProps) => {
  const { moveToCompletedTasks, moveBackToTasks } = useContext(TasksContext);

  const incompleteTaskCheckboxSelectHandler = (isChecked: boolean) => {
    if (isChecked) {
      setTimeout(() => {
        moveToCompletedTasks(id);
      }, 300);
    }
  };
  const completedTaskCheckboxSelectHandler = (isChecked: boolean) => {
    if (!isChecked) {
      setTimeout(() => {
        moveBackToTasks(id);
      }, 300);
    }
  };
  return (
    <Swipeable
      renderRightActions={
        isCompleted
          ? () => {
              return <View></View>;
            }
          : renderRightAtions
      }
    >
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            text={name}
            textStyle={
              isCompleted
                ? { color: "#b5b4b4", fontSize: 15 }
                : { color: "#000000", fontSize: 15 }
            }
            onPress={
              isCompleted
                ? (isChecked: boolean) => {
                    completedTaskCheckboxSelectHandler(isChecked);
                  }
                : (isChecked: boolean) => {
                    incompleteTaskCheckboxSelectHandler(isChecked);
                  }
            }
            isChecked={isCompleted ? true : false}
            bounceEffectIn={0.9}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text
            style={isCompleted ? { color: "#b5b4b4" } : { color: "#000000" }}
          >
            {date && formatDate(date)}
          </Text>
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
    alignItems: "flex-start",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
});
