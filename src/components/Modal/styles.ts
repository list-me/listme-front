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
  width: 13vw;

  padding: 20px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #A8A8A8;
    border-radius: 20px;
    
    padding: 1rem;
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    width: 6vw;
    min-width: 200px;
    height: auto;
    margin-left: 10px;
  }
`;

export const Contents = styled.div`
  max-height: 70vw;

  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;

  div {
    flex: 1 240px;
    padding-right: 1rem;

    @media screen
    and (min-device-width: 1200px)
    and (max-device-width: 1600px)
    and (-webkit-min-device-pixel-ratio: 1) {
      flex: 1 190px;
    }
  }
`;

export const Content =  styled.div`
  height: 100%;
  width: 70%;

  margin: 0 2rem 0 2rem;
  padding: 1.5rem;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #A8A8A8;
    border-radius: 20px;
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    width: 100%;
    min-width: 400px;
  }
`;

export const NewTemplateContent = styled.div<IItemsProps>`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: ${(props) => props.isItem ? "2rem 1rem 0 0" : "0"};
  border: ${({theme, isItem}) =>
    isItem ?
        "2px solid #eeeeee" :
        `2px dashed ${theme.colors.primary}`
};

  border-radius: 16px;

  :hover {
    cursor: pointer;
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    height: 80px;
    width: ${({isItem}) => isItem === true ? "50px" : "100%"};
    min-width: ${({isItem}) => isItem === true ? "50px" : "350px"};
  }
`;

export const NewTemplate = styled.div<IItemsProps>`
  background: red;
`;

export const IconTemplate = styled.span<{ isNew?: boolean }>`
  width: 45px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({isNew}) =>
      isNew === true
      ? '50%'
      : '10%'
  };

  background: ${({theme, isNew}) =>
      isNew === true
      ? theme.colors.background.tertiary
      : 'none'
  };
`;

export const TemplateLabel = styled.span`
  height: 60px;
  
  display: flex;
  justify-content: center;
  flex-direction: column;
  
  margin-left: 1rem;
  
  label {
    font-family: ${({ theme }) => theme.fonts.family.default };
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 400;
  }
  
  span {
    font-family: ${({ theme }) => theme.fonts.family.default };
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 800;
    color: ${({theme}) => theme.colors.primary};
    
    display: flex;
    align-items: center;
    
    svg:first-child {
      margin-left: 8px;
    }
  }

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 500px;
  }
`;

export const MyTemplates = styled.div`
  display: flex;
  align-items: center;
  
  padding: 2rem;

  :hover {
    cursor: pointer;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.normal};;
  font-weight: 400;
`;

export const Information = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: ${({ theme }) => theme.colors.tertiary};
  font-weight: 400;
`;

export const SectionTitle = styled.h3<{ isHeader?: boolean, weight?: number }>`
  margin-bottom: ${({ isHeader }) => isHeader === true ? '3rem' : '0'};
  margin-top: ${({ isHeader }) => isHeader === true ? '0' : '32px'};

  font-family: ${({ theme }) => theme.fonts.family.default };
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  font-weight: ${({ weight }) => weight ?? 400};
  text-align: left;

  @media screen
  and (min-device-width: 1200px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: ${({ isHeader }) => isHeader === true ? '0' : '16px'};
  }
`;
