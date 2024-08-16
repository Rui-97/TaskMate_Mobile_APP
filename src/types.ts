import { NavigatorScreenParams } from "@react-navigation/native";

export type TaskStackParamList = {
  TasksScreen: { listId?: string };
  AddTaskScreen: { date?: string; listId?: string };
  UpdateTaskScreen: { date?: string; taskId?: string };
  TaskCalendarScreen: { prevScreen: "AddTaskScreen" | "UpdateTaskScreen" };
  ListsScreen: { selectedListId: string };
  ManageListScreen: { action: "add" | "update"; listId?: string };
};

export type CalendarStackParamList = {
  CalendarDefaultScreen: undefined;
  CalendarMonthlyScreen: undefined;
  CalendarWeeklyScreen: undefined;
  AddTaskScreen: undefined;
};

export type PomoStackParamList = {
  PomoScreen: undefined;
  PomoCompleteScreen: undefined;
};

export type AccountStackParamList = {
  AccountScreen: undefined;
  SettingsScreen: undefined;
};

export type BottomTabParamList = {
  TaskStack: NavigatorScreenParams<TaskStackParamList>;
  CalendarStack: NavigatorScreenParams<CalendarStackParamList>;
  PomoStack: NavigatorScreenParams<PomoStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
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
