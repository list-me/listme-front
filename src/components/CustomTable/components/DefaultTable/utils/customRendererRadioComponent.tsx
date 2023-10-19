import { renderToString } from "react-dom/server";
import { ICol } from "../../../CustomTable";
import { ReactComponent as InfoIcon } from "../../../../../assets/info.svg";

function customRendererRadioComponent({
  cols,
  col,
  value,
  svgStringDropDown,
  setAlertTooltip,
}: {
  cols: ICol[];
  col: number;
  value: string | string[];
  svgStringDropDown: string;
  setAlertTooltip: React.Dispatch<React.SetStateAction<boolean>>;
}): string {
  const svgStringInfo: string = renderToString(<InfoIcon />);

  const itemCorrect = cols[col]?.options?.includes(value?.[0]);

  const radioClass = !itemCorrect && value ? "radio-item-warn" : "radio-item";

  const element = `
  <div class=${radioClass}>
    ${
      !itemCorrect &&
      value &&
      `<div class="hover-container-info" onmouseover="window.yourSetAlertTooltip(true)" onmouseout="window.yourSetAlertTooltip(false)">
      ${svgStringInfo}

    </div>`
    }
    ${value ?? ""}
    ${svgStringDropDown}
  </div>`;

  (window as any).yourSetAlertTooltip = setAlertTooltip;

  return element;
}

export default customRendererRadioComponent;
