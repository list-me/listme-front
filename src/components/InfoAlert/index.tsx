import React, { useState } from "react";
import { ContainerInfoAlert, ContentInfoAlert } from "./styles";
import { ReactComponent as AlertIcon } from "../../assets/alertIcon.svg";

function InfoAlert({
  title,
  content,
}: {
  title: string;
  content: string;
}): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  return (
    <ContainerInfoAlert isActive={isActive}>
      <AlertIcon
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      />
      {isActive && (
        <ContentInfoAlert>
          <p>{title}</p>
          <span>{content}</span>
        </ContentInfoAlert>
      )}
    </ContainerInfoAlert>
  );
}

export default InfoAlert;
