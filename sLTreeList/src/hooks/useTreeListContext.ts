import {createContext, useContext} from 'react';
import { TreeListItemBase } from "../components/TreeItem";

export const TreeListContext = createContext<TreeListContextConfig>({});;

export const useTreeListContext = () => {
    return useContext(TreeListContext);
}

export type TreeListContextConfig = {
    onItemClick?: (item: TreeListItemBase) => void;
    onItemCollapse?: (itemId: string, collapsed: boolean) => void;
    itemCollapseState?: {[key: string]: {collapsed: boolean}};
}