/* eslint-disable import/prefer-default-export */
import styled from "styled-components";

export const ContainerHotTable = styled.div<{ isPublic: boolean | undefined }>`
  > div {
    /* top: ${(props) => (!props.isPublic ? "0px" : "-24px")}; */
  }
`;
