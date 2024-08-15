import * as React from "react";
import { createContext, useState } from "react";

import type { Task, SortOptions } from "../src/types";

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
  sortTasksBy: (givenTasks: Task[], sortBy: SortOptions) => Task[];
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
  sortTasksBy: () => [],
});

const DUMMY_TASKS: Task[] = [
  {
    id: "1",
    name: "a",
    listId: "2",
    date: "2024-07-16",
    isCompleted: false,
    priority: "no",
  },
  {
    id: "2",
    name: "b",
    listId: "2",
    date: "2024-07-26",
    isCompleted: false,
    priority: "no",
  },
  {
    id: "3",
    name: "c",
    listId: "2",
    date: "2024-07-08",
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
  const sortTasksBy = (givenTasks: Task[], sortBy: SortOptions) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
      no: 4,
    };

    switch (sortBy) {
      case "name":
        givenTasks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "date":
        givenTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "priority":
        givenTasks.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
        break;
      default:
        break;
    }
    return givenTasks;
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
        sortTasksBy,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
