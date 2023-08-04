import { useEffect, useState } from 'react';
import { TreeListItemBase, TreeListItem } from '../TreeItem';

export const useTreeListData = ({ data }: HookConfig): {listData: TreeListItem[]} => {
  const [listData, setListData] = useState<TreeListItem[]>([]);

  const transformList = (data: TreeListItemBase[], rootParentKey = ''): TreeListItem[] => {
    const dataToTreeData = (
      list: TreeListItemBase[],
      config: {
        parentKey?: string | number | undefined;
      }
    ): TreeListItem[] => {
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
    setListData([...transformList(data)]);
  }, [data]);

  return {listData}
};

type HookConfig = {
  data: TreeListItem[];
  rootParentKey?: string | number | undefined;
};
