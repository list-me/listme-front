import styled from "styled-components";

export const AddColumn = styled.div`
  background-color: #f1f3f5;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  box-sizing: border-box !important;
  border-bottom: 1px solid #cccccc;

  &:hover {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  height: calc(100vh - 197px) !important;
  /* Arquivo CSS */
  .hot-table .corner {
    cursor: not-allowed;
    pointer-events: none;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 72vh !important;
  }
`;
