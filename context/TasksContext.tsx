import * as React from "react";
import { createContext, useState } from "react";

import type { Task } from "../src/types";

type TasksContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
});

const DUMMY_TASKS: Task[] = [
  { id: "1", name: "tasks1", list: "inbox", date: new Date() },
  { id: "2", name: "tasks2", list: "inbox", date: new Date() },
  { id: "3", name: "tasks3", list: "inbox", date: new Date() },
];
type TasksContextProviderProps = {
  children: React.ReactNode;
};

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
