import React from "react";
import { ConfigProvider, Switch } from "antd";
import {
  ContainerHeaderIntegrationCard,
  SwitchContainer,
  SwitchLabel,
} from "./styles";

function HeaderIntegrationCard({
  isActive,
  setIsActive,
  thumb,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  thumb: string;
}): JSX.Element {
  return (
    <ContainerHeaderIntegrationCard>
      <img src={thumb} alt="logo" />
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
