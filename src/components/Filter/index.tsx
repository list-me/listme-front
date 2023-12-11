/* eslint-disable react/no-array-index-key */
import { toast } from "react-toastify";
import {
  CloseButton,
  ContainerFilter,
  FilterCenterContent,
  FilterLogic,
  FilterLogicSelectContainer,
  HeaderFilter,
  NewFilter,
  SidebarFilter,
  TitleFilter,
  CloseButtonTransparent,
  ButtonClearAll,
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
import ConditionFilterComponent from "./components/ConditionFilterComponent";

function FilterComponent(): JSX.Element {
  const {
    setOpenedFilter,
    options,
    filters,
    removeFilter,
    setFilters,
    defaultFilter,
    changeValue,
    optionsToMultiSelect,
    conditions,
    setConditions,
    operator,
    setOperator,
    setFilterStatus,
    loadingOptions,
    setOptionsToMultiSelect,
    openedFilter,
  } = useFilterContext();

  const {
    handleGetTemplate,
    template,
    handleGetProducts,
    setConditionsFilter,
    conditionsFilter,
    handleRedirectAndGetProducts,
  } = useProductContext();

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
    const conditionsRemovedEmpty = currentConditions
      .filter((cond) => {
        return cond?.field && cond?.action;
      })
      .map((cond) => {
        if (cond?.action === "is_empty" || cond?.action === "is_not_empty") {
          const newCond = {
            field: cond.field,
            action: cond.action,
          };
          return newCond;
        }
        return cond;
      });

    try {
      if (conditionsRemovedEmpty.length > 0) {
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
            conditionsRemovedEmpty,
            operator.value,
          ).then(() => {
            setConditionsFilter(conditionsRemovedEmpty as IConditions[]);
            setOpenedFilter(false);
            setFilterStatus(true);
          });

          return product;
        }
      } else {
        setConditionsFilter([{}] as IConditions[]);
        const isPublic = window.location.pathname.includes("public");
        const id = window.location.pathname.substring(isPublic ? 17 : 10);
        if (id) {
          setTimeout(() => {
            handleRedirectAndGetProducts(id).then(() => {});
            setOpenedFilter(false);
          }, 0);
        }
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

  function updateFilter(): void {
    const valuesConditions = conditionsFilter?.map((cond) => {
      return cond?.value;
    });

    if (valuesConditions?.length > 0 && valuesConditions[0] !== undefined) {
      const filteredFilter = filters.filter((filt) => {
        return (
          valuesConditions?.includes(filt?.value) ||
          filt?.selectValue?.filter((sel) => {
            return valuesConditions?.includes(sel?.value);
          })
        );
      });
      setFilters(filteredFilter);
    }
  }

  return (
    <ContainerFilter openedFilter={openedFilter}>
      {openedFilter && (
        <CloseButtonTransparent
          onClick={() => {
            setOpenedFilter(false);
            setConditions(conditionsFilter);
            updateFilter();
          }}
        />
      )}
      <SidebarFilter openedFilter={openedFilter}>
        <HeaderFilter>
          <TitleFilter>Filtrar por</TitleFilter>
          <CloseButton
            onClick={() => {
              setOpenedFilter(false);
              setConditions(conditionsFilter);
              updateFilter();
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
                isSearchable={false}
                select={operator}
                onChange={(e) => setOperator(e)}
                options={logicOptions}
                placeHolder="Selecione"
                small
              />
            </FilterLogicSelectContainer>
            critérios.
          </FilterLogic>
          {filters.map((item, index) => (
            <ConditionFilterComponent
              key={item.id}
              item={item}
              index={index}
              filters={filters}
              changeValue={changeValue}
              options={options}
              optionsToMultiSelect={optionsToMultiSelect}
              removeFilter={removeFilter}
              loadingOptions={loadingOptions}
            />
          ))}
          <NewFilter
            filters={filters}
            onClick={() => {
              setFilters((prev) => [
                ...prev,
                { ...defaultFilter, id: filters.length + 1 },
              ]);
              setOptionsToMultiSelect((prev: any) => [...prev, null]);
            }}
          >
            <NewFilterPlus />
            Nova condição
          </NewFilter>
        </FilterCenterContent>
        <Button onClickModal={() => applyFilter(conditions)}>
          Filtrar produtos
        </Button>
        <ButtonClearAll
          onClick={() => {
            setFilters([defaultFilter]);
            setOptionsToMultiSelect([null]);
          }}
        >
          {filters.some((filter) => filter.column && filter.column.value) && (
            <>
              <TrashIcon />
              Limpar todos os filtros
            </>
          )}
        </ButtonClearAll>
      </SidebarFilter>
    </ContainerFilter>
  );
}

export default FilterComponent;
