import styled from "styled-components";

export const NavigationButton = styled.button<{
  abort?: boolean;
  prev?: boolean;
}>`
  background: ${(props) =>
    props.abort
      ? props.theme.colors.hover.background
      : props.theme.colors.primary};
  color: ${(props) => {
    const { abort, prev, theme } = props;

    if (abort) {
      return prev ? theme.colors.primary : "#a899f1";
    }
    return theme.colors.secondary;
  }};
  width: 100%;
  height: 52px;
  border-radius: 8px;
  border: none;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  :hover {
    filter: ${(props) =>
      props.abort ? "brightness(0.98)" : "brightness(0.88)"};
  }
  :disabled {
    opacity: 0.7;
    filter: initial;
    color: #ced4da;
    background: #f1f3f5;
  }

  svg {
    stroke: currentColor !important;
    path {
      stroke: currentColor !important;
    }
  }
`;

export const BoxButtons = styled.div`
  display: flex;
  gap: 24px;
`;
