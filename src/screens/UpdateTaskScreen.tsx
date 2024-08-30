import {
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";

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
import { ListsContext } from "../../context/ListsContext";
import { parseTask } from "../utils/utils";
import { paddingNmargin } from "../../constants/styles";
import { capitalizeWord } from "../utils/utils";
import { auth, db } from "../../firebaseConfig";

const priorityOptions: MiniDropdownOption[] = [
  { label: "High Priority", value: "high" },
  { label: "Medium Priority", value: "medium" },
  { label: "Low Priority", value: "low" },
  { label: "No Priority", value: "no" },
];

type UpdateTaskScreenProps = {
  route: RouteProp<RootStackParamList, "UpdateTaskScreen">;
};

const UpdateTaskScreen = ({ route }: UpdateTaskScreenProps) => {
  const { tasks, updateTask } = useContext(TasksContext);
  const taskId = route.params.taskId;
  const initalTask: Task = tasks.find((task) => task.id === taskId) as Task;
  const [task, setTask] = useState<Task>(initalTask);
  const { lists } = useContext(ListsContext);
  const listOptions: MiniDropdownOption[] = lists.map((list) => ({
    label: capitalizeWord(list.name),
    value: list.id,
  }));

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

  const submitTaskHandler = async () => {
    const parsedTask = parseTask(task.name);
    const parsedDate = parsedTask.date;
    if (parsedDate) {
      task.date = parsedDate;
    }

    // Update task in firestore db
    const uid = auth.currentUser!.uid;
    try {
      const userTasksRef = doc(db, "users", uid, "tasks", taskId!);
      await updateDoc(userTasksRef, task);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    updateTask(taskId!, task);
  };

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <TextInput
          placeholder="Task Name"
          placeholderTextColor="#8c8c8c"
          style={styles.taskNameInput}
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
          <DueDateInput selectedDate={task.date} from="UpdateTaskScreen" />
          <MiniDropdown
            options={priorityOptions}
            val={task.priority}
            placeholder="Priority"
            iconName="flag-outline"
            onValueChange={inputChangeHandler}
            taskValueIdentifier="priority"
          />
          <MiniDropdown
            options={listOptions}
            val={task.listId}
            placeholder="List"
            iconName="file-tray-outline"
            onValueChange={inputChangeHandler}
            taskValueIdentifier="listId"
          />
          <MiniDropdown
            options={listOptions}
            placeholder="Test"
            iconName="flag-outline"
            onValueChange={inputChangeHandler}
            taskValueIdentifier="listId"
          />
        </ScrollView>
        <SubmitTaskBtn onSubmit={submitTaskHandler} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateTaskScreen;

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
