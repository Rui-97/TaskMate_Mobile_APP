import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { RouteProp } from "@react-navigation/native";

import DueDateInput from "../components/Task/DueDateInput";
import MiniDropdown from "../components/Task/MiniDropdown";
import SubmitTaskBtn from "../components/Task/SubmitTaskBtn";
import type {
  TaskValueIdentifer,
  MiniDropdownOption,
  RootStackParamList,
  Task,
} from "../types";
import { TasksContext } from "../../context/TasksContext";
import { parseTask } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";
import { ListsContext } from "../../context/ListsContext";
import { capitalizeWord, formatDate } from "../utils/utils";

const priorityOptions: MiniDropdownOption[] = [
  { label: "High Priority", value: "high" },
  { label: "Medium Priority", value: "medium" },
  { label: "Low Priority", value: "low" },
  { label: "No Priority", value: "no" },
];

type AddTaskScreenProps = {
  route: RouteProp<RootStackParamList, "AddTaskScreen">;
};

const AddTaskScreen = ({ route }: AddTaskScreenProps) => {
  const { addTask } = useContext(TasksContext);
  const initalListId = route.params.listId ? route.params.listId : "";
  //Set inital date if the list is "Today"
  const initalDate = initalListId === "1" ? formatDate(new Date()) : "";
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    listId: initalListId,
    priority: "no",
    date: initalDate,
    isCompleted: false,
  });
  const { lists } = useContext(ListsContext);
  const listOptions: MiniDropdownOption[] = lists.map((list) => ({
    label: capitalizeWord(list.name),
    value: list.id,
  }));

  useEffect(() => {
    if (route.params?.date) {
      inputChangeHandler("date", route.params.date);
    }
  }, [route.params.date]);

  const inputChangeHandler = (
    valueIdentifer: TaskValueIdentifer,
    enteredValue: string
  ): void => {
    setTask((prevTask) => ({ ...prevTask, [valueIdentifer]: enteredValue }));
  };

  const submitTaskHandler = () => {
    const parsedTask = parseTask(task.name);
    const parsedDate = parsedTask.date;
    if (parsedDate) {
      task.date = parsedDate;
    }
    task.id = Math.random().toString();
    addTask(task);
  };

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <TextInput
          placeholder="Task Name"
          placeholderTextColor="#8c8c8c"
          style={styles.taskNameInput}
          autoFocus={true}
          onChangeText={(value) => inputChangeHandler("name", value)}
          value={task.name}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#8c8c8c"
          style={styles.descriptionInput}
          onChangeText={(value) => inputChangeHandler("description", value)}
          value={task.description}
        />

        <ScrollView horizontal>
          <DueDateInput selectedDate={task.date} from="AddTaskScreen" />
          <MiniDropdown
            options={priorityOptions}
            placeholder="Priority"
            iconName="flag-outline"
            val={task.priority}
            onValueChange={inputChangeHandler}
            taskValueIdentifier="priority"
          />
          <MiniDropdown
            options={listOptions}
            placeholder="List"
            iconName="file-tray-outline"
            val={task.listId}
            onValueChange={inputChangeHandler}
            taskValueIdentifier="listId"
          />
        </ScrollView>
        <SubmitTaskBtn onSubmit={submitTaskHandler} />
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: paddingNmargin.standard,
  },
  taskNameInput: {
    marginVertical: paddingNmargin.standard,
    fontSize: 18,
    fontWeight: "600",
  },
  descriptionInput: {
    marginBottom: paddingNmargin.standard,
  },
});
