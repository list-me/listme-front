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
      {
        label: "O texto contém",
        value: "O texto contém",
        input: "text",
      },
      {
        label: "O texto não contém",
        value: "O texto não contém",
        input: "text",
      },
      {
        label: "O texto começa com",
        value: "O texto começa com",
        input: "text",
      },
      {
        label: "O texto termina com",
        value: "O texto termina com",
        input: "text",
      },
      {
        label: "O texto é exatamente igual a",
        value: "O texto é exatamente igual a",
        input: "text",
      },
      {
        label: "Está preenchido(não está em branco)",
        value: "Está preenchido(não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    paragraph: [
      {
        label: "O texto contém",
        value: "O texto contém",
        input: "text",
      },
      {
        label: "O texto não contém",
        value: "O texto não contém",
        input: "text",
      },
      {
        label: "O texto começa com",
        value: "O texto começa com",
        input: "text",
      },
      {
        label: "O texto termina com",
        value: "O texto termina com",
        input: "text",
      },
      {
        label: "O texto é exatamente igual a",
        value: "O texto é exatamente igual a",
        input: "text",
      },
      {
        label: "Está preenchido(não está em branco)",
        value: "Está preenchido(não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    radio: [
      {
        label: "Contém uma das opções",
        value: "Contém uma das opções",
        input: "multi",
      },
      {
        label: "Não contém nenhuma opção",
        value: "Não contém nenhuma opção",
        input: "multi",
      },
      {
        label: "Contém o texto",
        value: "Contém o texto",
        input: "text",
      },
      {
        label: "Não contém o texto",
        value: "Não contém o texto",
        input: "text",
      },
      {
        label: "Está preenchido (não está em branco)",
        value: "Está preenchido (não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    list: [
      {
        label: "Contém uma das opções",
        value: "Contém uma das opções",
        input: "multi",
      },
      {
        label: "Não contém nenhuma opção",
        value: "Não contém nenhuma opção",
        input: "multi",
      },
      {
        label: "Contém o texto",
        value: "Contém o texto",
        input: "text",
      },
      {
        label: "Não contém o texto",
        value: "Não contém o texto",
        input: "text",
      },
      {
        label: "Está preenchido (não está em branco)",
        value: "Está preenchido (não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    checked: [
      {
        label: "Contém todos",
        value: "Contém todos",
        input: "multi",
      },
      {
        label: "Contém ao menos um",
        value: "Contém ao menos um",
        input: "multi",
      },
      {
        label: "Não contém",
        value: "Não contém",
        input: "multi",
      },
      { label: "Contém", value: "Contém", input: "text" },
      {
        label: "Não Contém",
        value: "Não Contém",
        input: "text",
      },
      {
        label: "Está preenchido (não está em branco)",
        value: "Está preenchido (não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    file: [
      {
        label: "O nome do arquivo contém o texto",
        value: "O nome do arquivo contém o texto",
        input: "text",
      },
      {
        label: "Está preenchido (não está em branco)",
        value: "Está preenchido (não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
    ],
    relation: [
      {
        label: "Contém todos",
        value: "Contém todos",
        input: "multi",
      },
      {
        label: "Contpem ao menos um",
        value: "Contpem ao menos um",
        input: "multi",
      },
      { label: "Contém", value: "Contém", input: "text" },
      {
        label: "Não contém",
        value: "Não contém",
        input: "text",
      },
      {
        label: "Está preenchido (não está em branco)",
        value: "Está preenchido (não está em branco)",
        input: "",
      },
      {
        label: "Não está preenchido (vazio)",
        value: "Não está preenchido (vazio)",
        input: "",
      },
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
