/* eslint-disable no-plusplus */
import { IHeader } from "../../../../../context/products/product.context";

/* eslint-disable no-param-reassign */
const handleAfterColumnMove = (
  movedColumns: number[],
  finalIndex: number,
  _dropIndex: number | undefined,
  _movePossible: boolean,
  orderChanged: boolean,
  columns: IHeader[],
  handleMove: Function,
  setColumns: any,
): void => {
  if (!orderChanged) return;

  movedColumns.forEach((oldIndex) => {
    const movedColumn = columns.splice(oldIndex, 1)[0];
    columns.splice(finalIndex, 0, movedColumn);
    finalIndex += 1;
  });

  const newColumns = columns.map((item, index) => {
    if (Object.keys(item).length) {
      return {
        ...item,
        order: index.toString(),
      };
    }
    return item;
  });

  const indexFirst = newColumns.findIndex((column) => column.frozen === false);

  if (
    indexFirst !== -1 &&
    newColumns[indexFirst + 1] &&
    newColumns[indexFirst + 1].frozen === true
  ) {
    newColumns[indexFirst].frozen = true;

    let lastIndex = -1;

    for (let i = newColumns.length - 1; i >= 0; i--) {
      if (newColumns[i].frozen === true) {
        lastIndex = i;
        break;
      }
    }
    newColumns[lastIndex].frozen = false;
  }
  handleMove(newColumns);
};

export default handleAfterColumnMove;
