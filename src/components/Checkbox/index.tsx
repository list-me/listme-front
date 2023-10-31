import React from "react";
import { Checkbox } from "antd";

function CheckboxCustom({
  onChange = () => {},
  label,
}: {
  onChange: () => void;
  label: string;
}): JSX.Element {
  return <Checkbox onChange={onChange}>{label}</Checkbox>;
}

export default CheckboxCustom;
