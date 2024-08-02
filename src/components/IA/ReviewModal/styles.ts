import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 800px;
  height: 60px;
  background: ${({ theme }) => theme.colors.secondary};
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px 6px 0 0;
  box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.16);
  display: flex;
  padding-right: 12px;
  padding-left: 16px;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    gap: 12px;
    input {
      height: 36px;
      width: 204px;
      padding: 0 12px;
      color: ${({ theme }) => theme.colors.primary};
    }

    flex-shrink: 0;
  }
`;
export const Text = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  color: ${({ theme }) => theme.colors.grayscale.primary};
`;
export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 159px;
    height: 36px;
  }
`;
