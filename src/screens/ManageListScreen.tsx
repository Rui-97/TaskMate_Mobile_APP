import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SimpleBtn from "../components/UI/SimpleBtn";
import { paddingNmargin } from "../../constants/styles";
import { ListsContext } from "../../context/ListsContext";
import { TaskStackParamList } from "../types";
import { capitalizeWord } from "../utils/utils";

type Props = NativeStackScreenProps<TaskStackParamList, "ManageListScreen">;

const ManageListScreen = ({ navigation, route }: Props) => {
  const { lists, addList, updateList } = useContext(ListsContext);
  const action = route.params.action;
  const listId = route.params.listId;
  const initalListName =
    action === "update" ? lists.find((list) => list.id === listId)!.name : "";
  const [listName, setListName] = useState(initalListName);

  const doneBtnHandler = () => {
    if (!listName.trim()) return;

    if (action === "add") {
      const id = listName.trim();
      addList({
        id: id,
        name: listName.trim().toLowerCase(),
        isDefault: false,
      });
    }
    if (action === "update") {
      updateList(listId!, { name: listName });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View style={styles.cancelBtnContainer}>
          <SimpleBtn
            buttonName="Cancel"
            border={false}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Text style={styles.title}>{capitalizeWord(action)} List</Text>
        </View>
        <View style={styles.doneBtnContainer}>
          <SimpleBtn
            buttonName="Done"
            border={false}
            onPress={doneBtnHandler}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={listName}
          onChangeText={(text) => setListName(text)}
          style={styles.input}
          placeholder="Name"
          autoFocus
        />
      </View>
    </View>
  );
};

export default ManageListScreen;
const styles = StyleSheet.create({
  screen: {
    // marginVertical: paddingNmargin.standard,
    // marginHorizontal: paddingNmargin.large,
    // padding: paddingNmargin.small,
    // borderWidth: 1,
    // borderColor: "red",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: paddingNmargin.standard,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  cancelBtnContainer: {
    flex: 1,
  },
  doneBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  inputContainer: {
    marginVertical: paddingNmargin.large,
    marginHorizontal: paddingNmargin.standard,
    backgroundColor: "#e1e1e1",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    borderRadius: 8,
    padding: 12,
  },
});
