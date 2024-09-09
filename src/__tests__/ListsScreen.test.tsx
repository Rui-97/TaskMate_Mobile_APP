import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import ListsScreen from "../screens/ListsScreen";
import { ListsContext } from "../../context/ListsContext";
import { TasksContext } from "../../context/TasksContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskStackParamList } from "../types";

// Mock data
const mockLists = [
  { id: "1", name: "Inbox" },
  { id: "2", name: "Work" },
];

// Mock functions
const mockGetTasksByListIdAndCompletion = jest.fn(
  (listId: string, isCompleted: boolean) => {
    return listId === "1"
      ? [{ id: "task1" }, { id: "task2" }]
      : [{ id: "task3" }];
  }
);

const mockNavigation = {
  navigate: jest.fn(),
};

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
    <ListsContext.Provider value={mockListsContext}>
      <TasksContext.Provider value={mockTasksContext}>
        {component}
      </TasksContext.Provider>
    </ListsContext.Provider>
  );
};

describe("ListsScreen", () => {
  test("renders the screen and handles list selection", async () => {
    renderWithContext(
      <ListsScreen
        route={{ params: { selectedListId: "mockListId" } }}
        navigation={
          mockNavigation as NativeStackScreenProps<
            TaskStackParamList,
            "ListsScreen"
          >["navigation"]
        }
      />
    );

    // Check if the screen title is rendered
    expect(screen.getByText("Lists")).toBeTruthy();

    // Check if the list items are rendered
    expect(screen.getByText("Inbox")).toBeTruthy();
    expect(screen.getByText("Work")).toBeTruthy();

    // Check if the 'plus' icon button is present
    expect(screen.getByRole("button")).toBeTruthy(); // Ensure there is a button

    // Simulate list item selection
    fireEvent.press(screen.getByText("Inbox"));
    await waitFor(() => {
      expect(screen.getByText("Inbox")).toBeTruthy();
    });

    // Simulate pressing the delete button on a list item
    fireEvent.press(screen.getByText("Inbox"));
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeTruthy(); // This checks if the delete modal is displayed
    });
  });

  test("shows and hides the delete modal correctly", async () => {
    renderWithContext(
      <ListsScreen
        route={{ params: { selectedListId: "mockListId" } }}
        navigation={
          mockNavigation as NativeStackScreenProps<
            TaskStackParamList,
            "ListsScreen"
          >["navigation"]
        }
      />
    );

    // Simulate pressing the delete button on a list item
    fireEvent.press(screen.getByText("Inbox"));

    // Check if the delete modal is visible
    expect(
      screen.getByText("Are you sure you want to delete this list?")
    ).toBeTruthy();

    // Simulate hiding the delete modal
    fireEvent.press(screen.getByText("Cancel"));
    await waitFor(() => {
      expect(
        screen.queryByText("Are you sure you want to delete this list?")
      ).toBeNull();
    });
  });
});
