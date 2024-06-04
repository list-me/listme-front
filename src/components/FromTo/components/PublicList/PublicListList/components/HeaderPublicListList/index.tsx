import React from "react";
import {
  CotainerSelectPublicListList,
  HeaderPublicListList,
  TitlePublicListList,
} from "./styles";
import SelectComponent from "../../../../../../Select";

function HeaderPublicListListComponent({
  selectFilter,
  setSelectFilter,
}: {
  selectFilter: {
    label: string;
    value: string;
  };
  setSelectFilter: React.Dispatch<
    React.SetStateAction<{
      label: string;
      value: string;
    }>
  >;
}): JSX.Element {
  return (
    <HeaderPublicListList>
      <TitlePublicListList>Lists públicas</TitlePublicListList>
      <CotainerSelectPublicListList>
        <SelectComponent
          small
          select={selectFilter}
          onChange={(e) => setSelectFilter(e)}
          options={[
            { label: "Mais recente", value: "created_at" },
            { label: "Ordem alfabética", value: "name" },
          ]}
          placeHolder=""
        />
      </CotainerSelectPublicListList>
    </HeaderPublicListList>
  );
}

export default HeaderPublicListListComponent;
