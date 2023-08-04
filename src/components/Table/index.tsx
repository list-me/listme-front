import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Table, TablePaginationConfig } from "antd";
import { Container } from "./styles";
import { productContext } from "../../context/products";
import { ROUTES } from "../../constants/routes";
import { toast } from "react-toastify";

export const CustomTable = (props: any) => {
  const productHook = useContext(productContext);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(
    window.innerWidth >= 1024 && window.innerWidth <= 1536 ? 6 : 10,
  );

  const handleChangePageSize = (current: number, size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    // props.onLoadMore({ pageSize, page });
  };

  const sizeType = props.size ?? "middle";

  const paginationConfig: TablePaginationConfig = {
    position: ["bottomRight"],
    size: sizeType,
    current: currentPage,
    pageSize: pageSize,
    total: props?.dataProvider?.length,
    onChange: handleChangePage,
    onShowSizeChange: handleChangePageSize,
  };

  return (
    <Container>
      <Table
        columns={props.columns}
        dataSource={props.dataProvider}
        rowKey={(record) => record.id}
        size={sizeType}
        style={{
          fontFamily: '"Satoshi Regular", sans-serif',
          background: "#F3F4F6",
        }}
        pagination={paginationConfig}
        rowSelection={props.rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => navigate(`${ROUTES.PRODUCTS}/${record.id}`),
          };
        }}
      />
    </Container>
  );
};
