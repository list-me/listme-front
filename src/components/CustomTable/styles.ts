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
  /* overflow: hidden; */
  overflow: visible;
  display: flex;
  height: 79vh !important;
  > div {
    width: 100%;
    height: 79vh;
    overflow: scroll;

    .handsontable .wtHolder {
      overflow: hidden !important;
    }
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 72vh !important;
  }
`;
