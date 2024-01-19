import styled from "styled-components";

export const ContainerContentIntegrationCard = styled.div`
  padding: 4px 12px 0px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const TitleContentIntegrationCard = styled.p`
  color: #101010;

  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin: 0;
`;
export const DescriptionContentIntegrationCard = styled.span`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
`;
