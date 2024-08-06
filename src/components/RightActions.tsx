import React, { useContext } from "react";
import { Animated, Pressable, View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { paddingNmargin } from "../../constants/styles";
import { TasksContext } from "../../context/TasksContext";

type RightActionsProps = {
  progress: Animated.AnimatedInterpolation<number>;
  taskID: string;
};

const RightActions = ({ progress, taskID }: RightActionsProps) => {
  const { deleteTask } = useContext(TasksContext);

  const renderRightAction = (
    x: number,
    icon: string,
    iconFamily: "fontAwsome" | "material",
    bg: string,
    actionHandler: () => void
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <Pressable
          onPress={actionHandler}
          style={[styles.rightAction, { backgroundColor: bg }]}
        >
          {iconFamily === "fontAwsome" ? (
            <FontAwesome5Icon name={icon} size={18} color={"white"} />
          ) : (
            <MaterialCommunityIcon name={icon} size={20} color={"white"} />
          )}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderRightAction(192, "trash-alt", "fontAwsome", "#cb1e1e", () =>
        deleteTask(taskID)
      )}
      {renderRightAction(128, "calendar-alt", "fontAwsome", "#ea6a14", () =>
        console.log("Calendar action")
      )}
      {renderRightAction(64, "folder-move-outline", "material", "#1466ea", () =>
        console.log("Move action")
      )}
    </View>
  );
};

export default RightActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: paddingNmargin.small,
    paddingHorizontal: 12,
  },
});
