import React from "react";
import { ContainerInlineMenu, ItemInlineMenu } from "./styles";
import { ReactComponent as IncompleteIcon } from "../../../assets/incompleteIcon.svg";
import { ReactComponent as DoneIcon } from "../../../assets/doneIcon.svg";

function InlineMenu({
  menus,
  menuActivated,
  setMenuActivated,
}: {
  menus: { value: string; label: string; status: "incomplete" | "done" | "" }[];
  menuActivated: string;
  setMenuActivated: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  return (
    <ContainerInlineMenu>
      {menus.map((menu) => (
        <ItemInlineMenu
          key={menu.value}
          isActivated={menu.value === menuActivated}
          onClick={() => setMenuActivated(menu.value)}
        >
          {menu.status === "incomplete" && <IncompleteIcon />}
          {menu.status === "done" && <DoneIcon />}
          {menu.label}
        </ItemInlineMenu>
      ))}
    </ContainerInlineMenu>
  );
}

export default InlineMenu;
