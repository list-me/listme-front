import styled from "styled-components";

export const Container = styled.div`
  width: 170px;
  height: 55px;

  display: flex;
  align-items: center;
  
  margin-right: 47px;
  margin-top: 2rem;
  
  svg {
    margin-top: 4px;
  }
  
  :hover {
    cursor: pointer;
  }
`;

export const Icon = styled.div`
  padding: 0;
  margin: 0 10px 0 0;
  
  img {
    object-fit: cover;
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }
`;

export const Label = styled.span`
  margin-right: 10px;
  
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
`;
