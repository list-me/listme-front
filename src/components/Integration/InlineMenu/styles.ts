import styled from "styled-components";

export const ContainerInlineMenu = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.grayscale.tenth};
  padding: 16px;
  display: flex;
  gap: 16px;
`;
export const ItemInlineMenu = styled.button<{ isActivated?: boolean }>`
  border-radius: 8px;
  padding: 16px;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;

  background: ${(props) =>
    props.isActivated ? props.theme.colors.secondary : "none"};
  box-shadow: ${(props) =>
    props.isActivated ? "0px 5px 10px 0px rgba(0, 0, 0, 0.03)" : "none"};
  color: ${(props) =>
    props.isActivated
      ? props.theme.colors.primary
      : props.theme.colors.tertiary};
  font-weight: ${(props) =>
    props.isActivated
      ? props.theme.fonts.weights.bold
      : props.theme.fonts.weights.regular};

  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  transition: 0.3s all ease-in-out;
`;
