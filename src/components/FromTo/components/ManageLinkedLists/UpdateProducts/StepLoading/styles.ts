import styled from "styled-components";

export const ContainerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #00000052;
  display: flex;
  justify-content: center;
  align-items: center;
  > div > div {
    width: 600px !important;
    height: 477px !important;
    min-height: auto !important;
    padding: 40px !important;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    > div {
      margin: 0;
      padding: 0;
    }
  }
`;

export const ContainerLoading = styled.div`
  width: 701px;
`;

export const ContentLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
