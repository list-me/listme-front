import React from "react";
import { Contents, Filters, Item } from "../../../pages/products/styles";
import { Temp } from "../../Temp";
import { ReactComponent as HelpIcon } from "../../../assets/help.svg";
import { IHeaderTable } from "../../../context/products";

interface IFiltersComponent {
  headerTable: IHeaderTable[];
  handleGetProductFiltered: (keyword: string) => void;
}

const FiltersComponent: React.FC<IFiltersComponent> = ({
  headerTable,
  handleGetProductFiltered,
}) => {
  return (
    <Filters>
      <Temp options={headerTable} handleSearch={handleGetProductFiltered} />
      <Contents>
        <Item>
          <HelpIcon />
          Ajuda
        </Item>
      </Contents>
    </Filters>
  );
};

export default FiltersComponent;
