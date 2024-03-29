import styled from "styled-components";

export const ContainerDefaultForm = styled.div`
  gap: 12px;
  border-top: 1px solid #eee;
  width: 100%;
`;
export const ColumnsDefaultForm = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 2px;
`;
export const ContainerTitlesDefaultForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`;
export const ContentDefaultForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const TitleColumn = styled.p`
  color: #212529;
  font-size: 16px;
  font-weight: 400;
  padding: 16px 0;
  margin: 0;
`;
export const KeyText = styled.p`
  color: #212529;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  gap: 5px;
  .required {
    color: #f15757;
  }
  .info {
    color: #868e96;
    font-size: 16px;
    font-weight: 400;
    margin-left: 4px;
  }
`;
