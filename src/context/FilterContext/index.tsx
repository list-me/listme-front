/* eslint-disable no-restricted-syntax */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FilterContextType, IFilter } from "./FilterContextType";
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

  const [multiSelectSearch, setMultiSelectSearch] = useState("");
  const [openedFilter, setOpenedFilter] = useState(true);
  const [filters, setFilters] = useState([defaultFilter]);
  const [optionsToSelect, setOptionsToSelect] = useState<any>();

  function removeRepeatedObjects(array: any, chave: any): any[] {
    const uniqueObjects = [];
    const keys = new Set();

    for (const objeto of array) {
      if (!keys.has(objeto[chave])) {
        keys.add(objeto[chave]);
        uniqueObjects.push(objeto);
      }
    }

    return uniqueObjects;
  }

  const getProducts = useCallback(
    async (templateId: string) => {
      const { data } = await productRequests.list(
        { page: 0, limit: 100, keyword: multiSelectSearch },
        templateId,
      );
      return data.products;
    },
    [multiSelectSearch],
  );

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

  async function getOptions(currentItem: IFilter): Promise<any> {
    const { type } = currentItem?.column;

    if (type === "radio" || type === "list" || type === "checked") {
      const field = template?.fields?.fields?.find((tField: any) => {
        return tField?.id === currentItem?.column?.value;
      });

      const optionsToView = field?.options?.map((option: any) => {
        return { value: option, label: option };
      });

      setOptionsToSelect(optionsToView);
    }

    if (type === "relation") {
      if (typeof currentItem.column.optionsList[0] !== "string") {
        const { templateId, originField } = currentItem.column.optionsList[0];
        const productsToSelect = await getProducts(templateId);
        const productFields: any = [];
        productsToSelect.forEach((product: any) => {
          product.fields.forEach((pField: any) => {
            if (pField.id === originField) productFields.push(pField);
          });
        });

        const optionsToView = productFields.map((option: any) => {
          return { value: option.value[0], label: option.value[0] };
        });

        setOptionsToSelect(removeRepeatedObjects(optionsToView, "value"));
      }
    }
  }

  function changeValue(
    e: any,
    index: number,
    typeChange: "column" | "condition" | "value",
  ): void {
    const newFilters = [...filters];
    newFilters[index][typeChange] = e;

    setFilters(newFilters);
  }

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
    optionsToSelect,
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
