import Select from "react-select";
import { useState } from "react";
import { ContainerSelect, customStyles } from "./styles";
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

  return (
    <ContainerSelect>
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
          isSearchable={false}
          isClearable={false}
          classNamePrefix="react-select"
          options={options}
          onChange={(selectedOption) => {
            onChange(selectedOption);
          }}
          styles={customStyles({ small }) as any}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Selecione"
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option: OptionMulti as any,
          }}
        />
      )}
    </ContainerSelect>
  );
};

export default SelectFilter;
