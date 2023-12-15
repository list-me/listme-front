import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const LabelSwitchBox = styled.p`
  margin-bottom: 8px;
  color: #212529;
  font-size: 16px;
  font-weight: 700;
  span {
    color: #f15757;
  }
`;
export const BoxDualSwitch = styled.div`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  background: ${({ theme }) => theme.colors.secondary};
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
