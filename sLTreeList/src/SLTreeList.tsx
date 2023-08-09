import { ReactElement, createElement, useRef, useEffect, useDeferredValue } from "react";
import { ObjectItem, ValueStatus } from "mendix";
// import { attribute, contains, literal } from "mendix/filters/builders";

import { SLTreeListContainerProps } from "../typings/SLTreeListProps";

import "./ui/SLTreeList.css";
import TreeList from "./components/TreeList";
import { useTransformMxDataSource } from "./hooks/useTransformMxDataSource";
import { TreeListItemBase } from "./components/TreeItem";
import { TreeListContext, TreeListContextConfig } from "./hooks/useTreeListContext";
import { ActiveItemContext } from "./context/activeitem.contex";
// import TreeListSearch from "./components/TreeListSearch";

export function SLTreeList(props: SLTreeListContainerProps): ReactElement {
    const {
        listData,
        listItemKey,
        listItemParentKey,
        listItemContent,
        listItemClickAction,
        listItemIconClass,
        rootParentKey,
        activeItemKey
        // searchValue
    } = props;
    // const searchValueRef = useRef<ListAttributeValue | undefined>();

    const itemCollapsedState = useRef<{[key: string]: {collapsed: boolean}}>({});
    const listDataRef = useRef<ObjectItem[]>([]);
    const deferredListData = useDeferredValue(listData);
    const {data} = useTransformMxDataSource({
        listValue: deferredListData,
        attributeValueKey: listItemKey,
        attributeValueParentKey: listItemParentKey,
        widgetValue: listItemContent
    })
    const deferredData = useDeferredValue(data);

    // useEffect(() => {
    //     searchValueRef.current = searchValue;
    // }, [searchValue])

    const onItemClick = (item: TreeListItemBase) => {
        const objectItem = listDataRef.current.find(it => it.id === item.id);

        if (objectItem) {
            const action = listItemClickAction?.get(objectItem);

            if (action && action.canExecute && !action.isExecuting) {
                action.execute();
            } else {
                console.info('Cannot execute click action for tree list item', objectItem.id);
            }
        }
    }

    const onItemCollapse = (itemId: string, collapsed: boolean) => {
        itemCollapsedState.current[itemId] = {collapsed};
    }

    const TreeListContextValue: TreeListContextConfig = {
        onItemClick,
        onItemCollapse,
        itemCollapseState: itemCollapsedState.current
    }

    // const onSearch = (value: string) => {
    //     if (listData && searchValueRef.current && searchValueRef.current.filterable) {
    //         listData.setFilter(
    //             contains(attribute(searchValueRef.current.id), literal(value))
    //         )
    //     }
    // }

    useEffect(() => {
        if (deferredListData?.status === ValueStatus.Available && deferredListData.items?.length) {
            listDataRef.current = [...deferredListData.items];
        }
    }, [deferredListData?.status, deferredListData?.items?.length]);

    return (
        <TreeListContext.Provider value={{...TreeListContextValue}}>
            <ActiveItemContext.Provider value={activeItemKey?.value}>
                <div data-name={props.name} className={`sl-tree-list ${props.class}`} style={props.style}>
                    {/* <div className={'sl-tree-list__header'}>
                        <TreeListSearch onSearch={onSearch} />
                    </div> */}
                    <TreeList
                        data={deferredData}
                        rootKey={rootParentKey?.value}
                        listItemIcon={listItemIconClass !== '' ? {type: 'class', iconClass: listItemIconClass} : undefined}
                    />
                </div>
            </ActiveItemContext.Provider>
        </TreeListContext.Provider>  
    );
}
