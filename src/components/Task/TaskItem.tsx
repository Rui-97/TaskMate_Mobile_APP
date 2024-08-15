import { Pressable, View, Text, StyleSheet } from "react-native";
import { useContext, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Swipeable } from "react-native-gesture-handler";

import RightActions from "./RightActions";
import { TasksContext } from "../../../context/TasksContext";
import { formatDateBasedOnVal } from "../../utils/utils";
import type { TaskStackParamList, Task } from "../../types";
import { capitalizeWord } from "../../utils/utils";

type TaskItemProps = {
  task: Task;
  showDetails: boolean;
};

type TaskItemNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TasksScreen"
>;
const PRIORITY_COLOR = {
  no: "#868686",
  low: "#1466ea",
  medium: "#f9b44d",
  high: "#cb1e1e",
};

const TaskItem = ({ task, showDetails }: TaskItemProps) => {
  const { markTaskAsCompleted, markTaskAsIncompleted } =
    useContext(TasksContext);
  const navigation = useNavigation<TaskItemNavigationProp>();
  const isSwiping = useRef(false);
  const { id, name, date, description, isCompleted, priority } = task;

  const pressHandler = () => {
    if (!isCompleted && !isSwiping.current) {
      navigation.navigate("UpdateTaskScreen", { taskId: id });
    }
  };

  const renderRightActionsHandler = (progress) => {
    if (!isCompleted) {
      return <RightActions progress={progress} taskID={id} />;
    }
  };
  const incompleteTaskCheckboxSelectHandler = (isChecked: boolean) => {
    if (isChecked) {
      setTimeout(() => {
        markTaskAsCompleted(id);
      }, 300);
    }
  };
  const completedTaskCheckboxSelectHandler = (isChecked: boolean) => {
    if (!isChecked) {
      setTimeout(() => {
        markTaskAsIncompleted(id);
      }, 300);
    }
  };

  return (
    <Pressable onPress={pressHandler}>
      <Swipeable
        renderRightActions={(progress) => renderRightActionsHandler(progress)}
        onSwipeableWillOpen={() => (isSwiping.current = true)}
        onSwipeableClose={() => (isSwiping.current = false)}
      >
        <View
          style={[styles.container, { paddingVertical: showDetails ? 15 : 10 }]}
        >
          <View style={styles.taskRow}>
            <View>
              <BouncyCheckbox
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
                bounceEffectIn={1.1}
                size={22}
                fillColor={isCompleted ? "#b5b4b4" : PRIORITY_COLOR[priority]}
              />
            </View>
            <Text
              style={[
                styles.taskName,
                isCompleted
                  ? { color: "#b5b4b4", fontSize: 15 }
                  : { color: "#000000", fontSize: 15 },
              ]}
            >
              {name}
            </Text>
            <View style={styles.dateContainer}>
              <Text
                style={
                  isCompleted ? { color: "#b5b4b4" } : { color: "#000000" }
                }
              >
                {date && formatDateBasedOnVal(date)}
              </Text>
            </View>
          </View>
          {/* Detail */}
          {showDetails && (
            <View style={styles.detailRow}>
              <Text style={styles.description}>{description}</Text>
              <Text style={{ color: PRIORITY_COLOR[priority] }}>
                {capitalizeWord(priority)} priority
              </Text>
            </View>
          )}
        </View>
      </Swipeable>
    </Pressable>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  taskName: {
    alignItems: "flex-start",
  },
  dateContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  detailRow: {
    flexDirection: "row",
  },
  description: {
    flex: 1,
    marginLeft: "10%",
  },
});
