import styled from "styled-components";

export const ContainerSidebarError = styled.div`
  display: flex;
  flex-direction: column;
  width: 684px;
  height: 100vh;
  padding: 32px;
  border-radius: 8px 0px 0px 8px;
  background: #fff;
  position: fixed;
  z-index: 10;
  right: 0;
`;
export const HeaderSidebarError = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 24px;
`;
export const TitleHeaderSidebarError = styled.h4`
  color: #000;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;
export const CloseButtonSidebarError = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  height: 36px;
`;
export const ContainerListCardsSidebarError = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 8px;
    cursor: default;
  }

  ::-webkit-scrollbar-track {
    background-color: unset;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9;
  }
`;
