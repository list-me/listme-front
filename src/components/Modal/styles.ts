import styled from "styled-components";

interface IItemsProps {
    isItem?: boolean;
}

export const Container = styled.div`
  width: 70vw;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 800px;
  }
`;

export const SideBar = styled.div`
  position: relative;
  
  width: 23%;
  height: 700px;
  
  padding: 2rem;
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  color: ${({ theme }) => theme.colors.tertiary};
`;

export const Templates =  styled.div`
  height: 700px;
  width: 70%;
  
  margin-left: 2rem;
`;

export const NewTemplate = styled.div<IItemsProps>`
  width: 100%;
  height: 130px;
  
  border: 2px dashed ${({theme}) => theme.colors.primary};
  border-radius: 16px;
`;

export const TemplateIcon = styled.span`
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 50%;
  margin-right: 1rem;
  background: ${({theme}) => theme.colors.background.tertiary};
`;

export const TemplateLabel = styled.span`
  height: 60px;
  
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  
  label {
    font-family: ${({ theme }) => theme.fonts.family.default };
    font-size: ${({ theme }) => theme.fonts.sizes.xmedium};;
    font-weight: 400;
  }
  
  span {
    font-family: ${({ theme }) => theme.fonts.family.default };
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 800;
    color: ${({theme}) => theme.colors.primary};
    
    display: flex;
    align-items: center;
    
    svg {
      margin-left: 8px;
    }
  }
`;

export const NewTemplateContent = styled.div<IItemsProps>`
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  margin: ${(props) => props.isItem ? "2rem 1rem 0 0" : "0"};
  padding: ${(props) => props.isItem ? "2rem" : "0"};
  border-radius: 16px;
  border: ${(props) => props.isItem ? "2px solid #eeeeee" : "none"};

  span:first-child {
    margin-right: ${(props) => props.isItem ? "5rem" : "2rem"};
  }
  
  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    height: 100%;
    max-width: ${(props) => props.isItem ? "300px" : "100%"};
    
    background: springgreen;
  }
`;

export const Contents = styled.div`
  max-height: 70vw;
  
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  
  div {
    flex: 1 350px;
  }
`;

export const HeaderModal = styled.span`
  h1 {
    padding: 2rem 2rem 2rem 0;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    font-weight: 400;
    
    text-align: left;
  }
`;
