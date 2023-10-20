import styled from "styled-components";

export const TitleEditable = styled.h3`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  line-height: 150%;
  margin: 0;
`;
export const InputEditable = styled.input<{ error: string }>`
  font-family: ${({ theme }) => theme.fonts.family.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: 700;
  line-height: 150%;
  margin: 0;
  background: none;
  border: none;
  height: 64px;
  width: 280px;
  border-radius: 8px;
  border: ${(props) =>
    props.error ? "1px solid #fa5252" : "1px solid #3818D9"};
  background: #fff;
  padding: 8px 16px;
`;
export const SpanEditable = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  max-width: 50%;
  line-height: 150%;
  margin: 0;
`;
export const TitleEditableError = styled.p`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin: 0;
  position: absolute;
  color: #fa5252;
  top: 68.5px;
  width: 50vw;
`;
