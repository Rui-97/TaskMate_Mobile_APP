import { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import Modal from "react-native-modal";

import { paddingNmargin, fontSize } from "../../constants/styles";
import ListItem from "../components/List/ListItem";
import { ListsContext } from "../../context/ListsContext";
import { TasksContext } from "../../context/TasksContext";
import { TaskStackParamList } from "../types";
import DeleteListModal from "../components/List/DeleteListModal";

type ListScreenProps = NativeStackScreenProps<
  TaskStackParamList,
  "ListsScreen"
>;
const ListsScreen = ({ route, navigation }: ListScreenProps) => {
  const { lists } = useContext(ListsContext);
  const { getTasksByListIdAndCompletion } = useContext(TasksContext);
  const [selectedListId, setSelectedListId] = useState(
    route.params.selectedListId
  );
  const [modalVisible, setModalVisible] = useState(false);
  const deletingListId = useRef("");

  const selectHandler = (listId: string) => {
    setSelectedListId(listId);
  };
  const showDeleteModal = (listId: string) => {
    deletingListId.current = listId;
    setModalVisible(true);
  };
  const hideDeleteModal = () => {
    setModalVisible(false);
  };
  const resetSelectedListId = () => {
    if (deletingListId.current === selectedListId) {
      setSelectedListId("2");
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.screen,
        modalVisible && {
          opacity: 0.3,
        },
      ]}
    >
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
      {/* List */}
      <View>
        <DeleteListModal
          modalVisible={modalVisible}
          listId={deletingListId.current}
          hideDeleteModal={hideDeleteModal}
          resetSelectedListId={resetSelectedListId}
        />
        <FlatList
          data={lists}
          renderItem={({ item, index }) => (
            <ListItem
              key={index}
              list={item}
              taskNumber={getTasksByListIdAndCompletion(item.id, false).length}
              isSelected={item.id === selectedListId}
              onSelect={selectHandler}
              onDelete={showDeleteModal}
            />
          )}
          style={styles.listsContainer}
        />
      </View>
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
