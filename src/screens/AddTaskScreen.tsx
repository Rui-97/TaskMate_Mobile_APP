import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext, useRef } from "react";
import { RouteProp } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

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
import { db, auth } from "../../firebaseConfig";

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
  const remainingTextRef = useRef(task.name);

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

  const taskNameTextChangeHandler = (input: string) => {
    inputChangeHandler("name", input);

    const parsedTask = parseTask(input);
    const parsedDate = parsedTask.date;
    const parsedPriority = parsedTask.priority;
    if (parsedDate) inputChangeHandler("date", parsedDate);
    if (parsedPriority) inputChangeHandler("priority", parsedPriority);
    remainingTextRef.current = parsedTask.remainingText;
  };

  const submitTaskHandler = async () => {
    task.name = remainingTextRef.current;

    // Add task into firestore db
    const uid = auth.currentUser!.uid;
    try {
      const userTasksRef = collection(db, "users", uid, "tasks");
      const taskRef = await addDoc(userTasksRef, {
        name: task.name,
        description: task.description,
        listId: task.listId,
        priority: task.priority,
        date: task.date,
        isCompleted: task.isCompleted,
      });
      task.id = taskRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }

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
          onChangeText={(value) => {
            taskNameTextChangeHandler(value);
          }}
          value={task.name}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#8c8c8c"
          style={styles.descriptionInput}
          onChangeText={(value) => inputChangeHandler("description", value)}
          value={task.description}
          multiline
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
