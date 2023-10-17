import styled from "styled-components";

export const ContainerFinishedStep = styled.div``;
export const ContentFinishedStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 213px;
  margin: 40px 0 24px 0;
`;
export const TitleFinishedStep = styled.h4`
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin: 0;
  margin-top: 32px;
  line-height: 150%;
`;
export const TextFinishedStep = styled.p`
  color: #868e96;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  line-height: 150%;
  span {
    margin: 0;
    color: ${({ theme }) => theme.colors.fourth};
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.small};
    font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  }
`;
