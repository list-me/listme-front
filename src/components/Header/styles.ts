import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 96px;

  background: ${({ theme }) => theme.colors.background.primary};
`;

export const RightContent = styled.div`
  width: auto;
  max-height: 45px;
  margin-left: auto;

  display: flex;
  justify-content: end;
  align-items: center;
`;
export const IntegrationBreadCrumb = styled.div`
  padding-left: 32px;
  display: flex;
  gap: 16px;
`;
export const ButtonPrev = styled.button`
  display: flex;
  border: none;
  padding-right: 16px;
  border-right: 2px solid ${({ theme }) => theme.colors.grayscale.seventh};
  height: 24px;
  background: none;
`;
export const TitlePage = styled.p`
  color: ${({ theme }) => theme.colors.fourth};
  margin: 0;
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const CurrentProduct = styled.p`
  color: ${({ theme }) => theme.colors.tertiary};
  margin: 0;

  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const ChevronIcon = styled.div`
  display: flex;
  align-items: center;
  svg {
    transform: rotate(-90deg);
  }
`;
