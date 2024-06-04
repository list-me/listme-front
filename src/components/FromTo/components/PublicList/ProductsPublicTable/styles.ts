import styled from "styled-components";

export const ContainerProductsPublicTable = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const BoxHotTablePublic = styled.div`
  overflow: auto;
  .handsontable .wtHolder {
    ::-webkit-scrollbar {
      width: 15px !important;
      height: 15px !important;
    }
    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.grayscale.ninth} !important;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #cccccc !important;
      border-radius: 8px !important;
      border: 2px solid transparent;
    }
    width: 100% !important;
  }
  .htCore {
    width: 100%;
  }
  .htCore td,
  .htCore th {
    border-left: none !important;
    border-top: none !important;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .htCore thead th {
    text-align: start;
    color: ${({ theme }) => theme.colors.fourth};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  /* .htCore tbody td,
  .htCore thead th {
    vertical-align: middle;
  } */
  /* thead,
  tr,
  th {
    height: 56px;
    line-height: 56px;
  } */
  /* tbody td {
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
  } */
  /* .htCore td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */
`;
