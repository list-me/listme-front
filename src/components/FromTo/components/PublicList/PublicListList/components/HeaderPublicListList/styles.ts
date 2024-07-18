import styled from "styled-components";

export const HeaderPublicListList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const CotainerSelectPublicListList = styled.div`
  width: 180px;
`;

export const TitlePublicListList = styled.h3`
  color: ${({ theme }) => theme.colors.fourth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: 30px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
