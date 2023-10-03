import styled from "styled-components";

export const TitleEditable = styled.h3`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  line-height: 150%;
  margin: 0;
`;
export const InputEditable = styled.input`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  line-height: 150%;
  margin: 0;
  background: none;
  border: none;
  width: 100%;
`;
export const SpanEditable = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  max-width: 50%;
  line-height: 150%;
  margin: 0;
`;
