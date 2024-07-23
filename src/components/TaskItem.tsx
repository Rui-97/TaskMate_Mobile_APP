import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Swipeable } from "react-native-gesture-handler";

import TaskItemRightActions from "./TaskItemRightActions";
import { formatDateBasedOnVal, formatDate } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";

type TaskItemProps = {
  name: string;
  date: Date | undefined;
};

const TaskItem = ({ name, date }: TaskItemProps) => {
  return (
    <Swipeable renderRightActions={() => <TaskItemRightActions />}>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox onPress={(isChecked: boolean) => {}} />
        </View>
        <View style={styles.taskContainer}>
          <Text>{name}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text>{date && formatDate(date)}</Text>
        </View>
        {/* <Text>{date && formatDateBasedOnVal(date)}</Text> */}
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
