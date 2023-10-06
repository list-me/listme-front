import styled from "styled-components";

export const ContainerImportConfiguration = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AlertText = styled.p`
  margin-top: 12px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
export const BoxSelects = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  z-index: 1000;
`;

export const BoxHotTable = styled.div`
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
  }
  .htCore {
    width: 100%;
  }
  .htCore td,
  .htCore th {
    border-left: none !important;
    border-top: none !important;
    padding-left: 1rem;
  }
  .htCore thead th {
    text-align: start;

    color: ${({ theme }) => theme.colors.fourth};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  .htCore tbody td,
  .htCore thead th {
    vertical-align: middle;
  }
  thead,
  tr,
  th {
    height: 56px;
    line-height: 56px;
  }
  tbody td {
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.regular};
  }

  .htCore td {
    white-space: nowrap; /* Evitar que o texto passe para a próxima linha */
    overflow: hidden; /* Esconder o excesso de texto */
    text-overflow: ellipsis; /* Adicionar reticências ao texto oculto */
  }
`;
