import React from "react";
import { ConfigProvider, Switch } from "antd";
import { ContainerSwitchBox } from "./styles";
import theme from "../../../styles/theme";

function DualSwitch(): JSX.Element {
  return (
    <ContainerSwitchBox>
      <p>Homologação</p>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colors.primary,
          },
        }}
      >
        <Switch />
      </ConfigProvider>
      <p>Produção</p>
    </ContainerSwitchBox>
  );
}

export default DualSwitch;
