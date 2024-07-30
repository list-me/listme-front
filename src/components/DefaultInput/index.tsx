import InfoAlert from "../InfoAlert";
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
  alertTitle,
  alertContent,
}: {
  label: string;
  type: string;
  value: string;
  changeValue: (value: string) => void;
  required: boolean;
  placeHolder: string;
  alertTitle: string;
  alertContent: string;
}): JSX.Element {
  return (
    <LabelDefaultInput>
      {label || required || alertTitle || alertContent ? (
        <LabelTextDefaultInput>
          {label}
          {required ? <span>{required && "*"}</span> : <></>}
          {alertTitle || alertContent ? (
            <InfoAlert title={alertTitle} content={alertContent} />
          ) : (
            <></>
          )}
        </LabelTextDefaultInput>
      ) : (
        <></>
      )}
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
