import { Pressable, View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Swipeable } from "react-native-gesture-handler";

import RightActions from "./RightActions";
import { TasksContext } from "../../context/TasksContext";
import { formatDateBasedOnVal } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";
import type { TaskStackParamList } from "../types";

type TaskItemProps = {
  id: string;
  name: string;
  date: string;
  isCompleted: boolean;
};

type TaskItemNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TasksScreen"
>;

const TaskItem = ({ id, name, date, isCompleted }: TaskItemProps) => {
  const { moveToCompletedTasks, moveBackToTasks } = useContext(TasksContext);
  const navigation = useNavigation<TaskItemNavigationProp>();

  const pressHandler = () => {
    if (!isCompleted) {
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
    <Pressable onPress={pressHandler}>
      <Swipeable
        renderRightActions={(progress) => renderRightActionsHandler(progress)}
      >
        <View style={styles.container}>
          <View>
            <BouncyCheckbox
              // text={name}
              // textStyle={
              //   isCompleted
              //     ? { color: "#b5b4b4", fontSize: 15 }
              //     : { color: "#000000", fontSize: 15 }
              // }
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
            />
          </View>
          <View>
            <Text
              style={[
                styles.taskContainer,
                isCompleted
                  ? { color: "#b5b4b4", fontSize: 15 }
                  : { color: "#000000", fontSize: 15 },
              ]}
            >
              {name}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text
              style={isCompleted ? { color: "#b5b4b4" } : { color: "#000000" }}
            >
              {date && formatDateBasedOnVal(date)}
            </Text>
          </View>
        </View>
      </Swipeable>
    </Pressable>
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
  taskContainer: {
    alignItems: "flex-start",
  },
  timeContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
