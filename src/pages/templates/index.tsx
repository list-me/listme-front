import React, {ReactComponentElement, useEffect, useState} from "react";
import {Space, Tag} from "antd";
import {Sidebar} from "../../components/Sidebar";
import {Header} from "../../components/Header";
import {TitlePage, Container, Content, Capsule} from "./styles";
import {Button} from "../../components/Button";
// @ts-ignore
import { ReactComponent as AddIcon} from '../../assets/add-secondary.svg';
// @ts-ignore
import { ReactComponent as EditIcon} from "../../assets/edit-icon.svg"
// @ts-ignore
import { ReactComponent as CopyIcon} from "../../assets/copy-icon.svg";
// @ts-ignore
import { ReactComponent as TrashIcon} from "../../assets/trash-icon.svg";
import {CustomTable} from "../../components/Table/index";
import {CustomModal} from "../../components/Modal";
import {templateRequests} from "../../services/apis/requests/template";

export const Template = () => {
    const [templates, setTemplates] = useState();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const handleGetTemplates = () => {
        templateRequests.list({}).then((response) => {
            setTemplates(response?.templates)
        }).catch((error) => {
            console.error(error);
        })
    }

    const columns = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id"
        },
        // {
        //     title: "Ícone",
        //     key: "icon",
        //     dataIndex: "icon",
        //     width: "10%",
        //     render: (_:any, record: any) => ( getIcon(record.icon.toUpperCase())),
        // },
        {
            title: "Nome",
            key: "name",
            dataIndex: "name",
            width: "20%",
        },
        {
            title: "Produtos",
            key: "total",
            dataIndex: "total",
            width: "5%",
            align: "center",
            render: (_:any, record: any) => {
                return (
                    <label style={{color: "#3818D9"}}> {record.total} </label>
                );
            }
        },
        {
            title: "Criado em",
            key: "created_at",
            dataIndex: "created_at",
            width: "13%",
            align: "center"
        },
        {
            title: "Última edição",
            key: "updated_at",
            dataIndex: "updated_at",
            width: "13%",
            align: "center",
        },
        {
            title: "Visibilidade",
            key: "is_public",
            dataIndex: "is_public",
            width: "10%",
            align: "center",
            render: (_: any, record: any) => {
                const background = record.is_public ? "#3818D9" : "#DEE2E6";
                const color = record.is_public ? "#FFFFFF" : "#212529";
                return (
                    <Tag
                        color={background}
                        style={{color, padding: "3px 10px"}}
                    >
                        {record.is_public ? "Público" : "Privado"}
                    </Tag>
                )
            }
        },
        {
            title: "Ações",
            key: "id",
            width: "15%",
            align: "center",
            render: () => (
              <Space
                  size="middle"
              >
                  <span className="actionButtons">
                      <EditIcon />
                  </span>
                  <span className="actionButtons">
                    <CopyIcon />
                  </span>
                  <span className="actionButtons">
                      <TrashIcon />
                  </span>
              </Space>
            ),
        },
    ];

    useEffect(() => {
        handleGetTemplates()
    }, [])

    return (
        <Capsule>
            <Sidebar />
            <Header />
            <CustomModal
                isOpen={modalIsOpen}
                onClickModal={() => setModalIsOpen(!modalIsOpen)}
            />
            <Content>
                <Container>
                    <TitlePage> Catálogos </TitlePage>
                    <Button
                        isLoading={false}
                        width='200px'
                        height='50px'
                        isSecondary
                        onClickModal={() => {
                            setModalIsOpen(!modalIsOpen)
                        }}
                    >
                        <AddIcon />
                        Novo template
                    </Button>
                </Container>
                <CustomTable
                    columns={columns}
                    dataProvider={templates}
                    size="small"
                    styles={{}}
                />
            </Content>
        </Capsule>
    );
}
