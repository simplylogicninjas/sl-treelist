import { ReactElement, createElement, useRef, useEffect, useDeferredValue } from "react";
import { ObjectItem, ValueStatus } from "mendix";
// import { attribute, contains, literal } from "mendix/filters/builders";

import { SLTreeListContainerProps } from "../typings/SLTreeListProps";

import "./ui/SLTreeList.css";
import TreeList from "./components/TreeList";
import { useTransformMxDataSource } from "./hooks/useTransformMxDataSource";
import { TreeListItemBase } from "./components/TreeItem";
import { initTreeListContext } from "./hooks/useTreeListContext";
// import TreeListSearch from "./components/TreeListSearch";

export function SLTreeList(props: SLTreeListContainerProps): ReactElement {
    const {
        listData,
        listItemKey,
        listItemParentKey,
        listItemContent,
        listItemClass,
        listItemClickAction,
        listItemIconClass,
        rootParentKey
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
        classValue: listItemClass,
        widgetValue: listItemContent
    })
    const deferredData = useDeferredValue(data);

    useEffect(() => {
        if (deferredListData?.status === ValueStatus.Available && deferredListData.items?.length) {
            listDataRef.current = [...deferredListData.items];
        }
    }, [deferredListData?.status, deferredListData?.items?.length]);

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

    const TreeListContextValue = {
        onItemClick,
        onItemCollapse,
        itemCollapseState: itemCollapsedState.current
    }
    const TreeListContext = initTreeListContext(TreeListContextValue)

    // const onSearch = (value: string) => {
    //     if (listData && searchValueRef.current && searchValueRef.current.filterable) {
    //         listData.setFilter(
    //             contains(attribute(searchValueRef.current.id), literal(value))
    //         )
    //     }
    // }

    return (
        <TreeListContext.Provider value={TreeListContextValue}>
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
        </TreeListContext.Provider>  
    );
}
