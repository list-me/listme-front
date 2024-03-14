import { ReactComponent as TextIcon } from "../assets/text-icon.svg";
import { ReactComponent as RadioIcon } from "../assets/radio-icon.svg";
import { ReactComponent as CheckBoxIcon } from "../assets/checkbox-icon.svg";
import { ReactComponent as ListIcon } from "../assets/list-icon.svg";
import { ReactComponent as FileIcon } from "../assets/file-icon.svg";
import { ReactComponent as LinkIcon } from "../assets/link-gray-sm.svg";
import { ReactComponent as NumericIcon } from "../assets/numeric-icon.svg";
import { ReactComponent as DecimalIcon } from "../assets/decimal-icon.svg";
import { ReactComponent as BooleanIcon } from "../assets/boolean-icon.svg";

export default [
  {
    label: "Campo de texto",
    icon: <TextIcon />,
    type: "text",
  },

  {
    label: "Escolha única",
    icon: <RadioIcon />,
    type: "radio",
  },
  {
    label: "Caixa de seleção",
    icon: <CheckBoxIcon />,
    type: "checked",
  },
  {
    label: "Lista suspensa",
    icon: <ListIcon />,
    type: "list",
  },
  {
    label: "Números inteiros",
    icon: <NumericIcon />,
    type: "numeric",
  },
  {
    label: "Números decimais",
    icon: <DecimalIcon />,
    type: "decimal",
  },
  {
    label: "Arquivo",
    icon: <FileIcon />,
    type: "file",
  },
  {
    label: "Relacionamento",
    icon: <LinkIcon />,
    type: "relation",
  },
  {
    label: "Booleano",
    icon: <BooleanIcon />,
    type: "boolean",
  },
];
