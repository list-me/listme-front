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
} from "./styles";
import { ReactComponent as NewFilterPlus } from "../../assets/new-condition-plus.svg";

import { ReactComponent as CloseIcon } from "../../assets/close-gray.svg";

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
    typesOptions,
    changeValue,
    getOptions,
    optionsToMultiSelect,
    conditions,
    setConditions,
    operator,
    setOperator,
    setFilterStatus,
    loadingOptions,
  } = useFilterContext();

  const {
    handleGetTemplate,
    template,
    handleGetProducts,
    setConditionsFilter,
    conditionsFilter,
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
          setConditionsFilter(currentConditions);
          setOpenedFilter(false);
          setFilterStatus(true);
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

  function updateFilter() {
    const valuesConditions = conditionsFilter.map((cond) => {
      return cond?.value;
    });
    console.log(
      "🚀 ~ file: index.tsx:105 ~ valuesConditions ~ valuesConditions:",
      valuesConditions,
    );
    if (valuesConditions.length > 0 && valuesConditions[0] !== undefined) {
      const filteredFilter = filters.filter((filt) => {
        return valuesConditions.includes(filt.value);
      });
      setFilters(filteredFilter);
    }
  }

  return (
    <ContainerFilter>
      <CloseButtonTransparent
        onClick={() => {
          setOpenedFilter(false);
          setConditions(conditionsFilter);
          updateFilter();
        }}
      />
      <SidebarFilter>
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
            <ConditionFilterComponent
              key={item.id}
              item={item}
              index={index}
              filters={filters}
              changeValue={changeValue}
              getOptions={getOptions}
              typesOptions={typesOptions}
              options={options}
              optionsToMultiSelect={optionsToMultiSelect}
              removeFilter={removeFilter}
              loadingOptions={loadingOptions}
            />
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
