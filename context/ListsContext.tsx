import * as React from "react";
import { createContext, useState } from "react";

import type { List } from "../src/types";

type ListsContextType = {
  lists: List[];
};

export const ListsContext = createContext<ListsContextType>({ lists: [] });

type ListsContextProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_LISTS: List[] = [{ name: "today" }, { name: "inbox" }];

const ListsContextProvider = ({ children }: ListsContextProviderProps) => {
  const [lists, setLists] = useState(DEFAULT_LISTS);
  return (
    <ListsContext.Provider value={{ lists }}>{children}</ListsContext.Provider>
  );
};

export default ListsContextProvider;
