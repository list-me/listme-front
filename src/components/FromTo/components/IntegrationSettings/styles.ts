import styled from "styled-components";

export const ContainerIntegrationSettings = styled.div``;

export const AlertSwitch = styled.p`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  background: #fff9db;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #fcc419;
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
    border-bottom: 8px solid #fcc419;
    position: absolute;
    right: 4px;
    top: -8px;
  }
`;

export const MultiSelectIntegrationSettings = styled.div``;
export const LabelMultiSelectIntegrationSettings = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PseudoInputIntegrationSettings = styled.div`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  border: 1px solid #d1d6dc;
  position: relative;
  .custom-checkbox .ant-checkbox-inner {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-color: #bebafa;
    border-width: 2px;
  }
  .custom-checkbox:hover .ant-checkbox-inner {
    background: #bebafa;
    border-color: #bebafa;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background: #3818d9 !important;
    border-color: #3818d9;
  }
`;
export const ListContainerIntegrationSettings = styled.div`
  width: 101%;
  left: -1px;
  max-height: 216px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 8px;
  position: absolute;
  top: calc(100% + 4px);
  z-index: 1;
  display: flex;
  flex-direction: column;
  button {
    padding: 0px 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    text-align: start;
    height: 40px;
    align-items: center;
    label {
      height: 40px;
      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.normal};
      font-weight: ${({ theme }) => theme.fonts.weights.regular};
      display: flex;
      align-items: center;
      width: 100%;
    }
    border-radius: 8px;
    border: none;
  }
`;
export const FixedItemIntegrationSettings = styled.button`
  background: ${({ theme }) => theme.colors.background.tertiary};
  label {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const ItemIntegrationSettings = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  label {
    display: flex;
    align-items: center;
    span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;
export const ButtonOpenOptions = styled.button<{ opened?: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  text-align: start;
  padding: 20px;
  font-family: ${(props) => props.theme.fonts.family.default};
  font-size: ${(props) => props.theme.fonts.sizes.normal};
  font-weight: ${(props) => props.theme.fonts.weights.regular};
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    stroke: #000;
    transform: ${(props) => (props.opened ? "rotate(180deg)" : "")};
    transition: all 0.3s ease-in-out;
  }
`;
