import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  Shape,
  Icon,
  Label,
  Functions,
  Capsule,
  LogoContainer,
} from "./styles";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ROUTES } from "../../constants/routes";
import { ReactComponent as TemplateIcon } from "../../assets/templates.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/log-out.svg";
import { ReactComponent as KeyIcon } from "../../assets/key-icon.svg";
import { STORAGE } from "../../constants/localStorage";
import { Loading } from "../Loading";

function Sidebar(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    setIsLoading(true);
    try {
      window.localStorage.removeItem(STORAGE.TOKEN);
      navigate(ROUTES.BASE);
      toast.success("Logout realizado com sucesso");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast.error("Ocorreu um erro ao realizar o logout, tente novamente");
    }
  };

  const handleGetCurrentActiveButton = (item: any): boolean => {
    return (
      window.location.pathname.replace("/", "") === item.label.toLowerCase()
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  const options = [
    {
      order: "0",
      label: "Templates",
      icon: <TemplateIcon />,
      to: ROUTES.TEMPLATES,
    },
  ];

  const functions = [
    {
      order: "2",
      label: "Configurações",
      icon: <SettingsIcon />,
      to: ROUTES.TEMPLATES,
    },
    {
      order: "3",
      label: "Chaves de API",
      icon: <KeyIcon />,
      to: ROUTES.TEMPLATES,
    },
    {
      order: "4",
      label: "Sair",
      icon: <LogoutIcon />,
      to: ROUTES.TEMPLATES,
      action: handleLogout,
    },
  ];

  return (
    <Container>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Capsule>
        <Content>
          {options.map((item) => (
            <Shape
              position="center"
              key={item.order}
              isItem
              isActive={handleGetCurrentActiveButton(item)}
            >
              <Icon>{item.icon}</Icon>
              <Label isItem> {item.label} </Label>
            </Shape>
          ))}
        </Content>
        <Functions>
          {functions.map((item) => (
            <Shape
              key={item.order}
              onClick={item.action}
              isActive={window.location.pathname.toLowerCase() === item.label}
            >
              <Icon> {item.icon} </Icon>
              <Label> {item.label} </Label>
            </Shape>
          ))}
        </Functions>
      </Capsule>
    </Container>
  );
}

export default Sidebar;
