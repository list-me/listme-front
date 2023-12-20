import React from "react";
import { ConfigProvider, Switch } from "antd";
import { ContainerSwitchBox } from "./styles";
import theme from "../../../styles/theme";

function DualSwitch({
  options,
  value,
  setValue,
}: {
  options: { label: string; value: string }[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  function changeValue(e: boolean): void {
    if (e) {
      setValue(options[1].value);
    } else {
      setValue(options[0].value);
    }
  }

  return (
    <ContainerSwitchBox>
      <p>{options[0].label}</p>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.colors.primary,
          },
        }}
      >
        <Switch
          checked={options[1].value === value}
          onClick={(e) => changeValue(e)}
        />
      </ConfigProvider>
      <p>{options[1].label}</p>
    </ContainerSwitchBox>
  );
}

export default DualSwitch;
