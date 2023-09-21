import {ListValue, ObjectItem, ListAttributeValue, ListWidgetValue, ValueStatus} from "mendix";
import {useState, useEffect, useRef} from 'react';
import { TreeListItemBase } from "src/components/TreeItem";

export const useTransformMxDataSource = ({
    listValue,
    attributeValueKey,
    attributeValueParentKey,
    sequence,
    widgetValue
}: Config): {data: TreeListItemBase[]} => {
    const dataRef = useRef<TreeListItemBase[]>([]);
    const [data, setData] = useState<TreeListItemBase[]>([]);

    const transformData = async ({
        items,
        valueKey,
        parentValueKey,
        sequenceValue,
        widgetValue
    }: {
        items: ObjectItem[],
        valueKey: ListAttributeValue,
        parentValueKey: ListAttributeValue,
        sequenceValue: ListAttributeValue | undefined,
        widgetValue: ListWidgetValue
    }) => {
        const transformedData = await Promise.all(items.map(async (item) => {
            const key = valueKey.get(item).value;
        
            if (!key) {
                return;
            }
    
            const parentKey = parentValueKey.get(item).value as string | number | undefined;
            const component = widgetValue.get(item);
    
            return {
                id: item.id.toString(),
                key: key.toString(),
                parentKey: parentKey?.toString(),
                sequence: sequenceValue?.get(item).value?.toString(),
                component
            } as TreeListItemBase;
        }))

        const filtered = transformedData.filter(it => !!it) as TreeListItemBase[];

        if (JSON.stringify(filtered) !== JSON.stringify(dataRef.current)) {
            setData([...filtered]);
            dataRef.current = [...filtered];
        }
    }

    useEffect(() => {
        if (attributeValueKey && attributeValueParentKey && widgetValue && listValue?.status === ValueStatus.Available) {
            transformData({
                items: listValue.items ?? [],
                valueKey: attributeValueKey,
                parentValueKey: attributeValueParentKey,
                sequenceValue: sequence,
                widgetValue: widgetValue
            })
        }
    }, [
        listValue?.status,
        listValue?.items?.length,
        listValue?.items,
        attributeValueKey,
        attributeValueParentKey,
        sequence,
        widgetValue
    ])


    return {data};
}

type Config = {
    listValue: ListValue | undefined;
    attributeValueKey: ListAttributeValue | undefined;
    attributeValueParentKey: ListAttributeValue | undefined;
    sequence: ListAttributeValue | undefined;
    widgetValue: ListWidgetValue | undefined;
}