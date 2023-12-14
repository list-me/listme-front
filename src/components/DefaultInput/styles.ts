import styled from "styled-components";

export const LabelDefaultInput = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const LabelTextDefaultInput = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  span {
    color: #f15757;
  }
`;
export const InputDefaultInput = styled.input`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.seventh};
  background: ${({ theme }) => theme.colors.secondary};
  padding: 0 20px;

  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;
