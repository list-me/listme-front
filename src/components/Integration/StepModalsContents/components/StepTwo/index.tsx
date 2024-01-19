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
import { Loading } from "../../../../Loading";

function StepTwo({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { valueProdApi, valueHomologApi, environment, currentProvider, mode } =
    useIntegration();
  const [selectedOrganization, setSelectedOrganization] = useState<{
    label: string;
    value: IOrganization;
  }>();

  const [organizationsList, setOrganizationsList] = useState<IOrganization[]>(
    [],
  );

  const getConfigTemplatesList = useCallback(async () => {
    setIsLoading(true);
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

      if (mode === "editing") {
        const organizationId =
          currentProvider?.config?.custom_configs?.organization_id;

        const currentOrganization = responseToState.find(
          (item: any) => item.value.id === organizationId,
        );

        setSelectedOrganization(currentOrganization);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao buscar a lista de integrações");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentProvider?.config?.custom_configs?.organization_id,
    environment,
    mode,
    valueHomologApi,
    valueProdApi,
  ]);

  useEffect(() => {
    getConfigTemplatesList();
  }, [getConfigTemplatesList]);

  async function onFinish(provider: string): Promise<void> {
    if (selectedOrganization) {
      const commonBody = {
        production_key: valueProdApi,
        sandbox_key: valueHomologApi,
        environment,
        custom_configs: {
          organization_id: selectedOrganization.value.id,
        },
      };

      try {
        if (mode === "registration" && selectedOrganization) {
          const registrationBody = {
            ...commonBody,
            provider,
          };
          await integrationsRequest.postIntegrationsConfig(registrationBody);
        } else if (selectedOrganization) {
          const updateBody = {
            ...commonBody,
            status: currentProvider.config.id ? "active" : "inactive",
          };
          await integrationsRequest.patchIntegrationsConfig(
            currentProvider.config.id,
            updateBody,
          );
        }
        navigate(`${ROUTES.INTEGRATION}/product_brands/${currentProvider.id}`);
      } catch (error) {
        console.error(error);
        const errorMessage =
          mode === "registration"
            ? "Ocorreu um erro ao integrar com Nexaas"
            : "Ocorreu um erro ao atualizar integração com Nexaas";
        toast.error(errorMessage);
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <Anchor link="" text="Como integrar com a Nexaas" />
      <div style={{ display: "flex", gap: "16px" }}>
        <NavigationButton prev abort onClick={() => setCurrentStep(1)}>
          <PlusIcon />
          Voltar
        </NavigationButton>
        {/* <NavigationButton onClick={() => `)}> */}
        <NavigationButton onClick={() => onFinish(currentProvider.provider)}>
          <PlusIcon />
          Integrar
        </NavigationButton>
      </div>
    </>
  );
}

export default StepTwo;
