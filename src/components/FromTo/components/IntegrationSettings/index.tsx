/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Switch } from "antd";
import { AlertSwitch, ContainerIntegrationSettings } from "./styles";
import { SwitchOption } from "../ImportOptions/styles";
import { BoxButtons, NavigationButton } from "../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../assets/plus-fromto.svg";
import { useFromToContext } from "../../../../context/FromToContext";
import Select from "../../../Select";

function IntegrationSettings(): JSX.Element {
  const {
    setCurrentStep,
    valuesIntegrationsConfig,
    setValuesIntegrationsConfig,
  } = useFromToContext();
  const [switchActive, setSwitchActive] = useState(false);
  const options = [
    { value: "Nexaas", label: "Nexaas" },
    { value: "NuvemShop", label: "NuvemShop" },
    { value: "Shopify", label: "Shopify" },
    { value: "VTEX", label: "VTEX" },
  ];

  return (
    <ContainerIntegrationSettings>
      <Select
        select={valuesIntegrationsConfig[0]}
        onChange={(value) => setValuesIntegrationsConfig([value])}
        options={options}
        placeHolder="Selecione"
        labelText="Selecione as integrações para envio dos produtos"
      />
      <SwitchOption>
        <p>Enviar todos os produtos da planilha para integração</p>
        <Switch
          checked={switchActive}
          size="small"
          onChange={(e) => setSwitchActive(e)}
        />
      </SwitchOption>
      <AlertSwitch active={switchActive}>
        {switchActive ? (
          <>
            Todos os produtos de sua planilha serão enviados para as integrações
            selecionadas
          </>
        ) : (
          <>
            <span>Para não enviar todos os produtos da sua planilha:</span>{" "}
            Adicione a coluna 'have_import' à sua planilha CSV antes de importar
            e utilize '1' ou 'true' para produtos a serem enviados, e '0' ou
            'false' para os que não serão enviados.
          </>
        )}
      </AlertSwitch>
      <BoxButtons>
        <NavigationButton
          abort
          prev
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          <PlusIcon />
          Voltar
        </NavigationButton>
        <NavigationButton onClick={() => setCurrentStep((prev) => prev + 1)}>
          <PlusIcon />
          Continuar
        </NavigationButton>
      </BoxButtons>
    </ContainerIntegrationSettings>
  );
}

export default IntegrationSettings;
