import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerActionsIntegrationCard = styled.div`
  margin-bottom: 8px;
  gap: 8px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const ActionsIntegrationButtonDefault = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
export const ActionsIntegrationButtonDelete = styled.button`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  color: #ff6b6b;
  font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
