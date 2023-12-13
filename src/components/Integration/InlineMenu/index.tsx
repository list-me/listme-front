import React from "react";
import { ContainerInlineMenu, ItemInlineMenu } from "./styles";

function InlineMenu({
  menus,
  menuActivated,
  setMenuActivated,
}: {
  menus: { value: string; label: string }[];
  menuActivated: string;
  setMenuActivated: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  return (
    <ContainerInlineMenu>
      {menus.map((menu) => (
        <ItemInlineMenu
          isActivated={menu.value === menuActivated}
          onClick={() => setMenuActivated(menu.value)}
        >
          {menu.label}
        </ItemInlineMenu>
      ))}
    </ContainerInlineMenu>
  );
}

export default InlineMenu;
