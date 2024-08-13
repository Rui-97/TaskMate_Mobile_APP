import { View, Modal, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useContext } from "react";

import { ListsContext } from "../../../context/ListsContext";
import { TasksContext } from "../../../context/TasksContext";
import { paddingNmargin } from "../../../constants/styles";

type DeleteListModalProps = {
  modalVisible: boolean;
  listId: string;
  hideDeleteModal: () => void;
  resetSelectedListId: () => void;
};
const DeleteListModal = ({
  modalVisible,
  listId,
  hideDeleteModal,
  resetSelectedListId,
}: DeleteListModalProps) => {
  const { deleteList } = useContext(ListsContext);
  const { deleteTasksByListId } = useContext(TasksContext);

  const deleteHandler = () => {
    deleteTasksByListId(listId);
    deleteList(listId);
    resetSelectedListId();
    hideDeleteModal();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon name="trash-alt" size={35} color="#e44444" />
          <Text style={styles.modalText}>
            All tasks in the list will be deleted
          </Text>

          <Pressable
            style={[styles.button, { backgroundColor: "#e44444" }]}
            onPress={deleteHandler}
          >
            <Text style={styles.textStyle}>Delete</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "#687dcc" }]}
            onPress={() => hideDeleteModal()}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteListModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: "55%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 140,
    margin: paddingNmargin.small,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 15,
  },
});
