import styled from "styled-components";

export const ContainerLinkMethod = styled.div``;

export const ContentLinkMethod = styled.div``;

export const ContentTitleLinkMethod = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;

export const ContainerItemLinkMethod = styled.div`
  display: flex;
  gap: 16px;
`;
export const ItemLinkMethod = styled.button<{ active?: boolean }>`
  width: 252px;
  height: 64px;
  border: 1px solid
    ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.eighth};
  border-radius: 8px;
  background: none;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 8px;
  p {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${(props) =>
      props.active
        ? props.theme.fonts.weights.bold
        : props.theme.fonts.weights.regular};
    color: ${(props) =>
      props.active ? props.theme.colors.primary : "initial"};
  }

  path {
    stroke: ${(props) =>
      props.active ? props.theme.colors.primary : "#212529"};
  }
`;

export const ContainerButtons = styled.div`
  margin-top: 24px;
`;
