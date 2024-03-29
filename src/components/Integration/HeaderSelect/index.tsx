import SelectComponent from "../../Select";

function HeaderSelect({
  headerSelectValue,
  setHeaderSelectValue,
  label,
  placeHolder,
  options,
  required,
  done,
}: {
  done: boolean;
  headerSelectValue: {
    value: string;
    label: string;
  } | null;
  setHeaderSelectValue: React.Dispatch<
    React.SetStateAction<{
      value: string;
      label: string;
    } | null>
  >;
  label: string;
  placeHolder: string;
  options: {
    label: string;
    value: any;
  }[];
  required: boolean;
}): JSX.Element {
  return (
    <SelectComponent
      select={headerSelectValue}
      onChange={setHeaderSelectValue}
      options={options}
      small
      inline
      labelText={label}
      placeHolder={placeHolder}
      required={required}
      isDisabled={done}
    />
  );
}

export default HeaderSelect;
