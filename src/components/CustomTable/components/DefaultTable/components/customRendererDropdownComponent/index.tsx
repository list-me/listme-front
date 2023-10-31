import { renderToString } from "react-dom/server";
import { ICol } from "../../../../CustomTable";
import { ReactComponent as InfoIcon } from "../../../../../../assets/info.svg";

function customRendererDropdownComponent({
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

  const element = `<div class=${radioClass}>
  ${
    value && !itemCorrect
      ? `<div class="hover-container-info" onclick="window.yourSetAlertTooltip((prev) => !prev)" >
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

export default customRendererDropdownComponent;
