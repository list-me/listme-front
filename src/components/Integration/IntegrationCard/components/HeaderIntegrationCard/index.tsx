import React from "react";
import { ConfigProvider, Switch } from "antd";
import {
  ContainerHeaderIntegrationCard,
  SwitchContainer,
  SwitchLabel,
} from "./styles";
import logoMock from "../../mock/logoIntegration.png";

function HeaderIntegrationCard({
  isActivated,
  setIsActivated,
}: {
  isActivated: boolean;
  setIsActivated: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <ContainerHeaderIntegrationCard>
      <img src={logoMock} alt="logo" />
      <SwitchContainer>
        <SwitchLabel>{isActivated ? "Ativo" : "Inativo"}</SwitchLabel>
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
            checked={isActivated}
            onClick={() => setIsActivated(!isActivated)}
          />
        </ConfigProvider>
      </SwitchContainer>
    </ContainerHeaderIntegrationCard>
  );
}

export default HeaderIntegrationCard;
