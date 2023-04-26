import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  width: 100%;
  height: 100%;

  /* padding: 8px; */

  svg {
    min-width: 20px;
    margin-right: 16px;

    &:hover {
      cursor: pointer;
    }
  }

  span {
    width: auto;
    overflow: hidden;

    align-self: center;
    margin: 0 8px;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Label = styled.span`
  width: auto;
  height: 80%;
  border: 2px dashed #868e96;
  padding: 0 16px;

  display: flex;
  align-items: center;
`;

export const Zone = styled.label`
  width: 100%;
  height: 100%;
  border: 2px dashed #3818d9;

  display: flex;
  align-items: center;

  padding: 0 8px;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 10px;
    height: 10px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3818d9;
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }
`;

export const SuspenseMenu = styled.div<{ width: string; top: string }>`
  width: ${({ width }) => `${width}px`} !important;
  min-height: 50px;
  height: auto !important;
  max-height: 200px !important;

  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.07) !important;
  border-radius: 8px;
  padding: 8px 11px 0 8px;

  background: #dae0ed;

  position: absolute;
  z-index: 999;

  display: block;
  flex-direction: row;
  align-items: left;
  /* justify-content: start; */

  top: ${({ top }) => `${top}px`} !important;
  flex-wrap: wrap;
  /* margin-top: 200px !important; */

  padding-top: 8px;
  overflow-y: scroll;

  div :not(:first-child) {
    margin-left: 8px;
  }

  ::-webkit-scrollbar {
    background: transparent !important;
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background-color: unset !important;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cccccc !important;
    border-radius: 2px !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9 !important;
  }
`;

export const Image = styled.div`
  flex: 0 0 25%;
  justify-content: start;

  margin-bottom: 8px;

  svg {
    width: 20px;
    height: 20px;

    position: absolute;
    z-index: 9999;
    margin-bottom: 40px;
    margin-left: 35px;

    display: flex;
    justify-content: flex-end;

    &:hover {
      cursor: pointer;
    }
  }

  .fileIcon {
    width: 40px;
    height: 40px;

    margin: 0;

    top: 8px;
    z-index: 998;
  }

  img {
    width: 40px;
    height: 40px;

    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
`;
