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
    optionsToSelect,
    conditions,
    operator,
    setOperator,
    setFilterStatus,
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
    setFilterStatus(true);
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
          setOpenedFilter(false);
        }}
      />
      <SidebarFilter>
        <HeaderFilter>
          <TitleFilter>Filtrar por</TitleFilter>
          <CloseButton
            onClick={() => {
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
            <ConditionFilterComponent
              key={item.id}
              item={item}
              index={index}
              filters={filters}
              changeValue={changeValue}
              getOptions={getOptions}
              typesOptions={typesOptions}
              options={options}
              optionsToSelect={optionsToSelect}
              removeFilter={removeFilter}
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
