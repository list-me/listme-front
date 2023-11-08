import { ITypes } from "../FilterContextType";

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

export default typesOptions;
