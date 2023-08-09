/**
 * This file was generated from SLTreeList.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface SLTreeListContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    listData?: ListValue;
    listItemKey?: ListAttributeValue<string | Big>;
    listItemParentKey?: ListAttributeValue<string | Big>;
    rootParentKey?: DynamicValue<string>;
    activeItemKey?: DynamicValue<string>;
    listItemIconClass: string;
    listItemClickAction?: ListActionValue;
    listItemContent?: ListWidgetValue;
}

export interface SLTreeListPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    listData: {} | { caption: string } | { type: string } | null;
    listItemKey: string;
    listItemParentKey: string;
    rootParentKey: string;
    activeItemKey: string;
    listItemIconClass: string;
    listItemClickAction: {} | null;
    listItemContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
}
