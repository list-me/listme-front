import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  div {
    /* white-space: normal;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

    height: 51px; */
  }
`;

export const Label = styled.span`
  width: 100%;
  height: 80%;
  border: 2px dashed #868e96;
  padding: 0 16px;

  display: flex;
  align-items: center;
`;

export const Zone = styled.span`
  width: 100%;
  height: 100%;
  border: 2px dashed #3818d9;

  display: flex;
  align-items: center;

  padding: 0 16px;
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
