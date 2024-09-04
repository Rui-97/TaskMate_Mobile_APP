import * as React from "react";
import { createContext, useState } from "react";
import { useEffect } from "react";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";

import type { List } from "../src/types";
import { db, auth } from "../firebaseConfig";

type ListsContextType = {
  lists: List[];
  addList: (newList: List) => void;
  deleteList: (id: string) => void;
  updateList: (id: string, updateData: any) => void;
  getListNameById: (id: string) => string | undefined;
  inboxListId: string;
  todayListId: string;
};

export const ListsContext = createContext<ListsContextType>({
  lists: [],
  addList: () => {},
  deleteList: () => {},
  updateList: () => {},
  getListNameById: () => undefined,
  inboxListId: "",
  todayListId: "",
});

type ListsContextProviderProps = {
  children: React.ReactNode;
};

const ListsContextProvider = ({ children }: ListsContextProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);
  const [inboxListId, setInboxListId] = useState("");
  const [todayListId, setTodayListId] = useState("");

  useEffect(() => {
    const uid = auth.currentUser!.uid;

    //Fetch lists data from firebase
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", uid, "lists")
      );
      const listsData: any = [];
      querySnapshot.forEach((doc) => {
        const listData = doc.data();
        listData.id = doc.id;
        listsData.push(listData);

        //Get default lists id
        if (listData.name === "inbox") {
          setInboxListId(listData.id);
        }
        if (listData.name === "today") {
          setTodayListId(listData.id);
        }
      });
      // console.log("lists data in list context");
      // console.log(listsData);
      setLists(listsData);
    };

    fetchData();
  }, []);

  const addList = (newList: List) => {
    setLists((prevLists) => [...prevLists, newList]);
  };
  const deleteList = (id: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };
  const updateList = (id: string, updateData: { name: string }) => {
    setLists((prevLists) => {
      // Find the index of the list that is about to be updated in the tasks.
      const listToBeUpdatedIndex = prevLists.findIndex(
        (list) => list.id === id
      );
      const updatedLists = [...prevLists];
      updatedLists[listToBeUpdatedIndex] = {
        ...updatedLists[listToBeUpdatedIndex],
        ...updateData,
      };
      return updatedLists;
    });
  };
  const getListNameById = (id: string) => {
    const list = lists.find((list) => list.id === id);
    return list ? list.name : undefined;
  };
  return (
    <ListsContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        updateList,
        getListNameById,
        inboxListId,
        todayListId,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
