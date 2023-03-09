/* eslint-disable */

import { Radio, RadioChangeEvent, Space } from "antd"
import { useState } from "react";
import { Container   } from "./styles";

interface IProps {
  options: string[];
  value: string;
  handleGetNewValue: Function;
}

export const CustomRadio = ({options, value, handleGetNewValue}: IProps) => {
  const [newValue, setNewValue] = useState(value);

  const handleState = (e: RadioChangeEvent) => {
    setNewValue(e.target.value);
    handleGetNewValue(e.target.value);
  }

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
          {
            options.map((option: string) => {
              return <Radio key={Math.random()} value={option}> {option} </Radio>
            })
          }
        </Space>
      </Radio.Group>
    </Container>
  )
}