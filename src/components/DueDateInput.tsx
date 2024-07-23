import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { TaskStackParamList } from "../types";
import { formatDate } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";

type DueDateInputNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "AddTaskScreen"
>;
type DueDateInputProps = {
  selectedDate: Date | undefined;
};

const DueDateInput = ({ selectedDate }: DueDateInputProps) => {
  const navigation = useNavigation<DueDateInputNavigationProp>();

  const pressHandler = () => {
    navigation.navigate("TaskCalendarScreen");
  };
  return (
    <Pressable
      style={[
        styles.container,
        { borderColor: selectedDate ? "#687dcc" : "#636363" },
      ]}
      onPress={pressHandler}
    >
      <Icon
        name="calendar"
        style={styles.icon}
        size={15}
        color={selectedDate ? "#687dcc" : "#636363"}
      />
      <Text
        style={[styles.text, { color: selectedDate ? "#687dcc" : "#636363" }]}
      >
        {selectedDate ? formatDate(selectedDate) : "Due Date"}
      </Text>
    </Pressable>
  );
};

export default DueDateInput;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    borderWidth: 0.9,
    borderRadius: 8,
    paddingHorizontal: paddingNmargin.small,
    marginRight: paddingNmargin.small,
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
});
