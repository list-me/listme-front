import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  HeaderSidebarPublicListList,
  ItemSidebarNamePublicListList,
  ItemSidebarPublicListList,
  SidebarPublicListList,
} from "./styles";

import { ReactComponent as HammerIcon } from "../../../../../../../assets/icons/publicList/hammer.svg";
import { ReactComponent as LampIcon } from "../../../../../../../assets/icons/publicList/lamp.svg";
import { ReactComponent as PenAndRulerIcon } from "../../../../../../../assets/icons/publicList/penAndRuler.svg";
import { ReactComponent as SofaIcon } from "../../../../../../../assets/icons/publicList/sofa.svg";
import { ReactComponent as TvIcon } from "../../../../../../../assets/icons/publicList/tv.svg";
import { categoriesRequest } from "../../../../../../../services/apis/requests/categories";
import { useFromToContext } from "../../../../../../../context/FromToContext";

interface ICategory {
  created_at: string;
  deleted_at: string;
  description: string;
  id: string;
  is_parent: boolean;
  name: string;
  updated_at: string;
}

function SidebarPublicListListComponent({
  setCurrentCategoryId,
}: {
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const items = [
    { name: "Ver tudo", icon: <SofaIcon /> },
    { name: "Casa e Decoração", icon: <SofaIcon /> },
    { name: "Áudio & Vídeo", icon: <TvIcon /> },
    { name: "Eletrodomésticos", icon: <LampIcon /> },
    { name: "Construção", icon: <HammerIcon /> },
    { name: "Escritório", icon: <PenAndRulerIcon /> },
  ];

  const handleGetCategories = async (): Promise<void> => {
    await categoriesRequest
      .list()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar as categorias");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <SidebarPublicListList>
      <HeaderSidebarPublicListList>Categorias</HeaderSidebarPublicListList>
      <ItemSidebarPublicListList onClick={() => setCurrentCategoryId("")}>
        {items[0].icon}
        <ItemSidebarNamePublicListList>
          {items[0].name}
        </ItemSidebarNamePublicListList>
      </ItemSidebarPublicListList>
      {categories.map((item) => (
        <ItemSidebarPublicListList
          onClick={() => setCurrentCategoryId(item.id)}
        >
          {items[3].icon}
          <ItemSidebarNamePublicListList>
            {item.name}
          </ItemSidebarNamePublicListList>
        </ItemSidebarPublicListList>
      ))}
    </SidebarPublicListList>
  );
}

export default SidebarPublicListListComponent;
