import { useRef, useState } from "react";
import { Contents, Item } from "./styles"
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down.svg";
import {ReactComponent as EyeOffIcon} from "../../assets/eye-off.svg";
import {ReactComponent as FilterIcon} from "../../assets/filter.svg";
import {ReactComponent as SearchIcon} from "../../assets/search.svg";
import {ReactComponent as HelpIcon} from "../../assets/help.svg";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import DropdownMenu from "../RepDropdownMenu";

interface IProps {
  options: any[];
}

export const Temp: React.FC<IProps> = ({options}) => {
  const iconRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const items = [
    {
        id: 1,
        name: "Visualização",
        icon: <MenuIcon />,
        rightIcon: true
    },
    {
        id: 2,
        name: "Ocultar campos",
        icon: <EyeOffIcon />,
        rightIcon: true,
        onClick: () => setIsOpen(!isOpen)
    },
    {
        id: 3,
        name: "Filtrar",
        icon: <FilterIcon />,
        rightIcon: false,
    },
    {
        id: 4,
        name: "Buscar",
        icon: <SearchIcon />,
        rightIcon: false,
    },
  ]

  return (
    <Contents>
      <DropdownMenu
                // changeOpen={() => {}}
                // openModal={() => {}}
                left={150}
                key={Math.random()}
                iconRef={iconRef}
                handleOpen={() => setIsOpen(false) }
                isOpen={isOpen}
                colHeaders={options}
      />
      {items.map((item) => {
          return (
              <Item
                  key={item.id}
                  // onClick={() => console.log("ok")}
              >
                  {item.icon}
                  {item.name}
                  {item.rightIcon ? <ChevronDownIcon ref={iconRef} onClick={() => item?.onClick()} /> : <> </>}
              </Item>
          )
      })}
    </Contents>
  )
}