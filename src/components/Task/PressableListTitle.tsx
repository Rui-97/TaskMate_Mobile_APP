import { Pressable, Text, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { TaskStackParamList } from "../../types";
import { fontSize } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";
import { ListsContext } from "../../../context/ListsContext";

type PressableListTitleProps = {
  listId?: string;
};
type PressableListTitleNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TasksScreen"
>;

const PressableListTitle = ({ listId = "2" }: PressableListTitleProps) => {
  const { getListNameById } = useContext(ListsContext);
  console.log("id:" + listId);
  const listName = getListNameById(listId);
  const navigation = useNavigation<PressableListTitleNavigationProp>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ListsScreen", { selectedListId: listId })
      }
      style={styles.container}
    >
      <Text style={styles.title}>{listName && capitalizeWord(listName)}</Text>
    </Pressable>
  );
};

export default PressableListTitle;

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 2,
  },
  title: {
    fontSize: fontSize.medium,
    fontWeight: "500",
  },
});
