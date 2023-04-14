import styled, { css } from "styled-components";
import { Input } from "antd";

interface IPropStyle {
  custom: {
    background?: boolean;
    bordered?: boolean;
    padding?: string;
  };
}

export const StyledP = styled.p`
  color: orange;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  padding: 0;

  .ant-form-item {
    margin: 0 !important;
  }

  .ant-form-item-explain {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: 400;
    line-height: 150%;
  }
`;

export const Label = styled.label`
  display: flex;

  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: 700;
  line-height: 150%;
`;

export const InputCustom = styled(Input)<IPropStyle>`
  background: ${(props) => (props.custom.background ? "#F3F4F6" : "#FFFF")};
  border: ${(props) => (props.custom.bordered ? "1px solid #E9ECEF" : "none")};
  width: 280px;

  margin: none !important;
  padding: ${(props) => props.custom.padding ?? "10px"};
  border-radius: 8px;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: #495057;
  font-weight: 400;
  line-height: 150%;

  /* &::before {
    transition: opacity 3s ease-in;
  }

  &::after {
    transition: opacity 1s ease-out;
  } */
`;
