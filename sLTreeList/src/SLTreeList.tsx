import { ReactElement, createElement } from "react";

import { SLTreeListContainerProps } from "../typings/SLTreeListProps";

import "./ui/SLTreeList.css";
import TreeList from "./components/TreeList";
import { useTransformMxDataSource } from "./hooks/useTransformMxDataSource";

export function SLTreeList({
    listData,
    listItemKey,
    listItemParentKey,
    listItemContent,
    listItemIconClass
}: SLTreeListContainerProps): ReactElement {
    const {data} = useTransformMxDataSource({
        listValue: listData,
        attributeValueKey: listItemKey,
        attributeValueParentKey: listItemParentKey,
        widgetValue: listItemContent
    })

    return <TreeList data={[...data]} listItemIcon={{type: 'class', iconClass: listItemIconClass}} />;
}
