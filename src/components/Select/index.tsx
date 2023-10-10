import Select from "react-select";
import { ContainerSelect, LabelSelect, customStyles } from "./styles";
// import MenuWithSearch from "./components/Menu";
import makeDropdownIndicator from "./components/DropdownIndicator";
import { useState } from "react";

const SelectComponent = ({
  select,
  onChange,
  options,
  labelText,
  placeHolder,
  small,
  isSearchable,
}: ISelect): JSX.Element => {
  const DropdownWithProps = makeDropdownIndicator({ isSearchable });

  const [isFocused, setIsFocused] = useState(false);

  return (
    <ContainerSelect>
      {labelText && <LabelSelect htmlFor={labelText}>{labelText}</LabelSelect>}
      <Select
        isSearchable={isSearchable}
        value={select}
        onChange={(selectedOption) => onChange(selectedOption as string)}
        options={options}
        styles={customStyles({ small }) as any}
        placeholder={isSearchable && isFocused ? "Digite aqui" : placeHolder}
        menuPosition="fixed"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        components={{ DropdownIndicator: DropdownWithProps }}
        noOptionsMessage={({ inputValue }) =>
          inputValue
            ? "Nenhum resultado encontrado"
            : "Nenhuma opção disponível"
        }
      />
    </ContainerSelect>
  );
};

export default SelectComponent;
