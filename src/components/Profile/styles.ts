import styled from "styled-components";

export const Container = styled.div`
  width: 145px;
  height: 36px;

  display: flex;
  align-items: center;
  
  margin-right: 32px;
  
  svg {
    margin-top: 4px;
  }
  
  :hover {
    cursor: pointer;
  }
`;

export const Icon = styled.div`
  margin-right: 8px;
  
  img {
    object-fit: cover;
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
`;

export const Label = styled.span`
  margin-right: 8px;
  
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};

  font-weight: 400;
  line-height: 150%;
  
  text-align: center;
`;
