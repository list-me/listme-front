/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Switch } from "antd";
import {
  AlertSwitch,
  ButtonOpenOptions,
  ContainerIntegrationSettings,
  FixedItemIntegrationSettings,
  ItemIntegrationSettings,
  LabelMultiSelectIntegrationSettings,
  ListContainerIntegrationSettings,
  MultiSelectIntegrationSettings,
  PseudoInputIntegrationSettings,
} from "./styles";
import { SwitchOption } from "../ImportOptions/styles";
import { BoxButtons, NavigationButton } from "../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../assets/plus-fromto.svg";
import { useFromToContext } from "../../../../context/FromToContext";
import Select from "../../../Select";
import IconNexaas from "../../../../assets/icons/MiniIconNexaas.png";
import IconNuvemShop from "../../../../assets/icons/MiniIcon-NuvemShop.png";
import IconShopify from "../../../../assets/icons/MiniIconShopify.png";
import IconVTEX from "../../../../assets/icons/MiniIconVTEX.png";
import { ReactComponent as ChevronIcon } from "../../../../assets/chevron-down-small.svg";

function IntegrationSettings(): JSX.Element {
  const {
    setCurrentStep,
    providersToIntegration,
    setProdvidersToIntegration,
    allProductsToIntegration,
    setAllProductsToIntegration,
    // guardar valores aqui
    // valuesIntegrationsConfig,
    // setValuesIntegrationsConfig,
  } = useFromToContext();

  const [optionsOpened, setOptionsOpened] = useState(false);

  const icons: { [key: string]: any } = {
    nexaas: IconNexaas,
    nuvemshop: IconNuvemShop,
    shopify: IconShopify,
    vtex: IconVTEX,
  };

  const options = [
    { value: "nexaas", label: "Nexaas", icon: icons.nexaas },
    // { value: "nuvemshop", label: "NuvemShop", icon: icons.nuvemshop },
    // { value: "shopify", label: "Shopify", icon: icons.shopify },
    // { value: "vtex", label: "VTEX", icon: icons.vtex },
  ];

  const listToVerifyAllOptions = [
    "nexaas",
    //  , "NuvemShop", "Shopify", "VTEX"
  ];

  function verifyAllOptions(): boolean {
    const selecteds = listToVerifyAllOptions.filter((item) => {
      return providersToIntegration.includes(item);
    });
    if (selecteds.length === listToVerifyAllOptions.length) {
      return true;
    }
    return false;
  }

  const multiSelectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any): void {
      if (
        multiSelectRef.current &&
        // @ts-ignore
        !multiSelectRef.current.contains(event.target)
      ) {
        setOptionsOpened(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <ContainerIntegrationSettings>
      <MultiSelectIntegrationSettings ref={multiSelectRef}>
        <LabelMultiSelectIntegrationSettings>
          Selecione as integrações para envio dos produtos
          <PseudoInputIntegrationSettings>
            <ButtonOpenOptions
              onClick={() => setOptionsOpened((prev) => !prev)}
              opened={optionsOpened}
            >
              {providersToIntegration.length ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  {providersToIntegration.map((opt) => (
                    <img src={icons[opt]} alt={opt} width={32} height={32} />
                  ))}
                </div>
              ) : (
                "Selecione"
              )}
              <ChevronIcon />
            </ButtonOpenOptions>
            {optionsOpened && (
              <ListContainerIntegrationSettings>
                <FixedItemIntegrationSettings>
                  <Checkbox
                    className="custom-checkbox"
                    checked={verifyAllOptions()}
                    onChange={() => {
                      setProdvidersToIntegration(
                        verifyAllOptions() ? [] : listToVerifyAllOptions,
                      );
                    }}
                  >
                    Todas as integrações
                  </Checkbox>
                </FixedItemIntegrationSettings>
                {options.map((opt) => (
                  <ItemIntegrationSettings key={opt.label}>
                    <Checkbox
                      className="custom-checkbox"
                      checked={providersToIntegration.includes(opt.value)}
                      onChange={() => {
                        if (providersToIntegration.includes(opt.value)) {
                          const listWithoutItem = providersToIntegration.filter(
                            (item) => {
                              return item !== opt.value;
                            },
                          );
                          setProdvidersToIntegration(listWithoutItem);
                        } else {
                          setProdvidersToIntegration((prev) => [
                            ...prev,
                            opt.value,
                          ]);
                        }
                      }}
                    >
                      <img
                        src={opt.icon}
                        alt={opt.label}
                        width={16}
                        height={16}
                      />
                      {opt.label}
                    </Checkbox>
                  </ItemIntegrationSettings>
                ))}
              </ListContainerIntegrationSettings>
            )}
          </PseudoInputIntegrationSettings>
        </LabelMultiSelectIntegrationSettings>
      </MultiSelectIntegrationSettings>
      <SwitchOption>
        <p>Enviar todos os produtos da planilha para integração</p>
        <Switch
          checked={allProductsToIntegration}
          size="small"
          onChange={(checked) => {
            setAllProductsToIntegration(checked);
          }}
        />
      </SwitchOption>
      {!allProductsToIntegration && (
        <AlertSwitch>
          <span>Para escolher quais produtos serão enviados:</span> Verifique se
          sua planilha CSV contém a coluna: 'send_to_integrations' antes de
          importar.
          <br />
          <br />
          Utilize '1' ou 'true' para os produtos que serão salvos{" "}
          <span>e ENVIADOS para as integrações;</span> E utilize '0' ou 'false'
          para os produtos que serão salvos{" "}
          <span>e NÃO ENVIADOS para as integrações.</span>
        </AlertSwitch>
      )}
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
