import { useEffect, useRef, useState } from "react";
import {
  CloseButton,
  Condition,
  ConditionItem,
  ContainerFilter,
  FilterCenterContent,
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
import Button from "../Button";
import { ICondition } from "./Filter";

//  nao deve ter value pq so inicia com os dois campos
const initialCondition: ICondition = {
  column: " ",
  condition: " ",
  value: "",
};

function Filter(): JSX.Element {
  const { openedFilter, setOpenedFilter } = useFilterContext();
  const [conditions, setConditions] = useState([initialCondition]);

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

  function addNewCondition(currentConditions: ICondition[]): void {
    const lastItem = currentConditions[conditions.length - 1];

    if (!lastItem.value) {
      const copyConditions = [...currentConditions];

      const newItemDefault = {
        column: " ",
        condition: " ",
        value: " ",
      };

      copyConditions.pop();

      setConditions([...copyConditions, newItemDefault]);
    } else {
      setConditions((prev) => [...prev, initialCondition]);
    }
  }

  return (
    <ContainerFilter>
      <SidebarFilter ref={sidebarFilterRef}>
        <HeaderFilter>
          <TitleFilter>Filtrar por</TitleFilter>
          <CloseButton onClick={() => setOpenedFilter(false)}>
            <CloseIcon />
          </CloseButton>
        </HeaderFilter>
        <FilterCenterContent>
          <FilterLogic>oi</FilterLogic>
          {conditions.map((item, index) => (
            <Condition smallBefore={index === 0}>
              {item.column && (
                <ConditionItem>
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                </ConditionItem>
              )}
              {item.condition && (
                <ConditionItem>
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                </ConditionItem>
              )}
              {item.value && (
                <ConditionItem>
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                </ConditionItem>
              )}
            </Condition>
          ))}
          <NewCondition onClick={() => addNewCondition(conditions)}>
            <NewConditionPlus />
            Nova condição
          </NewCondition>
        </FilterCenterContent>
        <Button onClickModal={() => ""}>Filtrar produtos</Button>
      </SidebarFilter>
    </ContainerFilter>
  );
}

export default Filter;
