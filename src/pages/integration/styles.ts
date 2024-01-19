import styled from "styled-components";

export const ContainerIntegration = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
export const CardsContainerIntegration = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
