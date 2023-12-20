import React from "react";
import { ConfigProvider, Switch } from "antd";
import {
  ContainerHeaderIntegrationCard,
  SwitchContainer,
  SwitchLabel,
} from "./styles";
import logoMock from "../../mock/logoIntegration.png";

function HeaderIntegrationCard({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <ContainerHeaderIntegrationCard>
      <img src={logoMock} alt="logo" />
      <SwitchContainer>
        <SwitchLabel>{isActive ? "Ativo" : "Inativo"}</SwitchLabel>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#20C997",
            },
          }}
        >
          <Switch
            style={{ width: "30px !important", height: "20px !important" }}
            className="customSwitch"
            checked={isActive}
            onClick={() => setIsActive(!isActive)}
          />
        </ConfigProvider>
      </SwitchContainer>
    </ContainerHeaderIntegrationCard>
  );
}

export default HeaderIntegrationCard;
