import { useEffect, useState, useRef } from 'react';
import { TreeListItemBase, TreeListItem } from '../TreeItem';

export const useTreeListData = ({ data,  rootParentKey }: HookConfig): {listData: TreeListItem[]} => {
  const listDataRef = useRef<TreeListItem[]>([]);
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

    const transformedList =  dataToTreeData(data, {parentKey: rootParentKey});

    if (JSON.stringify(transformedList) !== JSON.stringify(listDataRef.current)) {
      setListData(transformedList);
      listDataRef.current = transformedList;
    }
  };

  useEffect(() => {
    transformList(data, rootParentKey);
  }, [data, rootParentKey]);

  return {listData}
};

type HookConfig = {
  data: TreeListItem[];
  rootParentKey?: string | undefined;
};
