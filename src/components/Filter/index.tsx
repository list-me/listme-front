import { useEffect, useRef } from "react";
import {
  CloseButton,
  Condition,
  ContainerFilter,
  FilterLogic,
  HeaderFilter,
  NewCondition,
  SidebarFilter,
  TitleFilter,
} from "./styles";
import { ReactComponent as NewConditionPlus } from "../../assets/new-condition-plus.svg";

import { ReactComponent as CloseIcon } from "../../assets/close-gray.svg";

import { useFilterContext } from "../../context/FilterContext";
import SelectComponent from "../Select";

function Filter(): JSX.Element {
  const { openedFilter, setOpenedFilter } = useFilterContext();

  const sidebarFilterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        sidebarFilterRef.current &&
        !sidebarFilterRef.current.contains(event.target as Node)
      ) {
        setOpenedFilter(false);
      }
    }

    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openedFilter, setOpenedFilter]);

  const conditions = ["", "", ""];

  return (
    <ContainerFilter>
      <SidebarFilter ref={sidebarFilterRef}>
        <HeaderFilter>
          <TitleFilter>Filtrar por</TitleFilter>
          <CloseButton onClick={() => setOpenedFilter(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderFilter>
        <FilterLogic>oi</FilterLogic>
        {conditions.map((_item, index) => (
          <Condition smallBefore={index === 0}>
            <SelectComponent
              select={undefined}
              onChange={() => ""}
              options={undefined}
              placeHolder=""
              small
            />
            <SelectComponent
              select={undefined}
              onChange={() => ""}
              options={undefined}
              placeHolder=""
              small
            />
          </Condition>
        ))}
        <NewCondition>
          <NewConditionPlus />
          Nova condição
        </NewCondition>
      </SidebarFilter>
    </ContainerFilter>
  );
}

export default Filter;
