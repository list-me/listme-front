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

  const itemCorrect = (): boolean => {
    if (value === "valor censurado") return true;
    return value ? cols[col]?.options?.includes(value?.[0]) : true;
  };

  const radioClass = itemCorrect() ? "dropdown-item" : "dropdown-item-warn";

  const isPublic = value === "valor censurado";

  const currentId = isPublic ? "blur" : "";

  const element = `<div class=${radioClass} id=${currentId}>
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
