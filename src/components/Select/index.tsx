import Select from "react-select";
import { useState } from "react";
import { ContainerSelect, LabelSelect, customStyles } from "./styles";
import makeDropdownIndicator from "./components/DropdownIndicator";
import CustomMenuList from "./components/Options";
import CustomOption from "./components/Option";

const SelectComponent = ({
  select,
  onChange,
  options,
  labelText,
  placeHolder,
  small,
  isSearchable,
  fixedOptions,
  DropDownComponent,
}: ISelect): JSX.Element => {
  const DropdownWithProps = makeDropdownIndicator({ isSearchable });

  const CustomOptionWithProps = CustomOption(DropDownComponent);

  const [isFocused, setIsFocused] = useState(false);

  const optionsToView = fixedOptions ? [...options, ...fixedOptions] : options;

  return (
    <ContainerSelect>
      {labelText && <LabelSelect htmlFor={labelText}>{labelText}</LabelSelect>}
      {fixedOptions ? (
        <Select
          isSearchable={isSearchable}
          value={select}
          onChange={(selectedOption) => onChange(selectedOption as string)}
          options={optionsToView}
          styles={customStyles({ small }) as any}
          placeholder={isSearchable && isFocused ? "Digite aqui" : placeHolder}
          menuPosition="fixed"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          components={{
            DropdownIndicator: DropdownWithProps,
            MenuList: CustomMenuList,
            Option: CustomOptionWithProps as any,
          }}
          isOptionDisabled={(option) => option.openDropdown}
          getOptionValue={(option) => option.value}
          noOptionsMessage={({ inputValue }) =>
            inputValue
              ? "Nenhum resultado encontrado"
              : "Nenhuma opção disponível"
          }
        />
      ) : (
        <Select
          isSearchable={false}
          value={select}
          onChange={(selectedOption) => onChange(selectedOption as string)}
          options={options}
          styles={customStyles({ small }) as any}
          placeholder={isSearchable && isFocused ? "Digite aqui" : placeHolder}
          menuPosition="fixed"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </ContainerSelect>
  );
};

export default SelectComponent;
