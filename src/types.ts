import { NavigatorScreenParams } from "@react-navigation/native";

export type TaskStackParamList = {
  TasksScreen: { list?: string };
  AddTaskScreen: { date?: string };
  UpdateTaskScreen: { date?: string; taskId?: string };
  ListsScreen: { selectedList: string };
  TaskCalendarScreen: { prevScreen: "AddTaskScreen" | "UpdateTaskScreen" };
};

export type CalendarStackParamList = {
  CalendarScreen: undefined;
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
  list: string;
  isCompleted: boolean;
  date?: string;
  description?: string;
  priority?: string;
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
  | "list";

export type List = {
  name: string;
};
