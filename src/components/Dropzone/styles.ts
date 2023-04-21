import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  width: 100%;
  height: 100%;

  padding: 8px;

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
    margin-right: 8px;

    white-space: nowrap;
    text-overflow: ellipsis;
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
