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
  CharacterLimitContainer,
} from "./styles";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down-small.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";
import { ReactComponent as PlusIcon } from "../../assets/plus-small.svg";

import { templateRequests } from "../../services/apis/requests/template";
import { RelationForm } from "../CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm";
import { useProductContext } from "../../context/products";
import DefaultLimits from "../../utils/DefaultLimits";

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
type DataType = "text" | "paragraph";

export const PersonalModal = ({
  isOpen,
  onClickModal = () => {},
  data,
  template,
  onUpdate,
}: PropsModal) => {
  const url = window.location.href;
  const isPublic = url.includes("public");

  const { targetTemplatePublic } = useProductContext();

  const currentTemplate = isPublic ? targetTemplatePublic : template;
  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [limitStatus, setLimitStatus] = useState<boolean>(
    data?.limitStatus ?? false,
  );
  const [limit, setLimit] = useState<number>(
    limitStatus ? data?.limit ?? 0 : 256,
  );
  const [type, setType] = useState<string>(data?.type);
  const [required, setRequired] = useState<boolean>(data?.required ?? false);
  const [isUnique, setIsUnique] = useState<boolean>(data?.is_unique ?? false);
  // @ts-ignore
  const initialLimit =
    data?.limit || DefaultLimits[data?.type]?.default || null;

  const [characterLimit, setCharacterLimit] = useState<number>(initialLimit);

  const initialDecimalPoint = data?.options ? data?.options[0] : ".";

  const [decimalPoint, setDecimalPoint] = useState<string>(initialDecimalPoint);

  const [activeCharacterLimit, setActiveCharacterLimit] = useState<boolean>(
    data?.limit ? true : false,
  );
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

  const limitText: { [key: string]: string } = {
    text: "Definir o limite máximo de caracteres:",
    paragraph: "Definir o limite máximo de caracteres:",
    checked: "Definir o limite máximo de opções selecionadas:",
    file: "Definir o limite máximo de imagens:",
    numeric: "Definir o limite máximo de caracteres:",
    decimal: "Definir o limite máximo de caracteres:",
  };

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
    numeric: {
      label: "Campo de números inteiros",
      description: "Adicione uma entrada de números inteiros",
    },
    decimal: {
      label: "Campo de números decimais",
      description: "Adicione um campo para envio de preços ou outros tipos",
    },
    boolean: {
      label: "Booleano",
      description: "Adicione um campo do tipo booleano",
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
    let currentField: any;
    if (!title.trim()) return;
    if (isUpdate) {
      const fieldToUpdate = template.fields.fields.find((item: any) => {
        return item.id === data?.id;
      });

      currentField = {
        ...fieldToUpdate,
        options:
          type !== "decimal"
            ? option[0] === ""
              ? []
              : option || []
            : [decimalPoint],
        type: type,
        name: name,
        title: title,
        required: required,
        limit: type === "relation" ? 20 : characterLimit || 255,
      };
    } else {
      currentField = {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        type,
        title,
        name,
        limit: type === "relation" ? 20 : characterLimit || 255,
        options: type !== "decimal" ? option || [] : [decimalPoint],
        required,
        is_unique: false,
        is_public: false,
        help_text: "This fiedl will help you to make a new product register",
        description: "Completly random description",
        enforce_exact_length: false,
        group: "",
      };
    }

    delete currentField.frozen;
    delete currentField.order;
    delete currentField.width;
    delete currentField.hidden;
    delete currentField.integrations;

    try {
      if (!isUpdate) {
        await templateRequests.postColumn(currentTemplate?.id, currentField);
        toast.success("Coluna criada com sucesso");
        const newFields = [...template.fields.fields, currentField];
        return newFields;
      } else {
        await templateRequests.patchColumn(currentTemplate?.id, currentField);
        toast.success("Coluna atualizada com sucesso");
        const newFields = [
          ...template.fields.fields.map((item: any) => {
            return item.id === currentField.id ? currentField : item;
          }),
        ];
        return newFields;
      }
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
        style={{ marginBottom: "2vh", top: 30, maxHeight: "90vh" }}
        footer={null}
      >
        <Container isDisabled={data?.default}>
          <div className="titleContainer">
            <Title> {TYPES[type]?.label} </Title>
            <Description>{TYPES[type]?.description}</Description>
          </div>
          <BodyContent>
            <Form
              form={form}
              initialValues={{
                required,
                is_unique: isUnique,
                title,
                name: data?.name,
                type: data?.type,
                limit: characterLimit,
              }}
              onFinish={(fields) => {
                if (!title.trim()) return;
                if (!fields.type) fields.type = type;
                if (
                  fields.type == "relation" &&
                  (options[0].field == "" || !options[0].originField)
                ) {
                  toast.warn("O campo para exibição não pode ser vazio");
                  return;
                }
                if (activeCharacterLimit) {
                  if (isNaN(characterLimit)) {
                    toast.warn(
                      "O campo de limite de caracteres contém um valor invalido",
                    );
                    return;
                  }
                  if (!characterLimit) {
                    toast.warn(
                      "O campo de limite de caracteres não pode ser vazio",
                    );
                    return;
                  }
                  if (!characterLimit) {
                    toast.warn(
                      "O campo de limite de caracteres não pode ser menor do que 0",
                    );
                    return;
                  }
                }

                const customOptions: any[] = [];
                Object.keys(fields).forEach((key) => {
                  if (/option/.test(key) && fields[key]) {
                    customOptions.push(fields[key]);
                    delete fields[key];
                  }
                });

                if (
                  !draggerOptions.length &&
                  ["text", "paragraph", "file"].includes(fields.type)
                ) {
                  fields.option = [""];
                } else if (["radio", "list", "checked"].includes(fields.type)) {
                  fields.option = draggerOptions;
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
                        if (e.target.value.trim()) setTitle(e.target.value);
                      }}
                      placeholder="Informe o titulo da coluna"
                      disabled={data?.default}
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

                        setTitle(e?.target?.value);
                      }}
                      placeholder="Informe o nome do campo"
                      disabled={data?.default}
                    />
                  </Form.Item>
                  {["decimal"].includes(data?.type) && (
                    <Form.Item
                      wrapperCol={{ flex: "auto" }}
                      label="Escolha o separador decimal"
                      rules={[
                        {
                          required: true,
                          message: "Escolha o separador decimal",
                        },
                      ]}
                      style={{ marginBottom: "6px" }}
                    >
                      <Select
                        style={{
                          height: "64px",
                          border: "1px solid #DEE2E6",
                        }}
                        value={decimalPoint}
                        onChange={(e: string) => {
                          setDecimalPoint(e as any);
                        }}
                        placeholder="Escolha o separador decimal"
                      >
                        <Select.Option value="." label="Ponto(.)">
                          Ponto(.)
                        </Select.Option>
                        <Select.Option value="," label="Vírgula(,)">
                          Vírgula(,)
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  )}
                  {!MULTI_SELECT.includes(data?.type) &&
                  ![
                    "relation",
                    "file",
                    "numeric",
                    "decimal",
                    "boolean",
                  ].includes(data?.type) ? (
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
                        disabled={data?.default}
                        value={type}
                        removeIcon
                        onChange={(e: string) => {
                          if (e === "text") {
                            setCharacterLimit(100);
                          }
                          if (e === "paragraph") {
                            setCharacterLimit(512);
                          }
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
                      currentFields={currentTemplate.fields.fields}
                      handleChangeOptions={handleChangeOptions}
                    />
                  ) : (
                    <></>
                  )}
                  {[
                    "text",
                    "paragraph",
                    "checked",
                    "file",
                    "numeric",
                    "decimal",
                  ].includes(data?.type) && (
                    <CharacterLimitContainer>
                      <Form.Item
                        wrapperCol={{ flex: "auto" }}
                        colon={false}
                        label={
                          <div className="label-content">
                            <span>{limitText[data?.type]}</span>
                            <Switch
                              checked={activeCharacterLimit}
                              size="small"
                              onChange={(e) => setActiveCharacterLimit(e)}
                              disabled={data?.default}
                            />
                          </div>
                        }
                        name="limit"
                        style={{
                          marginBottom: "6px",
                          position: "relative",
                        }}
                      >
                        <Input
                          type="number"
                          min={0}
                          max={DefaultLimits[data?.type].max}
                          disabled={!activeCharacterLimit || data?.default}
                          style={{
                            height: "64px",
                            border: "1px solid #DEE2E6",
                          }}
                          value={characterLimit}
                          onChange={(e) => {
                            e.preventDefault();
                            const inputValue = +e.target.value;
                            const maxLimit = DefaultLimits[data?.type].max;

                            if (inputValue > maxLimit) {
                              setCharacterLimit(maxLimit);
                            } else {
                              setCharacterLimit(inputValue);
                            }
                          }}
                          placeholder="Ex.: 10"
                        />
                      </Form.Item>
                    </CharacterLimitContainer>
                  )}
                </InputContainer>

                {MULTI_SELECT.includes(data?.type) ? (
                  <div className="dragger">
                    <p>Opções</p>
                    <Form.Item name="options" className="onDragger">
                      <Dragger
                        options={draggerOptions}
                        setOptions={(e: any) => {
                          setDraggerOptions(e);
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
                  <Switch size="small" disabled={data?.default} />
                </Form.Item>
                <Form.Item
                  name="help_text"
                  label="Texto de ajuda"
                  style={{ marginBottom: "2px" }}
                >
                  <Switch size="small" disabled={data?.default} />
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
                    disabled={data?.default}
                  />
                </Form.Item>
                <Form.Item
                  name="is_unique"
                  label="Campo único"
                  style={{ marginBottom: "2px" }}
                >
                  <Switch
                    size="small"
                    onChange={() => setIsUnique(!isUnique)}
                    checked={isUnique}
                    disabled={data?.default}
                  />
                </Form.Item>
              </Footer>
              <Divider style={{ marginTop: "8px", marginBottom: "0" }} />
              <ButtonContainer>
                <PrimaryButton type="button" onClick={() => onClickModal()}>
                  {" "}
                  Cancelar{" "}
                </PrimaryButton>
                <Principal type="submit" disabled={!enable || data?.default}>
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
