import styled from "styled-components";

export const Content = styled.div`
  /* @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 100vh;
  } */
  overflow: hidden;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  height: 64px;

  &:hover {
    cursor: pointer;
  }
`;

export const IconTemplate = styled.span`
  width: 64px;
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  padding: 16px;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  height: 64px;

  button {
    font-family: ${({ theme }) => theme.fonts.family.bold};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    text-align: center;

    margin: 0;
  }

  .secondButton {
    margin-left: 9px;

    svg {
      margin: 0 0 0 10px;
    }
  }
`;

export const Header = styled.header`
  height: 128px;
  background: ${({ theme }) => theme.colors.grayscale.tenth};

  display: flex;
  justify-content: space-between;

  padding: 32px 16px;
`;

export const MoreOptions = styled.div`
  width: 56px;
  height: 52px;

  display: flex;
  align-items: center;
  padding: 0;
  justify-content: center;

  border-radius: 8px;
  background: ${({ theme }) => theme.colors.grayscale.eighth};

  margin-right: 9px;
`;

export const HeaderContent = styled.div`
  display: flex;
  border: none;
`;

export const Container = styled.div`
  /* @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: 50% !important;
  } */

  overflow: hidden;

  .handsontable .wtHolder::-webkit-scrollbar {
    background: transparent !important;
  }

  .handsontable .wtHolder::-webkit-scrollbar-track {
    background-color: unset !important;
  }

  .handsontable .wtHolder::-webkit-scrollbar-thumb {
    background-color: #cccccc !important;
    border-radius: 8px !important;
  }

  .handsontable .wtHolder::-webkit-scrollbar-thumb:hover {
    background-color: #3818d9 !important;
  }

  .menuContext {
    background: red !important;
    border-radius: 20px;
  }

  .handsontable .htColumnHeaders .ht_clone_top {
    margin-right: 0 !important;
  }

  .wtHolder {
    margin-right: 20px;
  }

  .ht__manualColumnMove {
    z-index: 2;

    .ht__manualColumnMove--backlight {
      /* display: none !important; */
    }
  }

  .ht_master .htCore tbody tr td[data-readonly="true"] {
    background-color: #f2f2f2;
    color: #999;
  }

  /* Estilos para células ativas (hover) */
  .ht_master .htCore tbody tr td:not([data-readonly="true"]) {
    transition: background-color 0.6s ease;
    align-items: center;
  }

  .ht_master .htCore tbody tr:hover td:not([data-readonly="true"]) {
    background-color: rgba(135, 206, 250, 0.3);
  }

  .invalid-cell:after {
    content: "Campo obrigatório!";
    color: red;
    font-size: 12px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 50%;
  }
  thead {
    * {
      border-top: none;
    }
  }

  .handsontable table.htCore thead tr:first-child th {
    height: 24px !important;
    padding: 0;
    margin: 0;
    * {
      height: 24px !important;
      padding: 0;
    }
  }

  .style-th-group {
    border: none !important;
  }

  thead {
    th {
      .customHeader {
        background: #f1f3f5;
        z-index: 9999;
      }

      .componentCustom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 20px;

        border-top: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        border-left: 1px solid #dee2e6;

        background-color: ${({ theme }) => theme.colors.grayscale.ninth};

        font-family: ${({ theme }) => theme.fonts.family.default};
        font-size: ${({ theme }) => theme.fonts.sizes.small};
        color: ${({ theme }) => theme.colors.tertiary};
        font-weight: 400;
        line-height: 150%;

        .infos {
          margin-left: 16px;
          img {
            margin-right: 8px;
          }
        }

        .options {
          margin-right: 16px;
          display: flex;

          img:first-child {
            margin-right: 8px;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  thead tr th {
    background-color: ${({ theme }) => theme.colors.grayscale.ninth};
  }

  thead tr:first-child th {
    background-color: white;
    border: none;
  }

  .style-th-group {
    border: none;
    height: 22px;
  }

  tbody tr th {
    background-color: ${({ theme }) => theme.colors.grayscale.ninth};
    font-family: ${({ theme }) => theme.fonts.family.default} !important;
    font-size: ${({ theme }) => theme.fonts.sizes.small} !important;
    color: #495057 !important;
    font-weight: 400;
    line-height: 150%;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;
  }

  tbody {
    margin: 0 !important;
    /* overflow: scroll; */

    td {
      width: fit-content;
      max-width: 500px;
      max-height: 51px !important;

      white-space: nowrap !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;

      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.small};
      color: #495057;
      font-weight: 400;
      line-height: 150%;

      padding-top: 16px;
      align-content: center;
      .boolean-switch-cell {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .tag-content {
        background-color: #dee2e6 !important;

        width: 140px !important;
        height: 27px !important;

        display: flex;
        align-items: center;

        padding-left: 8px;
        border-radius: 7px;

        margin: 16px 0 0 8px;

        &:hover {
          cursor: pointer;
        }
      }

      .imgItem {
        &:hover {
          cursor: pointer;
        }
      }
    }

    .itens-amount {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 25px !important;
      height: 25px !important;

      border-radius: 2px;
      background-color: #e2e0ff;

      font-family: ${({ theme }) => theme.fonts.family.default};
      font-size: ${({ theme }) => theme.fonts.sizes.xsmall};
      color: #3818d9;
    }

    td:has(div) {
      padding: 0 !important;
    }

    .radio-item {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 45px;
      width: fit-content;
      height: 30px;

      border: 1px solid #dee2e6;
      border-radius: 24px;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .radio-item-warn {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 45px;
      width: fit-content;
      height: 30px;

      border: 1px solid #f1bc02;
      border-radius: 24px;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
      position: relative;
    }

    .checked-item {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 45px;
      width: fit-content;
      height: 30px;

      background: #f8f9fa;
      border-radius: 24px;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .checked-item-warn {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 45px;
      width: fit-content;
      height: 30px;

      border-radius: 24px;
      background: #fffaeb;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
      position: relative;
    }

    .hover-container-info {
      display: flex;
      position: relative;
      top: 1px;
    }
    .hover-container-info:hover {
      svg {
        stroke: transparent;
        fill: #f1bc02;
      }
      path {
        stroke: #fff;
        fill: #f1bc02;
        :first-child {
          stroke: #f1bc02;
        }
      }
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 50px;
      width: fit-content;
      height: 30px;

      border: 1px solid #dee2e6;
      border-radius: 8px;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .dropdown-item-warn {
      display: flex;
      align-items: center;
      justify-content: space-around;

      min-width: 50px;
      width: fit-content;
      height: 30px;

      border: 1px solid #f1bc02;
      border-radius: 8px;

      padding-left: 8px;
      margin: 10.5px 0 0 8px;

      svg {
        margin: 0 4px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .drag-over {
      border: 2px dashed #3818d9;
      text-justify: center;
    }

    .drag-over::after {
      content: "Solte aqui";
    }
  }
  .newGroupHeader {
    cursor: pointer;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    height: 20px;
    border-radius: 5px 5px 0px 0px;
    transition: all 0.1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    background: transparent;
    :hover {
      color: #3818d9;
      background: #e2e0ff;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;

  padding: 16px;
  background: white;
  border: 1px solid #e9ecef;
  border-bottom: none;
`;

export const Line = styled.div`
  display: flex;
  height: 21px;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  text-align: center;

  label {
    margin-left: 8px;
  }
`;

export const Item = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  text-align: center;

  svg:first-child {
    margin-right: 8px;
  }

  svg:last-child {
    margin-left: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Contents = styled.div`
  display: flex;

  span:not(:last-child) {
    margin-right: 24px;
  }
`;
