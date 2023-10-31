import { useEffect, useRef, useState } from "react";
import {
  CloseButton,
  Condition,
  ConditionItem,
  ContainerFilter,
  FilterCenterContent,
  FilterLogic,
  FilterLogicSelectContainer,
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

const defaultCondition: ICondition = {
  column: " ",
  condition: " ",
  value: "",
};

function Filter(): JSX.Element {
  const { openedFilter, setOpenedFilter } = useFilterContext();
  const [conditions, setConditions] = useState([defaultCondition]);

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
      setConditions((prev) => [...prev, defaultCondition]);
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
          <FilterLogic>
            Resultados devem atender
            <FilterLogicSelectContainer>
              <SelectComponent
                select={undefined}
                onChange={() => ""}
                options={undefined}
                placeHolder=""
                small
              />
            </FilterLogicSelectContainer>
            critérios
          </FilterLogic>
          {conditions.map((item, index) => (
            <Condition
              key={item.column + item.condition}
              smallBefore={index === 0}
            >
              {item.column && (
                <ConditionItem small={!!item.value}>
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
                <ConditionItem small={!!item.value}>
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
                <ConditionItem small={!!item.value}>
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
