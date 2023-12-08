import { ContainerProductsPublicTable } from "./styles";
import CustomTable from "../../../../CustomTable";
import { useFromToContext } from "../../../../../context/FromToContext";

function ProductsPublicTable(): JSX.Element {
  const { allRowsSelected, setAllRowsSelected, rowsSelected, setRowsSelected } =
    useFromToContext();
  return (
    <ContainerProductsPublicTable>
      <CustomTable
        isPublic
        allRowsSelected={allRowsSelected}
        setAllRowsSelected={setAllRowsSelected}
        rowsSelected={rowsSelected}
        setRowsSelected={setRowsSelected}
      />
    </ContainerProductsPublicTable>
  );
}

export default ProductsPublicTable;
