import { useEffect, useState } from 'react';
import { TreeListItemBase, TreeListItem } from '../TreeItem';

export const useTreeListData = ({ data, rootParentKey }: HookConfig): {listData: TreeListItem[]} => {
  const [listData, setListData] = useState<TreeListItem[]>([]);

  const transformList = (data: TreeListItemBase[], rootParentKey = ''): TreeListItem[] => {
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

    return dataToTreeData(data, {parentKey: rootParentKey});
  };

  useEffect(() => {
    setListData([...transformList(data, rootParentKey)]);
  }, [data, rootParentKey]);

  return {listData}
};

type HookConfig = {
  data: TreeListItem[];
  rootParentKey?: string | undefined;
};
