import React, { createContext, useContext, useState } from "react";
import { FilterContextType, IFilter, ITypes } from "./FilterContextType";
import { useProductContext } from "../products";

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

  const [openedFilter, setOpenedFilter] = useState(true);
  const [filters, setFilters] = useState([defaultFilter]);

  function removeFilter(currentFilters: IFilter[], index: number): void {
    const newFilters = currentFilters.filter((_, i) => i !== index);
    setFilters(newFilters);
  }

  const typesOptions: ITypes = {
    text: [
      { label: "O texto contém", value: "O texto contém", complement: true },
      {
        label: "O texto não contém",
        value: "O texto não contém",
        complement: true,
      },
      {
        label: "O texto começa com",
        value: "O texto começa com",
        complement: true,
      },
      {
        label: "O texto termina com",
        value: "O texto termina com",
        complement: true,
      },
      {
        label: "O texto é exatamente igual a",
        value: "O texto é exatamente igual a",
        complement: true,
      },
      { label: "O texto é vazio", value: "O texto é vazio", complement: false },
      {
        label: "O texto não é vazio",
        value: "O texto não é vazio",
        complement: false,
      },
    ],
    paragraph: [
      { label: "O texto contém", value: "O texto contém", complement: true },
      {
        label: "O texto não contém",
        value: "O texto não contém",
        complement: true,
      },
      {
        label: "O texto começa com",
        value: "O texto começa com",
        complement: true,
      },
      {
        label: "O texto termina com",
        value: "O texto termina com",
        complement: true,
      },
      {
        label: "O texto é exatamente igual a",
        value: "O texto é exatamente igual a",
        complement: true,
      },
      { label: "O texto é vazio", value: "O texto é vazio", complement: false },
      {
        label: "O texto não é vazio",
        value: "O texto não é vazio",
        complement: false,
      },
    ],
    radio: [
      { label: "É igual a", value: "É igual a", complement: true },
      { label: "Não é igual a", value: "Não é igual a", complement: true },
      { label: "Contém", value: "Contém", complement: true },
      { label: "Não contém", value: "Não contém", complement: true },
      { label: "Está vazio", value: "Está vazio", complement: false },
      { label: "Não está vazio", value: "Não está vazio", complement: false },
    ],
    list: [
      { label: "É igual a", value: "É igual a", complement: true },
      { label: "Não é igual a", value: "Não é igual a", complement: true },
      { label: "Contém", value: "Contém", complement: true },
      { label: "Não contém", value: "Não contém", complement: true },
      { label: "Está vazio", value: "Está vazio", complement: false },
      { label: "Não está vazio", value: "Não está vazio", complement: false },
    ],
    checked: [
      { label: "Contém todos", value: "Contém todos", complement: true },
      {
        label: "Contém ao menos um",
        value: "Contém ao menos um",
        complement: true,
      },
      { label: "Não contém", value: "Não contém", complement: true },
      { label: "Contém", value: "Contém", complement: true },
      { label: "Não Contém", value: "Não Contém", complement: true },
      { label: "Está vazio", value: "Está vazio", complement: false },
      { label: "Não está vazio", value: "Não está vazio", complement: false },
    ],
    file: [
      {
        label: "O nome do arquivo contém",
        value: "O nome do arquivo contém",
        complement: true,
      },
      { label: "Está vazio", value: "Está vazio", complement: false },
      { label: "Não está vazio", value: "Não está vazio", complement: false },
    ],
    relation: [
      { label: "Contém todos", value: "Contém todos", complement: true },
      {
        label: "Contpem ao menos um",
        value: "Contpem ao menos um",
        complement: true,
      },
      { label: "Contém", value: "Contém", complement: true },
      { label: "Não contém", value: "Não contém", complement: true },
      { label: "Está vazio", value: "Está vazio", complement: false },
      { label: "Não está vazio", value: "Não está vazio", complement: false },
    ],
  };

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

  const value = {
    openedFilter,
    setOpenedFilter,
    options,
    filters,
    setFilters,
    removeFilter,
    defaultFilter,
    typesOptions,
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
