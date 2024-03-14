import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerSwitchBox = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  display: inline-flex;
  padding: 12px 16px;
  gap: 12px;
  border-radius: 4px;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.grayscale.primary};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;
