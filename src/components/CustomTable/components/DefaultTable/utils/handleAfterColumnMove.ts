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

  handleMove(newColumns);
};

export default handleAfterColumnMove;
