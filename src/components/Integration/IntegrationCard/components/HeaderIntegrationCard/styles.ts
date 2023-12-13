import styled from "styled-components";

export const ContainerHeaderIntegrationCard = styled.div`
  padding: 24px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.grayscale.eleventh};
  display: flex;
  justify-content: space-between;
  img {
    width: 40px;
    height: 40px;
  }
`;
export const SwitchContainer = styled.div`
  width: 101px;
  height: 37px;
  padding: 8px, 8px, 8px, 12px;
  border-radius: 4px;
  gap: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 8px 8px 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ant-switch {
    min-width: 30px;
  }
  .ant-switch-handle {
    top: 3.99px;
    width: 15px !important;
    height: 15px !important;
  }
`;
export const SwitchLabel = styled.span`
  color: #101010;
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
