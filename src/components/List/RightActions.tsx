import { Animated, Pressable, View, StyleSheet } from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  doc,
  deleteDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

import { TaskStackParamList } from "../../types";
import { paddingNmargin } from "../../../constants/styles";
import { auth, db } from "../../../firebaseConfig";

type RightActionsProps = {
  progress: Animated.AnimatedInterpolation<number>;
  listId: string;
  onDelete: (listId: string) => void;
};
type RightActionsNavigationProp = NativeStackNavigationProp<
  TaskStackParamList,
  "ListsScreen"
>;

const RightActions = ({ progress, listId, onDelete }: RightActionsProps) => {
  const navigation = useNavigation<RightActionsNavigationProp>();

  const deleteListInDbAndLocal = async () => {
    const uid = auth.currentUser!.uid;
    //Delete all tasks belongs to the list in db
    const q = query(
      collection(db, "users", uid, "tasks"),
      where("listId", "==", listId)
    );
    const querySnapshot = await getDocs(q);
    // Iterate through the results and delete each task
    const batchDeletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "users", uid, "tasks", docSnapshot.id))
    );
    await Promise.all(batchDeletePromises);

    //Delte the list in db
    const listRef = doc(db, "users", uid, "lists", listId);
    await deleteDoc(listRef);

    onDelete(listId);
  };

  return (
    <View style={styles.container}>
      {/* Edit Button ========================================= */}
      <Animated.View
        style={{
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [192, 0],
              }),
            },
          ],
        }}
      >
        <Pressable
          onPress={() =>
            navigation.navigate("ManageListScreen", {
              action: "update",
              listId: listId,
            })
          }
          style={[styles.rightAction, { backgroundColor: "#1466ea" }]}
        >
          <FontAwesome5Icon name={"edit"} size={18} color={"white"} />
        </Pressable>
      </Animated.View>

      {/* Delete Button ========================================= */}
      <Animated.View
        style={{
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [64, 0],
              }),
            },
          ],
        }}
      >
        <Pressable
          onPress={deleteListInDbAndLocal}
          style={[
            styles.rightAction,
            {
              backgroundColor: "#cb1e1e",
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            },
          ]}
        >
          <FontAwesome5Icon name="trash-alt" size={18} color={"white"} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default RightActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginBottom: paddingNmargin.small,
  },
});
