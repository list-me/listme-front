import styled from "styled-components";

export const SidebarPublicListList = styled.div`
  width: 272px;
  height: 100%;
  padding: 45px 40px;
  border-right: 2px solid #e8ebed;
`;
export const HeaderSidebarPublicListList = styled.h5`
  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 32px;
`;
export const ItemSidebarPublicListList = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  cursor: pointer;
  :hover {
    svg {
      animation: pulse 0.75s;
    }
  }

  @keyframes pulse {
    25% {
      transform: rotate(15deg);
    }

    75% {
      transform: rotate(-15deg);
    }
  }
`;
export const ItemSidebarNamePublicListList = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  color: #495057;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
