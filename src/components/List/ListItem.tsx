import { Pressable, Text, StyleSheet, View } from "react-native";
import { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Swipeable } from "react-native-gesture-handler";

import { paddingNmargin } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";
import type { TaskStackParamList } from "../../types";
import type { List } from "../../types";
import RightActions from "./RightActions";

type ListItemNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "ListsScreen"
>;
type ListItemProps = {
  list: List;
  taskNumber: number;
  isSelected: boolean;
  onSelect: (list: string) => void;
};

const ListItem = ({
  list,
  taskNumber,
  isSelected,
  onSelect,
}: ListItemProps) => {
  const navigation = useNavigation<ListItemNavigationProp>();
  const isSwiping = useRef(false);

  const pressHandler = () => {
    setTimeout(() => {
      if (!isSwiping.current) {
        onSelect(list.name);
        setTimeout(
          () => navigation.navigate("TasksScreen", { list: list.name }),
          100
        );
      }
    }, 50);
  };

  return (
    <Swipeable
      renderRightActions={(progress) => {
        if (!list.isDefault) {
          return <RightActions progress={progress} listId={list.id} />;
        }
      }}
      onSwipeableWillOpen={() => (isSwiping.current = true)}
      onSwipeableClose={() => (isSwiping.current = false)}
    >
      <Pressable
        onPress={pressHandler}
        style={[
          styles.container,
          isSelected && {
            backgroundColor: "#687dcc",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            isSelected && { color: "white", fontWeight: "600" },
          ]}
        >
          {capitalizeWord(list.name)}
        </Text>
        <Text
          style={[
            styles.title,
            isSelected && { color: "white", fontWeight: "600" },
          ]}
        >
          {taskNumber}
        </Text>
      </Pressable>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: paddingNmargin.small,
    paddingHorizontal: 12,
    marginBottom: paddingNmargin.small,
    borderRadius: 8,
  },

  selectStyle: {
    backgroundColor: "#687dcc",
    color: "white",
  },

  title: {
    fontSize: 18,
  },
});
