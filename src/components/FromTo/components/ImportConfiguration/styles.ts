import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerImportConfiguration = styled.div`
  overflow: auto;
  .htCore td,
  .htCore th {
    border-left: none !important;
    border-right: none !important;
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
