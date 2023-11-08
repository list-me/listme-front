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
  IFieldsProductFilter,
  IFilter,
  IProductsFilter,
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

  const [multiSelectSearch, setMultiSelectSearch] = useState("");

  const [productsForSelect, setProductsForSelect] = useState<IProductsFilter>(
    [],
  );

  const getProducts = useCallback(async () => {
    const { data } = await productRequests.list(
      { page: 0, limit: 100, keyword: multiSelectSearch },
      template.id,
    );
    console.log("🚀 ~ file: index.tsx:45 ~ getProducts ~ data:", data);
    setProductsForSelect(data.products);
  }, [template?.id, multiSelectSearch]);

  useEffect(() => {
    if (template?.id) {
      getProducts();
    }
  }, [getProducts, multiSelectSearch, template?.id]);

  const [openedFilter, setOpenedFilter] = useState(true);
  const [filters, setFilters] = useState([defaultFilter]);

  function removeFilter(currentFilters: IFilter[], index: number): void {
    const newFilters = currentFilters.filter((_, i) => i !== index);
    setFilters(newFilters);
  }

  const { headerTable } = useProductContext();

  function removeObjetosRepetidos(array: any, chave: any): any[] {
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

  function getOptions(currentItem: IFilter): {
    label: string | string[];
    value: string;
  }[] {
    const itemsColumn: IFieldsProductFilter[] = [];
    const { value } = currentItem?.column;

    productsForSelect.forEach((product) => {
      if (product.fields) {
        product.fields.forEach((field) => {
          if (field.id === value) {
            const newObject = {
              id: product.id,
              value: field.value,
              title: field.title,
            };
            itemsColumn.push(newObject);
          }
        });
      }
    });

    const items = itemsColumn?.map((item) => {
      return { label: item.value[0], value: item.id };
    });
    const itemsFiltered = items.filter((fItem) => {
      return fItem.label;
    });

    return removeObjetosRepetidos(itemsFiltered, "label");
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
