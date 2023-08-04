import styled from "styled-components";

interface IItemsProps {
  isItem?: boolean;
}

export const Container = styled.div`
  overflow: auto;
`;

export const Bar = styled.div`
  border: 1px solid #eeeeee;
  margin-top: -20px;
  margin-bottom: 20px;
  margin-right: 16px;
`;

export const SideBar = styled.div`
  width: 232px;

  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
    border-radius: 20px;

    padding: 1rem;
  }

  .ant-menu {
    border-inline-end: none !important;
  }

  //@media screen
  //and (min-device-width: 1200px)
  //and (max-device-width: 1600px)
  //and (-webkit-min-device-pixel-ratio: 1) {
  //  width: 6vw;
  //  min-width: 200px;
  //  height: auto;
  //  margin-left: 10px;
  //}

  margin: 20px 0 0 16px;
`;

export const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 16px;
  gap: 24px;

  div {
    flex: 1 270px;
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: auto;
  }
`;

export const Content = styled.div`
  width: 564px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #a8a8a8;
    border-radius: 20px;
  }

  margin: 20px 16px;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    height: auto;
    margin: 15px 12px;
  }
`;

export const NewTemplateContent = styled.div<IItemsProps>`
  height: 96px;
  width: ${(props) => (props.isItem ? "270px" : "100%")};

  display: flex;
  align-items: center;
  justify-content: center;

  div:first-line {
    margin: ${(props) => (props.isItem ? "0 24px 24px 0" : "0")};
  }

  border: ${({ theme, isItem }) =>
    isItem ? "2px solid #eeeeee" : `2px dashed ${theme.colors.primary}`};

  border-radius: 16px;

  :hover {
    cursor: pointer;
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

  border-radius: ${({ isNew }) => (isNew === true ? "50%" : "10%")};

  background: ${({ theme, isNew }) =>
    isNew === true ? theme.colors.background.tertiary : "none"};
`;

export const TemplateLabel = styled.span`
  height: 60px;

  display: flex;
  justify-content: center;
  flex-direction: column;

  margin-left: 16px;

  label {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 400;
    line-height: 20px;
  }

  span {
    font-family: ${({ theme }) => theme.fonts.family.default};
    font-size: ${({ theme }) => theme.fonts.sizes.normal};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};

    display: flex;
    align-items: center;

    svg:first-child {
      margin-left: 8px;
    }
  }

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    max-height: 500px;
  }
`;

export const MyTemplates = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  margin-top: 6px;

  :hover {
    cursor: pointer;
  }
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: 700;
  line-height: 150%;
  text-align: center;

  width: 120px;
  height: 109px;

  span:first-child {
    margin-bottom: 8px;
  }
`;

export const Information = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  color: ${({ theme }) => theme.colors.tertiary};
  font-weight: 400;
`;

export const SectionTitle = styled.h3<{ isHeader?: boolean; weight?: number }>`
  margin-bottom: ${({ isHeader }) => (isHeader === true ? "30px" : "0")};
  margin-top: ${({ isHeader }) => (isHeader === true ? "0" : "32px")};

  font-family: ${({ theme, weight }) =>
    weight !== undefined
      ? theme.fonts.family.bold
      : theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xmedium};
  font-weight: ${({ weight }) => weight ?? 400};
  text-align: left;
  line-height: 150%;

  @media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
    margin-top: ${({ isHeader }) => (isHeader === true ? "0" : "16px")};
  }
`;
