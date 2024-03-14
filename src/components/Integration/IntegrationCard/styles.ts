import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerIntegrationCard = styled.div`
  width: 322.67px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
`;
