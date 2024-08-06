import * as React from "react";
import { createContext, useState } from "react";

import type { Task } from "../src/types";

type TasksContextType = {
  tasks: Task[];
  completedTasks: Task[];
  addTask: (newTask: Task) => void;
  deleteTask: (taskToBeDeletedId: string) => void;
  moveToCompletedTasks: (taskId: string) => void;
  moveBackToTasks: (taskId: string) => void;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  completedTasks: [],
  addTask: () => {},
  deleteTask: () => {},
  moveToCompletedTasks: () => {},
  moveBackToTasks: () => {},
});

const DUMMY_TASKS: Task[] = [
  { id: "1", name: "tasks1", list: "inbox", date: "2024-07-06" },
  { id: "2", name: "tasks2", list: "inbox", date: "2024-07-06" },
  { id: "3", name: "tasks3", list: "inbox", date: "2024-07-06" },
];
const DUMMY_COMPLETED_TASKS: Task[] = [
  { id: "4", name: "tasks4", list: "inbox", date: "2024-07-06" },
  { id: "5", name: "tasks5", list: "inbox", date: "2024-07-06" },
  { id: "6", name: "tasks6", list: "inbox", date: "2024-07-06" },
];

type TasksContextProviderProps = {
  children: React.ReactNode;
};

const TasksContextProvider = ({ children }: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);
  const [completedTasks, setCompletedTasks] = useState<Task[]>(
    DUMMY_COMPLETED_TASKS
  );

  //Tasks
  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const deleteTask = (taskToBeDeletedId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToBeDeletedId)
    );
  };

  //Move the task to the completed Task
  const moveToCompletedTasks = (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) {
      console.warn(`Task with id ${taskId} not found.`);
      return;
    }
    deleteTask(taskId);
    setCompletedTasks((prev) => [task, ...prev]);
  };

  //Move completed task back to the task
  const moveBackToTasks = (taskId: string) => {
    const task = completedTasks.find((task) => task.id === taskId);
    if (!task) {
      console.warn(`Task with id ${taskId} not found.`);
      return;
    }

    // delete the task from completed tasks
    setCompletedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
    setTasks((prev) => [task, ...prev]);
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        completedTasks,
        addTask,
        deleteTask,
        moveToCompletedTasks,
        moveBackToTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
