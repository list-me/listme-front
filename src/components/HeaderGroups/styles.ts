import styled from "styled-components";

export const ContainerHeaderGroups = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  padding-right: 0px;
  width: 100%;
  justify-content: space-between;
`;

export const ContainerGroups = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-right: 12px;
  ::-webkit-scrollbar {
    height: 2px; /* largura da barra de rolagem */
  }

  ::-webkit-scrollbar-track {
    background-color: unset;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc; /* cor do botão da barra de rolagem */
    border-radius: 4px; /* raio da borda do botão da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9; /* cor do botão da barra de rolagem quando hover */
  }
`;
export const ItemGroup = styled.button<{
  active?: boolean;
  notActive?: boolean;
}>`
  height: 36px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 88px;
  padding: 0 12px;
  display: flex;
  gap: 32px;
  flex-shrink: 0;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  opacity: ${(props) => (props.notActive ? 0.56 : 1)};
`;
export const ItemGroupLeftContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  > p {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
    margin: 0;
  }
`;

export const ItemGroupRightContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const ButtonNewGroup = styled.button`
  padding: 0 20px 0 24px;
  border: none;
  background: none;
  border-left: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  flex-shrink: 0;
  display: flex;
  gap: 12.5px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;
export const ButtonOthersColumns = styled.button`
  padding: 0 24px;
  border: none;
  background: none;
  border-left: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  margin-left: 12px;
  flex-shrink: 0;
  display: flex;
  gap: 11.67px;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const IconButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  border: none;
`;
