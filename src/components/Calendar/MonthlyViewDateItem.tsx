import { Pressable, View, Text, FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { DateData } from "react-native-calendars";
import { Dimensions } from "react-native";

import { TasksContext } from "../../../context/TasksContext";

const screenHeight = Dimensions.get("window").height;

const MonthlyViewDateItem = ({
  date,
  state,
  selecteDate,
  onSelect,
}: {
  date: DateData | undefined;
  state: string | undefined;
  selecteDate: string;
  onSelect: (date: string) => void;
}) => {
  const { getDatesAssignedWithTasks, getTasksByDateAndCompletion } =
    useContext(TasksContext);
  const [isAssigned, setIsAssigned] = useState(false);
  const tasks = getTasksByDateAndCompletion(date!.dateString, false);
  const isSelected = selecteDate === date?.dateString;

  useEffect(
    () => setIsAssigned(getDatesAssignedWithTasks().includes(date?.dateString)),
    [getDatesAssignedWithTasks]
  );
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          onSelect(date!.dateString);
        }}
        style={[
          styles.dateContainer,
          isSelected && {
            backgroundColor: "#687dcc",
            borderRadius: 20,
          },
        ]}
      >
        <Text
          style={[
            styles.date,
            state === "today" && { color: "#687dcc", fontWeight: 500 },
            isSelected && { color: "#ffffff" },
          ]}
        >
          {date!.day}
        </Text>
        {isAssigned && !isSelected && <View style={[styles.dot]} />}
      </Pressable>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItemContainer}>
            <Text style={styles.taskText}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MonthlyViewDateItem;
const styles = StyleSheet.create({
  container: {
    height: screenHeight / 8,
  },
  dateContainer: {
    width: 40,
    height: 40,
  },
  date: {
    fontSize: 16,
    color: "#5b5a5a",
    alignSelf: "center",
    marginTop: 10,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: "#687dcc",
    alignSelf: "center",
  },
  taskItemContainer: {
    backgroundColor: "#c0c9e9",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginBottom: 2,
  },
  taskText: { fontSize: 10, color: "#1b1b1b" },
});
