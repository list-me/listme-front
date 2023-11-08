import { ITypes } from "../FilterContextType";

const typesOptions: ITypes = {
  text: [
    {
      label: "O texto contém",
      value: "contain",
      input: "text",
    },
    {
      label: "O texto não contém",
      value: "not_contain",
      input: "text",
    },
    {
      label: "O texto começa com",
      value: "begins_with",
      input: "text",
    },
    {
      label: "O texto termina com",
      value: "ends_with",
      input: "text",
    },
    {
      label: "O texto é exatamente igual a",
      value: "is_equal",
      input: "text",
    },
    {
      label: "Está preenchido(não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  paragraph: [
    {
      label: "O texto contém",
      value: "contain",
      input: "text",
    },
    {
      label: "O texto não contém",
      value: "not_contain",
      input: "text",
    },
    {
      label: "O texto começa com",
      value: "begins_with",
      input: "text",
    },
    {
      label: "O texto termina com",
      value: "ends_with",
      input: "text",
    },
    {
      label: "O texto é exatamente igual a",
      value: "is_equal",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  radio: [
    {
      label: "Contém uma das opções",
      value: "contain_least_one",
      input: "multi",
    },
    {
      label: "Não contém nenhuma opção",
      value: "not_contain_any",
      input: "multi",
    },
    {
      label: "Contém o texto",
      value: "contain",
      input: "text",
    },
    {
      label: "Não contém o texto",
      value: "not_contain",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  list: [
    {
      label: "Contém uma das opções",
      value: "contain_least_one",
      input: "multi",
    },
    {
      label: "Não contém nenhuma opção",
      value: "not_contain_any",
      input: "multi",
    },
    {
      label: "Contém o texto",
      value: "contain",
      input: "text",
    },
    {
      label: "Não contém o texto",
      value: "not_contain",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  checked: [
    {
      label: "Contém todos",
      value: "contains_all",
      input: "multi",
    },
    {
      label: "Contém ao menos um",
      value: "contain_least_one",
      input: "multi",
    },
    {
      label: "Não contém (múltipla seleção)",
      value: "not_contain_any",
      input: "multi",
    },
    { label: "Contém", value: "contain", input: "text" },
    {
      label: "Não Contém",
      value: "not_contain",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  file: [
    {
      label: "O nome do arquivo contém o texto",
      value: "contain",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
  relation: [
    {
      label: "Contém todos",
      value: "rel_contains_all",
      input: "multi",
    },
    {
      label: "Contém ao menos um",
      value: "rel_contain_least_one",
      input: "multi",
    },
    { label: "Contém", value: "REL_CONTAINS_ALL", input: "text" },
    {
      label: "Não contém",
      value: "not_contain_any",
      input: "text",
    },
    {
      label: "Está preenchido (não está em branco)",
      value: "is_not_empty",
      input: "",
    },
    {
      label: "Não está preenchido (vazio)",
      value: "is_empty",
      input: "",
    },
  ],
};

export default typesOptions;
