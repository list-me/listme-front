/* eslint-disable react/destructuring-assignment */
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Table, TablePaginationConfig } from "antd";
import { Container } from "./styles";
import { ROUTES } from "../../constants/routes";

function CustomTable(props: any): JSX.Element {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(0);

  const handleChangePageSize = (_current: number, size: number): void => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const handleChangePage = (page: number): void => {
    setCurrentPage(page);
  };

  const sizeType = props.size ?? "middle";

  const paginationConfig: TablePaginationConfig = {
    position: ["bottomRight"],
    size: sizeType,
    current: currentPage,
    pageSize,
    total: props?.dataProvider?.length,
    onChange: handleChangePage,
    onShowSizeChange: handleChangePageSize,
    showSizeChanger: false,
  };

  const verifyLimitRows = (height: number): number => {
    const constants = {
      header: 96,
      title: 101,
      headerTable: 56,
      paddingNavigation: 62,
      rowHeight: 83,
      marginError: 1, // Considerando o menos 1 para não vazar o sidebar
    };

    const tableContainerContent =
      height -
      constants.header -
      constants.title -
      constants.headerTable -
      constants.paddingNavigation;

    const countRows =
      Math.round(tableContainerContent / constants.rowHeight) -
      constants.marginError;

    const newPageSize = Math.max(3, countRows);

    setPageSize(newPageSize);
    return newPageSize;
  };

  const handleResize = useCallback(() => {
    const windowHeight = window.innerHeight;
    verifyLimitRows(windowHeight);
  }, []);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    verifyLimitRows(windowHeight);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
        onRow={(record, _rowIndex) => {
          return {
            onClick: () => navigate(`${ROUTES.PRODUCTS}/${record.id}`),
          };
        }}
      />
    </Container>
  );
}

export default CustomTable;
