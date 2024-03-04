import styled from "styled-components";

export const ContainerIntegrationSettings = styled.div``;

export const AlertSwitch = styled.p<{ active?: boolean }>`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  background: ${(props) =>
    props.active ? props.theme.colors.hover.background : "#fff9db"};
  border-radius: 8px;
  padding: 16px;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.colors.background.tertiary : "#fcc419"};
  margin-top: 8px;
  position: relative;
  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  margin-bottom: 24px;
  ::before {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid
      ${(props) =>
        props.active ? props.theme.colors.background.tertiary : "#fcc419"};
    position: absolute;
    right: 4px;
    top: -8px;
  }
`;
