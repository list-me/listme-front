/* eslint-disable no-restricted-syntax */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FilterContextType,
  IConditions,
  IFilter,
  IOperator,
} from "./FilterContextType";
import { useProductContext } from "../products";
import { productRequests } from "../../services/apis/requests/product";
import { templateRequests } from "../../services/apis/requests/template";
import { ITemplate } from "../products/product.context";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const defaultFilter: IFilter = {
    column: {},
    condition: {},
    value: "",
    id: 1,
  } as IFilter;
  const { headerTable } = useProductContext();

  const [filterStatus, setFilterStatus] = useState(false);

  const [loadingOptions, setLoadingOptions] = useState(false);

  const [openedFilter, setOpenedFilter] = useState(false);
  const [filters, setFilters] = useState([...[defaultFilter]]);

  const [optionsToMultiSelect, setOptionsToMultiSelect] = useState<any>([null]);

  const [operator, setOperator] = useState<IOperator>({
    label: "Todos os",
    value: "AND",
  });

  const [conditions, setConditions] = useState<IConditions[]>(
    [] as IConditions[],
  );

  const removeRepeatedObjects = useCallback((array: any, chave: any): any[] => {
    const uniqueObjects = [];
    const keys = new Set();

    for (const objeto of array) {
      if (!keys.has(objeto[chave])) {
        keys.add(objeto[chave]);
        uniqueObjects.push(objeto);
      }
    }

    return uniqueObjects;
  }, []);

  const getProducts = useCallback(async (templateId: string, key?: string) => {
    setLoadingOptions(true);
    const { data } = await productRequests
      .list({ page: 0, limit: 100, keyword: key }, templateId)
      .finally(() => setLoadingOptions(false));
    return data.products;
  }, []);

  const getOptions = useCallback(
    async (
      currentItem: IFilter,
      index: number,
      key?: string,
      search?: boolean,
    ) => {
      const { type } = currentItem?.column;

      if (type === "radio" || type === "list" || type === "checked") {
        const id = window.location.pathname.substring(10);
        const response: ITemplate = await templateRequests.get(id);
        const field = response?.fields?.fields?.find((tField: any) => {
          return tField?.id === currentItem?.column?.value;
        });

        const optionsToView = field?.options?.map((option: any) => {
          return { value: option, label: option };
        });
        setOptionsToMultiSelect((prev: any) => {
          const newOptions = [...prev];
          newOptions[index] = optionsToView;
          return newOptions;
        });
      }

      if (type === "relation") {
        if (typeof currentItem.column.optionsList[0] !== "string") {
          const { templateId, field } = currentItem.column.optionsList[0];
          const productsToSelect = await getProducts(templateId, key);

          const productFields: any = [];
          productsToSelect.forEach((product: any) => {
            product.fields.forEach((pField: any) => {
              const newField = {
                itemId: product.id,
                ...pField,
              };

              if (pField.id === field) productFields.push(newField);
            });
          });

          const optionsToView = productFields.map((option: any) => {
            return {
              value: option.itemId,
              label: option.value[0],
            };
          });
          setOptionsToMultiSelect((prev: any) => {
            const newOptions = [...prev];
            newOptions[index] = removeRepeatedObjects(
              search ? [...optionsToView, ...prev[index]] : optionsToView,
              "value",
            );
            return newOptions;
          });
        }
      }
    },
    [getProducts, removeRepeatedObjects],
  );

  const changeValue = useCallback(
    (
      value: any,
      index: number,
      typeChange: "column" | "condition" | "value" | "selectValue",
    ) => {
      setFilters((prevFilters) => {
        const newFilters = [...prevFilters];
        if (typeChange === "column") {
          newFilters[index] = {
            ...newFilters[index],
            column: value,
            condition: {
              label: "",
              value: "",
              input: "",
            },
            value: "",
            selectValue: [],
          };
          getOptions(newFilters[index], index);
        } else if (typeChange === "condition") {
          newFilters[index] = {
            ...newFilters[index],
            column: newFilters[index]?.column,
            condition: value,
          };
        } else if (typeChange === "value") {
          newFilters[index] = {
            ...newFilters[index],
            column: newFilters[index]?.column,
            condition: newFilters[index]?.condition,
            value,
            selectValue: [],
          };
        } else if (typeChange === "selectValue") {
          newFilters[index] = {
            ...newFilters[index],
            column: newFilters[index]?.column,
            condition: newFilters[index]?.condition,
            value: "",
            selectValue: value,
          };
        }

        return newFilters;
      });
    },
    [getOptions],
  );

  function removeFilter(currentFilters: IFilter[], index: number): void {
    const newFilters = currentFilters
      .filter((_, i) => i !== index)
      .map((item, newIndex: number) => {
        return { ...item, id: newIndex };
      });
    setFilters(newFilters);
    const newOptMulti = optionsToMultiSelect.filter(
      (_: any, i: any) => i !== index,
    );
    setOptionsToMultiSelect(newOptMulti);
  }

  const options = useMemo(() => {
    return headerTable
      .map((item: any) => {
        const newItem = {
          value: item.data,
          label: item.title,
          type: item.type,
          optionsList: item.options,
        };
        return newItem;
      })
      .filter((item) => item.value);
  }, [headerTable]);

  useEffect(() => {
    function applyConditions(): any {
      const toConditions = filters.map((filter) => {
        if (filter.condition.input === "text") {
          const converted = {
            field: filter.column.value,
            action: filter.condition.value,
            value: filter.value,
          };
          return converted;
        }
        if (filter.condition.input === "multi") {
          const selecteds: string[] = filter?.selectValue?.map((item: any) => {
            return item.value;
          });

          const converted = {
            field: filter.column.value,
            action: filter.condition.value,
            value: selecteds,
          };
          return converted;
        }
        if (filter.condition.input === "") {
          const converted = {
            field: filter.column.value,
            action: filter.condition.value,
          };
          return converted;
        }
      });
      if (toConditions.length) setConditions(toConditions as IConditions[]);
    }
    applyConditions();
  }, [filters]);

  const value = {
    openedFilter,
    setOpenedFilter,
    options,
    filters,
    setFilters,
    removeFilter,
    defaultFilter,
    getOptions,
    changeValue,
    optionsToMultiSelect,
    conditions,
    setConditions,
    operator,
    setOperator,
    filterStatus,
    setFilterStatus,
    loadingOptions,
    setOptionsToMultiSelect,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider",
    );
  }
  return context;
};
