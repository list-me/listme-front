import { renderToString } from "react-dom/server";
import { ReactComponent as DropDownIconSmall } from "../../../../../assets/chevron-down-header-row.svg";
import { ReactComponent as DropDownIconSmallUp } from "../../../../../assets/chevron-up-header-row.svg";
import { IProductToTable } from "../../../../../context/products/product.context";

const svgStringDropDownSmall: string = renderToString(<DropDownIconSmall />);
const svgStringDropDownSmallUp: string = renderToString(
  <DropDownIconSmallUp />,
);

const BUTTON_STYLES = `
  width: 50px;
  height: 53px;
  border: none;
  background: none;
  `;

const getStyleRowHeader = (
  row: number,
  item: IProductToTable,
  onClickHandler: (currentParentId: string) => void,
  opened: boolean,
): string => {
  const element = item?.is_parent
    ? `
    <div>
  <button style="${BUTTON_STYLES}" class="clickable-row" onclick="window.yourOnClickHandler('${
        item.id
      }')">
    ${row + 1}
    ${opened ? svgStringDropDownSmall : svgStringDropDownSmallUp}
  </button>
  </div>
`
    : `<div>${row + 1}</div>`;

  (window as any).yourOnClickHandler = onClickHandler;

  return element;
};

export default getStyleRowHeader;
