/* eslint-disable react/jsx-props-no-spreading */
import styled from "styled-components";
import { Checkbox } from "antd";
import { components } from "react-select";

export const ContainerOption = styled.div`
  display: flex;
  margin: 15px 0;
  :first-child {
    margin-top: 0;
  }
  :last-child {
    margin-bottom: 0;
  }
  > {
    .react-select__option,
    .react-select__option:hover {
      padding: 0;
      margin: 0;
      background: none;
      color: #000;
      display: flex;
    }
  }
  .configOption {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

function OptionMulti(props: any): JSX.Element {
  const { label } = props?.data;
  const { isSelected } = props;

  const toggleSelection = () => {
    props?.selectOption(props?.data);
  };

  return (
    <ContainerOption>
      <components.Option {...props}>
        <div className="configOption">
          <Checkbox checked={isSelected} onChange={toggleSelection} />
          <p>{label}</p>
        </div>
      </components.Option>
    </ContainerOption>
  );
}

export default OptionMulti;
