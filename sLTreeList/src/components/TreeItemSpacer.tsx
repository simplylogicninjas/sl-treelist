import { createElement } from 'react';

const TreeItemSpacer = ({ position }: Props) => (
  <div
    className="tree-item-spacer"
    style={{ '--spacer-amount': `${position}` } as any}
  />
);

type Props = {
  position: number;
};

export default TreeItemSpacer;
