// import { NavigationButton } from "../../../NavigationButton/styles";
// import { useProductContext } from "../../../../context/products";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { templateRequests } from "../../../../services/apis/requests/template";
import { Input } from "../../../Input";
import { NavigationButton } from "../../../NavigationButton/styles";
import {
  BottomContainerModalColumnManagement,
  ContainerButtons,
  ContainerColors,
  ContainerModalColumnManagement,
  DeleteGroupButton,
  ItemColor,
  Selecteds,
  TitleContent,
  TopContainerModalColumnManagement,
  TopLeftContainerModalColumnManagement,
  TopRightContainerModalColumnManagement,
} from "./styles";
import { useProductContext } from "../../../../context/products";
import DefaultInput from "../../../DefaultInput";

function ModalColumnManagement({
  clearSubItensMode,
  ids,
  groups,
  template,
  editModeGroup,
  groupReferenceEditMode,
}: {
  clearSubItensMode: () => void;
  ids: string[];
  groups: {
    label: string;
    total: number;
    color: string;
  }[];
  template: any;
  editModeGroup: "group" | "ungroup" | "";
  groupReferenceEditMode: string;
}): JSX.Element {
  const { handleRedirectAndGetProducts } = useProductContext();
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const colors = [
    "#CC5DE8",
    "#1CC2D8",
    "#88C13D",
    "#E68079",
    "#F3AF3D",
    "#2937F0",
    "#EA0F02",
    "#ED93C7",
    "#F6E475",
    "#99BCDC",
  ];

  const createHeaderGroup = async (newGroup: string): Promise<void> => {
    try {
      const newGroups = [
        ...groups.map((item) => {
          return { label: item.label, color: item.color };
        }),
        { label: newGroup, color: selectedColor },
      ];
      const newFields = template.fields.fields.map((field: any) => {
        if (ids.includes(field.id)) {
          const newField = {
            ...field,
            group: newGroup,
            enforce_exact_length: field.enforce_exact_length || false,
            title: field.title === " " ? "teste" : field.title,
            options: !field.options[0] ? [""] : field.options || [""],
          };
          delete newField.order;
          delete newField.width;
          delete newField.frozen;
          delete newField.hidden;
          delete newField.integrations;
          return newField;
        }
        if (!ids.includes(field.id) && field.group === groupReferenceEditMode) {
          const newField = {
            ...field,
            group: newGroup,
            enforce_exact_length: field.enforce_exact_length || false,
            title: field.title === " " ? "teste" : field.title,
            options: !field.options[0] ? [""] : field.options || [""],
          };
          delete newField.order;
          delete newField.width;
          delete newField.frozen;
          delete newField.hidden;
          delete newField.integrations;
          delete newField.group;
          return newField;
        }
        const newField = {
          ...field,
          enforce_exact_length: field.enforce_exact_length || false,
          title: field.title === " " ? "teste" : field.title,
          options: !field.options[0] ? [""] : field.options || [""],
        };
        delete newField.order;
        delete newField.width;
        delete newField.frozen;
        delete newField.hidden;
        delete newField.integrations;
        return newField;
      });

      const newTemplates = {
        fields: newFields,
        groups: newGroups,
      };
      await templateRequests.update(template.id, newTemplates);
      toast.success("Grupo criado com sucesso");
      const id = window.location.pathname.substring(10);
      if (id) {
        setTimeout(() => {
          handleRedirectAndGetProducts(id).then(() => {});
        }, 0);
      }
      clearSubItensMode();
    } catch (error) {
      toast.error("Ocorreu um erro durante a criação do novo grupo");
      console.log(error);
      throw error;
    }
  };

  const removeHeaderGroup = async (referenceGroup: string): Promise<void> => {
    try {
      const newFields = template.fields.fields.map((field: any) => {
        if (ids.includes(field.id)) {
          const newField = { ...field, group: "" };
          delete newField.order;
          delete newField.width;
          delete newField.frozen;
          delete newField.hidden;
          delete newField.integrations;
          delete newField.group;
          return newField;
        }
        const newField = { ...field };
        delete newField.order;
        delete newField.width;
        delete newField.frozen;
        delete newField.hidden;
        delete newField.integrations;
        return newField;
      });

      const newTemplates = {
        fields: newFields,
        groups: groups
          .filter((fGroup) => {
            return fGroup.label !== referenceGroup;
          })
          .map((mGroup) => {
            return { label: mGroup.label, color: mGroup.color };
          }),
      };
      await templateRequests.update(template.id, newTemplates);
      toast.success("Grupo criado com sucesso");
      const id = window.location.pathname.substring(10);
      if (id) {
        setTimeout(() => {
          handleRedirectAndGetProducts(id).then(() => {});
        }, 0);
      }
      clearSubItensMode();
    } catch (error) {
      toast.error("Ocorreu um erro tentar remover coluna de grupo");
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (editModeGroup === "ungroup") {
      setGroupName(groupReferenceEditMode);
      const selectedGroup = groups.filter((item) => {
        return item.label === groupReferenceEditMode;
      })[0];
      setSelectedColor(selectedGroup.color);
    }
  }, [editModeGroup, groupReferenceEditMode, groups]);

  return (
    <ContainerModalColumnManagement>
      <TopContainerModalColumnManagement>
        <TopLeftContainerModalColumnManagement>
          <TitleContent>Nome do grupo</TitleContent>
          <DefaultInput
            label=""
            type="text"
            value={groupName}
            changeValue={setGroupName}
            required={false}
            placeHolder="Nome do grupo"
            alertTitle=""
            alertContent=""
          />
        </TopLeftContainerModalColumnManagement>
        <TopRightContainerModalColumnManagement>
          <TitleContent>Selecione a cor da tag</TitleContent>
          <ContainerColors>
            {colors.map((color) => (
              <ItemColor
                key={color}
                background={color}
                active={selectedColor === color}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </ContainerColors>
        </TopRightContainerModalColumnManagement>
      </TopContainerModalColumnManagement>
      <BottomContainerModalColumnManagement>
        <Selecteds>{ids?.length || 0} colunas selecionados</Selecteds>
        <ContainerButtons>
          {editModeGroup === "ungroup" && (
            <DeleteGroupButton>
              <NavigationButton
                abort
                onClick={() => removeHeaderGroup(groupReferenceEditMode)}
                style={{ width: "114px" }}
              >
                Excluir grupo
              </NavigationButton>
            </DeleteGroupButton>
          )}
          <NavigationButton
            abort
            onClick={clearSubItensMode}
            style={{ width: "91px" }}
          >
            Cancelar
          </NavigationButton>
          <NavigationButton
            disabled={!groupName || !selectedColor || !(ids.length > 0)}
            onClick={() => createHeaderGroup(groupName)}
            style={{ width: "143px" }}
          >
            Salvar alterações
          </NavigationButton>
        </ContainerButtons>
      </BottomContainerModalColumnManagement>
    </ContainerModalColumnManagement>
  );
}

export default ModalColumnManagement;
