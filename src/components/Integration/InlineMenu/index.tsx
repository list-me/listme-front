import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ContainerInlineMenu, ItemInlineMenu } from "./styles";
import { ReactComponent as UndoneIcon } from "../../../assets/undoneIcon.svg";
import { ReactComponent as DoneIcon } from "../../../assets/doneIcon.svg";
import { ROUTES } from "../../../constants/routes";

function InlineMenu({
  menus,
  menuActivated,
  setMenuActivated,
  integrationId,
  mode,
  setMode,
}: {
  menus: { value: string; label: string; status: "undone" | "done" | "" }[];
  menuActivated: string;
  setMenuActivated: React.Dispatch<React.SetStateAction<any>>;
  integrationId: string | null;
  mode: "editing" | "registration" | null;
  setMode: React.Dispatch<React.SetStateAction<"editing" | "registration">>;
}): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (integrationId && menuActivated) {
      navigate(`${ROUTES.INTEGRATION}/${menuActivated}/${integrationId}`);
    }
  }, [integrationId, menuActivated, navigate]);
  return (
    <ContainerInlineMenu>
      {menus.map((menu) => (
        <ItemInlineMenu
          key={menu.value}
          isActivated={menu.value === menuActivated}
          onClick={() => {
            if (mode === "registration" && menu.value === "products") {
              if (
                menus[0].status === "undone" ||
                menus[1].status === "undone" ||
                menus[2].status === "undone"
              ) {
                toast.error(
                  "Você precisa configurar a Marca, Categorias e Características antes de configurar o Produto",
                );
              } else {
                setMenuActivated(menu.value);
              }
            } else setMenuActivated(menu.value);
            if (menu.status && menu.status === "done") {
              setMode("editing");
            } else {
              setMode("registration");
            }
          }}
        >
          {menu.status === "undone" && <UndoneIcon />}
          {menu.status === "done" && <DoneIcon />}
          {menu.label}
        </ItemInlineMenu>
      ))}
    </ContainerInlineMenu>
  );
}

export default InlineMenu;
