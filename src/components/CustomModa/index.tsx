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
  Footer,
} from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down-small.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus-small.svg";

import { templateRequests } from "../../services/apis/requests/template";
import { RelationForm } from "../CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm";
import { useProductContext } from "../../context/products";

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

type Field = {
  name: string;
  type: string;
  title: string;
  option: string[] | Options[];
  required: boolean;
};

export const PersonalModal = ({
  isOpen,
  onClickModal = () => {},
  data,
  template,
  onUpdate,
}: PropsModal) => {
  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [limitStatus, setLimitStatus] = useState<boolean>(
    data?.limitStatus ?? false,
  );
  const [limit, setLimit] = useState<number>(
    limitStatus ? data?.limit ?? 0 : 256,
  );
  const [type, setType] = useState<string>(data?.type);
  const [required, setRequired] = useState<boolean>(data?.required ?? false);
  const [isUpdate] = useState<boolean>(data?.id);
  const [draggerOptions, setDraggerOptions] = useState<any[]>(
    data?.options ?? [""],
  );

  const getOptions = (): Options[] | any[] => {
    if (data)
      if (data?.type == "relation" && Object.keys(data).includes("options")) {
        const currentOptions = data?.options[0];
        return [
          {
            agreementType: currentOptions?.agreementType,
            field: currentOptions?.field,
            limit: currentOptions?.limit,
            originField: currentOptions?.originField,
            templateId: currentOptions?.templateId,
          },
        ];
      }

    return [
      {
        agreementType: "unilateral",
        field: "",
        limit: 1,
        originField: "",
        templateId: window.location.pathname.substring(10),
      },
    ];
  };

  const [options, setOptions] = useState<any[]>(getOptions());
  const [enable, setEnable] = useState<boolean>(true);

  const initial = useRef(options);
  const titleRef = useRef(title);

  const [form] = Form.useForm();

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
      label: "Imagem",
      value: "image",
      key: 1,
    },
    {
      label: "Video",
      value: "video",
      key: 2,
    },
    {
      label: "Documento",
      value: "doc",
      key: 3,
    },
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

  const handleUpdateTemplate = async ({
    option,
    required,
    title,
    type,
    name,
  }: Field): Promise<any> => {
    let templateUpdated = [];
    let newField: any;

    if (isUpdate) {
      templateUpdated = template.fields.fields.map((item: any) => {
        if (item.id === data.id) {
          data.options = option;
          data.type = type;
          data.name = name;
          data.title = title;
          data.required = required;
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
        name,
        options: option,
        required,
        is_public: false,
        help_text: "This fiedl will help you to make a new product register",
        description: "Completly random description",
      };
      templateUpdated.push(newField);
    }

    templateUpdated.forEach((item: any) => {
      delete item.frozen;
      delete item.order;
      delete item.width;
      delete item.hidden;
    });

    try {
      await templateRequests.update(template?.id, { fields: templateUpdated });
      toast.success("Template atualizado com sucesso");
      return templateUpdated;
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível alterar o template, tente novamente!");
    }
  };

  const handleChangeOptions = (option: Options): void => {
    setOptions([option]);
  };

  useEffect(() => {
    setType(data?.type);

    if (data?.type == "relation") {
      setEnable(false);
    }
  }, [isOpen, data]);

  useEffect(() => {
    if (options !== initial.current || title !== titleRef.current) {
      setEnable(true);
    }
  }, [options]);

  const { handleRedirectAndGetProducts } = useProductContext();

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
            <Form
              form={form}
              initialValues={{
                required,
                title,
                name: data?.name,
                type: data?.type,
              }}
              onFinish={(fields) => {
                if (!fields.type) fields.type = type;
                if (
                  fields.type == "relation" &&
                  (options[0].field == "" || !options[0].originField)
                ) {
                  toast.warn("O campo para exibição não pode ser vazio");
                  return;
                }

                const customOptions: any[] = [];
                Object.keys(fields).forEach((key) => {
                  if (/option/.test(key) && fields[key]) {
                    customOptions.push(fields[key]);
                    delete fields[key];
                  }
                });

                if (
                  !customOptions.length &&
                  ["text", "paragraph", "file"].includes(fields.type)
                ) {
                  fields.option = [""];
                } else if (["radio", "list", "checked"].includes(fields.type)) {
                  fields.option = customOptions;
                } else if (fields.type == "relation") {
                  fields.option = options;
                }

                if (draggerOptions.length < 2 && MULTI_SELECT.includes(type)) {
                  toast.warn(
                    `Os campos do to tipo ${TYPES[type]?.label} devem conter mais de uma opção`,
                  );
                  return;
                }

                handleUpdateTemplate(fields).then((response) => {
                  if (response) {
                    const newColumn = {
                      ...fields,
                      data: response[response?.length - 1]?.id,
                      options: fields.option,
                    };
                    onClickModal();
                    onUpdate(newColumn, response);
                    const id = window.location.pathname.substring(10);
                    if (id) {
                      setTimeout(() => {
                        handleRedirectAndGetProducts(id).then(() => {});
                      }, 0);
                    }
                  }
                });
              }}
            >
              <div className="encapsulator">
                <InputContainer>
                  <Form.Item
                    wrapperCol={{ flex: "auto" }}
                    label="Defina o titulo desta coluna"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "O título deve conter no máximo 15 caracteres",
                        max: 15,
                      },
                    ]}
                    style={{ marginBottom: "6px" }}
                  >
                    <Input
                      autoFocus
                      style={{
                        height: "64px",
                        border: "1px solid #DEE2E6",
                      }}
                      value={title}
                      onChange={(e) => {
                        e.preventDefault();

                        setTitle(e.target.value);
                      }}
                      placeholder="Informe o titulo da coluna"
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{ flex: "auto" }}
                    label="Defina o nome da coluna"
                    name="name"
                    rules={[
                      { required: true, message: "O nome não pode ser vazio" },
                    ]}
                    style={{ marginBottom: "6px" }}
                  >
                    <Input
                      style={{
                        height: "64px",
                        border: "1px solid #DEE2E6",
                      }}
                      onChange={(e) => {
                        e.preventDefault();

                        setTitle(e.target.value);
                      }}
                      placeholder="Informe o nome do campo"
                    />
                  </Form.Item>
                  {!MULTI_SELECT.includes(data?.type) &&
                  !["relation", "file"].includes(data?.type) ? (
                    <Form.Item
                      wrapperCol={{ flex: "auto" }}
                      label="Escolha o tipo de valor"
                      name="type"
                      rules={[
                        { required: true, message: "Escolha o tipo de valor" },
                      ]}
                      style={{ marginBottom: "6px" }}
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
                        placeholder="Informe o tipo do campo"
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
                  {(data.type === "paragraph" || data.type === "text") && (
                    <>
                      <Form.Item
                        label="Definir limite máximo de caracteres"
                        name="limitStatus"
                        style={{
                          display: "flex",
                          marginBottom: "2px",
                        }}
                      >
                        <div
                          style={{
                            marginLeft: "68px",
                          }}
                        >
                          <Switch
                            size="small"
                            onChange={() => setLimitStatus(!limitStatus)}
                            checked={limitStatus}
                          />
                        </div>
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{ flex: "auto" }}
                        name="limit"
                        style={{ marginBottom: "6px" }}
                      >
                        <Input
                          value={limit}
                          style={{
                            height: "64px",
                            border: "1px solid #DEE2E6",
                          }}
                          disabled={!limitStatus}
                          type="number"
                          min={0}
                          onChange={(e) => {
                            e.preventDefault();

                            setLimit(+e.target.value);
                          }}
                          placeholder="Ex.: 10"
                        />
                      </Form.Item>
                    </>
                  )}
                </InputContainer>
                {MULTI_SELECT.includes(data?.type) ? (
                  <div className="dragger">
                    <p>Opções</p>
                    <Form.Item name="options" className="onDragger">
                      <Dragger
                        options={draggerOptions}
                        setOptions={(values: any) => setDraggerOptions(values)}
                        handleOnDrop={(info: any) => {
                          const { node, dragNode } = info;
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
                        form={form}
                      />
                    </Form.Item>
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
              </div>
              <Footer>
                <Form.Item
                  name="description"
                  label="Descrição"
                  style={{ marginBottom: "2px" }}
                >
                  <Switch size="small" />
                </Form.Item>
                <Form.Item
                  name="help_text"
                  label="Texto de ajuda"
                  style={{ marginBottom: "2px" }}
                >
                  <Switch size="small" />
                </Form.Item>
                <Form.Item
                  name="required"
                  label="Campo obrigatório"
                  style={{ marginBottom: "2px" }}
                >
                  <Switch
                    size="small"
                    onChange={() => setRequired(!required)}
                    checked={required}
                  />
                </Form.Item>
              </Footer>
              <Divider style={{ marginTop: "8px", marginBottom: "0" }} />
              <ButtonContainer>
                <PrimaryButton type="button" onClick={() => onClickModal()}>
                  {" "}
                  Cancelar{" "}
                </PrimaryButton>
                <Principal type="submit" disabled={!enable}>
                  Salvar
                </Principal>
              </ButtonContainer>
            </Form>
          </BodyContent>
        </Container>
      </Modal>
    </>
  );
};
