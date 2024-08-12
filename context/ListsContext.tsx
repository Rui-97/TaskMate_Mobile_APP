import * as React from "react";
import { createContext, useState } from "react";

import type { List } from "../src/types";

type ListsContextType = {
  lists: List[];
  addList: (newList: List) => void;
};

export const ListsContext = createContext<ListsContextType>({
  lists: [],
  addList: () => {},
});

type ListsContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_LISTS: List[] = [{ name: "today" }, { name: "inbox" }];

const ListsContextProvider = ({ children }: ListsContextProviderProps) => {
  const [lists, setLists] = useState(DEFAULT_LISTS);

  const addList = (newList: List) => {
    setLists((prevLists) => [...prevLists, newList]);
  };
  return (
    <ListsContext.Provider value={{ lists, addList }}>
      {children}
    </ListsContext.Provider>
  );
};

export default ListsContextProvider;
