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
import { ReactComponent as IntegrationIcon } from "../../assets/integration-icon.svg";
import { STORAGE } from "../../constants/localStorage";
import { Loading } from "../Loading";

interface IFuntions {
  order: string;
  label: string;
  value: string;
  icon: JSX.Element;
  to: string;
  action: () => void;
}

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
      window.location.pathname.replace("/", "") === item.value.toLowerCase()
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  const options: IFuntions[] = [
    {
      order: "0",
      label: "Lists",
      value: "templates",
      icon: <TemplateIcon />,
      to: ROUTES.TEMPLATES,
      action: () => "",
    },
  ];

  const functions: IFuntions[] = [
    {
      order: "1",
      label: "Integrações",
      value: "integration",
      icon: <IntegrationIcon />,
      to: ROUTES.INTEGRATION,
      action: () => "",
    },
    {
      order: "2",
      label: "Configurações",
      value: "config",
      icon: <SettingsIcon />,
      to: ROUTES.TEMPLATES,
      action: () => "",
    },
    {
      order: "3",
      label: "Chaves de API",
      value: "key",
      icon: <KeyIcon />,
      to: ROUTES.TEMPLATES,
      action: () => "",
    },
    {
      order: "4",
      label: "Sair",
      value: "logout",
      icon: <LogoutIcon />,
      to: ROUTES.TEMPLATES,
      action: handleLogout,
    },
  ];

  function handleClick(currentItem: {
    order: string;
    label: string;
    value: string;
    icon: JSX.Element;
    to: string;
    action: () => void;
  }): any {
    if (currentItem.value === "logout") {
      currentItem.action();
    } else {
      navigate(currentItem.to);
    }
  }

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
              onClick={() => handleClick(item)}
              isActive={handleGetCurrentActiveButton(item)}
            >
              <Icon isItem>{item.icon}</Icon>
              <Label isItem> {item.label} </Label>
            </Shape>
          ))}
        </Content>
        <Functions>
          {functions.map((item) => (
            <Shape
              key={item.order}
              onClick={() => handleClick(item)}
              isActive={handleGetCurrentActiveButton(item)}
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
