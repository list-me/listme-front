/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
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
import { useProductContext } from "../../context/products";
import { IConditions } from "../../context/FilterContext/FilterContextType";
import { IHeaderTable } from "../../context/products/product.context";

function FilterComponent(): JSX.Element {
  const {
    setOpenedFilter,
    options,
    filters,
    removeFilter,
    setFilters,
    defaultFilter,
    typesOptions,
    changeValue,
    getOptions,
    optionsToSelect,
    conditions,
    operator,
    setOperator,
  } = useFilterContext();

  const { handleGetTemplate, template, handleGetProducts } =
    useProductContext();

  const logicOptions = [
    {
      label: "Todos os",
      value: "AND",
    },
    {
      label: "Quaisquer",
      value: "OR",
    },
  ];

  async function applyFilter(currentConditions: IConditions[]): Promise<any> {
    setOpenedFilter(false);
    if (currentConditions[0]) {
      try {
        const headerTableToGetProducts = (await handleGetTemplate(
          template.id,
        )) as IHeaderTable[];

        if (headerTableToGetProducts) {
          const product = await handleGetProducts(
            template.id,
            headerTableToGetProducts,
            // @ts-ignore
            0,
            100,
            "",
            currentConditions,
            operator.value,
          );
          return product;
        }
        return null;
      } catch (error) {
        console.error(error);
        toast.error(
          "Ocorreu um erro com sua solicitação de produtos, tente novamente",
        );
        return null;
      }
    }
    return null;
  }

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
                select={operator}
                onChange={(e) => setOperator(e)}
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
                  onChange={(e) => {
                    changeValue(e, index, "column");
                    getOptions(item);
                  }}
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
                    <InputFilter
                      type="text"
                      placeholder="Insira o valor"
                      value={item.value}
                      onChange={(e) => {
                        changeValue(e.target.value, index, "value");
                      }}
                    />
                  ) : (
                    <SelectFilter
                      isMulti
                      select={item.selectValue}
                      onChange={(e) => changeValue(e, index, "selectValue")}
                      options={optionsToSelect}
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
        <Button onClickModal={() => applyFilter(conditions)}>
          Filtrar produtos
        </Button>
      </SidebarFilter>
    </ContainerFilter>
  );
}

export default FilterComponent;
