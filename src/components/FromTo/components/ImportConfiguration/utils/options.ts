const optionsSeparator = [
  {
    value: "comma",
    label: "Vírgula (,)",
  },
  {
    value: "semicolon",
    label: "Ponto e Vírgula (;)",
  },
  {
    value: "pipe",
    label: "Pipe (|)",
  },
  {
    value: "tab",
    label: "Tab ( )",
  },
];
const optionsDelimiter = [
  {
    value: "double_quotes",
    label: 'Aspas Duplas (")',
  },
  {
    value: "single_quotes",
    label: "Aspas Simples (')",
  },
];
const optionsCharset = [
  {
    value: "UTF-8",
    label: "UTF-8",
  },
];
const optionsDecimal = [
  {
    value: "dot",
    label: "Ponto (.)",
  },
  {
    value: "comma",
    label: "Vírgula (,)",
  },
];
const multiOptions = [
  {
    value: "comma",
    label: "Ponto (,)",
  },
  {
    value: "semicolon",
    label: "Ponto e Vírgula (;)",
  },
];

export default [
  {
    list: optionsSeparator,
    title: "Separador de coluna",
    type: "separator",
  },
  {
    list: optionsDelimiter,
    title: "Delimitador de texto",
    type: "delimiter",
  },
  {
    list: optionsCharset,
    title: "Charset",
    type: "charset",
  },
  {
    list: optionsDecimal,
    title: "Separador decimal",
    type: "decimal",
  },
  {
    list: multiOptions,
    title: "Separador de múltiplas escolhas",
    type: "multiOptions",
  },
];
