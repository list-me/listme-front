import styled from "styled-components";

export const ContainerInitialStep = styled.div`
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  li {
    list-style-type: disc;
    margin-left: 25px;
  }
  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    color: ${({ theme }) => theme.colors.grayscale.primary};
  }
`;
export const ContainerActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;
export const CardAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 252px;
  height: 196px;
  border: 2px solid ${({ theme }) => theme.colors.hover.background};
  border-radius: 8px;
`;
export const ButtonAction = styled.button`
  display: flex;
  width: 204px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 6px;

  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
