import styled from "styled-components";

export const ContainerIntegrationNavigate = styled.div<{ external: boolean }>`
  padding: ${(props) => (props.external ? "24px 32px" : "0px")};
  border-radius: 8px;
  background: #fff;
  display: flex;
  justify-content: space-between;
`;
export const ClearButtonIntegration = styled.button`
  color: #f15757;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  background: none;
  border: none;
  :disabled {
    opacity: 0.5;
  }
`;
export const RightButtons = styled.div`
  display: flex;
  gap: 8px;
`;
export const NextButton = styled.button`
  padding: 12px 24px;
  color: #3818d9;
  align-self: flex-end;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  border: 1px solid #3818d9;
  background: none;
`;
export const SaveButton = styled.div`
  width: 88px;
`;
