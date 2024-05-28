import styled from "styled-components";

export const ContainerDeleteLinks = styled.div`
  width: 701px;
`;

export const ContentDeleteLinks = styled.div`
  width: 100%;
`;
export const AlertDeleteLinks = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

export const InputToDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    margin: 0;
    span {
      color: #fa5252;
    }
  }
  input {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    height: 64px;
    padding: 0 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
`;
