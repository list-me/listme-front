/* eslint-disable react/no-array-index-key */
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
  CloseButtonTransparent,
  InputFilter,
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

  const logicOptions = [
    {
      label: "Todos os",
      value: "Todos os",
    },
    {
      label: "Quaisquer",
      value: "Quaisquer",
    },
  ];

  return (
    <ContainerFilter>
      <CloseButtonTransparent
        onClick={() => {
          setFilters([defaultFilter]);
          setOpenedFilter(false);
        }}
      />
      <SidebarFilter>
        <HeaderFilter>
          <TitleFilter>Filtrar por</TitleFilter>
          <CloseButton
            onClick={() => {
              setFilters([defaultFilter]);
              setOpenedFilter(false);
            }}
          >
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
                options={logicOptions}
                placeHolder="Selecione"
                small
              />
            </FilterLogicSelectContainer>
            critérios
          </FilterLogic>
          {filters.map((item, index) => (
            <Filter key={item.id} smallBefore={index === 0}>
              <FilterItem
                small={!!item.condition.input}
                trash={filters.length > 1}
              >
                <SelectFilter
                  isSearchable
                  select={
                    filters[index].column.value
                      ? filters[index].column
                      : undefined
                  }
                  onChange={(e) => changeValue(e, index, "column")}
                  options={options}
                  placeHolder="Selecione a coluna"
                  small
                />
              </FilterItem>
              <FilterItem
                small={!!item.condition.input}
                trash={filters.length > 1}
              >
                <SelectFilter
                  isSearchable={false}
                  isDisabled={!item.column.type}
                  select={
                    filters[index].condition.value
                      ? filters[index].condition
                      : undefined
                  }
                  onChange={(e) => changeValue(e, index, "condition")}
                  options={typesOptions[item.column.type]}
                  placeHolder="Condição"
                  small
                />
              </FilterItem>
              {item.condition.input && (
                <FilterItem
                  small={!!item.condition.input}
                  trash={filters.length > 1}
                >
                  {item.condition.input === "text" ? (
                    <InputFilter placeholder="Insira o valor" />
                  ) : (
                    <SelectFilter
                      isMulti
                      select={undefined}
                      onChange={() => ""}
                      options={typesOptions[item.column.type]}
                      placeHolder="Valores"
                      small
                    />
                  )}
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
            onClick={() =>
              setFilters((prev) => [
                ...prev,
                { ...defaultFilter, id: filters.length + 1 },
              ])
            }
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
