import { renderToString } from "react-dom/server";
import { ICol } from "../../../../CustomTable";
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
  // console.log("🚀 ~ file: index.tsx:18 ~ col:", col);
  const svgStringInfo: string = renderToString(<InfoIcon />);

  const itemCorrect = value
    ? columns[col]?.options?.includes(value?.[0])
    : true;

  const radioClass = itemCorrect ? "radio-item" : "radio-item-warn";

  const element = `
  <div class=${radioClass}>
    ${
      !itemCorrect
        ? `<div class="hover-container-info" onmouseover="window.yourSetAlertTooltip(true)" onmouseout="window.yourSetAlertTooltip(false)">
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
