import Select from "react-select";
import { ContainerSelect, LabelSelect, customStyles } from "./styles";

const SelectComponent = ({
  select,
  setSelect,
  options,
  labelText,
  placeHolder,
  small,
}: ISelect): JSX.Element => {
  return (
    <ContainerSelect>
      {labelText && <LabelSelect htmlFor={labelText}>{labelText}</LabelSelect>}
      <Select
        isSearchable={false}
        value={select}
        onChange={(selectedOption) => setSelect(selectedOption as string)}
        options={options}
        styles={customStyles({ small }) as any}
        placeholder={placeHolder}
        // menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </ContainerSelect>
  );
};

export default SelectComponent;
