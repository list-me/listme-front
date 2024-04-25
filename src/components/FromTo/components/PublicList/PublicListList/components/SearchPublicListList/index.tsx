import React from "react";
import { ContainerSearchPublicListList, SearchPublicListList } from "./styles";
import { ReactComponent as SearchIcon } from "../../../../../../../assets/search-gray.svg";

function SearchPublicListListComponent({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <ContainerSearchPublicListList>
      <SearchPublicListList
        placeholder="Pesquisar Lists públicas"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <SearchIcon />
    </ContainerSearchPublicListList>
  );
}

export default SearchPublicListListComponent;
