import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { toast } from "react-toastify";
import { TitlePage, Content, HeaderTemplates, ImportButton } from "./styles";
import { ReactComponent as EditIcon } from "../../assets/edit-icon.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy-icon.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-icon.svg";
import { ReactComponent as ImportIcon } from "../../assets/import-icon.svg";
import CustomTable from "../../components/Table/index";
import { templateRequests } from "../../services/apis/requests/template";
import TemplateDefault from "../../components/TemplateDefault";
import { IPaginationTemplate } from "./templates";
import { useFilterContext } from "../../context/FilterContext";
import formatDate from "../../components/FromTo/utils/formatDate";
import { useFromToContext } from "../../context/FromToContext";
import FromTo from "../../components/FromTo";

function Template(): JSX.Element {
  const [templates, setTemplates] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { setFromToIsOpened } = useFromToContext();

  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, []);

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleGetTemplates = ({ page, limit }: IPaginationTemplate): void => {
    templateRequests
      .list({ limit, page, list: true })
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

  const handleTakeNewPages = async ({
    limit,
    page,
  }: IPaginationTemplate): Promise<void> => {
    try {
      handleGetTemplates({ page, limit });
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os demais catálogos");
    }
  };

  useEffect(() => {
    handleGetTemplates({ page: 0, limit: 100 });
  }, []);

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
      render: (_: any, record: any) => {
        return (
          <span className="grayText">{formatDate(record.created_at)}</span>
        );
      },
    },
    {
      title: "Última edição",
      key: "updated_at",
      dataIndex: "updated_at",
      width: "15%",
      align: "center",
      render: (_: any, record: any) => {
        return (
          <span className="grayText">{formatDate(record.updated_at)}</span>
        );
      },
    },
    {
      title: "Visibilidade",
      key: "is_public",
      dataIndex: "is_public",
      width: "10%",
      align: "center",
      render: (_: any, _record: any) => {
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

  return (
    <>
      <TemplateDefault
        handleGetTemplates={handleGetTemplates}
        templates={templates}
      >
        <Content>
          <HeaderTemplates>
            <TitlePage>Templates</TitlePage>
            <ImportButton
              onClick={() => {
                setFromToIsOpened(true);
              }}
            >
              <ImportIcon />
              Importar produtos
            </ImportButton>
          </HeaderTemplates>
          <CustomTable
            columns={columns}
            dataProvider={templates}
            size="large"
            rowSelection={rowSelection}
            onLoadMore={handleTakeNewPages}
          />
        </Content>
      </TemplateDefault>
      <FromTo />
    </>
  );
}

export default Template;
