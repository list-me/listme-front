import { debounce } from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { productContext } from "../../context/products";

import { IInputProps } from "./Input.d";
import { Container, Label, InputCustom } from "./styles";

export const Input: React.FC<IInputProps> = ({label, name, type, value, autoFocus}) => {
    const [inputText, setInputText] = useState<string>('');
    const {handleFilter} = useContext(productContext);
    const inputRef = useRef(null);

    const handleInputChange = debounce((newValue: string) => {
        handleFilter(newValue);
    }, 200);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            inputRef.current.focus();
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <InputCustom
            ref={inputRef}
            style={{height: "45px"}}
            type={type}
            name={name}
            value={value ?? inputText}
            onChange={(e) => {
                const newValue = e.target.value;
                setInputText(newValue);
                handleInputChange(newValue)
            }}
            autoFocus={autoFocus}
        />
    )
};
