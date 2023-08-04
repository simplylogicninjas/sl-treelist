import {ListValue, ObjectItem, ListAttributeValue, ListWidgetValue, ValueStatus} from "mendix";
import {useState, useEffect, useRef} from 'react';
import { TreeListItemBase } from "src/components/TreeItem";

export const useTransformMxDataSource = ({
    listValue,
    attributeValueKey,
    attributeValueParentKey,
    widgetValue
}: Config): {data: TreeListItemBase[]} => {
    const attributeValueKeyRef = useRef<ListAttributeValue | undefined>();
    const attributeValueParentKeyRef = useRef<ListAttributeValue | undefined>();
    const widgetValueRef = useRef<ListWidgetValue | undefined>();
    const [data, setData] = useState<TreeListItemBase[]>([]);

    const transformData = ({
        items,
        valueKey,
        parentValueKey,
        widgetValue
    }: {
        items: ObjectItem[],
        valueKey: ListAttributeValue,
        parentValueKey: ListAttributeValue,
        widgetValue: ListWidgetValue
    }) => {
        setData(
            items.map(item => {
                const key = valueKey.get(item).value;
        
                if (!key) {
                    return;
                }
        
                const parentKey = parentValueKey.get(item).value as string | number | undefined;
                const component = widgetValue.get(item);
        
                return {
                    id: item.id,
                    key,
                    parentKey,
                    component
                }
            }).filter(it => !!it) as TreeListItemBase[]
        );
    }

    useEffect(() => {
        if (attributeValueKey) {
            attributeValueKeyRef.current = attributeValueKey;
        }
    }, [attributeValueKey]);

    useEffect(() => {
        if (attributeValueParentKey) {
            attributeValueParentKeyRef.current = attributeValueParentKey;
        }
    }, [attributeValueParentKey]);

    useEffect(() => {
        if (widgetValue) {
            widgetValueRef.current = widgetValue;
        }
    }, [widgetValue]);

    useEffect(() => {
        if (attributeValueKey && attributeValueParentKey && widgetValue && listValue?.status === ValueStatus.Available) {
            transformData({
                items: listValue.items ?? [],
                valueKey: attributeValueKey,
                parentValueKey: attributeValueParentKey,
                widgetValue: widgetValue
            })
        }
    }, [
        listValue?.status,
        listValue?.items?.length,
        attributeValueKey,
        attributeValueParentKey,
        widgetValue
    ])


    return {data};
}

type Config = {
    listValue: ListValue | undefined;
    attributeValueKey: ListAttributeValue | undefined;
    attributeValueParentKey: ListAttributeValue | undefined;
    widgetValue: ListWidgetValue | undefined;
}