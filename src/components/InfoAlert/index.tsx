import React, { useState } from "react";
import { ContainerInfoAlert, ContentInfoAlert } from "./styles";
import { ReactComponent as AlertIcon } from "../../assets/alertIcon.svg";

interface InfoAlertProps {
  title: string;
  content: string;
  toRight?: boolean;
}

const InfoAlert: React.FC<InfoAlertProps> = ({
  title,
  content,
  toRight,
}: InfoAlertProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <ContainerInfoAlert isActive={isActive}>
      {(title || content) && (
        <AlertIcon
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        />
      )}
      {isActive && (
        <ContentInfoAlert toRight={toRight}>
          {title && <p>{title}</p>}
          {content && <span>{content}</span>}
        </ContentInfoAlert>
      )}
    </ContainerInfoAlert>
  );
};

InfoAlert.defaultProps = {
  toRight: false,
};

export default InfoAlert;
