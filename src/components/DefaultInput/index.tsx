import {
  InputDefaultInput,
  LabelDefaultInput,
  LabelTextDefaultInput,
} from "./styles";

function DefaultInput({
  label,
  type,
  value,
  changeValue,
  required,
  placeHolder,
}: {
  label: string;
  type: string;
  value: string;
  changeValue: (value: string) => void;
  required: boolean;
  placeHolder: string;
}): JSX.Element {
  return (
    <LabelDefaultInput>
      <LabelTextDefaultInput>
        {label}
        <span>{required && "*"}</span>
      </LabelTextDefaultInput>
      <InputDefaultInput
        type={type}
        value={value}
        onChange={(event) => changeValue(event.target.value)}
        placeholder={placeHolder}
      />
    </LabelDefaultInput>
  );
}

export default DefaultInput;
