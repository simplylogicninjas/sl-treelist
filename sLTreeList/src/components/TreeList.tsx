import { createElement } from 'react';
import { useTreeListData } from './hooks/useTreeListData';
import TreeItem, { TreeListItemBase } from './TreeItem';
import { Icon } from './TreeItemListToggle';

const TreeList = ({ data, listItemIcon, rootKey = ''}: TreeListProps) => {
  const {listData} = useTreeListData({ data, rootParentKey: rootKey });

  return (
    <div className={'tree-list'} role={'group'}>
      {listData.map((it) => (
        <TreeItem
          key={it.id}
          item={it}
          position={0}
          icon={listItemIcon}
        />
      ))}
    </div>
  );
};

type TreeListProps = {
  data: TreeListItemBase[];
  rootKey?: string | undefined;
  listItemIcon?: Icon | undefined;
};

// export default memo(TreeList, (oldProps, newProps) => {
//   return (
//     JSON.stringify(oldProps.data) === JSON.stringify(newProps.data)
//   );
// });

export default TreeList
