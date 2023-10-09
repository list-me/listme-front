const optionsImport = [
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
const optionsStatus = [
  {
    value: '"',
    label: 'Aspas Duplas (")',
  },
  {
    value: "'",
    label: "Aspas Simples (')",
  },
];
const optionsAssets = [
  {
    value: "UTF-8",
    label: "UTF-8",
  },
  {
    value: "UTF-32",
    label: "UTF-32",
  },
];

export default [
  {
    list: optionsImport,
    title: "Importação de produtos",
    type: "import",
  },
  {
    list: optionsStatus,
    title: "Status de novo produto",
    type: "status",
  },
  {
    list: optionsAssets,
    title: "Importar assets",
    type: "assets",
  },
];
