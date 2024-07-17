/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/naming-convention */
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
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
    setFromToIsOpened,
    setCurrentStep,
  } = useFromToContext();
  const { template: targetTemplate } = useProductContext();
  const [templateSelected, setTemplateSelected] = useState<any>();
  const [dataTemplateSelected, setDataTemplateSelected] = useState<any>();
  const [deleteAll, setDeleteAll] = useState<boolean>(false);

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
    try {
      // Mapeia os itens removendo os nomes
      const removedNames = items.map((mItem: any) => ({
        target: mItem.target,
        is_sync: mItem.is_sync,
        origin: mItem.origin,
      }));

      const {
        id,
        company_id,
        template_id,
        created_at,
        updated_at,
        deleted_at,
        storage,
        category_id,
        integration_config_id,
        status,
        default: defaultStatus,
        bucket,
        fields: { fields: fieldsName, name, ...fieldsRest },
        ...restTemplateData
      } = dataTemplateSelected;

      const copyData = {
        ...restTemplateData,
        fields: {
          fields: removedNames,
          ...fieldsRest,
        },
      };

      await templateRequests.update(templateSelected.id, copyData);

      setCurrentStep(4);
    } catch (error) {
      toast.error("Não foi possível atualizar o catálogo, tente novamente!");
      setCurrentStep(0);
    }
  }, [dataTemplateSelected, items, setCurrentStep, templateSelected?.id]);

  const onFinishDeleteAll = useCallback(async () => {
    if (deleteAll && templateSelected?.id) {
      try {
        await templateRequests.deleteTemplateSync(templateSelected.id);
        setCurrentStep(4);
        setTemplateSelected(null);
      } catch (error) {
        toast.error("Não foi excluir o vínculo, tente novamente!");
        setCurrentStep(0);
      }
    }
  }, [deleteAll, setCurrentStep, templateSelected?.id]);

  return (
    <StepContentContainer>
      {currentStep === 0 && (
        <LinkedListSelector
          templates={templates}
          setTemplates={setTemplates}
          setTemplateSelected={setTemplateSelected}
          setDeleteAll={setDeleteAll}
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
        (deleteAll ? (
          <DeleteLinks
            deleteAll={deleteAll}
            template={templateSelected}
            setDataTemplate={setDataTemplateSelected}
            setItems={setItems}
            targetTemplate={targetTemplate}
            dataTemplate={dataTemplateSelected}
          />
        ) : falseSyncCountFinal > falseSyncCountInitial ? (
          <DeleteLinks
            deleteAll={deleteAll}
            template={templateSelected}
            setDataTemplate={setDataTemplateSelected}
            setItems={setItems}
            targetTemplate={targetTemplate}
            dataTemplate={dataTemplateSelected}
          />
        ) : (
          <>
            <StepLoading onFinish={onFinish} setIsOpened={setFromToIsOpened} />
          </>
        ))}
      {currentStep === 3 && (
        <StepLoading
          onFinish={deleteAll ? onFinishDeleteAll : onFinish}
          setIsOpened={setFromToIsOpened}
        />
      )}
      {currentStep === 4 && <StepFinish setIsOpened={setFromToIsOpened} />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
