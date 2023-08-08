import {ListValue, ObjectItem, ListAttributeValue, ListExpressionValue, ListWidgetValue, ValueStatus} from "mendix";
import {useState, useEffect} from 'react';
import { TreeListItemBase } from "src/components/TreeItem";

const getExpressionListValue = async (objectItem: ObjectItem, expressionValue: ListExpressionValue) => {
    const getValue = () => {
        return expressionValue.get(objectItem);
    }

    do {
        return Promise.resolve(getValue().value);
    } while (getValue().status !== ValueStatus.Available)
}

export const useTransformMxDataSource = ({
    listValue,
    attributeValueKey,
    attributeValueParentKey,
    classValue,
    widgetValue
}: Config): {data: TreeListItemBase[]} => {
    const [data, setData] = useState<TreeListItemBase[]>([]);

    const transformData = async ({
        items,
        valueKey,
        parentValueKey,
        widgetValue
    }: {
        items: ObjectItem[],
        valueKey: ListAttributeValue,
        parentValueKey: ListAttributeValue,
        classValue: ListExpressionValue | undefined,
        widgetValue: ListWidgetValue
    }) => {
        const transformedData = await Promise.all(items.map(async (item) => {
            const key = valueKey.get(item).value;
        
                if (!key) {
                    return;
                }
        
                const parentKey = parentValueKey.get(item).value as string | number | undefined;
                const component = widgetValue.get(item);
                const className = classValue ? await getExpressionListValue(item, classValue) : '';
        
                return {
                    id: item.id.toString(),
                    key: key.toString(),
                    parentKey: parentKey?.toString(),
                    className: className,
                    component
                } as TreeListItemBase;
        }))

        setData(
            transformedData.filter(it => !!it) as TreeListItemBase[]
        );
    }

    useEffect(() => {
        if (attributeValueKey && attributeValueParentKey && widgetValue && listValue?.status === ValueStatus.Available) {
            transformData({
                items: listValue.items ?? [],
                valueKey: attributeValueKey,
                parentValueKey: attributeValueParentKey,
                classValue: classValue,
                widgetValue: widgetValue
            })
        }
    }, [
        listValue?.status,
        listValue?.items?.length,
        attributeValueKey,
        attributeValueParentKey,
        classValue,
        widgetValue
    ])


    return {data};
}

type Config = {
    listValue: ListValue | undefined;
    attributeValueKey: ListAttributeValue | undefined;
    attributeValueParentKey: ListAttributeValue | undefined;
    classValue: ListExpressionValue | undefined;
    widgetValue: ListWidgetValue | undefined;
}