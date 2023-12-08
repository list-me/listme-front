import styled from "styled-components";

export const Content = styled.div`
  width: fit-content;
  height: fit-content;
  /* height: 120px; */

  padding-top: 12px;
  align-items: center;

  overflow: none;

  svg {
    width: 20px;
    height: 20px;

    position: relative;
    left: 140px;
    bottom: 165px;

    display: flex;
    justify-content: flex-end;
    background-color: white;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};

  svg {
    width: 25px;
    height: 25px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  padding-top: 8px;

  max-height: 700px;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
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

  div:not(:last-child) {
    margin-right: 8px !important;
    margin-bottom: 8px !important;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 500px;
  }
`;

export const NewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 150px;
  height: 150px;

  border-radius: 8px;
  border: 2px dotted #cccccc;

  margin-top: 12px;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    cursor: pointer;
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
  z-index: 2;

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
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }
`;

export const Image = styled.div`
  width: 150px;

  border: 2px solid #cccccc;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8px;

  img {
    width: 100px;
    height: 100px;

    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  label {
    font-family: ${({ theme }) => theme.fonts.family.normal};
    font-size: ${({ theme }) => theme.fonts.sizes.xxxsmall};

    max-width: 100px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;

    margin: 0 6px !important;
  }
`;
