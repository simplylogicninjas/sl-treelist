import { createElement, Fragment } from 'react';
import { TreeListItemBase } from './TreeItem';

const data: TreeListItemBase[] = [
  {
    id: 1,
    key: 1,
    component: <div>I am a Tree Item 1</div>,
  },
  {
    id: 2,
    key: 2,
    component: <div>I am a Tree Item 2</div>,
  },
  {
    id: 3,
    key: 3,
    parentKey: 2,
    component: <div>I am a Tree Item 3</div>,
  },
  {
    id: 4,
    key: 4,
    parentKey: 2,
    component: <div>I am a Tree Item 4</div>,
  },
  {
    id: 5,
    key: 5,
    parentKey: 4,
    component: (
      <Fragment>
        <div>I am a Tree Item 5</div>
        <div>With more content</div>
      </Fragment>
    ),
  },
];

export default data;
