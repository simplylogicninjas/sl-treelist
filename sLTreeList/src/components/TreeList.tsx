import { createElement } from 'react';
import { useTreeListData } from './hooks/useTreeListData';
import TreeItem, { TreeListItemBase } from './TreeItem';
import { Icon } from './TreeItemIcon';

const TreeList = ({ data, listItemIcon }: TreeListProps) => {
  const {listData} = useTreeListData({ data });

  return (
    <div className={'tree-list'} role={'group'}>
      {listData.map((it) => (
        <TreeItem key={it.id} item={it} position={0} icon={listItemIcon} />
      ))}
    </div>
  );
};

export type TreeListProps = {
  data: TreeListItemBase[];
  listItemIcon: Icon;
};
export default TreeList;
