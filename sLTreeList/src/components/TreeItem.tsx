import { createElement, ReactNode } from 'react';
import { useCollapse } from './hooks/useCollapse';
import TreeItemIcon, { IconClass, IconComponent } from './TreeItemIcon';
import TreeItemSpacer from './TreeItemSpacer';

const TreeItem = ({
  item,
  position,
  parentCollapsed,
  icon,
  isCollapsed = true,
  collapseChildren = true,
}: TreeItemProps) => {
  const { collapsed, toggleCollapse } = useCollapse({
    isCollapsed,
    parentCollapsed,
  });

  const onListItemContainerClick = () => {
    if (item.children) {
      toggleCollapse();
    }
  }

  return (
    <div
      role={'treeitem'}
      className={'tree-list-item'}
      data-tree-node={item.id}
      data-collapsed={collapsed}
    >
      <div className={'tree-list-item__container'} onClick={onListItemContainerClick}>
        <TreeItemSpacer position={position} />
        <div className={'tree-list-item__content'}>
          {icon ? <TreeItemIcon icon={icon} listItemHasChildren={!!item.children?.length} /> : undefined}
          {item.component}
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
  id: string | number;
  key: string | number;
  parentKey?: string | number | undefined;
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
  isCollapsed?: boolean;
  collapseChildren?: boolean;
  icon?: IconClass | IconComponent;
};

export default TreeItem;
