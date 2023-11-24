import { ContainerProductsPublicTable } from "./styles";
import CustomTable from "../../../../CustomTable";

function ProductsPublicTable(): JSX.Element {
  return (
    <ContainerProductsPublicTable>
      <CustomTable isPublic />
    </ContainerProductsPublicTable>
  );
}

export default ProductsPublicTable;
