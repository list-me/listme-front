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

interface ICategory {
  created_at: string;
  deleted_at: string;
  description: string;
  id: string;
  icon: string;
  is_parent: boolean;
  name: string;
  updated_at: string;
}

type IconKey = "sofa" | "tv" | "lamp" | "hammer" | "pen";

function SidebarPublicListListComponent({
  setCurrentCategoryId,
}: {
  setCurrentCategoryId: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const icon: Record<IconKey, JSX.Element> = {
    sofa: <SofaIcon />,
    tv: <TvIcon />,
    lamp: <LampIcon />,
    hammer: <HammerIcon />,
    pen: <PenAndRulerIcon />,
  };

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
        <SofaIcon />
        <ItemSidebarNamePublicListList>Ver tudo</ItemSidebarNamePublicListList>
      </ItemSidebarPublicListList>
      {categories.map((item) => (
        <ItemSidebarPublicListList
          onClick={() => setCurrentCategoryId(item.id)}
        >
          {icon[item.icon as IconKey] || <SofaIcon />}
          <ItemSidebarNamePublicListList>
            {item.name}
          </ItemSidebarNamePublicListList>
        </ItemSidebarPublicListList>
      ))}
    </SidebarPublicListList>
  );
}

export default SidebarPublicListListComponent;
