import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../types";
import { paddingNmargin } from "../../../constants/styles";

type DueDateInputNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddTaskScreen"
>;
type DueDateInputProps = {
  selectedDate?: string;
  from: "AddTaskScreen" | "UpdateTaskScreen";
};

const DueDateInput = ({ selectedDate, from }: DueDateInputProps) => {
  const navigation = useNavigation<DueDateInputNavigationProp>();

  const pressHandler = () => {
    navigation.navigate("TaskCalendarScreen", { prevScreen: from });
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
        {selectedDate ? selectedDate : "Due Date"}
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
