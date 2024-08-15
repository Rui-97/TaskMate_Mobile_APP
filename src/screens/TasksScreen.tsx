import {
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  Image,
  FlatList,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RouteProp } from "@react-navigation/native";
import { useContext, useState } from "react";
import Modal from "react-native-modal";

import PressableListTitle from "../components/Task/PressableListTitle";
import AddTaskBtn from "../components/Task/AddTaskBtn";
import IncompletedTasks from "../components/Task/IncompetedTasks";
import CompletedTasks from "../components/Task/CompletedTasks";
import { paddingNmargin } from "../../constants/styles";
import { TaskStackParamList, SortOptions } from "../types";
import { TasksContext } from "../../context/TasksContext";
import MoreOptionItem from "../components/Task/MoreOptionItem";
import SortOption from "../components/Task/SortOption";

type TasksScreenProps = {
  route: RouteProp<TaskStackParamList, "TasksScreen">;
};
const TasksScreen = ({ route }: TasksScreenProps) => {
  const [isMoreOptsModalVisible, setIsMoreOptsModalVisible] = useState(false);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [IsCompletedVisible, setIsCompletedVisible] = useState(true);
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptions>("default");
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const { getTasksByListIdAndCompletion } = useContext(TasksContext);
  const listId = route.params?.listId;
  const TasksNumInList =
    listId && getTasksByListIdAndCompletion(listId!, false).length;

  const toggleCompletedVisible = () => {
    setIsCompletedVisible(!IsCompletedVisible);
  };
  const toggleShowTaskDetails = () => {
    setShowTaskDetails(!showTaskDetails);
  };

  const moreOptionsData = [
    {
      icon: "sort-amount-down",
      text: "Show Details",
      needCheckIcon: true,
      showCheckIcon: showTaskDetails,
      pressHandler: toggleShowTaskDetails,
    },
    {
      icon: "check-double",
      text: "Show Completed",
      needCheckIcon: true,
      showCheckIcon: IsCompletedVisible,
      pressHandler: toggleCompletedVisible,
    },
    {
      icon: "sort-amount-down",
      text: "Sort",
      needCheckIcon: false,
      showCheckIcon: null,
      pressHandler: () => setTimeout(() => setIsSortModalVisible(true), 500), //set time out to avoid modals overlapping
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.screenContainer}>
        {/* Header */}
        <View style={styles.titleRow}>
          <View style={styles.title}>
            <PressableListTitle listId={listId} />
          </View>
          <Pressable onPress={() => setIsMoreOptsModalVisible(true)}>
            <Icon name="more-horizontal" size={25} />
          </Pressable>
        </View>

        {/* Body */}
        {TasksNumInList === 0 ? (
          <View style={styles.noTaskBodyContainer}>
            <Image
              source={require("../../assets/noTask.png")}
              style={styles.img}
            />
            <Text style={styles.noTaskText}>No Tasks</Text>
            <Text style={styles.addText}>Tap the + to add</Text>
          </View>
        ) : (
          <View>
            <IncompletedTasks
              listId={listId}
              sortBy={selectedSortOption}
              showDetails={showTaskDetails}
            />
            {IsCompletedVisible && (
              <CompletedTasks listId={listId} sortBy={selectedSortOption} />
            )}
          </View>
        )}
        <AddTaskBtn destinationListId={listId!} />

        {/* More Option Modal */}
        <Modal
          isVisible={isMoreOptsModalVisible}
          onBackdropPress={() => setIsMoreOptsModalVisible(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
          style={{ position: "relative" }}
        >
          <FlatList
            data={moreOptionsData}
            renderItem={({ item }) => (
              <MoreOptionItem
                icon={item.icon}
                text={item.text}
                needCheckIcon={item.needCheckIcon}
                showCheckIcon={item.showCheckIcon}
                onPress={() => {
                  setIsMoreOptsModalVisible(false);
                  item.pressHandler();
                }}
              />
            )}
            style={styles.moreOptsModalContentContainer}
          />
        </Modal>

        {/* Sort By Modal */}
        <Modal
          isVisible={isSortModalVisible}
          onBackdropPress={() => setIsSortModalVisible(false)}
          style={{ position: "relative" }}
        >
          <View style={styles.sortModalContentContainer}>
            <Text
              style={{ color: "#7a7878", marginBottom: paddingNmargin.small }}
            >
              Sort by
            </Text>
            <View style={styles.sortModalOptionsContainer}>
              <SortOption
                option="date"
                selectedOption={selectedSortOption}
                onSelect={() => setSelectedSortOption("date")}
              />
              <SortOption
                option="priority"
                selectedOption={selectedSortOption}
                onSelect={() => setSelectedSortOption("priority")}
              />
              <SortOption
                option="name"
                selectedOption={selectedSortOption}
                onSelect={() => setSelectedSortOption("name")}
              />
              <SortOption
                option="other"
                selectedOption={selectedSortOption}
                onSelect={() => setSelectedSortOption("default")}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default TasksScreen;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: paddingNmargin.standard,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    flex: 1,
    alignItems: "center",
  },
  noTaskBodyContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 200,
  },
  img: {
    width: 120,
    height: 120,
  },
  noTaskText: {
    marginTop: paddingNmargin.standard,
    fontSize: 16,
    fontWeight: "500",
  },
  addText: { marginTop: paddingNmargin.small, color: "#687dcc" },
  moreOptsModalContentContainer: {
    width: 200,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: paddingNmargin.standard,
    position: "absolute",
    top: 70,
    right: 0,
  },
  sortModalContentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: paddingNmargin.standard,
  },
  sortModalOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
