import { renderToString } from "react-dom/server";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";
import { IHeader } from "../../../../../../context/products/product.context";

function customRendererRadioComponent({
  columns,
  col,
  value,
  svgStringDropDown,
  setAlertTooltip,
}: {
  columns: IHeader[];
  col: number;
  value: string | string[];
  svgStringDropDown: string;
  setAlertTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}): string {
  const svgStringInfo: string = renderToString(<InfoIcon />);

  const itemCorrect = (): boolean => {
    if (value === "valor censurado") return true;
    return value ? columns[col]?.options?.includes(value?.[0]) : true;
  };

  const radioClass = itemCorrect() ? "radio-item" : "radio-item-warn";

  const isPublic = value === "valor censurado";

  const currentId = isPublic ? "blur" : "";

  const element = `
  <div class=${radioClass} id=${currentId} >
    ${
      !itemCorrect
        ? `<div class="hover-container-info" onclick="window.yourSetAlertTooltip((prev) => !prev)">
      ${svgStringInfo}

    </div>`
        : ""
    }
    ${value ?? ""}
    ${svgStringDropDown}
  </div>`;

  (window as any).yourSetAlertTooltip = setAlertTooltip;

  return element;
}

export default customRendererRadioComponent;
