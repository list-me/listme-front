import { Checkbox } from "antd";
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

function ConfigureLinks({ template }: { template: any }): JSX.Element {
  const { setFromToIsOpened, checkedList, setCheckedList, setCurrentStep } =
    useFromToContext();

  const colHeadersToPreviewTable = ["item 1", "item2"];

  function checkChange(index: number): void {
    const copyList = [...checkedList];
    copyList[index] = !checkedList[index];
    setCheckedList(copyList);
  }

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
              <p>Foscarini</p>
              <span>18</span>
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
            {colHeadersToPreviewTable?.map((item, index) => (
              <ContentRowLinkFieldsOutside key={item}>
                <Origin
                  title={item}
                  example={
                    // example(item) ||
                    undefined
                  }
                />

                <WrapperCheckBox>
                  <Checkbox
                    onChange={() => checkChange(index)}
                    checked={checkedList[index]}
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
