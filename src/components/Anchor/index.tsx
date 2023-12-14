import React from "react";
import styled from "styled-components";
import { ReactComponent as QuestionIcon } from "../../assets/anchorQuestion.svg";

export const ContainerAnchor = styled.a`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  align-items: center;
`;

function Anchor({ link, text }: { link: string; text: string }): JSX.Element {
  return (
    <ContainerAnchor href={link} target="_blank" rel="noopener noreferrer">
      <QuestionIcon />
      {text}
    </ContainerAnchor>
  );
}

export default Anchor;
