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
  getTasksByListIdAndCompletion: (
    listId: string,
    isCompleted: boolean
  ) => Task[];
  deleteTasksByListId: (listId: string) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  markTaskAsCompleted: () => {},
  markTaskAsIncompleted: () => {},
  getTasksByListIdAndCompletion: () => [],
  deleteTasksByListId: () => {},
});

const DUMMY_TASKS: Task[] = [
  {
    id: "1",
    name: "tasks1",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "no",
  },
  {
    id: "2",
    name: "tasks2",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "no",
  },
  {
    id: "3",
    name: "tasks3",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "high",
  },
  {
    id: "4",
    name: "tasks4",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "high",
  },
  {
    id: "5",
    name: "tasks5",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "medium",
  },
  {
    id: "6",
    name: "tasks6",
    listId: "2",
    date: "2024-07-06",
    isCompleted: false,
    priority: "medium",
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

  const getTasksByListIdAndCompletion = (
    listId: string,
    isCompleted: boolean
  ): Task[] => {
    return tasks.filter(
      (tasks) => tasks.listId === listId && tasks.isCompleted === isCompleted
    );
  };
  const deleteTasksByListId = (listId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((tasks) => tasks.listId !== listId)
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
        getTasksByListIdAndCompletion,
        deleteTasksByListId,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
