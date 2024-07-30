import styled from "styled-components";

export const WrapperCollectInfomation = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #00000052;
  z-index: 2;
  padding: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const ButtonClose = styled.button`
  border: none;
  background: none;
`;

export const ContentTop = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.hover.background};
  padding: 20px;
  border-radius: 8px;
  input {
    height: 36px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  margin-top: 24px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const ContainerItems = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
`;
export const ItemButton = styled.button<{ isActive: boolean }>`
  height: 36px;
  padding: 0 12px;
  border-radius: 88px;
  background: none;
  border: 2px solid
    ${(props) =>
      props.isActive
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.seventh};
`;
export const Text = styled.h3`
  margin: 16px 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: #495057;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;

export const TextSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.ant-switch-checked {
    background-color: #3818d9 !important;
  }
`;

export const InputButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  label {
    width: 100%;
  }
  align-items: center;
  button {
    flex-shrink: 0;
    height: 36px;
    width: 134px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 80px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  margin-bottom: 32px;
  resize: none;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 112px;
    height: 44px;
  }
`;
