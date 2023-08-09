import {createContext, useContext} from 'react';

export const ActiveItemContext = createContext<string | undefined>(undefined);
export const useActiveItemContext = () => useContext(ActiveItemContext);