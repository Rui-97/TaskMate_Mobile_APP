import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import TasksScreen from "../screens/TasksScreen";
import { TasksContext } from "../../context/TasksContext";
import { ListsContext } from "../../context/ListsContext";

// Mock TasksContext
const mockTasksContext: any = {
  tasks: [
    {
      id: "1",
      name: "Task 1",
      listId: "mockListId",
      date: "2024-07-16",
      isCompleted: false,
      priority: "medium",
    },
    {
      id: "2",
      name: "Task 2",
      listId: "mockListId",
      date: "2024-07-17",
      isCompleted: true,
      priority: "high",
    },
  ],
  addTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
  markTaskAsCompleted: jest.fn(),
  markTaskAsIncompleted: jest.fn(),
  getTasksByListIdAndCompletion: jest.fn(
    (listId: string, isCompleted: boolean) =>
      mockTasksContext.tasks.filter(
        (task: any) =>
          task.listId === listId && task.isCompleted === isCompleted
      )
  ),
  getTasksByDateAndCompletion: jest.fn(),
  deleteTasksByListId: jest.fn(),
  sortTasksBy: jest.fn(),
  getDatesAssignedWithTasks: jest.fn(),
};

// Mock ListsContext
const mockListsContext: any = {
  lists: [
    {
      id: "mockListId",
      name: "Inbox",
    },
  ],
  addList: jest.fn(),
  deleteList: jest.fn(),
  updateList: jest.fn(),
  getListNameById: jest.fn(
    (id: string) =>
      mockListsContext.lists.find((list: any) => list.id === id)?.name
  ),
  inboxListId: "mockListId",
  todayListId: "mockTodayListId",
};

const renderWithContext = (component: JSX.Element) => {
  return render(
    <TasksContext.Provider value={mockTasksContext}>
      <ListsContext.Provider value={mockListsContext}>
        {component}
      </ListsContext.Provider>
    </TasksContext.Provider>
  );
};

test("renders TasksScreen and interacts with modals", () => {
  // Verify if the screen renders
  expect(screen.getByText("Add Task")).toBeTruthy(); // Ensure the AddTaskBtn is present

  // Check if the more options modal can be opened
  fireEvent.press(screen.getByTestId("more-options-button")); // Ensure the button has a testID or accessible label
  expect(screen.getByText("Show Details")).toBeTruthy();
  expect(screen.getByText("Show Completed")).toBeTruthy();
  expect(screen.getByText("Sort")).toBeTruthy();

  // Check if the sort options modal can be opened
  fireEvent.press(screen.getByText("Sort"));
  expect(screen.getByText("Sort by")).toBeTruthy();
  expect(screen.getByText("date")).toBeTruthy();
  expect(screen.getByText("priority")).toBeTruthy();
  expect(screen.getByText("name")).toBeTruthy();
  expect(screen.getByText("other")).toBeTruthy();

  // Toggle details view
  fireEvent.press(screen.getByText("Show Details"));
  expect(mockTasksContext.getTasksByListIdAndCompletion).toHaveBeenCalledWith(
    "mockListId",
    false
  );

  // Toggle completed tasks visibility
  fireEvent.press(screen.getByText("Show Completed"));
  expect(screen.getByText("Task 2")).toBeTruthy(); // Ensure completed tasks are visible

  // Close modals
  fireEvent.press(screen.getByTestId("modal-backdrop")); // Ensure the modal backdrop has a testID or accessible label
});
