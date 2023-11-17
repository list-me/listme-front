import { renderToString } from "react-dom/server";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";
import { IHeader } from "../../../../../../context/products/product.context";

function customRendererCheckedComponent({
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

  const itemCorrect = value
    ? columns[col]?.options?.includes(value?.[0])
    : true;

  const radioClass = itemCorrect ? "checked-item" : "checked-item-warn";

  // @ts-ignore
  const valueToView = value?.join(", ");

  const element = `
  <div class=${radioClass} >
    ${
      !itemCorrect
        ? `<div class="hover-container-info" onclick="window.yourSetAlertTooltip((prev) => !prev)">
      ${svgStringInfo}

    </div>`
        : ""
    }
    ${valueToView ?? ""}
    ${svgStringDropDown}
    </div>`;

  (window as any).yourSetAlertTooltip = setAlertTooltip;

  return element;
}

export default customRendererCheckedComponent;
