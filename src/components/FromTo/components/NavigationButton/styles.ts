import styled from "styled-components";

export const NavigationButton = styled.button<{ abort?: boolean }>`
  background: ${(props) =>
    props.abort
      ? props.theme.colors.hover.background
      : props.theme.colors.primary};
  color: ${(props) =>
    props.abort ? " #a899f1" : props.theme.colors.secondary};
  width: 100%;
  height: 52px;
  border-radius: 8px;
  border: none;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  :hover {
    filter: ${(props) =>
      props.abort ? "brightness(0.98)" : "brightness(0.88)"};
  }
  :disabled {
    opacity: 0.7;
    filter: initial;
  }
`;

export const BoxButtons = styled.div`
  display: flex;
  gap: 24px;
`;
