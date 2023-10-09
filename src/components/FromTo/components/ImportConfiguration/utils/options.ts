const optionsSeparator = [
  {
    value: ",",
    label: "Vírgula (,)",
  },
  {
    value: ";",
    label: "Ponto e Vírgula (;)",
  },
  {
    value: "|",
    label: "Pipe (|)",
  },
  {
    value: "\t",
    label: "Tab ( )",
  },
];
const optionsDelimiter = [
  {
    value: '"',
    label: 'Aspas Duplas (")',
  },
  {
    value: "'",
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
    value: ".",
    label: "Ponto (.)",
  },
  {
    value: ",",
    label: "Vírgula (,)",
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
];
