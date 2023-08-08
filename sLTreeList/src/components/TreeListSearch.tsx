import {createElement} from 'react';

import {useSearchValue} from "./hooks/useSearchValue";

const TreeListSearch = ({onSearch}: Props) => {
    const {value, onValueChange} = useSearchValue({callback: onSearch});

    return (
        <input type="search" value={value} onChange={onValueChange}  />
    )
}

type Props = {
    onSearch: (value: string) => void;
}

export default TreeListSearch;