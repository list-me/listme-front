import styled from "styled-components";

export const ContainerModalColumnManagement = styled.div`
  border-radius: 6px 6px 0px 0px;
  background: #fff;
  box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.16);
  position: fixed;
  bottom: 0%;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 811px;
  flex-direction: column;
`;

export const TopContainerModalColumnManagement = styled.div`
  display: flex;
`;
export const TopLeftContainerModalColumnManagement = styled.div`
  padding: 24px;
  border-right: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  input {
    border: 1px solid ${({ theme }) => theme.colors.grayscale.eighth};
    width: 400px;
  }
`;
export const TitleContent = styled.h1`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
export const TopRightContainerModalColumnManagement = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
`;

export const ContainerColors = styled.div`
  display: flex;
  gap: 8px;
`;

export const ItemColor = styled.div<{ background: string; active: boolean }>`
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: ${(props) => props.background};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 0 0 3px
    ${(props) => (props.active ? props.theme.colors.primary : "none")};
`;

export const BottomContainerModalColumnManagement = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Selecteds = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;
export const ContainerButtons = styled.div`
  color: #495057;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  width: 300px;
  gap: 20px;
  button {
    height: 36px;
    font-size: 11px;
  }
`;

export const DeleteGroupButton = styled.div`
  background: #fa525214;
  color: #fa5252;
`;
