import styled from "styled-components";

export const ContainerPublicListList = styled.div`
  width: 1170px;
  height: 773px;
  padding: 0px, 40px, 0px, 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
`;

export const ContentPublicListList = styled.div`
  width: 898px;
  display: flex;
  padding: 40px;
  flex-direction: column;
`;
