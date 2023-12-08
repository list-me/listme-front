import styled from "styled-components";

export const SearchPublicListList = styled.input`
  width: 100%;
  margin: 0;
  height: 53px;
  background: ${({ theme }) => theme.colors.background.default};
  border-radius: 8px;
  padding: 16px;
  border: none;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  color: ${({ theme }) => theme.colors.fourth};
  ::placeholder {
    color: ${({ theme }) => theme.colors.tertiary};
  }
`;
export const ContainerSearchPublicListList = styled.div`
  margin: 24px 0px;
  position: relative;
  svg {
    position: absolute;
    right: 18.5px;
    top: 18px;
  }
`;
