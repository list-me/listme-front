import { useMemo, useState } from "react";
import { useFromToContext } from "../../../../../context/FromToContext";
import { StepContentContainer } from "../styles";
import LinkedListSelector from "../../ManageLinkedLists/LinkedListSelector";
import ConfigureLinks from "../../ManageLinkedLists/ConfigureLinks";
import DeleteLinks from "../../ManageLinkedLists/DeleteLinks";
import { useProductContext } from "../../../../../context/products";
import StepLoading from "../../ManageLinkedLists/UpdateProducts/StepLoading";
import StepFinish from "../../ManageLinkedLists/UpdateProducts/StepFinish";

function StepManageLinkedLists(): JSX.Element {
  const {
    currentStep,
    templates,
    setTemplates,
    setCurrentStep,
    setFromToIsOpened,
  } = useFromToContext();
  const { template: targetTemplate } = useProductContext();
  const [templateSelected, setTemplateSelected] = useState();
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
        />
      )}
      {currentStep === 2 &&
        (falseSyncCountFinal > falseSyncCountInitial ? (
          <DeleteLinks />
        ) : (
          <>
            <StepLoading
              setIsOpened={setFromToIsOpened}
              setNext={() => setCurrentStep(4)}
            />
          </>
        ))}
      {currentStep === 3 && (
        <StepLoading
          setIsOpened={setFromToIsOpened}
          setNext={() => setCurrentStep(4)}
        />
      )}
      {currentStep === 4 && <StepFinish setIsOpened={setFromToIsOpened} />}
    </StepContentContainer>
  );
}

export default StepManageLinkedLists;
