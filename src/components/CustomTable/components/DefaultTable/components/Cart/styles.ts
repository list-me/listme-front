import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const ContainerCart = styled.div`
  position: fixed;
  z-index: 8;
  bottom: 0;
  width: 800px;
  height: 60px;
  border-radius: 6px 6px 0px 0px;
  background: #fff;
  box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.16);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 0 12px 0 24px;
  display: flex;
  justify-content: space-between;
`;
export const ContainerCartText = styled.div`
  display: flex;
  align-items: center;
  gap: 27px;
`;
export const CartCount = styled.p`
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 16px;
  margin: 0;
  font-weight: 500;
`;
export const CartValue = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.tertiary};
  font-size: 16px;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
  ::before {
    content: "";
    width: 3px;
    height: 3px;
    background: #868e96;
    position: absolute;
    border-radius: 50%;
    left: -12px;
  }
`;

export const CartButton = styled.button`
  border-radius: 6px;
  display: flex;
  width: auto;
  height: 36px;
  align-items: center;
  padding: 0 16px;
  border: none;
  background: var(--primary-main, #3818d9);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 11px;
  font-weight: 700;
  :disabled {
    background: var(--gray-gray-1, #f1f3f5);
    color: var(--gray-gray-4, #ced4da);
  }
`;
