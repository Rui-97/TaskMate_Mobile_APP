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
  TaskStackParamList,
  Task,
} from "../types";
import { TasksContext } from "../../context/TasksContext";
import { parseTask } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";

const listOptions: MiniDropdownOption[] = [
  { label: "Today", value: "Today" },
  { label: "Inbox", value: "Inbox" },
  { label: "Poject1", value: "Poject1" },
];
const priorityOptions: MiniDropdownOption[] = [
  { label: "High Priority", value: "High" },
  { label: "Medium Priority", value: "Medium" },
  { label: "Low Priority", value: "Low" },
  { label: "No Priority", value: "No" },
];

type AddTaskScreenRouteProp = RouteProp<TaskStackParamList, "AddTaskScreen">;
type AddTaskScreenProps = {
  route: AddTaskScreenRouteProp;
};

const AddTaskScreen = ({ route }: AddTaskScreenProps) => {
  const { addTask } = useContext(TasksContext);
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    description: "",
    list: "",
    priority: "",
    date: "",
  });
  useEffect(() => {
    if (route.params?.date) {
      inputChangeHandler("date", route.params.date);
    }
  }, [route.params?.date]);

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
            onValueChange={inputChangeHandler}
            taskValueIdentifier="priority"
          />
          <MiniDropdown
            options={listOptions}
            placeholder="List"
            iconName="file-tray-outline"
            onValueChange={inputChangeHandler}
            taskValueIdentifier="list"
          />
          <MiniDropdown
            options={listOptions}
            placeholder="Test"
            iconName="flag-outline"
            onValueChange={inputChangeHandler}
            taskValueIdentifier="list"
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
