import { useEffect, useState } from 'react';

export const useCollapse = ({ isCollapsed, parentCollapsed }: Config) => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const toggleCollapse = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (parentCollapsed) {
      setCollapsed(true);
    }
  }, [parentCollapsed]);

  return { collapsed, toggleCollapse };
};

type Config = {
  isCollapsed: boolean;
  parentCollapsed?: boolean;
};
