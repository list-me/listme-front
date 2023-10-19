import { renderToString } from "react-dom/server";
import { ICol } from "../../../../CustomTable";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";

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

  const itemCorrect = value ? cols[col]?.options?.includes(value?.[0]) : true;

  const radioClass = itemCorrect ? "dropdown-item" : "dropdown-item-warn";

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
