import { createElement } from 'react';

const TreeItemIcon = ({ icon, listItemHasChildren }: Props) => {
  if (icon) {
    if (!listItemHasChildren) {
      return <span className={'tree-item-icon-container'} />
    }

    if (icon.type === 'class') {
      return <span className={'tree-item-icon-container'}><span className={`tree-item-icon ${icon.iconClass}`} /></span>;
    }
  
    if (icon.type === 'component') {
      return <span className={'tree-item-icon-container'}><span className={'tree-item-icon'}>{icon.iconComponent} /</span></span>;
    }
  }

  return <span />;
};

export type IconClass = {
  type: 'class';
  iconClass: string;
};

export type IconComponent = {
  type: 'component';
  iconComponent: React.ReactNode;
};

export type Icon = IconClass | IconComponent;

export type Props = {
  icon: Icon;
  listItemHasChildren: boolean;
};

export default TreeItemIcon;
