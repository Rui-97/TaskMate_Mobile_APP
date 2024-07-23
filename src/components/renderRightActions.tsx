import { Animated, Pressable, View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { paddingNmargin } from "../../constants/styles";

const renderRightAction = (
  progress: Animated.AnimatedInterpolation<number>,
  x: number,
  icon: string,
  iconFamily: "fontAwsome" | "material",
  bg: string
) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <Animated.View style={{ transform: [{ translateX: trans }] }}>
      <Pressable
        onPress={() => console.log("delete")}
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

const renderRightActions = (
  progress: Animated.AnimatedInterpolation<number>
) => {
  return (
    <View style={styles.container}>
      {renderRightAction(progress, 192, "trash-alt", "fontAwsome", "#cb1e1e")}
      {renderRightAction(
        progress,
        128,
        "calendar-alt",
        "fontAwsome",
        "#ea6a14"
      )}
      {renderRightAction(
        progress,
        64,
        "folder-move-outline",
        "material",
        "#1466ea"
      )}
    </View>
  );
};

export default renderRightActions;

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
