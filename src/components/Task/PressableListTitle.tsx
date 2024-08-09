import { Pressable, Text, StyleSheet } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { TaskStackParamList } from "../../types";
import { fontSize } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";

type PressableListTitleProps = {
  list?: string;
};
type PressableListTitleNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "TasksScreen"
>;

const PressableListTitle = ({ list = "inbox" }: PressableListTitleProps) => {
  const navigation = useNavigation<PressableListTitleNavigationProp>();
  return (
    <Pressable
      onPress={() => navigation.navigate("ListsScreen", { selectedList: list })}
      style={styles.container}
    >
      <Text style={styles.title}>{capitalizeWord(list)}</Text>
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
