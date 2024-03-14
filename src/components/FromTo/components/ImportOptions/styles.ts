import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerImportOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const SwitchOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  p {
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    margin: 0;
  }
`;
