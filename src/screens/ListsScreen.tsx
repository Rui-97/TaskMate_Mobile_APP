import { useContext, useState } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { RouteProp } from "@react-navigation/native";

import { paddingNmargin, fontSize } from "../../constants/styles";
import ListItem from "../components/List/ListItem";
import { ListsContext } from "../../context/ListsContext";
import { TasksContext } from "../../context/TasksContext";
import { TaskStackParamList } from "../types";

type ListScreenProps = {
  route: RouteProp<TaskStackParamList, "ListsScreen">;
};
const ListsScreen = ({ route }: ListScreenProps) => {
  const { lists } = useContext(ListsContext);
  const { getTasksByListAndCompletion } = useContext(TasksContext);
  const [selectedList, setSelectedList] = useState(route.params.selectedList);

  const selectHandler = (list: string) => {
    setSelectedList(list);
  };
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header row */}
      <View style={styles.headerRoeContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lists</Text>
        </View>
        <Icon name="plus" size={20} />
      </View>

      {/* Lists */}
      <FlatList
        data={lists}
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            name={item.name}
            taskNumber={getTasksByListAndCompletion(item.name, false).length}
            isSelected={item.name === selectedList}
            onSelect={selectHandler}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default ListsScreen;

const styles = StyleSheet.create({
  screen: {
    marginVertical: paddingNmargin.standard,
    marginHorizontal: paddingNmargin.large,
  },
  headerRoeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.medium,
    fontWeight: "500",
  },
});
