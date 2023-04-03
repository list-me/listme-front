import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Menu, MenuProps, Modal} from 'antd';
import {
    Container,
    SideBar,
    Content,
    Bar,
    Contents,
    SectionTitle,
    NewTemplateContent,
    IconTemplate,
    TemplateLabel,
    MyTemplates,
    Item,
    Information
} from './styles';
import {ReactComponent as ArrowIcon} from '../../assets/right-arrow.svg';
import {ReactComponent as PlusIcon} from '../../assets/plus.svg';
import {ReactComponent as Flag} from '../../assets/icons/flag.svg';
import {categoriesRequest} from "../../services/apis/requests/categories";
import {templateRequests} from "../../services/apis/requests/template";

interface ICustomModalProps {
    isOpen: boolean;
    onClickModal: () => void;
}

export const TempModal: React.FC<ICustomModalProps> = ({ isOpen, onClickModal = () => {} }) => {
    const [openKeys, setOpenKeys] = useState<string[]>();
    const [categoryCollection, setCategoryCollection] = useState<MenuItem[]>();
    const [templates, setTemplates] = useState<any[]>();

    const handleGetCategories = () => {
        categoriesRequest.list()
            .then((response) => {
                const items = nestCategories(response);
                setCategoryCollection(items);
            }).catch((error) => {
                toast.error(`Ocorreu um erro ao carregar as categorias`)
                console.error(error);
        });
    }

    const handleGetTemplates = () => {
        templateRequests.list({page: 0, limit: 4})
            .then((response) => setTemplates(response))
            .catch((error) => console.error(error))
    }

    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    type MenuItem = Required<MenuProps>["items"][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type
        } as MenuItem
    }

    const items: MenuItem[] = [
        getItem("Category One", "sub1", "",[
            getItem("Sub Category 1", "1"),
            getItem("Sub Category 2", "2"),
            getItem("Sub Category 3", "3"),
        ]),
        getItem("Category Two", "sub2", "",[
            getItem("Sub Category 1", "1"),
            getItem("Sub Category 2", "2"),
            getItem("Sub Category 3", "3"),
        ]),
        getItem("Category 3", "sub3", ""),
    ];

    const nestCategories = (categories: any[]) => {
        const defaultItem = getItem("Meus Templates", "1")
        const response = categories.map((category) => {
            return getItem(
                category?.name,
                category?.id
            )
        });

        return [defaultItem, ...response];
    }

    const rootSubmenuKeys = ["sub1", "sub2"];

    const templateContents = [
        {
            name: "Esporte e Lazer",
            id: 1
        },
        {
            name: "Pet Shop",
            id: 2
        },
        {
            name: "Decoração",
            id: 3
        },
        {
            name: "Musica",
            id: 4
        }
    ];

    useEffect(() => {
        handleGetCategories();
        handleGetTemplates();
    }, [])

    return (
      <Container>
          <Modal
              open={isOpen}
              onCancel={onClickModal}
              onOk={onClickModal}
              centered
              width="928px"
              footer={null}
              bodyStyle={{ display: "flex"}}
              className="modalTest"
          >
              <SideBar>
                  <SectionTitle
                      isHeader
                      weight={700}
                  >
                      Buscar modelos
                  </SectionTitle>
                  <Menu
                      mode="inline"
                      // openKeys={openKeys}
                      onOpenChange={onOpenChange}
                      items={categoryCollection}
                  />
              </SideBar>
              <Bar />
              <Content>
                  <SectionTitle
                    isHeader
                  >
                      Modelos de templates
                  </SectionTitle>
                  <NewTemplateContent>
                      <IconTemplate isNew >
                          <PlusIcon />
                      </IconTemplate>
                      <TemplateLabel>
                          <label> Em branco </label>
                          <span>
                              Iniciar do zero
                              <ArrowIcon />
                          </span>
                      </TemplateLabel>
                  </NewTemplateContent>
                  <SectionTitle>
                    Meus templates
                  </SectionTitle>
                  <MyTemplates>
                      {
                          templates?.length ?
                          templates.map((template) => {
                              return(
                                  <Item key={template.id}>
                                      <IconTemplate>
                                          <Flag />
                                      </IconTemplate>
                                      {template.name}
                                      <Information>
                                          {template.total} produtos
                                      </Information>
                                  </Item>
                              );
                          }) :
                          <></>
                      }
                  </MyTemplates>
                  <SectionTitle>
                      Mais templates
                  </SectionTitle>
                  <Contents>
                      {
                          templateContents.map((item) => (
                              <NewTemplateContent
                                isItem
                                key={item.id}
                              >
                                  <IconTemplate>
                                      <Flag />
                                  </IconTemplate>
                                  <TemplateLabel>
                                      <label> {item.name} </label>
                                      <span>
                                          Ver templates
                                          <ArrowIcon />
                                      </span>
                                  </TemplateLabel>
                              </NewTemplateContent>
                              )
                          )
                      }
                  </Contents>
              </Content>
          </Modal>
      </Container>
  );
}
