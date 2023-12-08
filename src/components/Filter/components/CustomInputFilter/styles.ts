import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const CustomInputFilterContainer = styled.div`
  color: #000;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  height: 100%;
  width: initial;
  display: flex;
  gap: 8px;
  align-items: center;
  top: -1px;
  left: 8px;
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  path {
    stroke: #000;
  }
`;
