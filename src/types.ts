import { NavigatorScreenParams } from "@react-navigation/native";

export type TaskStackParamList = {
  TasksScreen: { listId?: string };
  ListsScreen: { selectedListId: string };
  ManageListScreen: { action: "add" | "update"; listId?: string };
};

export type CalendarStackParamList = {
  CalendarDefaultScreen: undefined;
  CalendarMonthlyScreen: undefined;
  CalendarWeeklyScreen: undefined;
};

export type BottomTabParamList = {
  TaskStack: NavigatorScreenParams<TaskStackParamList>;
  CalendarStack: NavigatorScreenParams<CalendarStackParamList>;
  PomoScreen: undefined;
  AccountScreen: undefined;
};

export type RootStackParamList = {
  BottomTab: NavigatorScreenParams<BottomTabParamList>;
  AddTaskScreen: { date?: string; listId?: string };
  UpdateTaskScreen: { date?: string; taskId?: string };
  TaskCalendarScreen: { prevScreen: "AddTaskScreen" | "UpdateTaskScreen" };
};

export type GuestStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
};

export type Task = {
  id: string;
  name: string;
  listId: string;
  isCompleted: boolean;
  priority: "no" | "low" | "medium" | "high";
  date?: string;
  description?: string;
};

export type MiniDropdownOption = {
  label: string;
  value: string;
};

export type TaskValueIdentifer =
  | "name"
  | "description"
  | "date"
  | "priority"
  | "listId";

export type List = {
  id: string;
  name: string;
  isDefault: boolean;
};

export type SortOptions = "name" | "date" | "priority" | "default";
