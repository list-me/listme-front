import { renderToString } from "react-dom/server";
import { ICol } from "../../../CustomTable";
import { ReactComponent as InfoIcon } from "../../../../../assets/info.svg";

function customRendererRadioComponent({
  cols,
  col,
  value,
  svgStringDropDown,
}: {
  cols: ICol[];
  col: number;
  value: string | string[];
  svgStringDropDown: string;
}): string {
  const svgStringInfo: string = renderToString(<InfoIcon />);

  const itemCorrect = cols[col]?.options?.includes(value?.[0]);

  const radioClass = !itemCorrect && value ? "radio-item-warn" : "radio-item";

  const element = `
  <div class=${radioClass}>
    ${
      !itemCorrect &&
      value &&
      `<div class="hover-container">
      ${svgStringInfo}
      <div class="error-message">
      <div class="arrow-right"></div>
        <p class="error-title">Inválido:</p>
        <p>A entrada não é aceitável, pois não<br />corresponde a nenhum dos itens da<br />coluna especificada.</p>
      </div>
    </div>`
    }
    ${value ?? ""}
    ${svgStringDropDown}
  </div>`;

  return element;
}

export default customRendererRadioComponent;
