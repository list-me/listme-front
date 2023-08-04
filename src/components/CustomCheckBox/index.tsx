import { useState } from "react";
import { Checkbox, Space } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Container, StyledCheckbox } from "./styles";

interface IProps {
  options: string[];
  defaultCheckedList: string[];
  handleGetNewValue: Function;
}

export const CustomCheckBox = ({
  options,
  defaultCheckedList,
  handleGetNewValue,
}: IProps) => {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < options.length);
    handleGetNewValue(list);
  };

  return (
    <Container>
      <Space direction="vertical">
        <Checkbox.Group
          options={options}
          value={checkedList}
          onChange={onChange}
        >
          {options.map((option) => {
            return (
              <Checkbox key={option} value={option} indeterminate>
                <label className="itemValue">{option}</label>
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </Space>
    </Container>
  );
};
