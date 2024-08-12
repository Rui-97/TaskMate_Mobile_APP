import { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { paddingNmargin, fontSize } from "../../constants/styles";
import ListItem from "../components/List/ListItem";
import { ListsContext } from "../../context/ListsContext";
import { TasksContext } from "../../context/TasksContext";
import { TaskStackParamList } from "../types";

type ListScreenProps = NativeStackScreenProps<
  TaskStackParamList,
  "ListsScreen"
>;
const ListsScreen = ({ route, navigation }: ListScreenProps) => {
  const { lists } = useContext(ListsContext);
  const { getTasksByListAndCompletion } = useContext(TasksContext);
  const [selectedList, setSelectedList] = useState(route.params.selectedList);

  const selectHandler = (list: string) => {
    setSelectedList(list);
  };
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header row */}
      <View style={styles.headerRowContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lists</Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("ManageListScreen", { action: "add" })
          }
        >
          <Icon name="plus" size={20} />
        </Pressable>
      </View>
      {/* Lists */}
      <FlatList
        data={lists}
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            list={item}
            taskNumber={getTasksByListAndCompletion(item.name, false).length}
            isSelected={item.name === selectedList}
            onSelect={selectHandler}
          />
        )}
        style={styles.listsContainer}
      />
    </SafeAreaView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  screen: {
    margin: paddingNmargin.standard,
  },
  headerRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: paddingNmargin.small,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.medium,
    fontWeight: "500",
  },
  listsContainer: {
    paddingVertical: paddingNmargin.large,
  },
});
