/* eslint-disable no-restricted-syntax */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FilterContextType,
  IConditions,
  IFilter,
  IOperator,
} from "./FilterContextType";
import { useProductContext } from "../products";
import typesOptions from "./utils/typesOptions";
import { productRequests } from "../../services/apis/requests/product";

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
  const { template } = useProductContext();

  const [filterStatus, setFilterStatus] = useState(false);

  const [loadingOptions, setLoadingOptions] = useState(false);

  const [openedFilter, setOpenedFilter] = useState(false);
  const [filters, setFilters] = useState([...[defaultFilter]]);
  const [optionsToMultiSelect, setOptionsToMultiSelect] = useState<any>([{}]);
  const [operator, setOperator] = useState<IOperator>({
    label: "Todos os",
    value: "AND",
  });

  const [conditions, setConditions] = useState<IConditions[]>(
    [] as IConditions[],
  );

  const changeValue = useCallback(
    (
      value: any,
      index: number,
      typeChange: "column" | "condition" | "value" | "selectValue",
    ) => {
      setFilters((prevFilters) => {
        const newFilters = [...prevFilters];
        if (newFilters[index]) newFilters[index][typeChange] = value;

        return newFilters;
      });
    },
    [],
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
    const { data } = await productRequests.list(
      { page: 0, limit: 100, keyword: key },
      templateId,
    );
    setLoadingOptions(false);
    return data.products;
  }, []);

  function removeFilter(currentFilters: IFilter[], index: number): void {
    const newFilters = currentFilters.filter((_, i) => i !== index);
    setFilters(newFilters);
  }

  const { headerTable } = useProductContext();

  const options: IOption[] = headerTable
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

  const getOptions = useCallback(
    async (
      currentItem: IFilter,
      index: number,
      key?: string,
      search?: boolean,
    ): Promise<any> => {
      const { type } = currentItem?.column;

      if (type === "radio" || type === "list" || type === "checked") {
        const field = template?.fields?.fields?.find((tField: any) => {
          return tField?.id === currentItem?.column?.value;
        });

        const optionsToView = field?.options?.map((option: any) => {
          return { value: option, label: option };
        });

        const newOptions = [...optionsToMultiSelect];
        newOptions[index] = optionsToView;

        setOptionsToMultiSelect(newOptions);
      }

      if (type === "relation") {
        if (typeof currentItem.column.optionsList[0] !== "string") {
          const { templateId, originField } = currentItem.column.optionsList[0];
          const productsToSelect = await getProducts(templateId, key);
          const productFields: any = [];
          productsToSelect.forEach((product: any) => {
            product.fields.forEach((pField: any) => {
              const newField = {
                itemId: product.id,
                ...pField,
              };
              if (pField.id === originField) productFields.push(newField);
            });
          });

          const optionsToView = productFields.map((option: any) => {
            return {
              value: option.itemId,
              label: option.value[0],
            };
          });

          const newOptions = [...optionsToMultiSelect];
          newOptions[index] = removeRepeatedObjects(
            search
              ? [...optionsToView, ...optionsToMultiSelect[index]]
              : optionsToView,
            "value",
          );

          setOptionsToMultiSelect(newOptions);
        }
      }
    },
    [
      template?.fields?.fields,
      optionsToMultiSelect,
      getProducts,
      removeRepeatedObjects,
    ],
  );

  useEffect(() => {
    function applyConditions(): any {
      const toConditions = filters.map((filter) => {
        if (filter.value) {
          const converted = {
            field: filter.column.value,
            action: filter.condition.value,
            value: filter.value,
          };
          return converted;
        }
        if (filter.selectValue) {
          const selecteds: string[] = filter.selectValue.map((item: any) => {
            return item.value;
          });

          const converted = {
            field: filter.column.value,
            action: filter.condition.value,
            value: selecteds,
          };
          return converted;
        }
        return null;
      });
      if (toConditions.length) setConditions(toConditions);
    }
    if (filters[0]?.id) applyConditions();
    else {
      setConditions([]);
    }
  }, [filters]);

  const value = {
    openedFilter,
    setOpenedFilter,
    options,
    filters,
    setFilters,
    removeFilter,
    defaultFilter,
    typesOptions,
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
