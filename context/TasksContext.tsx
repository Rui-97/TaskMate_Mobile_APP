import * as React from "react";
import { createContext, useState } from "react";

import type { Task } from "../src/types";

type TasksContextType = {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsIncompleted: (taskId: string) => void;
  getTasksByListAndCompletion: (list: string, isCompleted: boolean) => Task[];
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  markTaskAsCompleted: () => {},
  markTaskAsIncompleted: () => {},
  getTasksByListAndCompletion: () => [],
});

const DUMMY_TASKS: Task[] = [
  {
    id: "1",
    name: "tasks1",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
  {
    id: "2",
    name: "tasks2",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
  {
    id: "3",
    name: "tasks3",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
  {
    id: "4",
    name: "tasks4",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
  {
    id: "5",
    name: "tasks5",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
  {
    id: "6",
    name: "tasks6",
    list: "inbox",
    date: "2024-07-06",
    isCompleted: false,
  },
];

type TasksContextProviderProps = {
  children: React.ReactNode;
};

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);

  //Tasks related methods ====================================
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };
  const updateTask = (id: string, updatedTask: Task) => {
    setTasks((prevTasks) => {
      // Find the index of the task that is about to be updated in the tasks.
      const taskTOBeUpdatedIndex = prevTasks.findIndex(
        (task) => task.id === id
      );
      const updatedTasks = [...prevTasks];
      updatedTasks[taskTOBeUpdatedIndex] = updatedTask;
      return updatedTasks;
    });
  };

  const markTaskAsCompleted = (taskId: string) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === taskId);
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = { ...prevTasks[taskIndex], isCompleted: true };
      return updatedTasks;
    });
  };
  const markTaskAsIncompleted = (taskId: string) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((task) => task.id === taskId);
      const updatedTasks = [...prevTasks];
      updatedTasks[taskIndex] = {
        ...prevTasks[taskIndex],
        isCompleted: false,
      };
      return updatedTasks;
    });
  };

  const getTasksByListAndCompletion = (
    list: string,
    isCompleted: boolean
  ): Task[] => {
    return tasks.filter(
      (tasks) => tasks.list === list && tasks.isCompleted === isCompleted
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        markTaskAsCompleted,
        markTaskAsIncompleted,
        getTasksByListAndCompletion,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
