import React from "react";
import { Checkbox } from "antd";
import { CheckboxCustomProps } from "./Checkbox.d";

export const CheckboxCustom: React.FC<CheckboxCustomProps> = ({
  onChange = () => {},
  label,
}) => {
  return <Checkbox onChange={onChange}>{label}</Checkbox>;
};
