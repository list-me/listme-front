import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.medium};
  color: ${({ theme }) => theme.colors.fourth};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const ButtonClose = styled.button`
  border: none;
  background: none;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  margin-top: 24px;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

export const Text = styled.h3`
  margin: 16px 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: #495057;
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
`;

export const ContainerButton = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  button {
    width: 248px;
    height: 52px;
  }
`;

export const ContainerRadios = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin: 16px 0;
`;

export const RadioItem = styled.div<{ active?: boolean }>`
  width: 252px;
  height: 52px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border: 1px solid
    ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.eighth};
  border-radius: 8px;
  gap: 8px;
  color: ${(props) =>
    props.active
      ? props.theme.colors.primary
      : props.theme.colors.grayscale.primary};
  font-weight: ${(props) =>
    props.active
      ? props.theme.fonts.weights.bold
      : props.theme.fonts.weights.regular};
  cursor: pointer;
`;

export const Radio = styled.div<{ active?: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid
    ${(props) =>
      props.active
        ? props.theme.colors.primary
        : props.theme.colors.grayscale.eighth};
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ::after {
    content: "";
    width: 8px;
    height: 8px;
    background: ${(props) =>
      props.active ? props.theme.colors.primary : "none"};
    position: absolute;
    border-radius: 50%;
  }
`;
