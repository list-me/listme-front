import { Checkbox } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  BoxFromTo,
  CloseButton,
  HeaderModal,
  TitleModal,
} from "../../../styles";
import { useFromToContext } from "../../../../../context/FromToContext";
import { ReactComponent as CloseIcon } from "../../../../../assets/close-gray.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/info.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/plus-fromto.svg";
import {
  ContainerConfigureLinks,
  ContentConfigureLinks,
  ContentListSelected,
  HeaderColumns,
  HeaderListSelected,
  WrapperCheckBox,
  WrapperListSelected,
} from "./styles";
import {
  AlertLinkFields,
  ColumnTitleLinkFields,
  ContentLinkFields,
  ContentRowLinkFieldsOutside,
} from "../../LinkFields/styles";
import Origin from "../../LinkFields/components/Origin";
import { BoxButtons, NavigationButton } from "../../NavigationButton/styles";
import { templateRequests } from "../../../../../services/apis/requests/template";

function ConfigureLinks({
  template,
  targetTemplate,
}: {
  template: any;
  targetTemplate: any;
}): JSX.Element {
  // console.log("🚀 ~ targetTemplate:", targetTemplate);
  const [dataTemplate, setDataTemplate] = useState<any>();
  const { setFromToIsOpened, setCurrentStep } = useFromToContext();
  const [items, setItems] = useState<any>();
  console.log("🚀 ~ items:", items);

  useEffect(() => {
    const targetsIds = dataTemplate?.fields.map(
      (item: { target: string; is_sync: boolean }) => item.target,
    );

    const result = dataTemplate?.fields.map(
      (item: { target: string; origin: string; is_sync: boolean }) => {
        return {
          target: item.target,
          is_sync: item.is_sync,
          origin: item.origin,
        };
      },
    );

    const targetsData = targetTemplate.fields.fields.filter((item: any) => {
      return targetsIds?.includes(item.id);
    });

    const itemsToReturn = result?.map((item: any, index: number) => {
      const objt = {
        ...item,
        name: targetsData[index].name,
      };
      return objt;
    });

    setItems(itemsToReturn);
  }, [dataTemplate?.fields, targetTemplate.fields.fields]);

  function checkChange(index: number, list: any): void {
    const copyList = [...list];
    copyList[index].is_sync = !copyList[index].is_sync;
    setItems(copyList);
  }

  async function getTemplate(id: string): Promise<void> {
    const data = await templateRequests.get(id);
    setDataTemplate(data.fields);
  }

  useEffect(() => {
    if (template.id) {
      getTemplate(template.id);
    }
  }, [template.id]);

  return (
    <ContainerConfigureLinks>
      <BoxFromTo style={{ width: "100%" }}>
        <HeaderModal borderDisabled>
          <TitleModal>Configurar vínculos</TitleModal>
          <CloseButton onClick={() => setFromToIsOpened(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderModal>
        <ContentConfigureLinks>
          <WrapperListSelected>
            <HeaderListSelected>
              <p>List pública selecionada</p>
              <p>Produtos</p>
            </HeaderListSelected>
            <ContentListSelected>
              <p>{template.name}</p>
              <span>{template.new_products_amount}</span>
            </ContentListSelected>
          </WrapperListSelected>

          <HeaderColumns>
            <ColumnTitleLinkFields>Atributo</ColumnTitleLinkFields>
            <ColumnTitleLinkFields>
              Manter vínculo
              <AlertLinkFields>
                <InfoIcon />
                <div>
                  Só os criadores atualizam os produtos. Você verá todas as
                  atualizações deles. Se quiser editar os campos e não receber
                  atualizações posteriormente, desmarque essa opção.
                </div>
              </AlertLinkFields>
            </ColumnTitleLinkFields>
          </HeaderColumns>
          <ContentLinkFields>
            {items?.map((item: any, index: number) => (
              <ContentRowLinkFieldsOutside key={item}>
                <Origin
                  title={item.name}
                  example={
                    // example(item) ||
                    undefined
                  }
                />

                <WrapperCheckBox>
                  <Checkbox
                    onChange={() => checkChange(index, items)}
                    checked={item?.is_sync}
                  />
                </WrapperCheckBox>
              </ContentRowLinkFieldsOutside>
            ))}
          </ContentLinkFields>
          <BoxButtons>
            <NavigationButton onClick={() => setCurrentStep(0)} abort>
              <PlusIcon />
              Voltar
            </NavigationButton>
            <NavigationButton onClick={() => setCurrentStep(2)}>
              <PlusIcon />
              Continuar
            </NavigationButton>
          </BoxButtons>
        </ContentConfigureLinks>
      </BoxFromTo>
    </ContainerConfigureLinks>
  );
}

export default ConfigureLinks;
