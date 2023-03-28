/* eslint-disable */
import { toast } from "react-toastify";
import { Divider, Form, Input, Modal, Select, Switch } from "antd"
import { ReactEventHandler, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Dragger } from "../Dragger";
import { BodyContent, Container,
  Description, InputContainer, Title, Item, ButtonContainer, PrimaryButton, Principal, IconContent, BulkButton,
  AddNew, 
  ButtonContainer2} from "./styles";
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down-small.svg";
import {ReactComponent as TrashIcon} from "../../assets/trash-icon.svg";
import {ReactComponent as PlusIcon} from "../../assets/plus-small.svg";


import { templateRequests } from "../../services/apis/requests/template";
import { productContext } from "../../context/products";

interface PropsModal {
  isOpen: boolean;
  onClickModal: () => void;
  data: any;
  template: any;
  onUpdate: Function;
};

export const PersonalModal = ({isOpen,  onClickModal = ()=> {}, data, template, onUpdate}: PropsModal) => {
  const [title, setTitle] = useState<string>(data?.title ?? '');
  const [id, setId] = useState<string>('');
  const [type, setType] = useState<string>(data?.type);
  const [required, setRequired] = useState<boolean>(data?.required ?? false);
  const [isUpdate, setIsUpdate] = useState<boolean>(data?.id);
  const [draggerOptions, setDraggerOptions] = useState<any[]>(data?.options ?? ['']);
  const [dragg, setDragg] = useState<any[]>();
  const formRef = useRef<HTMLFormElement>(null);

  const {headerTable, setHeaderTable} = useContext(productContext);

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

  const MULTI_SELECT = ["checked", "radio", "list"];

  const handleUpdateTemplate = async (filtered: string[]): Promise<any> => {
    let templateUpdated = [];;
    let newField;
    if (isUpdate) {
      templateUpdated = template.fields.fields.map((item) => {
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
        options: filtered,
        required,
        is_public: true,
        help_text: "This fiedl will help you to make a new product register",
        description: "Completly random description"
      };
      templateUpdated.push(newField);
    };

    try {
      await templateRequests.update(template?.id, { fields: templateUpdated });
      setId(newField?.id)
      // setHeaderTable((prev) => [...prev, {data: newField?.id, type,  className: 'htLeft htMiddle',  options: draggerOptions}])
      toast.success("Template atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível alterar o template, tente novamente!");
    }
  };

  const mountOptions = (): any[] => {
    return draggerOptions.map((item, index) => {
      return {
        title: <>
          <Input
            value={item.value ?? item}
            onChange={(e) => {
              console.log("ON change")
              const {value} = e.target;
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
                toast.warn("Este campo não pode conter mais que 12 opções")
                return;
              }
              setDraggerOptions(prevState => [...prevState, ''])
            }}
            autoFocus={index === draggerOptions.length - 1}
          />
          <IconContent onClick={() => {
            if (draggerOptions.length <= 2) {
              toast.warning("Necessário conter ao menos duas opções")
              return;
            }

            let newState = [...draggerOptions];
            newState.splice(index, 1)
            setDraggerOptions(newState);
          }}>
            <TrashIcon />
          </IconContent>
        </>,
        key: index,
        value: item
      }
    })
  }

  useEffect(() => {
    setType(data?.type)
  }, [isOpen, data, draggerOptions]);

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClickModal}
        onOk={onClickModal}
        width="470px"
        style={{ marginBottom: '2vh', top: 50}}
        footer={null}
      >
        <Container>
          <div>
            <Title> {TYPES[type]?.label} </Title>
            <Description>{TYPES[type]?.description}</Description>
          </div>
          <BodyContent>
            <form
              ref={formRef}
              
              className="form"
            >
              <div className="encapsulator">
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
                        e.preventDefault()
                       
                        setTitle(e.target.value)
                      }}
                      defaultValue={title}
                      placeholder="Informe o nome do campo"
                    />
                  </Form.Item>
                  {
                    !MULTI_SELECT.includes(data?.type) ? 
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
                      </Form.Item> : 
                      <></>
                  }
                </InputContainer>
                {
                  MULTI_SELECT.includes(data?.type) ?
                    <div className="dragger">
                      Opções
                      <Dragger
                        options={mountOptions()}
                        handleOnDrop={(info) => {
                          const { dropToGap, node, dragNode } = info;
                          const newTreeData = [...draggerOptions];
                          const dragNodeIndex = newTreeData.findIndex((n: any) => n.key === dragNode.key);
                          newTreeData.splice(dragNodeIndex, 1);
                          const targetIndex = node ? newTreeData.findIndex((n: any) => n.key === node.key) : 0;
                          const dropPosition = info.dropPosition - Number(info.dropToGap);
                          const newIndex = dropPosition === -1 ? targetIndex : targetIndex + 1;
                          const { title, key, value } = dragNode;
                          const newNode = { title, key, value };
                          newTreeData.splice(newIndex, 0, newNode);
                          // setDraggerOptions(newTreeData);
                        }}
                      />
                      <ButtonContainer2>
                        <BulkButton type="button" onClick={() => onClickModal()}> Adicionar opções em massa </BulkButton>
                        <AddNew
                          type="button"
                          onClick={() => {
                            if (draggerOptions.length === 12) {
                              toast.warn("Este campo não pode conter mais que 12 opções")
                              return;
                            }
                            setDraggerOptions(prevState => [...prevState, '']);
                          }}
                        >
                          <PlusIcon />
                          Adicionar opção
                        </AddNew>  
                      </ButtonContainer2>
                    </div> :
                    <></>
                }
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
              </div>
              <ButtonContainer>
                <PrimaryButton type="button" onClick={() => onClickModal()}> Cancelar </PrimaryButton>
                <Principal
                  type="button"
                  onClick={async (e) => {
                    if (title.length == 0) {
                      toast.warn("O Titulo nao pode ser vazio")
                      return;
                    }

                    if (title.length > 20) {
                      toast.warn("O titulo não pode conter mais de 20 caracteres");
                      return;
                    }

                    let filtered;
                    if (draggerOptions.length > 2) {
                      filtered = draggerOptions.filter((item) => {
                        item = item.replace(/ /g, '');
                        if (item !== "") {
                          return item;
                        }
                      }) 

                      setDraggerOptions(filtered);
                    } else {
                      for(const draggOption of draggerOptions) {
                        if (draggerOptions.includes("") || /^[^a-zA-Z0-9]+$/.test(draggOption)) {
                          toast.warn(`As opções não podem ser vazias`);
                          return;
                        }
                      }

                      filtered = [...draggerOptions];
                    }

                    if (draggerOptions.length < 2 && MULTI_SELECT.includes(type)) {
                      toast.warn(`Os campos do to tipo ${TYPES[type]?.label} devem conter mais de uma opção`)
                      return;
                    }

                    e.preventDefault()
                    data.title = title;

                    await handleUpdateTemplate(filtered);
                    onClickModal();
                    const newColumn = {...data, data: id, options: filtered};
                    onUpdate(newColumn);
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
  )
}