import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerInlineMenu, ItemInlineMenu } from "./styles";
import { ReactComponent as UndoneIcon } from "../../../assets/undoneIcon.svg";
import { ReactComponent as DoneIcon } from "../../../assets/doneIcon.svg";
import { ROUTES } from "../../../constants/routes";

function InlineMenu({
  menus,
  menuActivated,
  setMenuActivated,
  integrationId,
}: {
  menus: { value: string; label: string; status: "undone" | "done" | "" }[];
  menuActivated: string;
  setMenuActivated: React.Dispatch<React.SetStateAction<any>>;
  integrationId: string | null;
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
            setMenuActivated(menu.value);
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
