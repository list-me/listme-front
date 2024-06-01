import { useCallback, useMemo, useState } from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";
import DeleteLinks from "../../ManageLinkedLists/DeleteLinks";
import { useProductContext } from "../../../../../context/products";
import StepLoading from "../../ManageLinkedLists/UpdateProducts/StepLoading";
import StepFinish from "../../ManageLinkedLists/UpdateProducts/StepFinish";
import { templateRequests } from "../../../../../services/apis/requests/template";

function StepManageLinkedLists(): JSX.Element {
  const {
    currentStep,
    templates,
    setTemplates,
    setCurrentStep,
    setFromToIsOpened,
  } = useFromToContext();
  const { template: targetTemplate } = useProductContext();
  const [templateSelected, setTemplateSelected] = useState<any>();
  const [dataTemplateSelected, setDataTemplateSelected] = useState<any>();
  console.log(
    "🚀 ~ StepManageLinkedLists ~ dataTemplateSelected:",
    dataTemplateSelected,
  );

  const [initialItems, setInitialItems] = useState<any>();
  const [items, setItems] = useState<any>();

  const falseSyncCountInitial = useMemo(() => {
    return (
      initialItems?.filter((item: any) => item.is_sync === false)?.length || 0
    );
  }, [initialItems]);

  const falseSyncCountFinal = useMemo(() => {
    return items?.filter((item: any) => item.is_sync === false)?.length || 0;
  }, [items]);

  const onFinish = useCallback(async () => {
    const removedNames = items.map((mItem: any) => {
      return {
        target: mItem.target,
        is_sync: mItem.is_sync,
        origin: mItem.origin,
      };
    });
    const copyData = {
      ...dataTemplateSelected,
      fields: {
        fields: removedNames,
        template_origin: dataTemplateSelected.fields.template_origin,
        template_target: dataTemplateSelected.fields.template_target,
      },
    };
    delete copyData.id;
    delete copyData.company_id;
    delete copyData.template_id;
    delete copyData.created_at;
    delete copyData.updated_at;
    delete copyData.deleted_at;
    delete copyData.storage;
    delete copyData.category_id;
    delete copyData.integration_config_id;
    delete copyData.status;
    delete copyData.default;
    delete copyData.bucket;
    delete copyData.fields.fields.name;
    const response = await templateRequests.update(
      templateSelected.id,
      copyData,
    );
    // fazer com que apos concluir ir pra tela de concluido e pronto
  }, [dataTemplateSelected, items, templateSelected?.id]);

  return (
    <StepContentContainer>
      {currentStep === 0 && (
        <LinkedListSelector
          templates={templates}
          setTemplates={setTemplates}
          setTemplateSelected={setTemplateSelected}
        />
      )}
      {currentStep === 1 && (
        <ConfigureLinks
          template={templateSelected}
          targetTemplate={targetTemplate}
          items={items}
          setItems={setItems}
          setInitialItems={setInitialItems}
          dataTemplate={dataTemplateSelected}
          setDataTemplate={setDataTemplateSelected}
        />
      )}
      {currentStep === 2 &&
        (falseSyncCountFinal > falseSyncCountInitial ? (
          <DeleteLinks />
        ) : (
          <>
            <StepLoading
              onFinish={onFinish}
              setIsOpened={setFromToIsOpened}
              // setNext={() => setCurrentStep(4)}
            />
          </>
        ))}
      {currentStep === 3 && (
        <StepLoading
          onFinish={onFinish}
          setIsOpened={setFromToIsOpened}
          // setNext={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && <StepFinish setIsOpened={setFromToIsOpened} />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
