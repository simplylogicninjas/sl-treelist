import React, {createContext, useContext} from 'react';
import { TreeListItemBase } from "../components/TreeItem";

let context: React.Context<Config>;

export const initTreeListContext = (config: Config) => {
    context = createContext(config);

    return context;
}

export const useTreeListContext = () => {
    return useContext(context);
}

type Config = {
    onItemClick: (item: TreeListItemBase) => void;
    onItemCollapse: (itemId: string, collapsed: boolean) => void;
    itemCollapseState: {[key: string]: {collapsed: boolean}};
}