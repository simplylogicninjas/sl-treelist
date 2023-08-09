import {ObjectItem, ListExpressionValue, ValueStatus, DynamicValue} from "mendix";

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