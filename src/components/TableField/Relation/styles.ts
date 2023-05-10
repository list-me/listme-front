import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* padding: 8px; */

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
    width: 18px;

    display: flex;
    justify-content: center;

    margin-right: -8px;
    padding: 0 8px 0 6px;

    svg {
      cursor: pointer;
    }
  }

  /* .contentProducts {
    background-color: green;

    width: 100% !important;
    height: 500px !important;
  } */
`;

export const Tag = styled.div<{ maxWidth?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content !important;
  max-width: ${(props) =>
    props.maxWidth ? `${props.maxWidth}px` : "none"}!important;
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

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    font-size: 20px;
    margin-bottom: 0px;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: fit-content;

  .contentProducts {
    background-color: rebeccapurple;

    display: flex;
    flex-wrap: wrap;
    /* gap: 1rem; */
    padding: 16px 16px 8px 16px;

    width: 100%;
    height: fit-content;
    max-height: 200px;

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
    /* background-color: yellowgreen; */
  }

  .contentTable {
    display: flex;

    /* overflow-y: auto; */

    display: block;
    justify-content: center;
    align-items: center;

    margin-top: 2rem;

    .ant-table-thead .ant-table-cell {
      background-color: #f8f9fa;
      font-family: "Satoshi Regular", sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;

      :before {
        display: none !important;
      }

      /* height: 56px; */
      /* padding: 16px; */
    }

    .ant-table {
      border: 1px solid #e9ecef;
      border-radius: 8px;
    }

    .ant-table-cell {
      font-family: "Satoshi Regular", sans-serif;
      font-size: 16px;
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
  }
`;
