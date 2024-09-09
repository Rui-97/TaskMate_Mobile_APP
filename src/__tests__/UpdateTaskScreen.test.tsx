import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import UpdateTaskScreen from "../screens/UpdateTaskScreen";
import { TasksContext } from "../../context/TasksContext";
import { ListsContext } from "../../context/ListsContext";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { formatDate } from "../utils/utils";

/// Mock TasksContext
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

// Mock route params
const routeParams = {
  taskId: "1",
  date: formatDate(new Date()),
};

// Render function with context
const renderWithContext = (
  component: JSX.Element,
  routeParams: Partial<RouteProp<RootStackParamList, "UpdateTaskScreen">> = {}
) => {
  return render(
    <TasksContext.Provider value={mockTasksContext}>
      <ListsContext.Provider value={mockListsContext}>
        <UpdateTaskScreen
          route={
            { params: routeParams } as RouteProp<
              RootStackParamList,
              "UpdateTaskScreen"
            >
          }
        />
      </ListsContext.Provider>
    </TasksContext.Provider>
  );
};

describe("UpdateTaskScreen", () => {
  test("renders the screen and allows task updates", async () => {
    // Check if the task name input is present
    expect(screen.getByPlaceholderText("Task Name")).toBeTruthy();

    // Check if the description input is present
    expect(screen.getByPlaceholderText("Description")).toBeTruthy();

    // Check if the dropdowns and submit button are present
    expect(screen.getByText("Priority")).toBeTruthy();
    expect(screen.getByText("List")).toBeTruthy();
    expect(screen.getByText("Submit Task")).toBeTruthy();

    // Simulate input change for task name
    fireEvent.changeText(
      screen.getByPlaceholderText("Task Name"),
      "Updated Task"
    );
    expect(screen.getByDisplayValue("Updated Task")).toBeTruthy();

    // Simulate input change for description
    fireEvent.changeText(
      screen.getByPlaceholderText("Description"),
      "Updated description"
    );
    expect(screen.getByDisplayValue("Updated description")).toBeTruthy();

    // Simulate dropdown change for priority
    fireEvent.press(screen.getByText("Priority"));
    fireEvent.press(screen.getByText("High Priority"));
    expect(screen.getByText("High Priority")).toBeTruthy();

    // Simulate dropdown change for list
    fireEvent.press(screen.getByText("List"));
    fireEvent.press(screen.getByText("Work"));
    expect(screen.getByText("Work")).toBeTruthy();

    // Simulate submit button press
    fireEvent.press(screen.getByText("Submit Task"));

    // Verify updateTask was called with the correct task
    expect(mockTasksContext.updateTask).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({
        name: "Updated Task",
        description: "Updated description",
        priority: "high",
        listId: "2",
        date: formatDate(new Date()),
        isCompleted: false,
      })
    );
  });
});
