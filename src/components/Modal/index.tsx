import React, {useEffect, useState} from "react";
import {Menu, MenuProps, Modal} from 'antd';
import {
    Container,
    SideBar,
    Title,
    Templates,
    NewTemplate,
    Contents,
    HeaderModal,
    NewTemplateContent,
    TemplateIcon,
    TemplateLabel
} from './styles';

// @ts-ignore
import {ReactComponent as ArrowIcon} from '../../assets/right-arrow.svg';
// @ts-ignore
import {ReactComponent as PlusIcon} from '../../assets/plus.svg';

interface ICustomModalProps {
    isOpen: boolean;
    onClickModal: () => void;
}

export const CustomModal: React.FC<ICustomModalProps> = ({ isOpen, onClickModal = () => {} }) => {
    const [openKeys, setOpenKeys] = useState(["sub1"]);

    const handleGetCategories = () => {

    }

    const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
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
    ];

    const rootSubmenuKeys = ["sub1", "sub2"];

    const templateContents = [
        "Esporte e Lazer", "Pet Shop", "Decoração", "Musica", "Saude", "Tablet", "Jardinagem", "Ferramentas"
    ];



    useEffect(() => {

    }, [])

    return (
      <Container>
          <Modal
              open={isOpen}
              onCancel={onClickModal}
              onOk={onClickModal}
              centered
              width="70%"
              footer={null}
              bodyStyle={{ height: "80vh", overflow: "auto", display: "flex" }}
          >
              <SideBar>
                  <Title> Galeria de Templates </Title>
                  <Menu
                      mode="inline"
                      openKeys={openKeys}
                      onOpenChange={onOpenChange}
                      items={items}
                  />
              </SideBar>
              <Templates>
                  <HeaderModal>
                      <h1>Templates de produtos</h1>
                  </HeaderModal>
                  <NewTemplate>
                      <NewTemplateContent>
                          <TemplateIcon>
                              <PlusIcon />
                          </TemplateIcon>
                          <TemplateLabel>
                              <label> Em branco </label>
                              <span>
                                  Iniciar do zero
                                  <ArrowIcon />
                              </span>
                          </TemplateLabel>
                      </NewTemplateContent>
                  </NewTemplate>
                  <Contents>
                      {
                          templateContents.map((item) => (
                              <NewTemplateContent
                                isItem
                              >
                                  <TemplateIcon>
                                      <PlusIcon />
                                  </TemplateIcon>
                                  <TemplateLabel>
                                      <label> {item} </label>
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
              </Templates>
          </Modal>
      </Container>
  );
}
