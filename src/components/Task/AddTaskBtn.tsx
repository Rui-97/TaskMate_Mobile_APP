import { Pressable, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import type { TaskStackParamList } from "../../types";

type AddTaskBtnNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TasksScreen"
>;

const AddTaskBtn = () => {
  const navigation = useNavigation<AddTaskBtnNavigationProp>();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate({
          name: "AddTaskScreen",
          params: { date: undefined },
        })
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
