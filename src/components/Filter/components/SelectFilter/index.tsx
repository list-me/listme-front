import Select from "react-select";
import { useState } from "react";
import { ContainerSelect, FakePlaceHolder, customStyles } from "./styles";
import CustomOption from "../../../Select/components/Option";
import CustomInputFilter from "../CustomInputFilter";
import OptionMulti from "../OptionMulti";

const SelectFilter = ({
  select,
  onChange,
  options,
  placeHolder,
  small,
  isSearchable,
  isDisabled,
  isMulti,
}: ISelect): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const CustomOptionWithProps = CustomOption(<></>);

  const sortSelectedFirst = (selected: any, options: any) => {
    const selectedValues = selected.map((item: any) => item.value);
    const sortedOptions = [...options].sort((a, b) => {
      const aIsSelected = selectedValues.includes(a.value);
      const bIsSelected = selectedValues.includes(b.value);

      if (aIsSelected && !bIsSelected) {
        return -1;
      }
      if (!aIsSelected && bIsSelected) {
        return 1;
      }
      return 0;
    });

    return sortedOptions;
  };

  return (
    <ContainerSelect focused={isFocused}>
      {!isMulti ? (
        <Select
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          value={isFocused ? "" : select}
          onChange={(selectedOption) => {
            setIsFocused(false);
            onChange(selectedOption as string);
          }}
          options={options}
          styles={customStyles({ small }) as any}
          placeholder={isSearchable && isFocused ? "Digite aqui" : placeHolder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          components={{
            SingleValue: CustomInputFilter,
            Option: CustomOptionWithProps as any,
          }}
        />
      ) : (
        <Select
          isMulti
          isSearchable
          classNamePrefix="react-select"
          options={sortSelectedFirst(select?.value, options)}
          placeholder={placeHolder}
          components={{
            Option: OptionMulti as any,
          }}
          hideSelectedOptions={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          styles={customStyles({ small }) as any}
          onChange={(selectedOption) => {
            onChange(selectedOption);
          }}
          closeMenuOnSelect={false}
          isClearable={false}
        />
      )}
      {isMulti && select?.value?.length && (
        <FakePlaceHolder>
          Selecionado(s): {select?.value?.length}
        </FakePlaceHolder>
      )}
    </ContainerSelect>
  );
};

export default SelectFilter;
