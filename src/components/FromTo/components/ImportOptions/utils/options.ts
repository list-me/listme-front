const optionsImport = [
  {
    value: "create_and_update",
    label: "Adicionar novos e atualizar existentes",
  },
  {
    value: "create",
    label: "Apenas adicionar novos",
  },
  {
    value: "update",
    label: "Apenas atualizar existentes",
  },
];
const optionsStatus = [
  {
    value: "Concluído",
    label: "Concluído",
  },
  {
    value: "Rascunho",
    label: "Rascunho",
  },
  {
    value: "Arquivado",
    label: "Arquivado",
  },
];
// const optionsAssets = [
//   {
//     value: "Ignorar ativos existentes",
//     label: "Ignorar ativos existentes",
//   },
//   {
//     value: "Importar todos os ativos",
//     label: "Importar todos os ativos",
//   },
// ];

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
  // {
  //   list: optionsAssets,
  //   title: "Importar assets",
  //   type: "assets",
  // },
];
