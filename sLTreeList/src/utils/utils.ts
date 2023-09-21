import {ObjectItem, ListExpressionValue, ValueStatus, DynamicValue} from "mendix";
import { TreeListItemData } from "src/components/TreeItem";

export const getExpressionListValue = async (objectItem: ObjectItem, expressionValue: ListExpressionValue) => {
    const getValue = () => {
        return expressionValue.get(objectItem);
    }

    do {
        return Promise.resolve(getValue().value);
    } while (getValue().status !== ValueStatus.Available)
}

export const getDynamiceValue = async <T>(dynamicValue: DynamicValue<T>) => {
    const getValue = () => {
        return dynamicValue
    }

    do {
        return Promise.resolve(getValue().value);
    } while (getValue().status !== ValueStatus.Available)
}

export function arraysEqual(arr1: TreeListItemData[] = [], arr2: TreeListItemData[] = []): boolean {
  let equal = true;

  function compare(arr1: TreeListItemData[] = [], arr2: TreeListItemData[] = []) {
    if (arr1.length === 0) {
      equal = arr2.length === 0;
      return;
    }

    equal = arr1.length === arr2.length;

    if (!equal) {
      return;
    }

    for (const [index, item] of arr1.entries()) {
      const toCompare = arr2[index];

      if (!toCompare) {
        equal = false;
        break;
      }

      if (item.key !== toCompare.key) {
        equal = false;
        break;
      }

      if ((item.children && !toCompare.children) || (!item.children && toCompare.children)) {
        equal = false;
        break;
      }

      compare(item.children, toCompare.children);
    }
  }

  compare(arr1, arr2);

  return equal;
}