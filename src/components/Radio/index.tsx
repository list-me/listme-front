/* eslint-disable */

import { Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import { Container } from "./styles";

interface IProps {
  options: string[];
  value: any[];
  handleGetNewValue: Function;
}

export const CustomRadio = ({ options, value, handleGetNewValue }: IProps) => {
  const [newValue, setNewValue] = useState<any>(value);

  const handleState = (e: RadioChangeEvent) => {
    setNewValue(e.target.value);
    handleGetNewValue(e.target.value);
  };

  return (
    <Container>
      <Radio.Group
        buttonStyle="solid"
        value={newValue}
        onChange={handleState}
        options={options}
        className="radio-group"
      >
        <Space direction="vertical">
          {options.map((option: string) => {
            return (
              <Radio.Button key={Math.random()} value={option}>
                {option}
              </Radio.Button>
            );
          })}
        </Space>
      </Radio.Group>
    </Container>
  );
};
