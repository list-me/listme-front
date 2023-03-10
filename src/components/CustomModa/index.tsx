import { toast } from "react-toastify";
import { Divider, Form, Input, Modal, Select, Switch } from "antd"
import { ReactEventHandler, useCallback, useContext, useEffect, useState } from "react";
import { BodyContent, Container, Description, InputContainer, Title, Item, ButtonContainer, PrimaryButton, Principal } from "./styles";
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down-small.svg";
import { productContext } from "../../context/products";
import { templateRequests } from "../../services/apis/requests/template";

interface PropsModal {
  isOpen: boolean;
  onClickModal: () => void;
  data: any;
  template: any;
  onUpdate: Function;
};

export const PersonalModal = ({isOpen,  onClickModal = ()=> {}, data, template, onUpdate}: PropsModal) => {
  const [title, setTitle] = useState<string>(data?.title ?? '');
  const [type, setType] = useState<string>(data?.type);
  const [required, setRequired] = useState<boolean>(data?.required ?? false);
  const [isUpdate, setIsUpdate] = useState<boolean>(data?.id);
  const options = [
    {
      label: "Texto curto",
      value: "text"
    },
    {
      label: "Texto longo",
      value: "paragraph"
    },
    // {
    //   label: "Lista suspensa",
    //   value: "checked"
    // },
    // {
    //   label: "Caixa de seleção",
    //   value: "list"
    // },
    // {
    //   label: "Escolha única",
    //   value: "radio"
    // },
    // {
    //   label: "Imagem",
    //   value: "files"
    // },
  ];

  const TYPES = {
    text: {
      label: "Campo de texto",
      description: "Adicione uma entrada de texto curto"
    },
    paragraph: {
      label: "Paragrafo",
      description: "Adicione uma entrada de texto longo"
    },
    radio: {
      label: "Escolha única",
      description: "Adicione um campo com opções de escolha única"
    },
    checked: {
      label: "Caixa de seleção",
      description: "Adicione uma lista de opções a serem escolhidas"
    },    
    list: {
      label: "Lista suspensa",
      description: "Adicione uma lista de opções a serem escolhidas"
    }
    
  }

  const handleUpdateTemplate = async (): Promise<any> => {
    let templateUpdated = []
    if (isUpdate) {
      templateUpdated = template.fields.fields.map((item) => {
          if (item.id === data.id) {
              item = data;
              return item;
          }
  
          return item;
      });
    } else {
      templateUpdated.push(...template.fields.fields);
      templateUpdated.push({
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        type,
        title,
        options: [""],
        required,
        is_public: true,
        help_text: "This fiedl will help you to make a new product register",
        description: "Completly random description"
      });
    };

    try {
      await templateRequests.update(template?.id, { fields: templateUpdated });
      console.log("apareci primeiro");
      toast.success("Template atualizado com sucesso");
    } catch (error) {
      console.log({ error });
      console.error(error);
      toast.error("Não foi possível");
    }

    console.log("aparecer dps")
  }

  useEffect(() => {
    setType(data?.type)
  }, [isOpen, data]);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClickModal}
        onOk={onClickModal}
        width="470px"
        style={{height: "fitContent", padding: "0"}}
        footer={null}
      >
        <Container>
          <div>
            <Title> {TYPES[type]?.label} </Title>
            <Description>{TYPES[type]?.description}</Description>
          </div>
          <BodyContent>
            <InputContainer>
              <Form.Item
                label="Titulo do campo"
                name="title"
                rules={[{required: true, message: "Insira o título do campo"}]}
              >
                <Input
                  style={{
                    height: "64px",
                    border: "1px solid #DEE2E6"
                  }}
                  value={title}
                  onChange={(e) => {
                      setTitle(e.target.value)
                  }}
                  defaultValue={title}
                  placeholder="Informe o nome do campo"
                />
              </Form.Item>
              <Form.Item
                  label="Escolha o tipo de valor"
                  name="type"
                  rules={[{required: true, message: "Escolha o tipo de valor"}]}
              >
                <Select
                  style={{
                    height: "64px",
                    border: "1px solid #DEE2E6"
                  }}
                  value={type}
                  removeIcon
                  onChange={(e: string) => {
                    setType(e);
                  }}
                  placeholder="Informe o nome do campo"
                  options={options}
                  defaultValue="text"
                />
              </Form.Item>
            </InputContainer>
            <Item>
              Descrição
              <Switch
                size="small"
              />
            </Item>
            <Item >
              Texto de ajuda
              <Switch size="small"/>
            </Item>
            <Item>
              Campo obrigatório
              <Switch
                size="small"
                onChange={() => setRequired(!required)}
                defaultChecked={required}
              />
            </Item>
            <Divider
              style={{marginTop: "38px", marginBottom:"0"}}
            />
            <ButtonContainer>
              <PrimaryButton onClick={() => onClickModal()}> Cancelar </PrimaryButton>
              <Principal
                onClick={async () => {
                  data.title = title;
                  await handleUpdateTemplate()
                  onUpdate(data)
                  onClickModal()
                }}
              > Salvar </Principal>
            </ButtonContainer>
          </BodyContent>
        </Container>
      </Modal>
    </>
  )
}