import { Pressable, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { paddingNmargin } from "../../../constants/styles";
import { capitalizeWord } from "../../utils/utils";
import { TaskStackParamList } from "../../types";

type ListItemNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "ListsScreen"
>;
type ListItemProps = {
  name: string;
  taskNumber: number;
  isSelected: boolean;
  onSelect: (list: string) => void;
};

const ListItem = ({
  name,
  taskNumber,
  isSelected,
  onSelect,
}: ListItemProps) => {
  const navigation = useNavigation<ListItemNavigationProp>();
  const pressHandler = () => {
    onSelect(name);
    setTimeout(() => {
      navigation.navigate("TasksScreen", { list: name });
    }, 100);
  };
  return (
    <View>
      <Pressable
        style={[styles.container, isSelected && styles.activeStyle]}
        onPress={pressHandler}
      >
        <Text style={styles.title}>{capitalizeWord(name)}</Text>
        <Text style={styles.title}>{taskNumber}</Text>
      </Pressable>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: paddingNmargin.small,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  activeStyle: {
    backgroundColor: "#c75e5e",
  },
  title: {
    fontSize: 18,
  },
});
