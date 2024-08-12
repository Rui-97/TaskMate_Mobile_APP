import * as React from "react";
import { createContext, useState } from "react";

import type { List } from "../src/types";

type ListsContextType = {
  lists: List[];
  addList: (newList: List) => void;
  deleteList: (id: string) => void;
  updateList: (id: string, updateData) => void;
};

export const ListsContext = createContext<ListsContextType>({
  lists: [],
  addList: () => {},
  deleteList: () => {},
  updateList: () => {},
});

type ListsContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_LISTS: List[] = [
  { id: "1", name: "today", isDefault: true },
  { id: "2", name: "inbox", isDefault: true },
];

const ListsContextProvider = ({ children }: ListsContextProviderProps) => {
  const [lists, setLists] = useState(DEFAULT_LISTS);

  const addList = (newList: List) => {
    setLists((prevLists) => [...prevLists, newList]);
  };
  const deleteList = (id: string) => {
    setLists((prevList) => prevList.filter((list) => list.id !== id));
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
  return (
    <ListsContext.Provider value={{ lists, addList, deleteList, updateList }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
