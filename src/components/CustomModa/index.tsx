/* eslint-disable */
import { toast } from "react-toastify";
import { Divider, Form, Input, Modal, Select, Switch } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { Dragger } from "../Dragger";
import {
  BodyContent,
  Container,
  Description,
  InputContainer,
  Title,
  Item,
  ButtonContainer,
  PrimaryButton,
  Principal,
  IconContent,
  BulkButton,
  AddNew,
  ButtonContainer2,
} from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down-small.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus-small.svg";

import { templateRequests } from "../../services/apis/requests/template";
import { productContext } from "../../context/products";
import { RelationForm } from "../NewColumn/RelationForm";

interface PropsModal {
  isOpen: boolean;
  onClickModal: () => void;
  data: any;
  template: any;
  onUpdate: Function;
}

type Options = {
  agreementType: string;
  field: string;
  originField: string;
  limit: string | number;
  owner?: string;
  templateId: string;
};

type Option = {
  [key: string]: string | number;
};

const KEYS = {
  agreementType: "agreementType",
  field: "field",
  mappingType: "mappingType",
  templateId: "templateId",
};

export const PersonalModal = ({
  isOpen,
  onClickModal = () => {},
  data,
  template,
  onUpdate,
}: PropsModal) => {
  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [type, setType] = useState<string>(data?.type);
  const [required, setRequired] = useState<boolean>(data?.required ?? false);
  const [isUpdate] = useState<boolean>(data?.id);
  const [draggerOptions, setDraggerOptions] = useState<any[]>(
    data?.options ?? [""],
  );

  const [options, setOptions] = useState<Options[]>([
    {
      templateId: window.location.pathname.substring(10),
      agreementType: "unilateral",
      field: "",
      limit: 1,
      originField: "",
    },
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  const textOptions = [
    {
      label: "Texto curto",
      value: "text",
    },
    {
      label: "Texto longo",
      value: "paragraph",
    },
  ];

  const fileOptions = [
    {
      label: "Galeria",
      value: "file",
    },
    // {
    //   label: "Thumb",
    //   value: "file",
    // },
  ];

  const TYPES: any = {
    text: {
      label: "Campo de texto",
      description: "Adicione uma entrada de texto curto",
    },
    paragraph: {
      label: "Paragrafo",
      description: "Adicione uma entrada de texto longo",
    },
    radio: {
      label: "Escolha única",
      description: "Adicione um campo com opções de escolha única",
    },
    checked: {
      label: "Caixa de seleção",
      description: "Adicione uma lista de opções a serem escolhidas",
    },
    list: {
      label: "Lista suspensa",
      description: "Adicione uma lista de opções a serem escolhidas",
    },
    file: {
      label: "Campo de arquivo",
      description: "Adicione um campo para envio de imagem",
    },
    relation: {
      label: "Conexão entre produtos",
      description: "Adicione um campo de relacionamento entre produtos",
    },
  };

  const MULTI_SELECT = ["checked", "radio", "list"];

  const handleUpdateTemplate = async (filtered: string[]): Promise<any> => {
    let templateUpdated = [];
    let newField: any;
    if (isUpdate) {
      templateUpdated = template.fields.fields.map((item: any) => {
        if (item.id === data.id) {
          data.options = filtered;
          data.type = type;
          item = data;
          return item;
        }

        return item;
      });
    } else {
      templateUpdated.push(...template.fields.fields);
      newField = {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        type,
        title,
        options: data?.type == "relation" ? options : filtered,
        required,
        is_public: false,
        help_text: "This fiedl will help you to make a new product register",
        description: "Completly random description",
      };
      templateUpdated.push(newField);
    }

    try {
      console.log({ templateUpdated });
      // await templateRequests.update(template?.id, { fields: templateUpdated });
      toast.success("Template atualizado com sucesso");
      return templateUpdated;
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível alterar o template, tente novamente!");
    }
  };

  const mountOptions = (): any[] => {
    return draggerOptions.map((item, index) => {
      return {
        title: (
          <>
            <Input
              value={item.value ?? item}
              onChange={(e) => {
                const { value } = e.target;
                const newState = [...draggerOptions];
                newState[index] = value;
                if (newState[index].length > 15) {
                  toast.warn("Uma opção não pode conter mais de 15 caracteres");
                  return;
                }

                setDraggerOptions(newState);
              }}
              name={index.toString()}
              onPressEnter={() => {
                if (draggerOptions.length === 12) {
                  toast.warn("Este campo não pode conter mais que 12 opções");
                  return;
                }
                setDraggerOptions((prevState) => [...prevState, ""]);
              }}
              autoFocus={index === draggerOptions.length - 1}
            />
            <IconContent
              onClick={() => {
                if (draggerOptions.length <= 2) {
                  toast.warning("Necessário conter ao menos duas opções");
                  return;
                }

                const newState = [...draggerOptions];
                newState.splice(index, 1);
                setDraggerOptions(newState);
              }}
            >
              <TrashIcon />
            </IconContent>
          </>
        ),
        key: index,
        value: item,
      };
    });
  };

  const handleChangeOptions = (option: Option): void => {
    const key = Object.keys(option)[0] as unknown as string;
    const value = Object.values(option)[0] as unknown as string;

    const changed =
      options[0] != undefined
        ? (options[0] as unknown as Options)
        : ({} as unknown as Options);

    if (key == "templateId") {
      changed.templateId = value;
    }
    if (key == "field") {
      changed["field"] = value;
    }

    if (key == "originField") {
      changed["originField"] = value;
    }

    if (key == "limit") {
      changed["limit"] = value as unknown as number;
    }
    if (key == "agreementType") {
      changed["agreementType"] = value;
    }

    console.log({ changed });
    setOptions([changed]);
  };

  useEffect(() => {
    setType(data?.type);
  }, [isOpen, data, draggerOptions]);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClickModal}
        onOk={onClickModal}
        width="470px"
        style={{ marginBottom: "2vh", top: 30 }}
        footer={null}
      >
        <Container>
          <div className="titleContainer">
            <Title> {TYPES[type]?.label} </Title>
            <Description>{TYPES[type]?.description}</Description>
          </div>
          <BodyContent>
            <form ref={formRef} className="form">
              <div className="encapsulator">
                <InputContainer>
                  <Input
                    style={{
                      height: "64px",
                      border: "1px solid #DEE2E6",
                    }}
                    defaultValue={title}
                    value={title}
                    onChange={(e) => {
                      e.preventDefault();

                      setTitle(e.target.value);
                    }}
                    placeholder="Informe o nome do campo"
                  />
                  {!MULTI_SELECT.includes(data?.type) &&
                  data?.type != "relation" ? (
                    <Form.Item
                      label="Escolha o tipo de valor"
                      name="type"
                      rules={[
                        { required: true, message: "Escolha o tipo de valor" },
                      ]}
                      style={{ marginTop: "10px" }}
                    >
                      <Select
                        style={{
                          height: "64px",
                          border: "1px solid #DEE2E6",
                        }}
                        value={type}
                        removeIcon
                        onChange={(e: string) => {
                          setType(e);
                        }}
                        placeholder="Informe o nome do campo"
                        options={
                          ["text", "paragraph"].includes(type)
                            ? textOptions
                            : fileOptions
                        }
                      />
                    </Form.Item>
                  ) : data?.type == "relation" ? (
                    <RelationForm
                      value={data}
                      currentFields={template.fields.fields}
                      handleChangeOptions={handleChangeOptions}
                    />
                  ) : (
                    <></>
                  )}
                </InputContainer>
                {MULTI_SELECT.includes(data?.type) ? (
                  <div className="dragger">
                    Opções
                    <Dragger
                      options={mountOptions()}
                      handleOnDrop={(info: any) => {
                        const { dropToGap, node, dragNode } = info;
                        const newTreeData = [...draggerOptions];
                        const dragNodeIndex = newTreeData.findIndex(
                          (n: any) => n.key === dragNode.key,
                        );
                        newTreeData.splice(dragNodeIndex, 1);
                        const targetIndex = node
                          ? newTreeData.findIndex(
                              (n: any) => n.key === node.key,
                            )
                          : 0;
                        const dropPosition =
                          info.dropPosition - Number(info.dropToGap);
                        const newIndex =
                          dropPosition === -1 ? targetIndex : targetIndex + 1;
                        const { title, key, value } = dragNode;
                        const newNode = { title, key, value };
                        newTreeData.splice(newIndex, 0, newNode);
                        // setDraggerOptions(newTreeData);
                      }}
                    />
                    <ButtonContainer2>
                      <BulkButton type="button" onClick={() => onClickModal()}>
                        {" "}
                        Adicionar opções em massa{" "}
                      </BulkButton>
                      <AddNew
                        type="button"
                        onClick={() => {
                          if (draggerOptions.length === 12) {
                            toast.warn(
                              "Este campo não pode conter mais que 12 opções",
                            );
                            return;
                          }
                          setDraggerOptions((prevState) => [...prevState, ""]);
                        }}
                      >
                        <PlusIcon />
                        Adicionar opção
                      </AddNew>
                    </ButtonContainer2>
                  </div>
                ) : (
                  <></>
                )}
                <Item>
                  Descrição
                  <Switch size="small" />
                </Item>
                <Item>
                  Texto de ajuda
                  <Switch size="small" />
                </Item>
                <Item>
                  Campo obrigatório
                  <Switch
                    size="small"
                    onChange={() => setRequired(!required)}
                    defaultChecked={required}
                  />
                </Item>
              </div>
              <Divider style={{ marginTop: "8px", marginBottom: "0" }} />
              <ButtonContainer>
                <PrimaryButton type="button" onClick={() => onClickModal()}>
                  {" "}
                  Cancelar{" "}
                </PrimaryButton>
                <Principal
                  type="button"
                  onClick={(e) => {
                    if (title.length == 0) {
                      toast.warn("O Titulo nao pode ser vazio");
                      return;
                    }

                    if (title.length > 20) {
                      toast.warn(
                        "O titulo não pode conter mais de 20 caracteres",
                      );
                      return;
                    }

                    let filtered: any;
                    if (draggerOptions.length > 2) {
                      filtered = draggerOptions.filter((item) => {
                        item = item.replace(/ /g, "");
                        if (item !== "") {
                          return item;
                        }
                      });

                      setDraggerOptions(filtered);
                    } else if (MULTI_SELECT.includes(type)) {
                      for (const draggOption of draggerOptions) {
                        if (
                          draggerOptions.includes("") ||
                          /^[^a-zA-Z0-9]+$/.test(draggOption)
                        ) {
                          toast.warn(`As opções não podem ser vazias`);
                          return;
                        }
                      }

                      filtered = [...draggerOptions];
                    } else if (type == "relation") {
                      filtered = [...options];
                    } else {
                      filtered = [...draggerOptions];
                    }

                    if (
                      draggerOptions.length < 2 &&
                      MULTI_SELECT.includes(type)
                    ) {
                      toast.warn(
                        `Os campos do to tipo ${TYPES[type]?.label} devem conter mais de uma opção`,
                      );
                      return;
                    }

                    e.preventDefault();
                    data.title = title;

                    handleUpdateTemplate(filtered).then((response) => {
                      const newColumn = {
                        ...data,
                        data: response[response.length - 1]?.id,
                        options: filtered,
                      };
                      onClickModal();
                      // onUpdate(newColumn, response);
                    });
                  }}
                >
                  Salvar
                </Principal>
              </ButtonContainer>
            </form>
          </BodyContent>
        </Container>
      </Modal>
    </>
  );
};
