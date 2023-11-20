import styled from "styled-components";

export const ContainerPublicListList = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 10;
  top: 0;
  justify-content: center;
  align-items: center;
`;
export const BoxPublicListList = styled.div`
  width: 1170px;
  height: 773px;
  padding: 0px, 40px, 0px, 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
`;
export const SidebarPublicListList = styled.div`
  width: 272px;
  height: 100%;
  background: blue;
  padding: 45px 40px;
`;
