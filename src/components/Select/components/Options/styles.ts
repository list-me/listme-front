import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerOption = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 10px 40px 0px rgba(56, 24, 217, 0.07);
  border-radius: 8px;
  position: absolute !important;
  width: 100%;
  > div:active {
    background: ${({ theme }) => theme.colors.secondary} !important;
  }
`;
export const FixedOptions = styled.div`
  margin: 0 8px;
  padding-top: 8px;
  border-top: 1px solid #e9ecef;
`;
