import Select from "react-select";
import { useState } from "react";
import { ContainerSelect, customStyles } from "./styles";
import CustomOption from "../../../Select/components/Option";
import CustomInputFilter from "../CustomInputFilter";

const SelectFilter = ({
  select,
  onChange,
  options,
  placeHolder,
  small,
  isSearchable,
  isDisabled,
}: ISelect): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const CustomOptionWithProps = CustomOption(<></>);

  return (
    <ContainerSelect>
      <Select
        isSearchable={false}
        isDisabled={isDisabled}
        value={select}
        onChange={(selectedOption) => onChange(selectedOption as string)}
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
    </ContainerSelect>
  );
};

export default SelectFilter;
