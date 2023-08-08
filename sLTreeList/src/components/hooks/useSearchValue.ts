import React, {useState} from 'react';

export const useSearchValue = ({callback}: Config) => {
    const [value, setValue] = useState('');
    const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setValue(value);
        
        if (callback) {
            callback(value);
        }
    }

    return {value, onValueChange};
}

type Config = {
    callback?: (value: string) => void;
}