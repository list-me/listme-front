import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import { toast } from "react-toastify";
import { TitlePage, Content, HeaderTemplates, ImportButton } from "./styles";
import { ReactComponent as RefreshIcon } from "../../assets/refresh.svg";
import { ReactComponent as ImportIcon } from "../../assets/import-icon.svg";
import { ReactComponent as EllipsisIcon } from "../../assets/verticalEllipsis.svg";
import CustomTable from "../../components/Table/index";
import { templateRequests } from "../../services/apis/requests/template";
import TemplateDefault from "../../components/TemplateDefault";
import { IPaginationTemplate } from "./templates";
import { useFilterContext } from "../../context/FilterContext";
import formatDate from "../../components/FromTo/utils/formatDate";
import { useFromToContext } from "../../context/FromToContext";
import FromTo from "../../components/FromTo";
import UpdateProducts from "../../components/FromTo/components/ManageLinkedLists/UpdateProducts";

function Template(): JSX.Element {
  const [templates, setTemplates] = useState();
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [templatesSyncIds, setTemplatesSyncIds] = useState<string[]>([]);

  const { setFromToIsOpened } = useFromToContext();

  const { setFilters, defaultFilter, setFilterStatus, setConditions } =
    useFilterContext();

  useEffect(() => {
    setConditions([]);
    setFilters([defaultFilter]);
    setFilterStatus(false);
  }, []);

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
      width: "20%",
      align: "center",
      render: (_: any, record: any) => {
        const total =
          record.total >= 1000
            ? Number(record.total / 1000).toFixed(3)
            : record.total;

        const totalNewProducts = record?.templates_sync_ids?.reduce(
          (sum: number, item: any) => sum + item.new_products_amount,
          0,
        );

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#3818D9" }}> {total} </span>
            {totalNewProducts > 0 ? (
              <button
                type="button"
                style={{
                  background: "#F15757",
                  color: "#fff",
                  fontSize: "12px",
                  height: "17px",
                  padding: "0 4px",
                  borderRadius: "99px",
                  border: "none",
                  flexShrink: 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                +{totalNewProducts} Novos
              </button>
            ) : (
              <></>
            )}
          </div>
        );
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
      render: (_: any, record: any) => (
        <Space size="large">
          {record.templates_sync_ids && (
            <button
              type="button"
              className="actionButtons refresh"
              onClick={(e) => {
                const ids = record.templates_sync_ids
                  .map((item: any) => item)
                  .filter((fItem: any) => fItem.new_products_amount > 0)
                  .map((mItem: any) => mItem.template_sync_id);
                setTemplatesSyncIds(ids);
                setUpdateModalOpened(true);
                e.stopPropagation();
              }}
            >
              <RefreshIcon />
            </button>
          )}
          <button
            type="button"
            className="actionButtons ellipsis"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EllipsisIcon />
          </button>
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
            onLoadMore={handleTakeNewPages}
          />
        </Content>
      </TemplateDefault>
      <FromTo />
      {updateModalOpened && (
        <UpdateProducts
          setIsOpened={setUpdateModalOpened}
          ids={templatesSyncIds}
        />
      )}
    </>
  );
}

export default Template;
