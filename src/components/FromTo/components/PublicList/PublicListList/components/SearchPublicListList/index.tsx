import React from "react";
import { ContainerSearchPublicListList, SearchPublicListList } from "./styles";
import { ReactComponent as SearchIcon } from "../../../../../../../assets/search-gray.svg";

const SearchPublicListListComponent: React.FC = () => {
  return (
    <ContainerSearchPublicListList>
      <SearchPublicListList placeholder="Pesquisar listas públicas" />
      <SearchIcon />
    </ContainerSearchPublicListList>
  );
};

export default SearchPublicListListComponent;
