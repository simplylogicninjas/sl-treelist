import { createElement, ReactNode } from 'react';
import { useCollapse } from './hooks/useCollapse';
import TreeItemSpacer from './TreeItemSpacer';
import TreeItemListToggle, { IconClass, IconComponent } from './TreeItemListToggle';
import { useTreeListContext } from 'src/hooks/useTreeListContext';

const TreeItem = ({
  item,
  position,
  parentCollapsed,
  icon,
  collapseChildren = false
}: TreeItemProps) => {
  const treeListContext = useTreeListContext();
  const { collapsed, toggleCollapse } = useCollapse({
    isCollapsed: treeListContext.itemCollapseState[item.id] ? treeListContext.itemCollapseState[item.id].collapsed : true,
    parentCollapsed,
  });

  const onListItemToggle = (item: TreeListItemData) => {
    if (item.children) {
      treeListContext.onItemCollapse(item.id, !collapsed);
      toggleCollapse();
    }
  }

  const onListItemClick = (item: TreeListItemData) => {
    treeListContext.onItemClick(item);
  }

  return (
    <div
      role={'treeitem'}
      className={`tree-list-item ${item.className}`}
      data-tree-node={item.id}
      data-collapsed={collapsed}
    >
      <div className={'tree-list-item__container'}>
        <TreeItemSpacer position={position} />
        <div className={'tree-list-item__content'}>
          <TreeItemListToggle icon={icon} listItemHasChildren={!!item.children?.length} onToggle={() => onListItemToggle(item)} />
          <div className={'tree-list-item__component'} onClick={() => onListItemClick(item)}>
            {item.component}
          </div>
        </div>
      </div>
      {item.children &&
        item.children.map((child) => (
          <div className={'tree-list-item__list'}>
            <div className={'tree-list'} role="group">
              <TreeItem
                key={child.id}
                item={child}
                icon={icon}
                position={position + 1}
                collapseChildren={collapseChildren}
                parentCollapsed={collapseChildren && collapsed}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export type TreeListItemBase = {
  id: string;
  key: string;
  parentKey?: string | undefined;
  className?: string | undefined;
  component: ReactNode | undefined;
};

export type TreeListItem = TreeListItemBase;

export type TreeListItemData = TreeListItem & {
  children?: TreeListItem[];
};

export type TreeItemProps = {
  item: TreeListItemData;
  position: number;
  parentCollapsed?: boolean;
  collapseChildren?: boolean;
  icon?: IconClass | IconComponent;
  onListCollapseToggle?: (item: TreeListItemData) => void;
  onClick?: (item: TreeListItemData) => void;
};

export default TreeItem;
