import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationButton } from "../../../../NavigationButton/styles";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import Anchor from "../../../../Anchor";
import SelectComponent from "../../../../Select";

import { ROUTES } from "../../../../../constants/routes";
import { integrationsRequest } from "../../../../../services/apis/requests/integration";
import { useIntegration } from "../../../../../context/IntegrationContext";
import { IOrganization } from "./StepTwo";

function StepTwo({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const navigate = useNavigate();
  const { valueProdApi, valueHomologApi, environment, currentProvider } =
    useIntegration();
  const [selectedOrganization, setSelectedOrganization] = useState<{
    label: string;
    value: IOrganization;
  }>();

  const [organizationsList, setOrganizationsList] = useState<IOrganization[]>(
    [],
  );

  const getConfigTemplatesList = useCallback(async () => {
    const currentApiKey =
      environment === "production" ? valueProdApi : valueHomologApi;
    try {
      const response = await integrationsRequest.listOfOrganizations(
        currentApiKey,
      );
      const responseToState = response.organizations.map(
        (item: IOrganization) => {
          return { label: item.name, value: item };
        },
      );
      setOrganizationsList(responseToState);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao buscar a lista de integrações");
    }
  }, [environment, valueHomologApi, valueProdApi]);

  useEffect(() => {
    getConfigTemplatesList();
  }, [getConfigTemplatesList]);

  async function onFinish(provider: string): Promise<void> {
    if (selectedOrganization) {
      const body = {
        production_key: valueProdApi,
        sandbox_key: valueHomologApi,
        environment,
        provider,
        custom_configs: {
          organization_id: selectedOrganization.value.id,
        },
      };
      try {
        await integrationsRequest.postIntegrationsConfig(body);
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao integrar com Nexaas");
      }
    }
  }

  return (
    <>
      <SelectComponent
        select={selectedOrganization}
        onChange={setSelectedOrganization}
        options={organizationsList}
        placeHolder="Selecione"
        labelText="Empresa"
        required
        infoTitle="Lorem Ipsum"
        infoContent="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
      />

      <Anchor link="" text="Como integrar com a Nexaas" />
      <div style={{ display: "flex", gap: "16px" }}>
        <NavigationButton prev abort onClick={() => setCurrentStep(1)}>
          <PlusIcon />
          Voltar
        </NavigationButton>
        {/* <NavigationButton onClick={() => navigate(`${ROUTES.INTEGRATION}/oi`)}> */}
        <NavigationButton onClick={() => onFinish(currentProvider.provider)}>
          <PlusIcon />
          Integrar
        </NavigationButton>
      </div>
    </>
  );
}

export default StepTwo;
