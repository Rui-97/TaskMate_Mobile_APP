import { Pressable, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CompositeNavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import type { TaskStackParamList, RootStackParamList } from "../../types";

type AddTaskBtnNavigation = CompositeNavigationProp<
  NativeStackNavigationProp<TaskStackParamList, "TasksScreen">,
  NativeStackNavigationProp<RootStackParamList>
>;

type AddTaskBtnProps = {
  destinationListId: string;
};

const AddTaskBtn = ({ destinationListId }: AddTaskBtnProps) => {
  const navigation = useNavigation<AddTaskBtnNavigation>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("AddTaskScreen", { listId: destinationListId })
      }
      style={styles.btn}
    >
      <Icon name="pluscircle" size={60} color="#687dcc" />
    </Pressable>
  );
};

export default AddTaskBtn;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 20,
    right: 25,
  },
});
