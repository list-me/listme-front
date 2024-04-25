/* eslint-disable */

import { Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import { Container, ContainerOption, Description } from "./styles";

interface IProps {
  options: { label: string; description: string; value: string }[];
  value: { label: string; description: string; value: string };
  handleGetNewValue: (value: {
    label: string;
    description: string;
    value: string;
  }) => void;
}

export const RadioLinkConfig = ({
  options,
  value,
  handleGetNewValue,
}: IProps) => {
  const handleState = (selectedValue: {
    label: string;
    description: string;
    value: string;
  }) => {
    handleGetNewValue(selectedValue);
  };

  return (
    <Container>
      <Radio.Group
        buttonStyle="solid"
        value={value.value}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => opt.value === e.target.value,
          );
          if (selectedOption) {
            handleState(selectedOption);
          }
        }}
        className="radio-group"
      >
        <Space direction="vertical">
          {options.map((option) => (
            <ContainerOption
              onClick={(e) => {
                handleState(option);
              }}
              isActive={value.value === option.value}
            >
              <Radio key={option.value} value={option.value}>
                {option.label}
              </Radio>
              {option.description && (
                <Description>{option.description}</Description>
              )}
            </ContainerOption>
          ))}
        </Space>
      </Radio.Group>
    </Container>
  );
};
