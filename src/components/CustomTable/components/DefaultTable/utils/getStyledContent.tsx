import { renderToString } from "react-dom/server";
import { ReactComponent as DropDownIconSmall } from "../../../../../assets/chevron-down-small.svg";

const svgStringDropDownSmall: string = renderToString(<DropDownIconSmall />);

const BASE_STYLES = `
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 51px;
  padding: 0 1.5rem;
  font-family: 'Satoshi Regular';
  `;
const PLUS_BASE_STYLES = `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 51px;
  padding: 0 1.5rem;
  font-family: 'Satoshi Regular';
  `;

const TEXT_STYLE = `
  font-size: 14px;
  color: rgb(134, 142, 150);
  margin: 0;
  text-align: center;
  `;
const PLUS_STYLE = `
  font-size: 30px;
  color: rgb(134, 142, 150);
  margin: 0;
  text-align: center;
  `;

const REQUIRED_STYLE = `
  border: 1px solid rgb(255, 0, 0);
  border-radius: 20px;
  color: rgb(255, 0, 0);
  padding-inline: 7px;
  margin: 0;
  font-size: 12px;
`;

const FLEX_GAP_STYLE = `
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SVG_STYLE = `
  cursor: pointer;
  border: none;
  background: none;
`;

const ICON_STYLE = `
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const getStyledContent = (
  iconType: any,
  valueToVisible: string | number | undefined,
  isRequired: boolean,
): string => {
  console.log(
    "🚀 ~ file: getStyledContent.tsx:68 ~ valueToVisible:",
    valueToVisible,
  );
  return `
    <div style="${valueToVisible !== "+" ? BASE_STYLES : PLUS_BASE_STYLES}">
      <div style="${FLEX_GAP_STYLE}">
        ${renderToString(iconType)}
        <p style="${
          valueToVisible !== "+" ? TEXT_STYLE : PLUS_STYLE
        }">${valueToVisible}</p>
      </div>
      <div style="${FLEX_GAP_STYLE}">
        ${isRequired ? `<p style="${REQUIRED_STYLE}">Obrigatório</p>` : ""}
        ${
          valueToVisible && valueToVisible !== "+"
            ? `<button style="${SVG_STYLE}" class="dropDown">
                <div style="${ICON_STYLE}">${svgStringDropDownSmall}</div>
              </button>`
            : ""
        }
      </div>
    </div>
  `;
};

export default getStyledContent;
