import React from "react";
import {
  ContainerPublicListList,
  SidebarPublicListList,
  HeaderPublicListList,
  ItemSidebarNamePublicListList,
  ItemSidebarPublicListList,
} from "./styles";

import { ReactComponent as HammerIcon } from "../../../../../assets/icons/publicList/hammer.svg";
import { ReactComponent as LampIcon } from "../../../../../assets/icons/publicList/lamp.svg";
import { ReactComponent as PenAndRulerIcon } from "../../../../../assets/icons/publicList/penAndRuler.svg";
import { ReactComponent as SofaIcon } from "../../../../../assets/icons/publicList/sofa.svg";
import { ReactComponent as TvIcon } from "../../../../../assets/icons/publicList/tv.svg";

const PublicListList: React.FC = () => {
  const items = [
    { name: "Ver tudo", icon: <SofaIcon /> },
    { name: "Casa e Decoração", icon: <SofaIcon /> },
    { name: "Áudio & Vídeo", icon: <TvIcon /> },
    { name: "Eletrodomésticos", icon: <LampIcon /> },
    { name: "Construção", icon: <HammerIcon /> },
    { name: "Escritório", icon: <PenAndRulerIcon /> },
  ];
  return (
    <ContainerPublicListList>
      <SidebarPublicListList>
        <HeaderPublicListList>Categorias</HeaderPublicListList>
        {items.map((item) => (
          <ItemSidebarPublicListList>
            {item.icon}
            <ItemSidebarNamePublicListList>
              {item.name}
            </ItemSidebarNamePublicListList>
          </ItemSidebarPublicListList>
        ))}
      </SidebarPublicListList>
    </ContainerPublicListList>
  );
};

export default PublicListList;
