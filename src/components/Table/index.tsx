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
  };

  function verifyLimitRows(height: number): number {
    // 96 de header
    // 101 de title
    // 56 do header da tabela
    // 62 padding com a navegaçao da tabela
    // o que sobra é o container da tabela somente com o seu content onde cada linha é 83
    const tableContainerContent = height - 96 - 101 - 56 - 62;
    //  o menos 1 pra nao vazar o sidebar
    const countRows = Math.round(tableContainerContent / 83) - 1;
    if (countRows < 3) {
      setPageSize(3);
      return 3;
    }

    setPageSize(countRows);
    return countRows;
  }

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
