import React, { ReactComponentElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Space, Table, Tag } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { toast } from "react-toastify";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/Header";
import { TitlePage, Container, Content, Capsule } from "./styles";
import Button from "../../components/Button";
// @ts-ignore
import { ReactComponent as AddIcon } from "../../assets/add-secondary.svg";
// @ts-ignore
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
// @ts-ignore
import { ReactComponent as CopyIcon } from "../../assets/copy-icon.svg";
// @ts-ignore
import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";
import { CustomTable } from "../../components/Table/index";
import { templateRequests } from "../../services/apis/requests/template";
import { TemplateDefault } from "../../components/TemplateDefault";

interface IPaginationTemplate {
  page?: number;
  limit?: number;
}

const Template = () => {
  const [templates, setTemplates] = useState();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleTakeNewPages = async ({
    limit,
    page,
  }: IPaginationTemplate): Promise<void> => {
    setLoading(true);
    try {
      handleGetTemplates({ page, limit });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Ocorreu um erro ao carregar os demais catálogos");
    }
  };

  const handleGetTemplates = ({
    page = 0,
    limit = 50,
  }: IPaginationTemplate) => {
    templateRequests
      .list({ limit, page })
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClick = (record: any, rowIndex: number | undefined): void => {};

  const columns = [
    {
      title: "ID",
      key: "order",
      dataIndex: "order",
      width: "5%",
      render: (_: any, record: any) => {
        return <span style={{ color: "#212529" }}> {record.order} </span>;
      },
    },
    {
      title: "Nome",
      key: "name",
      dataIndex: "name",
      width: "55%",
      render: (_: any, record: any) => {
        return <span style={{ color: "#212529" }}> {record.name} </span>;
      },
    },
    {
      title: "Produtos",
      key: "total",
      dataIndex: "total",
      width: "5%",
      align: "center",
      render: (_: any, record: any) => {
        const total =
          record.total >= 1000
            ? Number(record.total / 1000).toFixed(3)
            : record.total;
        return <span style={{ color: "#3818D9" }}> {total} </span>;
      },
    },
    {
      title: "Criado em",
      key: "created_at",
      dataIndex: "created_at",
      width: "13%",
      align: "center",
    },
    {
      title: "Última edição",
      key: "updated_at",
      dataIndex: "updated_at",
      width: "15%",
      align: "center",
    },
    {
      title: "Visibilidade",
      key: "is_public",
      dataIndex: "is_public",
      width: "10%",
      align: "center",
      render: (_: any, record: any) => {
        // const background = record.is_public ? "#3818D9" : "#DEE2E6";
        // const color = record.is_public ? "#FFFFFF" : "#212529";
        const background = "#DEE2E6";
        const color = "#212529";
        return (
          <Tag
            color={background}
            style={{
              color,
              padding: "4px 8px",
              width: "64px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontFamily: '"Satoshi Bold", sans-serif',
              fontWeight: 700,
            }}
          >
            Privado
            {/* {record.is_public ? "Público" : "Privado"} */}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: "action",
      width: "15%",
      align: "center",
      render: () => (
        <Space size="large">
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
    handleGetTemplates({});
  }, [modalIsOpen]);

  return (
    <TemplateDefault>
      <Content>
        <TitlePage> Templates </TitlePage>
        <CustomTable
          columns={columns}
          dataProvider={templates}
          size="large"
          rowSelection={rowSelection}
          onLoadMore={handleTakeNewPages}
        />
      </Content>
    </TemplateDefault>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { Template };
