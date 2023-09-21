import { useEffect, useState, useRef } from 'react';
import { TreeListItemBase, TreeListItem } from '../TreeItem';
import { arraysEqual } from 'src/utils/utils';

export const useTreeListData = ({ data,  rootParentKey }: HookConfig): {listData: TreeListItem[]} => {
  const listDataRef = useRef<TreeListItem[]>([]);
  const dataRef = useRef<TreeListItemBase[]>([]);
  const [listData, setListData] = useState<TreeListItem[]>([]);

  const transformList = (data: TreeListItemBase[], rootParentKey = '') => {
    const dataToTreeData = (
      list: TreeListItemBase[],
      config: {
        parentKey?: string | number | undefined;
      }
    ): TreeListItem[] => {
      /** TODO: Implement "search filtering"
       */
      return list
        .filter((item) => item.parentKey === config.parentKey)
        .map((child) => ({
          ...child,
          children: dataToTreeData(list, {
            parentKey: child.key,
          }),
        })) as TreeListItem[];
    };

    const transformedList = dataToTreeData(data, {parentKey: rootParentKey});

    if (!arraysEqual(listDataRef.current, transformedList)) {
      setListData([...transformedList]);
      listDataRef.current = transformedList;
    }
  };

  useEffect(() => {
    transformList(data, rootParentKey);
    dataRef.current = [...data];
  }, [data.length, !arraysEqual(dataRef.current, data), rootParentKey]);

  return {listData}
};

type HookConfig = {
  data: TreeListItem[];
  rootParentKey?: string | undefined;
};
