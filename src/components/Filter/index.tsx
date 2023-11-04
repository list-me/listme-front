import { useRef } from "react";
import {
  CloseButton,
  Filter,
  FilterItem,
  ContainerFilter,
  FilterCenterContent,
  FilterLogic,
  FilterLogicSelectContainer,
  HeaderFilter,
  NewFilter,
  SidebarFilter,
  TitleFilter,
  TrashButton,
} from "./styles";
import { ReactComponent as NewFilterPlus } from "../../assets/new-condition-plus.svg";

import { ReactComponent as CloseIcon } from "../../assets/close-gray.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-filter.svg";

import { useFilterContext } from "../../context/FilterContext";
import Button from "../Button";
import SelectFilter from "./components/SelectFilter";

function FilterComponent(): JSX.Element {
  const {
    setOpenedFilter,
    options,
    filters,
    removeFilter,
    setFilters,
    defaultFilter,
    typesOptions,
  } = useFilterContext();

  function changeValue(
    e: any,
    index: number,
    typeChange: "column" | "condition" | "value",
  ): void {
    const newFilters = [...filters];
    newFilters[index][typeChange] = e;
    setFilters(newFilters);
  }

  return (
    <ContainerFilter>
      <SidebarFilter>
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
              <SelectFilter
                select={undefined}
                onChange={() => ""}
                options={undefined}
                placeHolder=""
                small
              />
            </FilterLogicSelectContainer>
            critérios
          </FilterLogic>
          {filters.map((item, index) => (
            <Filter
              key={item.column.label + item.column.value}
              smallBefore={index === 0}
            >
              {item.column && (
                <FilterItem small={item.condition.complement}>
                  <SelectFilter
                    select={item.column}
                    onChange={(e) => changeValue(e, index, "column")}
                    options={options}
                    placeHolder=""
                    small
                  />
                </FilterItem>
              )}
              <FilterItem small={item.condition.complement}>
                <SelectFilter
                  isDisabled={!item.column.type}
                  select={item.condition}
                  onChange={(e) => changeValue(e, index, "condition")}
                  options={typesOptions[item.column.type]}
                  placeHolder=""
                  small
                />
              </FilterItem>
              {item.condition.complement && (
                <FilterItem small={item.condition.complement}>
                  <SelectFilter
                    select={item.value}
                    onChange={(e) => changeValue(e, index, "value")}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                </FilterItem>
              )}
              {filters.length > 1 && (
                <TrashButton onClick={() => removeFilter(filters, index)}>
                  <TrashIcon />
                </TrashButton>
              )}
            </Filter>
          ))}
          <NewFilter
            onClick={() => setFilters((prev) => [...prev, defaultFilter])}
          >
            <NewFilterPlus />
            Nova condição
          </NewFilter>
        </FilterCenterContent>
        <Button onClickModal={() => ""}>Filtrar produtos</Button>
      </SidebarFilter>
    </ContainerFilter>
  );
}

export default FilterComponent;
