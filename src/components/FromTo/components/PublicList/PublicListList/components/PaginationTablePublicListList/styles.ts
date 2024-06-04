import styled from "styled-components";

export const PaginationTablePublicListList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
export const ButtonPaginationPublicListList = styled.button<{
  isActive?: boolean;
  isDisabled?: boolean;
}>`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${(props) =>
    props.isActive ? props.theme.colors.primary : "none"};
  color: ${(props) =>
    props.isActive
      ? props.theme.colors.secondary
      : props.theme.colors.grayscale.twelfth};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  border: none;
  opacity: ${(props) => (props.isDisabled ? "0.3" : "initial")};
  pointer-events: ${(props) =>
    props.isDisabled || props.isActive ? "none" : "initial"};
`;
