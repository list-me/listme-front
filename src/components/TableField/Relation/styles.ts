import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .tagContent {
    display: flex;
    flex-direction: row;

    width: 100% !important;
    overflow: hidden;

    div:not(:last-child) {
      margin-right: 8px;
    }
  }

  .imageContent {
    width: 50px;

    display: flex;
    justify-content: center;

    margin-right: -8px;
    padding: 0 8px 0 6px;

    svg {
      width: 20px !important;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ContainerTitleSearch = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1170px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  padding: 2rem 1rem 0 1rem;

  display: flex;
  justify-content: right;
`;

export const Tag = styled.div<{ maxWidth?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content !important;
  max-width: ${(props) =>
    props.maxWidth ? `${props.maxWidth}` : "none"}!important;
  height: 25px !important;

  border-radius: 6px;
  padding: 0px 9px 0px 6px;

  background: #dee2e6;

  label {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      cursor: pointer;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #000000;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;

  svg {
    width: 25px;
    height: 25px;

    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    font-size: 20px;
    margin-bottom: 0px;
  }
`;

export const Content = styled.div`
  max-height: 800px;
  width: 100%;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 650px;
  }

  padding-right: 1rem;

  .contentProducts {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 16px 8px 16px;

    width: 100%;
    height: fit-content;
    max-height: 90px;
    min-height: 60px;

    font-family: "Satoshi Regular", sans-serif;
    font-style: normal;
    font-weight: 200;
    font-size: 14px !important;

    border: 1px solid #dee2e6;
    border-radius: 0.5rem;

    overflow: auto;

    .tagItem {
      display: flex;
      flex-direction: row;

      width: fit-content !important;
      height: 25px !important;
      margin-bottom: 10px;

      span {
        width: 10px !important;

        svg {
          position: relative;
          bottom: 30%;
          right: 80% !important;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }

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

    @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
      max-height: 70px;
    }
  }

  .contentTable {
    display: block;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    label {
      font-family: "Satoshi Regular", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
    }

    .ant-table-thead .ant-table-cell {
      background-color: #f8f9fa;
      font-family: "Satoshi Regular", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;

      height: 56px;
      padding: 16px;
    }

    .ant-table {
      border: 1px solid #e9ecef;
      border-radius: 8px;
    }

    .ant-table-cell {
      font-family: "Satoshi Regular", sans-serif;
      font-size: 14px;
      font-weight: 400;

      overflow: hidden;

      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        cursor: pointer;
      }
    }

    .ant-checkbox {
      width: 16px !important;
      height: 16px !important;
      border-radius: 4px !important;
    }

    .ant-checkbox-inner {
      border: 2px solid #e9ecef !important;
    }

    .ant-table-body {
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
    }
  }
`;

export const HeaderTable = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;

  height: 100px;

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

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  width: 183px;
  height: 52px;

  background: #3818d9;
  border-radius: 6px;

  border: none;
  outline: none;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  text-align: center;

  color: #ffffff;

  margin-left: 24px;
  &:hover {
    cursor: pointer;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 10px;

  /* primary / second */
  width: 183px;
  height: 52px;

  /* primary / second */

  background: #f7f5ff;
  border-radius: 6px;

  font-family: "Satoshi Bold", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  border: 0;
  color: #a899f1;
`;
